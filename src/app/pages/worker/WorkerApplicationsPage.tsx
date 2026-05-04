import { useState } from "react";
import { CheckCircle2, Clock, XCircle, Star, MessageCircle, Briefcase, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

type AppStatus = "ALL" | "APPLIED" | "SHORTLISTED" | "HIRED" | "REJECTED";

type MockApplication = {
  id: string;
  job_title: string;
  employer_name: string;
  category: string;
  status: Exclude<AppStatus, "ALL">;
  applied_at: string;
  payout: string;
  whatsapp_link: string | null;
};

const STATUS_TABS: { value: AppStatus; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "APPLIED", label: "Applied" },
  { value: "SHORTLISTED", label: "Shortlisted" },
  { value: "HIRED", label: "Hired" },
  { value: "REJECTED", label: "Rejected" },
];

const STATUS_CONFIG: Record<string, { icon: typeof Clock; bg: string; text: string; badge: string }> = {
  APPLIED: { icon: Clock, bg: "bg-sky-50", text: "text-sky-700", badge: "border-sky-200 bg-sky-50 text-sky-700" },
  SHORTLISTED: { icon: Star, bg: "bg-amber-50", text: "text-amber-700", badge: "border-amber-200 bg-amber-50 text-amber-700" },
  HIRED: { icon: CheckCircle2, bg: "bg-emerald-50", text: "text-emerald-700", badge: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  REJECTED: { icon: XCircle, bg: "bg-rose-50", text: "text-rose-700", badge: "border-rose-200 bg-rose-50 text-rose-700" },
};

const MOCK_APPS: MockApplication[] = [
  { id: "a1", job_title: "Pipe Fitting Helper", employer_name: "Sairam Services", category: "Plumbing", status: "SHORTLISTED", applied_at: "2026-05-02T10:00:00Z", payout: "₹600/Day", whatsapp_link: "https://wa.me/919876543210" },
  { id: "a2", job_title: "Mason for Site Work", employer_name: "UrbanBuild Projects", category: "Construction", status: "APPLIED", applied_at: "2026-05-03T14:30:00Z", payout: "₹850/Day", whatsapp_link: null },
  { id: "a3", job_title: "Grocery Delivery Rider", employer_name: "QuickKart", category: "Delivery", status: "HIRED", applied_at: "2026-04-28T09:00:00Z", payout: "₹700/Shift", whatsapp_link: "https://wa.me/919998887776" },
  { id: "a4", job_title: "Steel Bar Bender", employer_name: "Metro Infra Works", category: "Construction", status: "REJECTED", applied_at: "2026-04-25T11:15:00Z", payout: "₹950/Day", whatsapp_link: null },
  { id: "a5", job_title: "Home Electrician", employer_name: "Volts Electrical", category: "Electrical", status: "APPLIED", applied_at: "2026-05-04T06:00:00Z", payout: "₹800/Day", whatsapp_link: null },
];

export function WorkerApplicationsPage() {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<AppStatus>("ALL");

  if (!session) return null;

  const filtered = activeTab === "ALL" ? MOCK_APPS : MOCK_APPS.filter((a) => a.status === activeTab);
  const counts: Record<string, number> = {};
  MOCK_APPS.forEach((a) => { counts[a.status] = (counts[a.status] ?? 0) + 1; });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-5 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl lg:text-2xl font-extrabold text-slate-900 font-display">My Applications</h1>
          <p className="mt-1 text-sm text-slate-500">Track your job applications and contact employers</p>

          {/* Summary Cards */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {(["APPLIED", "SHORTLISTED", "HIRED", "REJECTED"] as const).map((s) => {
              const cfg = STATUS_CONFIG[s];
              const Icon = cfg.icon;
              return (
                <button key={s} type="button" onClick={() => setActiveTab(s)} className={`rounded-xl p-3 text-center border transition-all ${activeTab === s ? `${cfg.badge} shadow-sm` : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"}`}>
                  <Icon className={`h-4 w-4 mx-auto mb-1 ${activeTab === s ? cfg.text : "text-slate-400"}`} />
                  <p className="text-lg font-black">{counts[s] ?? 0}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide">{s.slice(0, 5)}.</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[57px] lg:top-0 z-20 bg-white border-b border-slate-200 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto flex gap-1 overflow-x-auto py-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.value ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab.label}
              {tab.value !== "ALL" && counts[tab.value] ? (
                <span className="ml-1.5 text-xs opacity-70">({counts[tab.value]})</span>
              ) : tab.value === "ALL" ? (
                <span className="ml-1.5 text-xs opacity-70">({MOCK_APPS.length})</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="px-4 py-5 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-400 mb-4"><Briefcase className="h-7 w-7" /></div>
              <h2 className="text-lg font-bold text-slate-900">No applications yet</h2>
              <p className="mt-2 text-sm text-slate-500 mb-4">Start browsing jobs and apply to get started!</p>
              <Link to="/worker/feed" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800">
                Browse Jobs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map((app, idx) => {
                const cfg = STATUS_CONFIG[app.status];
                const Icon = cfg.icon;
                return (
                  <motion.article
                    key={app.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.04 }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-base font-extrabold text-slate-900">{app.job_title}</h2>
                        <p className="mt-0.5 text-sm text-slate-500">{app.employer_name} · {app.category}</p>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${cfg.badge}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {app.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{app.payout}</span>
                      <span>Applied {new Date(app.applied_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>

                    {app.whatsapp_link ? (
                      <a href={app.whatsapp_link} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors">
                        <MessageCircle className="h-4 w-4" /> Contact Employer
                      </a>
                    ) : (
                      <p className="mt-3 text-xs text-slate-400 italic">Contact details available after shortlisting.</p>
                    )}
                  </motion.article>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
