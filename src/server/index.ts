import cors from "cors";
import express, { type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import {
  ApplicationStatus,
  JobStatus,
  PayoutType,
  Prisma,
  UserRole,
} from "@prisma/client";
import { z } from "zod";

import { authMiddleware, type AuthenticatedRequest, signAuthToken } from "./auth";
import {
  API_PORT,
  CORS_ORIGINS,
  NODE_ENV,
  OTP_EXPIRY_SECONDS,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "./config";
import { prisma } from "./prisma";
import {
  createWhatsAppLink,
  haversineKm,
  isValidTenDigitPhone,
  normalizeSkill,
  randomOtpCode,
  sanitizePhoneNumber,
} from "./utils/geo";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  limit: RATE_LIMIT_MAX,
  standardHeaders: "draft-8",
  legacyHeaders: false,
}));

app.use(cors({
  origin(origin, callback) {
    if (!origin || CORS_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("CORS origin not allowed"));
  },
}));
app.use(express.json({ limit: "1mb" }));

const LANGUAGE_OPTIONS = ["en", "hi", "mr"] as const;

const latLngSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

const requestOtpSchema = z.object({
  phone_number: z
    .string()
    .transform((value) => sanitizePhoneNumber(value))
    .refine((value) => isValidTenDigitPhone(value), {
      message: "phone_number must be a 10-digit number",
    }),
});

const verifyOtpSchema = z.object({
  phone_number: z
    .string()
    .transform((value) => sanitizePhoneNumber(value))
    .refine((value) => isValidTenDigitPhone(value), {
      message: "phone_number must be a 10-digit number",
    }),
  otp: z.string().regex(/^\d{4}$/, "otp must be exactly 4 digits"),
  role: z.nativeEnum(UserRole).optional(),
  language_preference: z.enum(LANGUAGE_OPTIONS).optional(),
});

const profileUpdateSchema = z.object({
  role: z.nativeEnum(UserRole).optional(),
  language_preference: z.enum(LANGUAGE_OPTIONS).optional(),

  full_name: z.string().min(2).optional(),
  skills: z.union([z.array(z.string().min(1)), z.string().min(1)]).optional(),
  experience_years: z.coerce.number().int().min(0).max(60).optional(),
  location: latLngSchema.optional(),
  identity_doc_url: z.string().url().optional(),

  company_or_individual_name: z.string().min(2).optional(),
  contact_email: z
    .union([z.string().email(), z.literal("")])
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
});

const createJobSchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  description_text: z.string().min(5),
  description_audio_url: z.string().url().optional(),
  location_coordinates: latLngSchema,
  payout_amount: z.coerce.number().int().positive(),
  payout_type: z.nativeEnum(PayoutType),
});

const createApplicationSchema = z.object({
  job_id: z.string().uuid(),
});

const updateApplicationStatusSchema = z.object({
  status: z.enum([
    ApplicationStatus.SHORTLISTED,
    ApplicationStatus.HIRED,
    ApplicationStatus.REJECTED,
  ]),
});

function parseZodError(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "body";
    return `${path}: ${issue.message}`;
  });
}

function toSkillsArray(value: string[] | string): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function assertAuthenticatedUser(
  req: AuthenticatedRequest,
  res: Response,
): req is AuthenticatedRequest & { auth: { userId: string; role: UserRole | null } } {
  if (!req.auth?.userId) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "bluelink-api" });
});

app.post("/auth/request-otp", async (req, res) => {
  const parsed = requestOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parseZodError(parsed.error) });
    return;
  }

  const { phone_number } = parsed.data;
  const otpCode = randomOtpCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_SECONDS * 1000);

  await prisma.otpCode.create({
    data: {
      phone_number,
      code: otpCode,
      expires_at: expiresAt,
    },
  });

  const response: Record<string, unknown> = {
    success: true,
    message: "OTP generated successfully",
    expires_in_seconds: OTP_EXPIRY_SECONDS,
  };

  if (process.env.NODE_ENV !== "production") {
    response.dev_otp = otpCode;
    // Mock OTP delivery for local development.
    console.log(`[DEV OTP] ${phone_number}: ${otpCode}`);
  }

  res.status(200).json(response);
});

app.post("/auth/verify-otp", async (req, res) => {
  const parsed = verifyOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parseZodError(parsed.error) });
    return;
  }

  const { phone_number, otp, role, language_preference } = parsed.data;

  const otpRecord = await prisma.otpCode.findFirst({
    where: {
      phone_number,
      code: otp,
      consumed_at: null,
      expires_at: { gt: new Date() },
    },
    orderBy: { created_at: "desc" },
  });

  if (!otpRecord) {
    res.status(401).json({ error: "OTP invalid or expired" });
    return;
  }

  await prisma.otpCode.update({
    where: { otp_id: otpRecord.otp_id },
    data: { consumed_at: new Date() },
  });

  let user = await prisma.user.findUnique({
    where: { phone_number },
  });

  const isNewUser = !user;

  if (!user) {
    user = await prisma.user.create({
      data: {
        phone_number,
        role: role ?? null,
        is_verified: true,
        language_preference: language_preference ?? "en",
      },
    });
  } else {
    user = await prisma.user.update({
      where: { user_id: user.user_id },
      data: {
        is_verified: true,
        ...(role ? { role } : {}),
        ...(language_preference ? { language_preference } : {}),
      },
    });
  }

  const token = signAuthToken(user.user_id, user.role ?? null);

  res.status(200).json({
    success: true,
    token,
    user: {
      user_id: user.user_id,
      phone_number: user.phone_number,
      role: user.role,
      is_verified: user.is_verified,
      language_preference: user.language_preference,
      created_at: user.created_at,
    },
    is_new_user: isNewUser,
    requires_role_selection: user.role === null,
  });
});

const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter.put("/users/:id/profile", async (req: AuthenticatedRequest, res) => {
  if (!assertAuthenticatedUser(req, res)) {
    return;
  }

  const userIdParam = req.params.id;
  const userId = Array.isArray(userIdParam) ? userIdParam[0] : userIdParam;
  if (!userId) {
    res.status(400).json({ error: "Missing user id" });
    return;
  }
  if (req.auth.userId !== userId) {
    res.status(403).json({ error: "You can only update your own profile" });
    return;
  }

  const parsed = profileUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid profile payload", details: parseZodError(parsed.error) });
    return;
  }

  const payload = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { user_id: userId } });
  if (!existingUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const targetRole = payload.role ?? existingUser.role;
  if (!targetRole) {
    res.status(400).json({ error: "Role is required for profile update" });
    return;
  }

  await prisma.user.update({
    where: { user_id: userId },
    data: {
      role: targetRole,
      ...(payload.language_preference ? { language_preference: payload.language_preference } : {}),
      is_verified: true,
    },
  });

  if (targetRole === UserRole.WORKER) {
    if (
      !payload.full_name ||
      !payload.skills ||
      payload.experience_years === undefined ||
      !payload.location ||
      !payload.identity_doc_url
    ) {
      res.status(400).json({
        error:
          "Worker profile requires full_name, skills, experience_years, identity_doc_url, and location",
      });
      return;
    }

    const normalizedSkills = toSkillsArray(payload.skills)
      .map((item) => normalizeSkill(item))
      .filter(Boolean);

    if (normalizedSkills.length === 0) {
      res.status(400).json({ error: "At least one skill is required" });
      return;
    }

    const workerProfile = await prisma.workerProfile.upsert({
      where: { worker_id: userId },
      create: {
        worker_id: userId,
        full_name: payload.full_name,
        skills: normalizedSkills,
        experience_years: payload.experience_years,
        location_lat: payload.location.lat,
        location_lng: payload.location.lng,
        identity_doc_url: payload.identity_doc_url,
      },
      update: {
        full_name: payload.full_name,
        skills: normalizedSkills,
        experience_years: payload.experience_years,
        location_lat: payload.location.lat,
        location_lng: payload.location.lng,
        identity_doc_url: payload.identity_doc_url,
      },
    });

    res.status(200).json({
      success: true,
      role: UserRole.WORKER,
      profile: workerProfile,
      integration_points: {
        localization: {
          supported_languages: LANGUAGE_OPTIONS,
          selected: payload.language_preference ?? existingUser.language_preference,
        },
        voice_to_text: {
          fields: ["skills", "experience_years"],
          suggested_locales: {
            en: "en-IN",
            hi: "hi-IN",
            mr: "mr-IN",
          },
        },
        gps_capture: {
          expected_payload_shape: {
            location: {
              lat: 18.5204,
              lng: 73.8567,
            },
          },
        },
      },
    });
    return;
  }

  if (!payload.company_or_individual_name) {
    res.status(400).json({ error: "company_or_individual_name is required for employer profile" });
    return;
  }

  const employerProfile = await prisma.employerProfile.upsert({
    where: { employer_id: userId },
    create: {
      employer_id: userId,
      company_or_individual_name: payload.company_or_individual_name,
      contact_email: payload.contact_email,
    },
    update: {
      company_or_individual_name: payload.company_or_individual_name,
      contact_email: payload.contact_email,
    },
  });

  res.status(200).json({
    success: true,
    role: UserRole.EMPLOYER,
    profile: employerProfile,
    integration_points: {
      localization: {
        supported_languages: LANGUAGE_OPTIONS,
        selected: payload.language_preference ?? existingUser.language_preference,
      },
    },
  });
});

apiRouter.post("/jobs", async (req: AuthenticatedRequest, res) => {
  if (!assertAuthenticatedUser(req, res)) {
    return;
  }

  const parsed = createJobSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid job payload", details: parseZodError(parsed.error) });
    return;
  }

  const employerProfile = await prisma.employerProfile.findUnique({
    where: { employer_id: req.auth.userId },
  });

  if (!employerProfile) {
    res.status(403).json({ error: "Only employers can create jobs" });
    return;
  }

  const payload = parsed.data;

  const job = await prisma.jobPosting.create({
    data: {
      employer_id: employerProfile.employer_id,
      title: payload.title,
      category: normalizeSkill(payload.category),
      description_text: payload.description_text,
      description_audio_url: payload.description_audio_url,
      location_lat: payload.location_coordinates.lat,
      location_lng: payload.location_coordinates.lng,
      payout_amount: payload.payout_amount,
      payout_type: payload.payout_type,
      status: JobStatus.OPEN,
    },
  });

  res.status(201).json({
    success: true,
    job,
  });
});

apiRouter.get("/jobs/mine", async (req: AuthenticatedRequest, res) => {
  if (!assertAuthenticatedUser(req, res)) {
    return;
  }

  const employerProfile = await prisma.employerProfile.findUnique({
    where: { employer_id: req.auth.userId },
  });

  if (!employerProfile) {
    res.status(403).json({ error: "Only employers can access this endpoint" });
    return;
  }

  const jobs = await prisma.jobPosting.findMany({
    where: { employer_id: employerProfile.employer_id },
    orderBy: { created_at: "desc" },
  });

  res.json({
    success: true,
    jobs,
  });
});

apiRouter.get("/jobs/feed", async (req: AuthenticatedRequest, res) => {
  if (!assertAuthenticatedUser(req, res)) {
    return;
  }

  const workerProfile = await prisma.workerProfile.findUnique({
    where: { worker_id: req.auth.userId },
  });

  if (!workerProfile) {
    res.status(403).json({ error: "Worker profile required to access feed" });
    return;
  }

  const radiusKm = Math.min(Number(req.query.radius_km ?? 25), 25);
  const limit = Math.min(Number(req.query.limit ?? 20), 100);

  const rawSkills = Array.isArray(workerProfile.skills) ? workerProfile.skills : [];
  const skillSet = new Set(
    rawSkills
      .filter((value): value is string => typeof value === "string")
      .map((value) => normalizeSkill(value)),
  );

  if (skillSet.size === 0) {
    res.json({
      success: true,
      jobs: [],
      meta: { radius_km: radiusKm, reason: "No worker skills found in profile" },
    });
    return;
  }

  const openJobs = await prisma.jobPosting.findMany({
    where: { status: JobStatus.OPEN },
    orderBy: { created_at: "desc" },
  });

  const scoredJobs = openJobs
    .filter((job) => skillSet.has(normalizeSkill(job.category)))
    .map((job) => {
      const distanceKm = haversineKm(
        { lat: workerProfile.location_lat, lng: workerProfile.location_lng },
        { lat: job.location_lat, lng: job.location_lng },
      );

      return {
        ...job,
        distance_km: Number(distanceKm.toFixed(2)),
      };
    })
    .filter((job) => job.distance_km <= radiusKm)
    .sort((a, b) => a.distance_km - b.distance_km)
    .slice(0, limit);

  res.json({
    success: true,
    jobs: scoredJobs,
    meta: {
      radius_km: radiusKm,
      total_matches: scoredJobs.length,
      matched_skills: Array.from(skillSet),
    },
  });
});

apiRouter.get("/jobs/:id/applicants", async (req: AuthenticatedRequest, res) => {
  if (!assertAuthenticatedUser(req, res)) {
    return;
  }

  const jobIdParam = req.params.id;
  const jobId = Array.isArray(jobIdParam) ? jobIdParam[0] : jobIdParam;

  if (!jobId) {
    res.status(400).json({ error: "Missing job id" });
    return;
  }

  const employerProfile = await prisma.employerProfile.findUnique({
    where: { employer_id: req.auth.userId },
  });

  if (!employerProfile) {
    res.status(403).json({ error: "Only employers can view applicants" });
    return;
  }

  const job = await prisma.jobPosting.findUnique({ where: { job_id: jobId } });

  if (!job || job.employer_id !== employerProfile.employer_id) {
    res.status(404).json({ error: "Job not found for this employer" });
    return;
  }

  const applicants = await prisma.application.findMany({
    where: { job_id: jobId },
    include: {
      worker: {
        include: {
          user: {
            select: {
              phone_number: true,
              language_preference: true,
            },
          },
        },
      },
    },
    orderBy: { applied_at: "desc" },
  });

  res.json({
    success: true,
    applicants: applicants.map((item) => ({
      application_id: item.application_id,
      status: item.status,
      applied_at: item.applied_at,
      worker: {
        worker_id: item.worker_id,
        full_name: item.worker.full_name,
        skills: item.worker.skills,
        experience_years: item.worker.experience_years,
        average_rating: item.worker.average_rating,
        phone_number: item.worker.user.phone_number,
        language_preference: item.worker.user.language_preference,
      },
    })),
  });
});

apiRouter.post("/applications", async (req: AuthenticatedRequest, res) => {
  if (!assertAuthenticatedUser(req, res)) {
    return;
  }

  const parsed = createApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parseZodError(parsed.error) });
    return;
  }

  const workerProfile = await prisma.workerProfile.findUnique({
    where: { worker_id: req.auth.userId },
  });

  if (!workerProfile) {
    res.status(403).json({ error: "Only workers can apply to jobs" });
    return;
  }

  const job = await prisma.jobPosting.findUnique({
    where: { job_id: parsed.data.job_id },
  });

  if (!job || job.status !== JobStatus.OPEN) {
    res.status(404).json({ error: "Open job not found" });
    return;
  }

  try {
    const application = await prisma.application.create({
      data: {
        job_id: job.job_id,
        worker_id: workerProfile.worker_id,
        status: ApplicationStatus.APPLIED,
      },
    });

    res.status(201).json({
      success: true,
      application,
      communication: {
        whatsapp_template: "https://wa.me/<Phone_Number>?text=<Pre_filled_message>",
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({ error: "You have already applied to this job" });
      return;
    }

    throw error;
  }
});

apiRouter.patch("/applications/:id/status", async (req: AuthenticatedRequest, res) => {
  if (!assertAuthenticatedUser(req, res)) {
    return;
  }

  const applicationIdParam = req.params.id;
  const applicationId = Array.isArray(applicationIdParam) ? applicationIdParam[0] : applicationIdParam;

  if (!applicationId) {
    res.status(400).json({ error: "Missing application id" });
    return;
  }
  const parsed = updateApplicationStatusSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid status payload", details: parseZodError(parsed.error) });
    return;
  }

  const employerProfile = await prisma.employerProfile.findUnique({
    where: { employer_id: req.auth.userId },
    include: { user: true },
  });

  if (!employerProfile) {
    res.status(403).json({ error: "Only employers can update application statuses" });
    return;
  }

  const currentApplication = await prisma.application.findUnique({
    where: { application_id: applicationId },
    include: {
      job: true,
      worker: {
        include: {
          user: {
            select: {
              phone_number: true,
            },
          },
        },
      },
    },
  });

  if (!currentApplication) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  if (currentApplication.job.employer_id !== employerProfile.employer_id) {
    res.status(403).json({ error: "You can only update applications for your own jobs" });
    return;
  }

  const updatedApplication = await prisma.application.update({
    where: { application_id: applicationId },
    data: { status: parsed.data.status },
    include: {
      job: {
        include: {
          employer: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  let employerContact: {
    phone_number: string;
    whatsapp_link: string;
  } | null = null;

  if (
    updatedApplication.status === ApplicationStatus.SHORTLISTED ||
    updatedApplication.status === ApplicationStatus.HIRED
  ) {
    const employerPhone = updatedApplication.job.employer.user.phone_number;
    const message = `Hi, I am responding to the ${updatedApplication.job.title} role on BlueLink.`;

    employerContact = {
      phone_number: employerPhone,
      whatsapp_link: createWhatsAppLink(employerPhone, message),
    };
  }

  res.json({
    success: true,
    application: {
      application_id: updatedApplication.application_id,
      status: updatedApplication.status,
      job_id: updatedApplication.job_id,
      worker_id: updatedApplication.worker_id,
      applied_at: updatedApplication.applied_at,
    },
    employer_contact_for_worker: employerContact,
  });
});

apiRouter.get("/applications/me", async (req: AuthenticatedRequest, res) => {
  if (!assertAuthenticatedUser(req, res)) {
    return;
  }

  const workerProfile = await prisma.workerProfile.findUnique({
    where: { worker_id: req.auth.userId },
  });

  if (!workerProfile) {
    res.status(403).json({ error: "Only workers can access their applications" });
    return;
  }

  const applications = await prisma.application.findMany({
    where: { worker_id: workerProfile.worker_id },
    include: {
      job: {
        include: {
          employer: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: { applied_at: "desc" },
  });

  const response = applications.map((application) => {
    const canRevealContact =
      application.status === ApplicationStatus.SHORTLISTED ||
      application.status === ApplicationStatus.HIRED;

    const employerPhone = canRevealContact ? application.job.employer.user.phone_number : null;

    return {
      application_id: application.application_id,
      status: application.status,
      applied_at: application.applied_at,
      job: {
        job_id: application.job.job_id,
        title: application.job.title,
        category: application.job.category,
      },
      employer_contact: employerPhone
        ? {
            phone_number: employerPhone,
            whatsapp_link: createWhatsAppLink(
              employerPhone,
              `Hi, I am contacting you regarding ${application.job.title} on BlueLink.`,
            ),
          }
        : null,
    };
  });

  res.json({ success: true, applications: response });
});

app.use("/api", apiRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled API error", error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(API_PORT, () => {
  console.log(`BlueLink API listening on http://localhost:${API_PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
