import { type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Briefcase, CircleUserRound, ClipboardList, House, LogOut, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../../auth/AuthContext";

const NAV_ITEMS = [
  { to: "/worker/feed", label: "Home", icon: House },
  { to: "/worker/applications", label: "Applications", icon: ClipboardList },
  { to: "/worker/profile", label: "Profile", icon: CircleUserRound },
];

export function WorkerLayout({ children }: { children: ReactNode }) {
  const { session, clearSession } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate("/auth", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-body">
      {/* ── Desktop Sidebar + Mobile Header ── */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-lg lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-blue-700">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-extrabold text-slate-900">BlueLink</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-sky-600" />
              <span className="text-xs font-semibold text-slate-600">Near You</span>
            </div>
            <NavLink
              to="/worker/profile"
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white text-sm font-bold shadow-md shadow-sky-500/20"
            >
              {session?.user.phone_number?.slice(-2) ?? "U"}
            </NavLink>
          </div>
        </div>
      </header>

      <div className="lg:flex">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-slate-200 bg-white">
          <div className="flex h-16 items-center gap-2.5 px-6 border-b border-slate-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-blue-700">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-extrabold text-slate-900">BlueLink</span>
          </div>

          <div className="flex-1 px-3 py-4">
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Menu</p>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-sky-50 text-sky-700 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-slate-100 px-3 py-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 mb-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white text-sm font-bold shrink-0">
                {session?.user.phone_number?.slice(-2) ?? "U"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">Worker</p>
                <p className="text-xs text-slate-500 truncate">{session?.user.phone_number ?? "..."}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 lg:ml-64 pb-24 lg:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-lg lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold transition-colors ${
                    isActive ? "text-sky-600" : "text-slate-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`rounded-lg p-1.5 transition-colors ${isActive ? "bg-sky-50" : ""}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
