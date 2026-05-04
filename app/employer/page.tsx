import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export default async function EmployerDashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("bluelink-role")?.value;
  const actorId = cookieStore.get("bluelink-actor")?.value;

  if (role !== "EMPLOYER" || !actorId) {
    redirect("/");
  }

  const employerUser = await prisma.platformUser.findUnique({
    where: { shadow_session_key: actorId },
    include: {
      employerProfile: {
        include: {
          jobs: {
            orderBy: { created_at: "desc" },
            take: 5,
          },
        },
      },
    },
  });

  const employerName = employerUser?.employerProfile?.company_name ?? "BlueLink Employer";
  const jobsCount = employerUser?.employerProfile?.jobs.length ?? 0;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff8eb_0%,#ffffff_100%)] px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[2rem] border border-amber-200 bg-white p-8 shadow-[0_30px_80px_-45px_rgba(120,53,15,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
            Employer Panel
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Manage jobs, attendance, and payouts from one place.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Direct access is enabled for now, so this dashboard skips login and is ready for the
            next build steps: employer onboarding, job posting, attendance tracking, payment runs,
            and AI-assisted workforce matching.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-800">Employer</p>
              <p className="mt-2 text-2xl font-black">{employerName}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">Open Workstreams</p>
              <p className="mt-2 text-2xl font-black">3 planned</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-700">Tracked Jobs</p>
              <p className="mt-2 text-2xl font-black">{jobsCount}</p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <h2 className="text-xl font-black">Next build slice</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Employer onboarding and job posting should be the next server-action module so
              businesses can create verified listings and workers can accept them from the worker
              panel.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
