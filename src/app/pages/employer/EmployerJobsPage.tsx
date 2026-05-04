import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { getApproximateLocation } from "../../lib/location";
import { JobsApi, type JobItem } from "../../lib/api";
import { PageShell } from "../PageShell";

export function EmployerJobsPage() {
  const { session } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutType, setPayoutType] = useState<"HOURLY" | "DAILY" | "MONTHLY" | "FIXED_CONTRACT">("DAILY");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      if (!session) return;
      try {
        const response = await JobsApi.mine(session.token);
        setJobs(response.jobs);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load your jobs");
      }
    }

    void loadJobs();
  }, [session]);

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
      setError(locationError instanceof Error ? locationError.message : "Failed to capture location");
    }
  }

  async function handleCreateJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!location) {
        throw new Error("Capture location before posting a job");
      }

      const response = await JobsApi.createJob({
        token: authSession.token,
        title,
        category,
        description_text: description,
        payout_amount: Number(payoutAmount),
        payout_type: payoutType,
        location_coordinates: location,
      });

      setJobs((prev) => [response.job, ...prev]);
      setSuccess("Job posted successfully with OPEN status.");
      setTitle("");
      setCategory("");
      setDescription("");
      setPayoutAmount("");
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to post job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Employer Jobs"
      subtitle="Create and manage postings for nearby workers"
    >
      <form onSubmit={handleCreateJob} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-semibold text-slate-700">
            Job Title
            <input
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Category
            <input
              required
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              placeholder="plumbing"
            />
          </label>
        </div>

        <label className="text-sm font-semibold text-slate-700 block">
          Description
          <textarea
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 min-h-24"
          />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-semibold text-slate-700">
            Pay Amount
            <input
              required
              value={payoutAmount}
              onChange={(event) => setPayoutAmount(event.target.value.replace(/\D/g, ""))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              inputMode="numeric"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Pay Type
            <select
              value={payoutType}
              onChange={(event) => setPayoutType(event.target.value as "HOURLY" | "DAILY" | "MONTHLY" | "FIXED_CONTRACT")}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option value="HOURLY">Hourly</option>
              <option value="DAILY">Daily</option>
              <option value="MONTHLY">Monthly</option>
              <option value="FIXED_CONTRACT">Fixed Contract</option>
            </select>
          </label>
        </div>

        <div className="rounded-md border border-dashed border-slate-300 p-4">
          <p className="text-sm font-semibold text-slate-700">Job Location Coordinates</p>
          <button
            type="button"
            onClick={captureLocation}
            className="mt-3 px-3 py-2 text-sm font-semibold bg-slate-900 text-white rounded-md"
          >
            Use Current Coordinates
          </button>
          {location ? (
            <p className="mt-2 text-xs text-emerald-700 font-semibold">
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
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
            {loading ? "Posting..." : "Post Job"}
          </button>
          <Link to="/employer/applicants" className="text-sm font-semibold text-blue-700 underline">
            Open Applicants View
          </Link>
        </div>
      </form>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">My Jobs</h2>
        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-5 text-sm text-slate-600">
            No jobs posted yet.
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <article key={job.job_id} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{job.category} · Rs. {job.payout_amount}</p>
                  </div>
                  <span className="text-xs uppercase font-semibold bg-slate-100 px-2 py-1 rounded-md h-fit">
                    {job.status}
                  </span>
                </div>
                <Link
                  to={`/employer/applicants?jobId=${job.job_id}`}
                  className="inline-block mt-3 text-sm font-semibold text-blue-700 underline"
                >
                  View Applicants
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
