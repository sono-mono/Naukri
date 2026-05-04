import { useEffect, useState } from "react";
import { IndianRupee, MapPin, MessageCircle, SearchX, CheckCircle2, Clock, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../auth/AuthContext";
import type { AppLanguage } from "../../lib/api";

type JobFilter = "All" | "Plumbing" | "Construction" | "Delivery" | "Housekeeping" | "Electrical";

type JobPosting = {
  job_id: string;
  title: string;
  employer_name: string;
  category: Exclude<JobFilter, "All">;
  distance_km: number;
  payout_amount: number;
  payout_type: "Day" | "Shift" | "Month";
  description: string;
  whatsapp_link: string;
  urgent?: boolean;
  posted_ago: string;
};

const FILTER_CHIPS: JobFilter[] = ["All", "Plumbing", "Construction", "Delivery", "Housekeeping", "Electrical"];

const MOCK_JOBS: JobPosting[] = [
  { job_id: "j1", title: "Pipe Fitting Helper", employer_name: "Sairam Services", category: "Plumbing", distance_km: 2.5, payout_amount: 600, payout_type: "Day", description: "Need an experienced plumber helper for bathroom and kitchen fittings. Tools will be provided.", whatsapp_link: "https://wa.me/919876543210", urgent: true, posted_ago: "2h ago" },
  { job_id: "j2", title: "Mason for Site Work", employer_name: "UrbanBuild Projects", category: "Construction", distance_km: 4.2, payout_amount: 850, payout_type: "Day", description: "Block laying and plaster work for a 15-day apartment project. Lunch included.", whatsapp_link: "https://wa.me/919812345678", posted_ago: "5h ago" },
  { job_id: "j3", title: "Grocery Delivery Rider", employer_name: "QuickKart", category: "Delivery", distance_km: 1.8, payout_amount: 700, payout_type: "Shift", description: "Morning shift delivery partner needed. Bike and license required.", whatsapp_link: "https://wa.me/919998887776", posted_ago: "1h ago", urgent: true },
  { job_id: "j4", title: "Steel Bar Bender", employer_name: "Metro Infra Works", category: "Construction", distance_km: 6.1, payout_amount: 950, payout_type: "Day", description: "Rebar cutting and bending for bridge slab reinforcement. Safety gear provided.", whatsapp_link: "https://wa.me/919900112233", posted_ago: "8h ago" },
  { job_id: "j5", title: "Home Electrician", employer_name: "Volts Electrical Co.", category: "Electrical", distance_km: 3.4, payout_amount: 800, payout_type: "Day", description: "Wiring and switch board installation for 2BHK flat in new township. Must have own tools.", whatsapp_link: "https://wa.me/919877766655", posted_ago: "3h ago" },
  { job_id: "j6", title: "House Cleaning Staff", employer_name: "CleanHome Agency", category: "Housekeeping", distance_km: 1.2, payout_amount: 12000, payout_type: "Month", description: "Full-time house cleaning position. 6 days a week, 4 hours per day. Friendly family.", whatsapp_link: "https://wa.me/919811223344", posted_ago: "12h ago" },
];

const GREETING: Record<AppLanguage, string> = {
  en: "Hello! Here are jobs near you.",
  hi: "Namaste! Yahan aapke paas ke jobs hain.",
  mr: "Namaskar! Tumchya jawalche jobs ithe ahet.",
};

const CATEGORY_COLORS: Record<string, string> = {
  Plumbing: "bg-blue-50 text-blue-700 border-blue-200",
  Construction: "bg-orange-50 text-orange-700 border-orange-200",
  Delivery: "bg-green-50 text-green-700 border-green-200",
  Housekeeping: "bg-purple-50 text-purple-700 border-purple-200",
  Electrical: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between"><div className="h-5 w-40 rounded-lg bg-slate-200" /><div className="h-5 w-16 rounded-full bg-slate-200" /></div>
      <div className="mt-2 h-4 w-28 rounded-lg bg-slate-200" />
      <div className="mt-4 flex gap-2"><div className="h-7 w-24 rounded-full bg-slate-200" /><div className="h-7 w-28 rounded-full bg-slate-200" /></div>
      <div className="mt-3 space-y-2"><div className="h-3.5 w-full rounded bg-slate-200" /><div className="h-3.5 w-4/5 rounded bg-slate-200" /></div>
      <div className="mt-5 grid grid-cols-10 gap-2"><div className="col-span-7 h-11 rounded-xl bg-slate-200" /><div className="col-span-3 h-11 rounded-xl bg-slate-200" /></div>
    </div>
  );
}

export function WorkerFeedPage() {
  const { session } = useAuth();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<JobFilter>("All");
  const [locationText, setLocationText] = useState("Detecting...");
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  useEffect(() => { const t = setTimeout(() => { setJobs(MOCK_JOBS); setLoading(false); }, 800); return () => clearTimeout(t); }, []);
  useEffect(() => { const t = setTimeout(() => { setLocationText(["Pune, Maharashtra", "Nashik, Maharashtra", "Mumbai, Maharashtra"][Math.floor(Math.random() * 3)] ?? "Pune"); }, 500); return () => clearTimeout(t); }, []);

  if (!session) return null;

  const greeting = GREETING[session.user.language_preference] ?? GREETING.en;
  const filteredJobs = activeFilter === "All" ? jobs : jobs.filter((j) => j.category === activeFilter);

  function handleApply(jobId: string) {
    setAppliedJobIds((c) => c.includes(jobId) ? c : [...c, jobId]);
  }

  return (
    <div className="min-h-screen">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 px-4 py-5 lg:px-8 lg:py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-sky-200" />
            <span className="text-sm font-semibold text-sky-100">{locationText}</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-white font-display">{greeting}</h1>
          <div className="mt-3 flex flex-wrap gap-3">
            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2">
              <p className="text-2xl font-black text-white">{filteredJobs.length}</p>
              <p className="text-xs text-sky-200 font-medium">Jobs Found</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2">
              <p className="text-2xl font-black text-white">{appliedJobIds.length}</p>
              <p className="text-xs text-sky-200 font-medium">Applied</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[57px] lg:top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 lg:px-8">
        <div className="max-w-5xl mx-auto overflow-x-auto pb-1">
          <div className="flex items-center gap-2 min-w-max">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setActiveFilter(chip)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeFilter === chip
                    ? "bg-slate-900 text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="px-4 py-5 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">{[1,2,3,4].map(i => <JobCardSkeleton key={i}/>)}</div>
          ) : filteredJobs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-400 mb-4"><SearchX className="h-7 w-7" /></div>
              <h2 className="text-lg font-bold text-slate-900">No jobs found</h2>
              <p className="mt-2 text-sm text-slate-500">No {activeFilter} jobs nearby right now. Try another category or check back later!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job, idx) => {
                  const isApplied = appliedJobIds.includes(job.job_id);
                  const catColor = CATEGORY_COLORS[job.category] ?? "bg-slate-50 text-slate-700 border-slate-200";
                  return (
                    <motion.article
                      key={job.job_id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {job.urgent && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 border border-rose-200 px-1.5 py-0.5 text-[10px] font-bold text-rose-600 uppercase">
                                <Flame className="h-3 w-3" /> Urgent
                              </span>
                            )}
                          </div>
                          <h2 className="text-base font-extrabold text-slate-900 leading-snug">{job.title}</h2>
                          <p className="mt-0.5 text-sm font-medium text-slate-500">{job.employer_name}</p>
                        </div>
                        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${catColor}`}>
                          {job.category}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          <MapPin className="h-3.5 w-3.5 text-sky-500" />
                          {job.distance_km.toFixed(1)} km
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                          <IndianRupee className="h-3.5 w-3.5" />
                          ₹{job.payout_amount.toLocaleString()} / {job.payout_type}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
                          <Clock className="h-3.5 w-3.5" />
                          {job.posted_ago}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-2">{job.description}</p>

                      <div className="mt-4 grid grid-cols-10 gap-2">
                        <motion.button
                          type="button"
                          onClick={() => handleApply(job.job_id)}
                          disabled={isApplied}
                          className={`col-span-7 flex items-center justify-center gap-2 min-h-11 rounded-xl text-sm font-bold text-white transition-all ${
                            isApplied
                              ? "bg-emerald-500 cursor-default"
                              : "bg-slate-900 hover:bg-slate-800 active:scale-[0.98]"
                          }`}
                          whileTap={isApplied ? {} : { scale: 0.97 }}
                        >
                          {isApplied ? (<><CheckCircle2 className="h-4 w-4" /> Applied</>) : "Apply Now"}
                        </motion.button>
                        <a
                          href={job.whatsapp_link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Contact ${job.employer_name} on WhatsApp`}
                          className="col-span-3 grid min-h-11 place-items-center rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors active:scale-[0.97]"
                        >
                          <MessageCircle className="h-5 w-5" />
                        </a>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
