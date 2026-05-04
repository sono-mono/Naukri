import { NavLink } from "react-router-dom";
import { type ReactNode } from "react";
import { routeForRole, useAuth } from "../auth/AuthContext";

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const { session, clearSession } = useAuth();

  const workerLinks = [
    { to: "/worker/profile", label: "Profile" },
    { to: "/worker/feed", label: "Jobs Feed" },
    { to: "/worker/applications", label: "My Applications" },
  ];

  const employerLinks = [
    { to: "/employer/profile", label: "Profile" },
    { to: "/employer/jobs", label: "My Jobs" },
    { to: "/employer/applicants", label: "Applicants" },
  ];

  const navLinks = session?.user.role === "WORKER" ? workerLinks : employerLinks;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <NavLink to="/" className="text-sm font-bold tracking-wide text-slate-500 uppercase">
              BlueLink
            </NavLink>
            <h1 className="text-xl sm:text-2xl font-extrabold mt-1">{title}</h1>
            {subtitle ? <p className="text-sm text-slate-600 mt-1">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                clearSession();
                window.location.assign("/auth");
              }}
              className="px-3 py-2 rounded-md text-sm font-semibold bg-rose-100 text-rose-700 hover:bg-rose-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

      <footer className="max-w-6xl mx-auto px-4 pb-8 text-xs text-slate-500">
        Signed in as {session?.user.phone_number ?? "unknown"} ·
        {" "}
        <NavLink className="underline" to={routeForRole(session?.user.role ?? null)}>
          dashboard
        </NavLink>
      </footer>
    </div>
  );
}
