export type AppLanguage = "en" | "hi" | "mr";

export type LocalizationKey =
  | "profile.title"
  | "profile.skills"
  | "profile.experience"
  | "profile.save"
  | "job.title"
  | "job.category"
  | "job.payout"
  | "job.post"
  | "auth.phone"
  | "auth.otp";

const dictionary: Record<AppLanguage, Record<LocalizationKey, string>> = {
  en: {
    "profile.title": "Worker Profile",
    "profile.skills": "Skills",
    "profile.experience": "Years of Experience",
    "profile.save": "Save Profile",
    "job.title": "Job Title",
    "job.category": "Category",
    "job.payout": "Pay Amount",
    "job.post": "Post Job",
    "auth.phone": "Phone Number",
    "auth.otp": "One-Time Password",
  },
  hi: {
    "profile.title": "वर्कर प्रोफाइल",
    "profile.skills": "कौशल",
    "profile.experience": "अनुभव के वर्ष",
    "profile.save": "प्रोफाइल सेव करें",
    "job.title": "नौकरी का शीर्षक",
    "job.category": "श्रेणी",
    "job.payout": "भुगतान राशि",
    "job.post": "नौकरी पोस्ट करें",
    "auth.phone": "फोन नंबर",
    "auth.otp": "ओटीपी",
  },
  mr: {
    "profile.title": "वर्कर प्रोफाइल",
    "profile.skills": "कौशल्ये",
    "profile.experience": "अनुभवाची वर्षे",
    "profile.save": "प्रोफाइल जतन करा",
    "job.title": "नोकरीचे शीर्षक",
    "job.category": "वर्ग",
    "job.payout": "पगार रक्कम",
    "job.post": "नोकरी पोस्ट करा",
    "auth.phone": "फोन नंबर",
    "auth.otp": "ओटीपी",
  },
};

export function translate(language: AppLanguage, key: LocalizationKey): string {
  return dictionary[language][key] ?? dictionary.en[key];
}

export function isSupportedLanguage(value: string): value is AppLanguage {
  return value === "en" || value === "hi" || value === "mr";
}
