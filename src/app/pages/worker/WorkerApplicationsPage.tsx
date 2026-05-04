import { useEffect, useState } from "react";
import { PageShell } from "../PageShell";
import { ApplicationsApi, type WorkerApplicationItem } from "../../lib/api";
import { useAuth } from "../../auth/AuthContext";

export function WorkerApplicationsPage() {
  const { session } = useAuth();
  const [applications, setApplications] = useState<WorkerApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      if (!session) return;
      try {
        setLoading(true);
        const response = await ApplicationsApi.mine(session.token);
        setApplications(response.applications);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load applications");
      } finally {
        setLoading(false);
      }
    }

    void loadApplications();
  }, [session]);

  if (!session) {
    return null;
  }

  return (
    <PageShell
      title="My Applications"
      subtitle="Track your job applications and contact shortlisted employers"
    >
      {error ? <p className="text-sm text-rose-700 mb-3">{error}</p> : null}

      {loading ? (
        <p className="text-sm text-slate-600">Loading applications...</p>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-sm text-slate-600">
          You have not applied to any jobs yet.
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((application) => (
            <article key={application.application_id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-bold text-slate-900">{application.job.title}</h2>
                <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 uppercase">
                  {application.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1">Category: {application.job.category}</p>
              <p className="text-xs text-slate-500 mt-1">
                Applied: {new Date(application.applied_at).toLocaleString()}
              </p>

              {application.employer_contact ? (
                <a
                  href={application.employer_contact.whatsapp_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-sm font-semibold bg-emerald-600 text-white px-3 py-2 rounded-md"
                >
                  Contact Employer on WhatsApp
                </a>
              ) : (
                <p className="mt-3 text-xs text-slate-500">
                  Contact details appear after SHORTLISTED or HIRED status.
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}
