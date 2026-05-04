import { useState, type FormEvent } from "react";
import { BadgeCheck, Camera, Globe, MapPin, Mic, Save, ShieldCheck, Star, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../../auth/AuthContext";
import { ProfileApi, type AppLanguage } from "../../lib/api";
import { getApproximateLocation } from "../../lib/location";
import { isVoiceInputSupported, startVoiceInput } from "../../lib/voice-input";

const SKILL_SUGGESTIONS = ["Plumbing", "Electrical", "Masonry", "Painting", "Carpentry", "Welding", "Driving", "Cooking", "Delivery", "Construction", "Housekeeping", "Gardening"];

export function WorkerProfilePage() {
  const { session } = useAuth();
  const [fullName, setFullName] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [identityDocUrl, setIdentityDocUrl] = useState("");
  const [language, setLanguage] = useState<AppLanguage>(session?.user.language_preference ?? "en");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!session) return null;
  const authSession = session;

  const skills = skillsText.split(",").map((s) => s.trim()).filter(Boolean);

  function addSuggestion(skill: string) {
    if (skills.includes(skill)) return;
    setSkillsText((prev) => (prev ? `${prev}, ${skill}` : skill));
  }

  async function captureLocation() {
    setError(null);
    try {
      const coords = await getApproximateLocation();
      setLocation(coords);
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to fetch location"); }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError(null); setSuccess(null);
    try {
      if (!location) throw new Error("Capture GPS location before saving");
      await ProfileApi.updateWorkerProfile({ userId: authSession.user.user_id, token: authSession.token, language_preference: language, full_name: fullName, skills, experience_years: Number(experienceYears), location, identity_doc_url: identityDocUrl });
      setSuccess("Profile saved! You can now browse nearby jobs.");
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to save profile"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 px-4 py-8 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 grid place-items-center">
              <Camera className="h-8 w-8 text-white/70" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-emerald-500 border-2 border-white grid place-items-center">
              <BadgeCheck className="h-4 w-4 text-white" />
            </div>
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-white font-display">{fullName || "Your Name"}</h1>
          <p className="mt-1 text-sm text-sky-200">{session.user.phone_number} · Worker</p>

          {/* Quick Stats */}
          <div className="mt-4 flex gap-4">
            <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2 text-center">
              <p className="text-lg font-black text-white">{experienceYears || "0"}</p>
              <p className="text-[10px] text-sky-200 font-semibold uppercase">Years Exp.</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2 text-center">
              <p className="text-lg font-black text-white">{skills.length}</p>
              <p className="text-[10px] text-sky-200 font-semibold uppercase">Skills</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2 text-center">
              <p className="text-lg font-black text-white flex items-center gap-1"><Star className="h-4 w-4 text-amber-400" />4.5</p>
              <p className="text-[10px] text-sky-200 font-semibold uppercase">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-sky-600" /> Personal Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Full Name</span>
                  <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:shadow-sm" placeholder="Enter your full name" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Language</span>
                  <div className="relative mt-1.5">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select value={language} onChange={(e) => setLanguage(e.target.value as AppLanguage)} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white appearance-none">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="mr">Marathi</option>
                    </select>
                  </div>
                </label>
              </div>
            </section>

            {/* Skills */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2"><Wrench className="h-5 w-5 text-sky-600" /> Skills & Experience</h2>
              <label className="block mb-3">
                <span className="text-sm font-semibold text-slate-700">Skills (comma-separated)</span>
                <textarea required value={skillsText} onChange={(e) => setSkillsText(e.target.value)} placeholder="plumbing, driving, construction" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white min-h-20 resize-none" />
              </label>

              {/* Skill Tags */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {skills.map((s) => (
                    <span key={s} className="rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-semibold text-sky-700">{s}</span>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).slice(0, 6).map((s) => (
                  <button key={s} type="button" onClick={() => addSuggestion(s)} className="rounded-full border border-dashed border-slate-300 px-3 py-1 text-xs font-medium text-slate-500 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50 transition-colors">+ {s}</button>
                ))}
              </div>

              {isVoiceInputSupported() && (
                <button type="button" onClick={() => startVoiceInput({ language, onTranscript: (t) => setSkillsText((p) => p ? `${p}, ${t}` : t), onError: (m) => setError(m) })} className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 border border-sky-200 px-3 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition-colors">
                  <Mic className="h-3.5 w-3.5" /> Voice Input
                </button>
              )}

              <label className="block mt-4">
                <span className="text-sm font-semibold text-slate-700">Experience (years)</span>
                <input required inputMode="numeric" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value.replace(/\D/g, "").slice(0, 2))} className="mt-1.5 w-full max-w-32 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white" placeholder="e.g. 3" />
              </label>
            </section>

            {/* Identity & Location */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-sky-600" /> Identity & Location</h2>
              <label className="block mb-4">
                <span className="text-sm font-semibold text-slate-700">Identity Document URL</span>
                <input required type="url" value={identityDocUrl} onChange={(e) => setIdentityDocUrl(e.target.value)} placeholder="https://..." className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white" />
              </label>
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">GPS Location</p>
                <p className="text-xs text-slate-500 mt-1">Capture location to enable 25km local matching.</p>
                <button type="button" onClick={captureLocation} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-colors">
                  <MapPin className="h-4 w-4" /> Capture Location
                </button>
                {location && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs font-semibold text-emerald-600">
                    ✓ Location set: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </motion.p>
                )}
              </div>
            </section>

            {/* Messages */}
            {error && <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</motion.p>}
            {success && <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{success}</motion.p>}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 py-3.5 text-base font-bold text-white shadow-lg shadow-sky-500/20 hover:shadow-xl hover:brightness-105 transition-all disabled:opacity-50"
              whileTap={{ scale: 0.98 }}
            >
              <Save className="h-5 w-5" />
              {loading ? "Saving..." : "Save Profile"}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
