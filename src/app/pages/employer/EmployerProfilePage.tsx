import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { ProfileApi, type AppLanguage } from "../../lib/api";
import { PageShell } from "../PageShell";

export function EmployerProfilePage() {
  const { session } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState<AppLanguage>(session?.user.language_preference ?? "en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!session) {
    return null;
  }

  const authSession = session;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await ProfileApi.updateEmployerProfile({
        userId: authSession.user.user_id,
        token: authSession.token,
        language_preference: language,
        company_or_individual_name: companyName,
        contact_email: email,
      });
      setSuccess("Employer profile updated successfully.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Employer Profile"
      subtitle="Set your company identity and communication details"
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-semibold text-slate-700">
            Company or Individual Name
            <input
              required
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Contact Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              placeholder="Optional"
            />
          </label>
        </div>

        <label className="text-sm font-semibold text-slate-700 block max-w-xs">
          Language Preference
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as AppLanguage)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select>
        </label>

        {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-700">{success}</p> : null}

        <div className="flex items-center gap-3 flex-wrap">
          <button
            disabled={loading}
            className="px-5 py-3 rounded-md font-semibold bg-slate-900 text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Employer Profile"}
          </button>
          <Link to="/employer/jobs" className="text-sm font-semibold text-blue-700 underline">
            Continue to Job Posting
          </Link>
        </div>
      </form>
    </PageShell>
  );
}
