"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const workerOnboardingSchema = z.object({
  full_name: z.string().trim().min(3, "Full name is required"),
  primary_phone: z.string().trim().regex(/^\d{10}$/, "Enter a valid 10 digit mobile number"),
  whatsapp_phone: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => !value || /^\d{10}$/.test(value), "WhatsApp number must be 10 digits"),
  preferred_language: z.enum(["en", "hi", "mr", "bn", "ta", "te", "kn", "pa", "gu"]),
  current_city: z.string().trim().min(2, "City is required"),
  current_state: z.string().trim().min(2, "State is required"),
  pincode: z.string().trim().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  biography: z
    .string()
    .trim()
    .max(240, "Keep bio within 240 characters")
    .optional()
    .transform((value) => (value ? value : undefined)),
  skills: z.string().trim().min(2, "Add at least one skill"),
  total_experience_months: z.coerce.number().int().min(0).max(600),
  consent_version: z.string().trim().min(1),
  privacy_consented: z.literal("on", {
    errorMap: () => ({ message: "Privacy consent is required" }),
  }),
  data_retention_consented: z.literal("on", {
    errorMap: () => ({ message: "Data retention consent is required" }),
  }),
  aadhaar_last4: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => !value || /^\d{4}$/.test(value), "Aadhaar last 4 must be 4 digits"),
});

export type WorkerOnboardingState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function normalizeSkills(input: string) {
  return Array.from(
    new Set(
      input
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
        .map((value) => value.toLowerCase()),
    ),
  ).slice(0, 12);
}

export async function registerWorker(
  _prevState: WorkerOnboardingState,
  formData: FormData,
): Promise<WorkerOnboardingState> {
  const parsed = workerOnboardingSchema.safeParse({
    full_name: formData.get("full_name"),
    primary_phone: formData.get("primary_phone"),
    whatsapp_phone: formData.get("whatsapp_phone"),
    preferred_language: formData.get("preferred_language"),
    current_city: formData.get("current_city"),
    current_state: formData.get("current_state"),
    pincode: formData.get("pincode"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    biography: formData.get("biography"),
    skills: formData.get("skills"),
    total_experience_months: formData.get("total_experience_months"),
    consent_version: formData.get("consent_version"),
    privacy_consented: formData.get("privacy_consented"),
    data_retention_consented: formData.get("data_retention_consented"),
    aadhaar_last4: formData.get("aadhaar_last4"),
  });

  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const actorId = cookieStore.get("bluelink-actor")?.value ?? `worker_${crypto.randomUUID()}`;
  const skills = normalizeSkills(parsed.data.skills);
  const now = new Date();

  if (skills.length === 0) {
    return {
      error: "At least one skill is required.",
      fieldErrors: { skills: ["Add one or more comma-separated skills"] },
    };
  }

  const profileCompletion = parsed.data.aadhaar_last4 ? 72 : 58;

  await prisma.$transaction(async (tx) => {
    const user = await tx.platformUser.upsert({
      where: { shadow_session_key: actorId },
      update: {
        role: "WORKER",
        preferred_language: parsed.data.preferred_language,
        display_name: parsed.data.full_name,
        last_active_at: now,
      },
      create: {
        role: "WORKER",
        shadow_session_key: actorId,
        preferred_language: parsed.data.preferred_language,
        display_name: parsed.data.full_name,
        last_active_at: now,
      },
    });

    const workerProfile = await tx.workerProfile.upsert({
      where: { user_id: user.id },
      update: {
        full_name: parsed.data.full_name,
        primary_phone: parsed.data.primary_phone,
        whatsapp_phone: parsed.data.whatsapp_phone,
        preferred_language: parsed.data.preferred_language,
        current_city: parsed.data.current_city,
        current_state: parsed.data.current_state,
        pincode: parsed.data.pincode,
        latitude: parsed.data.latitude,
        longitude: parsed.data.longitude,
        biography: parsed.data.biography,
        total_experience_months: parsed.data.total_experience_months,
        onboarding_status: "SUBMITTED",
        verification_status: parsed.data.aadhaar_last4 ? "PENDING" : "NOT_STARTED",
        profile_completion,
        startinup_consent_version: parsed.data.consent_version,
        startinup_consented_at: now,
        privacy_consented_at: now,
        data_retention_consented_at: now,
      },
      create: {
        user_id: user.id,
        full_name: parsed.data.full_name,
        primary_phone: parsed.data.primary_phone,
        whatsapp_phone: parsed.data.whatsapp_phone,
        preferred_language: parsed.data.preferred_language,
        current_city: parsed.data.current_city,
        current_state: parsed.data.current_state,
        pincode: parsed.data.pincode,
        latitude: parsed.data.latitude,
        longitude: parsed.data.longitude,
        biography: parsed.data.biography,
        total_experience_months: parsed.data.total_experience_months,
        onboarding_status: "SUBMITTED",
        verification_status: parsed.data.aadhaar_last4 ? "PENDING" : "NOT_STARTED",
        profile_completion,
        startinup_consent_version: parsed.data.consent_version,
        startinup_consented_at: now,
        privacy_consented_at: now,
        data_retention_consented_at: now,
      },
    });

    await tx.workerSkill.deleteMany({
      where: { worker_id: workerProfile.id },
    });

    await tx.workerSkill.createMany({
      data: skills.map((skill, index) => ({
        worker_id: workerProfile.id,
        name: skill,
        category: skill,
        is_primary: index === 0,
        proficiency_years: Math.max(0, Math.floor(parsed.data.total_experience_months / 12)),
      })),
    });

    if (parsed.data.aadhaar_last4) {
      await tx.workerVerificationDocument.create({
        data: {
          worker_id: workerProfile.id,
          document_type: "AADHAAR",
          masked_identifier: `XXXX-XXXX-${parsed.data.aadhaar_last4}`,
          verification_provider: "AADHAAR_DIGILOCKER",
          verification_status: "PENDING",
          submitted_at: now,
        },
      });
    }

    await tx.verificationEvent.create({
      data: {
        worker_id: workerProfile.id,
        event_status: parsed.data.aadhaar_last4 ? "PENDING" : "SUBMITTED",
        actor_type: "WORKER",
        source: "worker_onboarding",
        notes: "Worker completed direct-access onboarding flow",
        metadata: {
          consent_version: parsed.data.consent_version,
          skills_count: skills.length,
          direct_access: true,
        },
      },
    });
  });

  cookieStore.set("bluelink-role", "WORKER", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("bluelink-actor", actorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/worker?welcome=1");
}
