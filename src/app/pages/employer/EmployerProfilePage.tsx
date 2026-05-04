import { useState, type FormEvent } from "react";
import { Building2, Globe, Mail, Save, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../../auth/AuthContext";
import { ProfileApi, type AppLanguage } from "../../lib/api";

export function EmployerProfilePage() {
  const { session } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState<AppLanguage>(session?.user.language_preference ?? "en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!session) return null;
  const authSession = session;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError(null); setSuccess(null);
    try {
      await ProfileApi.updateEmployerProfile({ userId: authSession.user.user_id, token: authSession.token, language_preference: language, company_or_individual_name: companyName, contact_email: email });
      setSuccess("Employer profile updated successfully.");
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to update profile"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-8 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 grid place-items-center">
            <Building2 className="h-10 w-10 text-white/80" />
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-white font-display">{companyName || "Company Name"}</h1>
          <p className="mt-1 text-sm text-amber-100">{session.user.phone_number} · Employer</p>

          <div className="mt-4 flex gap-4">
            <div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-2 text-center">
              <p className="text-lg font-black text-white">4</p>
              <p className="text-[10px] text-amber-100 font-semibold uppercase">Jobs Posted</p>
            </div>
            <div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-2 text-center">
              <p className="text-lg font-black text-white">12</p>
              <p className="text-[10px] text-amber-100 font-semibold uppercase">Applicants</p>
            </div>
            <div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-2 text-center">
              <p className="text-lg font-black text-white">3</p>
              <p className="text-[10px] text-amber-100 font-semibold uppercase">Hired</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2"><Shield className="h-5 w-5 text-amber-600" /> Company Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Company or Individual Name</span>
                  <div className="relative mt-1.5">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input required value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white focus:shadow-sm" placeholder="Your company name" />
                  </div>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Contact Email</span>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white focus:shadow-sm" placeholder="Optional" />
                  </div>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2"><Globe className="h-5 w-5 text-amber-600" /> Preferences</h2>
              <label className="block max-w-xs">
                <span className="text-sm font-semibold text-slate-700">Language</span>
                <select value={language} onChange={(e) => setLanguage(e.target.value as AppLanguage)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white appearance-none">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
              </label>
            </section>

            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</motion.p>}
            {success && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{success}</motion.p>}

            <motion.button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-base font-bold text-white shadow-lg shadow-amber-500/20 hover:shadow-xl hover:brightness-105 transition-all disabled:opacity-50" whileTap={{ scale: 0.98 }}>
              <Save className="h-5 w-5" /> {loading ? "Saving..." : "Save Profile"}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
