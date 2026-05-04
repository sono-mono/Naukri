import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, ChevronDown, MessageCircle, Phone, Star, UserCheck, UserX, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../auth/AuthContext";
import { ApplicationsApi, JobsApi, type EmployerApplicantItem, type JobItem } from "../../lib/api";

const STATUS_BADGE: Record<string, string> = {
  APPLIED: "border-sky-200 bg-sky-50 text-sky-700",
  SHORTLISTED: "border-amber-200 bg-amber-50 text-amber-700",
  HIRED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  REJECTED: "border-rose-200 bg-rose-50 text-rose-700",
};

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
        const r = await JobsApi.mine(session.token);
        setJobs(r.jobs);
        if (!selectedJobId && r.jobs.length > 0) {
          const first = r.jobs[0].job_id;
          setSelectedJobId(first);
          setSearchParams({ jobId: first });
        }
      } catch (e) { setError(e instanceof Error ? e.message : "Failed to load jobs"); }
    }
    void loadJobs();
  }, [session, selectedJobId, setSearchParams]);

  useEffect(() => {
    async function loadApplicants() {
      if (!session || !selectedJobId) { setLoading(false); return; }
      try {
        setLoading(true);
        const r = await JobsApi.applicants(session.token, selectedJobId);
        setApplicants(r.applicants);
      } catch (e) { setError(e instanceof Error ? e.message : "Failed to load applicants"); }
      finally { setLoading(false); }
    }
    void loadApplicants();
  }, [session, selectedJobId]);

  const selectedJobTitle = useMemo(() => jobs.find((j) => j.job_id === selectedJobId)?.title ?? "Selected Job", [jobs, selectedJobId]);

  if (!session) return null;
  const authSession = session;

  async function handleStatusUpdate(applicationId: string, status: "SHORTLISTED" | "HIRED" | "REJECTED") {
    try {
      await ApplicationsApi.updateStatus(authSession.token, applicationId, status);
      if (!selectedJobId) return;
      const r = await JobsApi.applicants(authSession.token, selectedJobId);
      setApplicants(r.applicants);
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to update status"); }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-5 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-900 font-display">Applicants</h1>
          <p className="mt-1 text-sm text-slate-500">Review candidates and manage hiring decisions</p>

          {/* Job Selector */}
          <div className="mt-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Select Job</span>
              <div className="relative mt-1.5 max-w-md">
                <select
                  value={selectedJobId}
                  onChange={(e) => { const id = e.target.value; setSelectedJobId(id); setSearchParams({ jobId: id }); }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white appearance-none"
                >
                  {jobs.length === 0 && <option value="">No jobs found</option>}
                  {jobs.map((j) => <option key={j.job_id} value={j.job_id}>{j.title} — {j.status}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </label>
          </div>

          {/* Stats */}
          <div className="mt-4 flex gap-3">
            <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-center">
              <p className="text-lg font-black text-slate-900">{applicants.length}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Total</p>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-center">
              <p className="text-lg font-black text-amber-700">{applicants.filter((a) => a.status === "SHORTLISTED").length}</p>
              <p className="text-[10px] font-bold text-amber-600 uppercase">Shortlisted</p>
            </div>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-center">
              <p className="text-lg font-black text-emerald-700">{applicants.filter((a) => a.status === "HIRED").length}</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase">Hired</p>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="px-4 pt-4 lg:px-8"><div className="max-w-5xl mx-auto"><p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p></div></div>}

      {/* Applicants List */}
      <div className="px-4 py-5 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {!selectedJobId ? (
            <p className="text-sm text-slate-500">Pick a job to view applicants.</p>
          ) : loading ? (
            <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"><div className="h-5 w-40 rounded-lg bg-slate-200 mb-3" /><div className="h-4 w-64 rounded bg-slate-200 mb-2" /><div className="h-4 w-48 rounded bg-slate-200" /></div>)}</div>
          ) : applicants.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-400 mb-4"><Users className="h-7 w-7" /></div>
              <h2 className="text-lg font-bold text-slate-900">No applicants yet</h2>
              <p className="mt-2 text-sm text-slate-500">No one has applied for "{selectedJobTitle}" yet. Share the listing to get more visibility.</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {applicants.map((item, idx) => (
                  <motion.article
                    key={item.application_id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.04 }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white text-sm font-bold shrink-0">
                          {item.worker.full_name?.charAt(0) ?? "W"}
                        </div>
                        <div>
                          <h2 className="text-base font-extrabold text-slate-900">{item.worker.full_name}</h2>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-slate-600">{item.worker.average_rating?.toFixed(1) ?? "N/A"}</span>
                            <span className="text-xs text-slate-400">· {item.worker.experience_years}yr exp</span>
                          </div>
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${STATUS_BADGE[item.status] ?? STATUS_BADGE.APPLIED}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-slate-600"><span className="font-semibold">Skills:</span> {Array.isArray(item.worker.skills) ? item.worker.skills.join(", ") : "—"}</p>
                      <p className="text-sm text-slate-600 mt-1"><span className="font-semibold">Language:</span> {item.worker.language_preference?.toUpperCase()}</p>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <a href={`tel:${item.worker.phone_number}`} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors">
                        <Phone className="h-3.5 w-3.5" /> {item.worker.phone_number}
                      </a>
                      <a href={`https://wa.me/${item.worker.phone_number?.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors">
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleStatusUpdate(item.application_id, "SHORTLISTED")} className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-colors">
                        <Star className="h-3.5 w-3.5" /> Shortlist
                      </button>
                      <button type="button" onClick={() => handleStatusUpdate(item.application_id, "HIRED")} className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors">
                        <UserCheck className="h-3.5 w-3.5" /> Hire
                      </button>
                      <button type="button" onClick={() => handleStatusUpdate(item.application_id, "REJECTED")} className="flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors">
                        <UserX className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
