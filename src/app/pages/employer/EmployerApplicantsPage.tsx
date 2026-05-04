import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { ApplicationsApi, JobsApi, type EmployerApplicantItem, type JobItem } from "../../lib/api";
import { PageShell } from "../PageShell";

export function EmployerApplicantsPage() {
  const { session } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialJobId = searchParams.get("jobId") ?? "";

  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [selectedJobId, setSelectedJobId] = useState(initialJobId);
  const [applicants, setApplicants] = useState<EmployerApplicantItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      if (!session) return;
      try {
        const response = await JobsApi.mine(session.token);
        setJobs(response.jobs);

        if (!selectedJobId && response.jobs.length > 0) {
          const firstJobId = response.jobs[0].job_id;
          setSelectedJobId(firstJobId);
          setSearchParams({ jobId: firstJobId });
        }
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load jobs");
      }
    }

    void loadJobs();
  }, [session, selectedJobId, setSearchParams]);

  useEffect(() => {
    async function loadApplicants() {
      if (!session || !selectedJobId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await JobsApi.applicants(session.token, selectedJobId);
        setApplicants(response.applicants);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load applicants");
      } finally {
        setLoading(false);
      }
    }

    void loadApplicants();
  }, [session, selectedJobId]);

  const selectedJobTitle = useMemo(
    () => jobs.find((job) => job.job_id === selectedJobId)?.title ?? "Selected Job",
    [jobs, selectedJobId],
  );

  if (!session) {
    return null;
  }

  const authSession = session;

  async function handleStatusUpdate(
    applicationId: string,
    status: "SHORTLISTED" | "HIRED" | "REJECTED",
  ) {
    try {
      await ApplicationsApi.updateStatus(authSession.token, applicationId, status);
      if (!selectedJobId) return;
      const refreshed = await JobsApi.applicants(authSession.token, selectedJobId);
      setApplicants(refreshed.applicants);
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Failed to update status");
    }
  }

  return (
    <PageShell
      title="Applicants"
      subtitle="Review candidates and update shortlist/hire decisions"
    >
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-5">
        <label className="text-sm font-semibold text-slate-700">
          Select Job
          <select
            value={selectedJobId}
            onChange={(event) => {
              const nextJobId = event.target.value;
              setSelectedJobId(nextJobId);
              setSearchParams({ jobId: nextJobId });
            }}
            className="mt-1 w-full max-w-xl rounded-md border border-slate-300 px-3 py-2"
          >
            {jobs.length === 0 ? <option value="">No jobs found</option> : null}
            {jobs.map((job) => (
              <option key={job.job_id} value={job.job_id}>
                {job.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <p className="text-sm text-rose-700 mb-3">{error}</p> : null}

      {!selectedJobId ? (
        <p className="text-sm text-slate-600">Pick a job to view applicants.</p>
      ) : loading ? (
        <p className="text-sm text-slate-600">Loading applicants...</p>
      ) : applicants.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-sm text-slate-600">
          No applicants yet for {selectedJobTitle}.
        </div>
      ) : (
        <div className="space-y-3">
          {applicants.map((item) => (
            <article key={item.application_id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-bold text-slate-900">{item.worker.full_name}</h2>
                <span className="text-xs uppercase font-semibold bg-slate-100 px-2 py-1 rounded-md">
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-slate-600 mt-1">
                Skills: {Array.isArray(item.worker.skills) ? item.worker.skills.join(", ") : "--"}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Experience: {item.worker.experience_years} years · Language: {item.worker.language_preference}
              </p>
              <p className="text-sm text-slate-600 mt-1">Phone: {item.worker.phone_number}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusUpdate(item.application_id, "SHORTLISTED")}
                  className="px-3 py-2 rounded-md text-xs font-semibold bg-amber-100 text-amber-800"
                >
                  Shortlist
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusUpdate(item.application_id, "HIRED")}
                  className="px-3 py-2 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800"
                >
                  Hire
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusUpdate(item.application_id, "REJECTED")}
                  className="px-3 py-2 rounded-md text-xs font-semibold bg-rose-100 text-rose-800"
                >
                  Reject
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}
