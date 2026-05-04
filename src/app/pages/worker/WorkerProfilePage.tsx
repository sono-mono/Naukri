import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "../PageShell";
import { useAuth } from "../../auth/AuthContext";
import { ProfileApi, type AppLanguage } from "../../lib/api";
import { getApproximateLocation } from "../../lib/location";
import { isVoiceInputSupported, startVoiceInput } from "../../lib/voice-input";

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

  if (!session) {
    return null;
  }

  const authSession = session;

  async function captureLocation() {
    setError(null);
    try {
      const coords = await getApproximateLocation();
      setLocation(coords);
    } catch (locationError) {
      setError(locationError instanceof Error ? locationError.message : "Failed to fetch location");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!location) {
        throw new Error("Please capture GPS location before saving profile");
      }

      const skills = skillsText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      await ProfileApi.updateWorkerProfile({
        userId: authSession.user.user_id,
        token: authSession.token,
        language_preference: language,
        full_name: fullName,
        skills,
        experience_years: Number(experienceYears),
        location,
        identity_doc_url: identityDocUrl,
      });

      setSuccess("Worker profile saved successfully. You can now browse nearby jobs.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Worker Profile"
      subtitle="Set your identity, skills, and location for hyperlocal matching"
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-semibold text-slate-700">
            Full Name
            <input
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
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
        </div>

        <label className="text-sm font-semibold text-slate-700 block">
          Skills (comma-separated)
          <textarea
            required
            value={skillsText}
            onChange={(event) => setSkillsText(event.target.value)}
            placeholder="plumbing, driving, construction"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 min-h-24"
          />
          {isVoiceInputSupported() ? (
            <button
              type="button"
              onClick={() =>
                startVoiceInput({
                  language,
                  onTranscript: (text) => setSkillsText((prev) => (prev ? `${prev}, ${text}` : text)),
                  onError: (message) => setError(message),
                })
              }
              className="mt-2 text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md"
            >
              Use Voice for Skills
            </button>
          ) : null}
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-semibold text-slate-700">
            Experience (years)
            <input
              required
              inputMode="numeric"
              value={experienceYears}
              onChange={(event) => setExperienceYears(event.target.value.replace(/\D/g, "").slice(0, 2))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            />
            {isVoiceInputSupported() ? (
              <button
                type="button"
                onClick={() =>
                  startVoiceInput({
                    language,
                    onTranscript: (text) => {
                      const parsed = text.replace(/[^0-9]/g, "");
                      if (parsed) {
                        setExperienceYears(parsed.slice(0, 2));
                      }
                    },
                    onError: (message) => setError(message),
                  })
                }
                className="mt-2 text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md"
              >
                Use Voice for Experience
              </button>
            ) : null}
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Identity Document URL
            <input
              required
              type="url"
              value={identityDocUrl}
              onChange={(event) => setIdentityDocUrl(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              placeholder="https://..."
            />
          </label>
        </div>

        <div className="rounded-md border border-dashed border-slate-300 p-4">
          <p className="text-sm font-semibold text-slate-700">GPS Location</p>
          <p className="text-xs text-slate-500 mt-1">Capture approximate location to enable 25km local matching.</p>
          <button
            type="button"
            onClick={captureLocation}
            className="mt-3 px-3 py-2 text-sm font-semibold bg-slate-900 text-white rounded-md"
          >
            Capture Current Location
          </button>
          {location ? (
            <p className="mt-2 text-xs text-emerald-700 font-semibold">
              Location set: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          ) : null}
        </div>

        {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-700">{success}</p> : null}

        <div className="flex items-center gap-3 flex-wrap">
          <button
            disabled={loading}
            className="px-5 py-3 rounded-md font-semibold bg-blue-700 text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Worker Profile"}
          </button>
          <Link to="/worker/feed" className="text-sm font-semibold text-slate-700 underline">
            Go to Jobs Feed
          </Link>
        </div>
      </form>
    </PageShell>
  );
}
