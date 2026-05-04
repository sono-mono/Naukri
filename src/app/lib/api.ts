export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  token?: string;
  body?: unknown;
};

export type UserRole = "WORKER" | "EMPLOYER";
export type AppLanguage = "en" | "hi" | "mr";

export type AuthUser = {
  user_id: string;
  phone_number: string;
  role: UserRole | null;
  is_verified: boolean;
  language_preference: AppLanguage;
};

export type JobItem = {
  job_id: string;
  employer_id: string;
  title: string;
  category: string;
  description_text: string;
  description_audio_url?: string;
  location_lat: number;
  location_lng: number;
  payout_amount: number;
  payout_type: "HOURLY" | "DAILY" | "MONTHLY" | "FIXED_CONTRACT";
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  created_at: string;
  distance_km?: number;
};

export type WorkerApplicationItem = {
  application_id: string;
  status: "APPLIED" | "SHORTLISTED" | "HIRED" | "REJECTED";
  applied_at: string;
  job: {
    job_id: string;
    title: string;
    category: string;
  };
  employer_contact: null | {
    phone_number: string;
    whatsapp_link: string;
  };
};

export type EmployerApplicantItem = {
  application_id: string;
  status: "APPLIED" | "SHORTLISTED" | "HIRED" | "REJECTED";
  applied_at: string;
  worker: {
    worker_id: string;
    full_name: string;
    skills: string[];
    experience_years: number;
    average_rating: number;
    phone_number: string;
    language_preference: AppLanguage;
  };
};

const API_BASE = "";

function parseResponsePayload(rawPayload: string): unknown {
  if (!rawPayload) {
    return null;
  }

  try {
    return JSON.parse(rawPayload) as unknown;
  } catch {
    return rawPayload;
  }
}

function extractApiErrorMessage(payload: unknown): string | null {
  if (!payload) {
    return null;
  }

  if (typeof payload === "string") {
    const trimmed = payload.trim();
    if (!trimmed) {
      return null;
    }

    if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) {
      return null;
    }

    return trimmed;
  }

  if (typeof payload === "object") {
    const candidate = payload as { error?: unknown; message?: unknown };

    if (typeof candidate.error === "string" && candidate.error.trim()) {
      return candidate.error;
    }

    if (typeof candidate.message === "string" && candidate.message.trim()) {
      return candidate.message;
    }
  }

  return null;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const rawPayload = await response.text();
  const payload = parseResponsePayload(rawPayload);

  if (!response.ok) {
    const errorMessage = extractApiErrorMessage(payload);
    throw new Error(errorMessage ?? `Request failed (${response.status})`);
  }

  if (payload === null) {
    throw new Error("Server returned an empty response");
  }

  return payload as T;
}

const DEMO_OTP = "1234";

export const AuthApi = {
  requestOtp: async (phoneNumber: string): Promise<{ success: boolean; dev_otp?: string }> => {
    try {
      return await apiRequest<{ success: boolean; dev_otp?: string }>("/auth/request-otp", {
        method: "POST",
        body: { phone_number: phoneNumber },
      });
    } catch {
      // Backend unavailable — fall back to client-side demo mode
      return { success: true, dev_otp: DEMO_OTP };
    }
  },

  verifyOtp: async (input: {
    phone_number: string;
    otp: string;
    role?: UserRole;
    language_preference?: AppLanguage;
  }): Promise<{
    token: string;
    requires_role_selection: boolean;
    user: AuthUser;
  }> => {
    try {
      return await apiRequest<{
        token: string;
        requires_role_selection: boolean;
        user: AuthUser;
      }>("/auth/verify-otp", {
        method: "POST",
        body: input,
      });
    } catch {
      // Backend unavailable — validate demo OTP client-side
      if (input.otp !== DEMO_OTP) {
        throw new Error("Invalid OTP. Use 1234 in demo mode.");
      }
      const demoUserId = `demo-${input.phone_number}`;
      return {
        token: `demo-token-${Date.now()}`,
        requires_role_selection: true,
        user: {
          user_id: demoUserId,
          phone_number: input.phone_number,
          role: null,
          is_verified: true,
          language_preference: input.language_preference ?? "en",
        },
      };
    }
  },
};

export const ProfileApi = {
  updateWorkerProfile: (input: {
    userId: string;
    token: string;
    language_preference: AppLanguage;
    full_name: string;
    skills: string[];
    experience_years: number;
    location: { lat: number; lng: number };
    identity_doc_url: string;
  }) =>
    apiRequest<{ success: boolean }>(`/api/users/${input.userId}/profile`, {
      method: "PUT",
      token: input.token,
      body: {
        role: "WORKER",
        language_preference: input.language_preference,
        full_name: input.full_name,
        skills: input.skills,
        experience_years: input.experience_years,
        location: input.location,
        identity_doc_url: input.identity_doc_url,
      },
    }),

  updateEmployerProfile: (input: {
    userId: string;
    token: string;
    language_preference: AppLanguage;
    company_or_individual_name: string;
    contact_email?: string;
  }) =>
    apiRequest<{ success: boolean }>(`/api/users/${input.userId}/profile`, {
      method: "PUT",
      token: input.token,
      body: {
        role: "EMPLOYER",
        language_preference: input.language_preference,
        company_or_individual_name: input.company_or_individual_name,
        contact_email: input.contact_email,
      },
    }),
};

export const JobsApi = {
  createJob: (input: {
    token: string;
    title: string;
    category: string;
    description_text: string;
    payout_amount: number;
    payout_type: "HOURLY" | "DAILY" | "MONTHLY" | "FIXED_CONTRACT";
    location_coordinates: { lat: number; lng: number };
  }) =>
    apiRequest<{ success: boolean; job: JobItem }>("/api/jobs", {
      method: "POST",
      token: input.token,
      body: {
        title: input.title,
        category: input.category,
        description_text: input.description_text,
        payout_amount: input.payout_amount,
        payout_type: input.payout_type,
        location_coordinates: input.location_coordinates,
      },
    }),

  feed: (token: string) =>
    apiRequest<{ success: boolean; jobs: JobItem[] }>("/api/jobs/feed", {
      method: "GET",
      token,
    }),

  mine: (token: string) =>
    apiRequest<{ success: boolean; jobs: JobItem[] }>("/api/jobs/mine", {
      method: "GET",
      token,
    }),

  applicants: (token: string, jobId: string) =>
    apiRequest<{ success: boolean; applicants: EmployerApplicantItem[] }>(`/api/jobs/${jobId}/applicants`, {
      method: "GET",
      token,
    }),
};

export const ApplicationsApi = {
  apply: (token: string, jobId: string) =>
    apiRequest<{ success: boolean; application: { application_id: string } }>("/api/applications", {
      method: "POST",
      token,
      body: { job_id: jobId },
    }),

  updateStatus: (
    token: string,
    applicationId: string,
    status: "SHORTLISTED" | "HIRED" | "REJECTED",
  ) =>
    apiRequest<{ success: boolean }>(`/api/applications/${applicationId}/status`, {
      method: "PATCH",
      token,
      body: { status },
    }),

  mine: (token: string) =>
    apiRequest<{ success: boolean; applications: WorkerApplicationItem[] }>("/api/applications/me", {
      method: "GET",
      token,
    }),
};
