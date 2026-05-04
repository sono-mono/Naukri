import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Briefcase, ChevronDown, IndianRupee, MapPin, Plus, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../auth/AuthContext";
import { getApproximateLocation } from "../../lib/location";
import { JobsApi, type JobItem } from "../../lib/api";

const CATEGORIES = ["Plumbing", "Construction", "Delivery", "Housekeeping", "Electrical", "Painting", "Driving", "Cooking"];

const STATUS_STYLES: Record<string, string> = {
  OPEN: "bg-emerald-50 text-emerald-700 border-emerald-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  CLOSED: "bg-slate-100 text-slate-500 border-slate-200",
};

export function EmployerJobsPage() {
  const { session } = useAuth();
  const [showForm, setShowForm] = useState(false);
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
      try { const r = await JobsApi.mine(session.token); setJobs(r.jobs); } catch (e) { setError(e instanceof Error ? e.message : "Failed to load jobs"); }
    }
    void loadJobs();
  }, [session]);

  if (!session) return null;
  const authSession = session;

  async function captureLocation() {
    setError(null);
    try { setLocation(await getApproximateLocation()); } catch (e) { setError(e instanceof Error ? e.message : "Failed to capture location"); }
  }

  async function handleCreateJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError(null); setSuccess(null);
    try {
      if (!location) throw new Error("Capture location before posting");
      const r = await JobsApi.createJob({ token: authSession.token, title, category, description_text: description, payout_amount: Number(payoutAmount), payout_type: payoutType, location_coordinates: location });
      setJobs((prev) => [r.job, ...prev]);
      setSuccess("Job posted successfully!");
      setTitle(""); setCategory(""); setDescription(""); setPayoutAmount(""); setShowForm(false);
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to post job"); }
    finally { setLoading(false); }
  }

  const openCount = jobs.filter((j) => j.status === "OPEN").length;
  const totalApplicants = jobs.length * 3; // mock

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-5 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl lg:text-2xl font-extrabold text-slate-900 font-display">My Jobs</h1>
              <p className="mt-1 text-sm text-slate-500">Create and manage your job postings</p>
            </div>
            <motion.button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-amber-500/20 hover:shadow-lg transition-shadow"
              whileTap={{ scale: 0.97 }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Post Job</span>
            </motion.button>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
              <p className="text-2xl font-black text-slate-900">{jobs.length}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Total Jobs</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
              <p className="text-2xl font-black text-emerald-700">{openCount}</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase">Active</p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-center">
              <p className="text-2xl font-black text-sky-700">{totalApplicants}</p>
              <p className="text-[10px] font-bold text-sky-600 uppercase">Applicants</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Create Job Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                onSubmit={handleCreateJob}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 space-y-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2"><Briefcase className="h-5 w-5 text-amber-600" /> New Job Posting</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">Job Title</span>
                      <input required value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:shadow-sm" placeholder="e.g. Pipe Fitting Helper" />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">Category</span>
                      <div className="relative mt-1.5">
                        <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 appearance-none">
                          <option value="">Select category</option>
                          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">Description</span>
                    <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 min-h-20 resize-none" placeholder="Describe the job requirements..." />
                  </label>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">Pay Amount (₹)</span>
                      <div className="relative mt-1.5">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input required value={payoutAmount} onChange={(e) => setPayoutAmount(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:border-amber-500" placeholder="e.g. 800" />
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">Pay Type</span>
                      <select value={payoutType} onChange={(e) => setPayoutType(e.target.value as typeof payoutType)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 appearance-none">
                        <option value="HOURLY">Hourly</option>
                        <option value="DAILY">Daily</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="FIXED_CONTRACT">Fixed Contract</option>
                      </select>
                    </label>
                  </div>

                  <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-700">Job Location</p>
                    <button type="button" onClick={captureLocation} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
                      <MapPin className="h-4 w-4" /> Use Current Location
                    </button>
                    {location && <p className="mt-2 text-xs font-semibold text-emerald-600">✓ {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>}
                  </div>

                  {error && <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
                  {success && <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{success}</p>}

                  <div className="flex gap-3">
                    <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-bold text-white shadow-md disabled:opacity-50">{loading ? "Posting..." : "Post Job"}</button>
                    <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Jobs List */}
          <h2 className="text-base font-bold text-slate-900 mb-3">Posted Jobs</h2>
          {jobs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-400 mb-4"><Briefcase className="h-7 w-7" /></div>
              <h3 className="text-lg font-bold text-slate-900">No jobs posted yet</h3>
              <p className="mt-2 text-sm text-slate-500">Post your first job to start receiving applications from nearby workers.</p>
              <button type="button" onClick={() => setShowForm(true)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-600"><Plus className="h-4 w-4" /> Post a Job</button>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {jobs.map((job, idx) => (
                <motion.article
                  key={job.job_id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-base font-extrabold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{job.category}</p>
                    </div>
                    <span className={`shrink-0 self-start rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${STATUS_STYLES[job.status] ?? STATUS_STYLES.OPEN}`}>{job.status.replace("_", " ")}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg px-2 py-1"><IndianRupee className="h-3.5 w-3.5" /> ₹{job.payout_amount.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 bg-slate-50 rounded-lg px-2 py-1">{new Date(job.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                  <Link
                    to={`/employer/applicants?jobId=${job.job_id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                  >
                    <Users className="h-3.5 w-3.5" /> View Applicants
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
