import { useEffect, useState } from "react";
import {
  CircleUserRound,
  ClipboardList,
  House,
  IndianRupee,
  MapPin,
  MessageCircle,
  SearchX,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import type { AppLanguage } from "../../lib/api";
import { useAuth } from "../../auth/AuthContext";

type JobFilter = "All" | "Plumbing" | "Construction" | "Delivery" | "Housekeeping";

type JobPosting = {
  job_id: string;
  title: string;
  employer_name: string;
  category: Exclude<JobFilter, "All">;
  distance_km: number;
  payout_amount: number;
  payout_type: "Day" | "Shift";
  description: string;
  whatsapp_link: string;
};

const FILTER_CHIPS: JobFilter[] = ["All", "Plumbing", "Construction", "Delivery", "Housekeeping"];

const MOCK_JOBS: JobPosting[] = [
  {
    job_id: "job-plumbing-1",
    title: "Pipe Fitting Helper",
    employer_name: "Sairam Services",
    category: "Plumbing",
    distance_km: 2.5,
    payout_amount: 600,
    payout_type: "Day",
    description: "Need an experienced plumber helper for bathroom and kitchen fittings.",
    whatsapp_link: "https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20apply%20for%20Pipe%20Fitting%20Helper.",
  },
  {
    job_id: "job-construction-1",
    title: "Mason for Site Work",
    employer_name: "UrbanBuild Projects",
    category: "Construction",
    distance_km: 4.2,
    payout_amount: 850,
    payout_type: "Day",
    description: "Block laying and plaster work for a 15-day apartment project.",
    whatsapp_link: "https://wa.me/919812345678?text=Hi%2C%20I%20want%20to%20apply%20for%20Mason%20for%20Site%20Work.",
  },
  {
    job_id: "job-delivery-1",
    title: "Grocery Delivery Rider",
    employer_name: "QuickKart",
    category: "Delivery",
    distance_km: 1.8,
    payout_amount: 700,
    payout_type: "Shift",
    description: "Morning shift delivery partner needed. Bike and license required.",
    whatsapp_link: "https://wa.me/919998887776?text=Hi%2C%20I%20want%20to%20apply%20for%20Grocery%20Delivery%20Rider.",
  },
  {
    job_id: "job-construction-2",
    title: "Steel Bar Bender",
    employer_name: "Metro Infra Works",
    category: "Construction",
    distance_km: 6.1,
    payout_amount: 950,
    payout_type: "Day",
    description: "Rebar cutting and bending for bridge slab reinforcement.",
    whatsapp_link: "https://wa.me/919900112233?text=Hi%2C%20I%20want%20to%20apply%20for%20Steel%20Bar%20Bender.",
  },
];

const GREETING_BY_LANGUAGE: Record<AppLanguage, string> = {
  en: "Hello, Ravi! Here are jobs near you.",
  hi: "Namaste, Ravi! Yahan aapke paas ke jobs hain.",
  mr: "Namaskar, Ravi! Tumchya jawalche jobs ithe ahet.",
};

function JobCardSkeleton() {
  return (
    <article className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="h-4 w-16 rounded-full bg-slate-200" />
      </div>
      <div className="mt-2 h-4 w-28 rounded bg-slate-200" />
      <div className="mt-4 flex gap-2">
        <div className="h-7 w-28 rounded-full bg-slate-200" />
        <div className="h-7 w-28 rounded-full bg-slate-200" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-4/5 rounded bg-slate-200" />
      </div>
      <div className="mt-5 grid grid-cols-10 gap-2">
        <div className="col-span-7 h-11 rounded-xl bg-slate-200" />
        <div className="col-span-3 h-11 rounded-xl bg-slate-200" />
      </div>
    </article>
  );
}

export function WorkerFeedPage() {
  const { session } = useAuth();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<JobFilter>("All");
  const [locationText, setLocationText] = useState("Detecting area...");
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  useEffect(() => {
    const feedDelay = window.setTimeout(() => {
      setJobs(MOCK_JOBS);
      setLoading(false);
    }, 1000);

    return () => window.clearTimeout(feedDelay);
  }, []);

  useEffect(() => {
    const locationDelay = window.setTimeout(() => {
      const roughAreas = ["Pune, Maharashtra", "Nashik, Maharashtra", "Nagpur, Maharashtra"];
      const area = roughAreas[Math.floor(Math.random() * roughAreas.length)] ?? "Pune, Maharashtra";
      setLocationText(area);
    }, 700);

    return () => window.clearTimeout(locationDelay);
  }, []);

  if (!session) {
    return null;
  }

  const greeting = GREETING_BY_LANGUAGE[session.user.language_preference] ?? GREETING_BY_LANGUAGE.en;
  const filteredJobs = activeFilter === "All"
    ? jobs
    : jobs.filter((job) => job.category === activeFilter);

  function handleApply(jobId: string) {
    setAppliedJobIds((current) => {
      if (current.includes(jobId)) {
        return current;
      }
      return [...current, jobId];
    });
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto min-h-screen w-full max-w-md border-x border-slate-200 bg-slate-50 pb-28 lg:max-w-6xl lg:border-x-0 lg:bg-transparent lg:px-4 lg:pb-8">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:mt-4 lg:rounded-2xl lg:border">
          <div className="px-4 pb-4 pt-4 lg:px-6 lg:pb-5 lg:pt-5">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                <MapPin className="h-4 w-4 text-sky-700" />
                <span className="text-sm font-semibold text-slate-700">{locationText}</span>
              </div>

              <Link
                to="/worker/profile"
                aria-label="Open profile"
                className="grid h-11 w-11 place-items-center rounded-full bg-slate-900 text-white transition-transform hover:scale-105 active:scale-95"
              >
                <span className="text-sm font-bold">R</span>
              </Link>
            </div>

            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-lg font-bold leading-7 text-slate-900 lg:text-2xl">{greeting}</p>

              <div className="hidden items-center gap-2 lg:flex">
                <NavLink
                  to="/worker/feed"
                  className={({ isActive }) =>
                    `inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${
                      isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                    }`
                  }
                >
                  <House className="h-4 w-4" />
                  Home
                </NavLink>

                <NavLink
                  to="/worker/applications"
                  className={({ isActive }) =>
                    `inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${
                      isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                    }`
                  }
                >
                  <ClipboardList className="h-4 w-4" />
                  Applications
                </NavLink>

                <NavLink
                  to="/worker/profile"
                  className={({ isActive }) =>
                    `inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${
                      isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                    }`
                  }
                >
                  <CircleUserRound className="h-4 w-4" />
                  Profile
                </NavLink>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto pb-1 lg:overflow-visible">
              <div className="flex min-w-max items-center gap-2 lg:min-w-0 lg:flex-wrap">
                {FILTER_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveFilter(chip)}
                    className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${
                      activeFilter === chip
                        ? "bg-slate-900 text-white shadow"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-4 lg:px-0 lg:py-6">
          <div className="grid gap-4 lg:grid-cols-12">
            <aside className="hidden space-y-4 lg:col-span-4 lg:block xl:col-span-3">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Feed Snapshot</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">{filteredJobs.length}</h2>
                <p className="text-sm font-medium text-slate-600">Jobs in {activeFilter} nearby</p>
                <p className="mt-3 text-sm text-slate-500">Tip: Use filters to quickly focus on your skill category.</p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Current Area</p>
                <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  <MapPin className="h-4 w-4 text-sky-700" />
                  {locationText}
                </p>
                <p className="mt-3 text-sm text-slate-500">Open your profile to refresh location and skills for better matches.</p>
                <Link
                  to="/worker/profile"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                >
                  Update Profile
                </Link>
              </section>
            </aside>

            <section className="space-y-4 lg:col-span-8 xl:col-span-9">
              {loading ? (
                <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                </div>
              ) : filteredJobs.length === 0 ? (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-500">
                    <SearchX className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-900">No jobs nearby</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    No jobs found in this category nearby. Check back later!
                  </p>
                </section>
              ) : (
                <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                  {filteredJobs.map((job) => {
                    const isApplied = appliedJobIds.includes(job.job_id);

                    return (
                      <article
                        key={job.job_id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-transform hover:scale-105 active:scale-95"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h2 className="text-lg font-extrabold leading-6 text-slate-900">{job.title}</h2>
                            <p className="mt-1 text-sm font-medium text-slate-500">{job.employer_name}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {job.category}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                            <MapPin className="h-4 w-4" />
                            {job.distance_km.toFixed(1)} km away
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                            <IndianRupee className="h-4 w-4" />
                            {job.payout_amount} / {job.payout_type}
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{job.description}</p>

                        <div className="mt-4 grid grid-cols-10 gap-2">
                          <button
                            type="button"
                            onClick={() => handleApply(job.job_id)}
                            className={`col-span-7 min-h-11 rounded-xl px-4 text-base font-bold text-white transition-transform hover:scale-105 active:scale-95 ${
                              isApplied ? "bg-emerald-600" : "bg-slate-900"
                            }`}
                          >
                            {isApplied ? "Applied" : "Apply Now"}
                          </button>

                          <a
                            href={job.whatsapp_link}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Contact ${job.employer_name} on WhatsApp`}
                            className="col-span-3 grid min-h-11 place-items-center rounded-xl bg-emerald-500 text-white transition-transform hover:scale-105 active:scale-95"
                          >
                            <MessageCircle className="h-5 w-5" />
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </main>

        <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-slate-200 bg-white px-3 py-2 lg:hidden">
          <div className="grid grid-cols-3 gap-2">
            <NavLink
              to="/worker/feed"
              className={({ isActive }) =>
                `flex min-h-11 flex-col items-center justify-center rounded-xl text-xs font-semibold transition-transform hover:scale-105 active:scale-95 ${
                  isActive ? "bg-slate-900 text-white" : "text-slate-600"
                }`
              }
            >
              <House className="h-4 w-4" />
              Home
            </NavLink>

            <NavLink
              to="/worker/applications"
              className={({ isActive }) =>
                `flex min-h-11 flex-col items-center justify-center rounded-xl text-xs font-semibold transition-transform hover:scale-105 active:scale-95 ${
                  isActive ? "bg-slate-900 text-white" : "text-slate-600"
                }`
              }
            >
              <ClipboardList className="h-4 w-4" />
              My Applications
            </NavLink>

            <NavLink
              to="/worker/profile"
              className={({ isActive }) =>
                `flex min-h-11 flex-col items-center justify-center rounded-xl text-xs font-semibold transition-transform hover:scale-105 active:scale-95 ${
                  isActive ? "bg-slate-900 text-white" : "text-slate-600"
                }`
              }
            >
              <CircleUserRound className="h-4 w-4" />
              Profile
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
