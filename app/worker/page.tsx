import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { WorkerOnboardingForm } from "@/components/forms/worker-onboarding-form";
import { prisma } from "@/lib/prisma";

export default async function WorkerDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get("bluelink-role")?.value;
  const actorId = cookieStore.get("bluelink-actor")?.value;

  if (role !== "WORKER" || !actorId) {
    redirect("/");
  }

  const params = searchParams ? await searchParams : {};
  const welcome = params?.welcome === "1";

  const actor = await prisma.platformUser.findUnique({
    where: { shadow_session_key: actorId },
    include: {
      workerProfile: {
        include: {
          skills: true,
          verificationEvents: {
            orderBy: { created_at: "desc" },
            take: 3,
          },
        },
      },
    },
  });

  const jobs = await prisma.jobPosting.findMany({
    where: {
      status: "OPEN",
    },
    orderBy: { created_at: "desc" },
    take: 6,
  });

  const profile = actor?.workerProfile;

  if (!profile) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)] px-4 py-8 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <section className="mb-6 rounded-[2rem] border border-sky-200 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(14,116,144,0.4)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
              Worker Panel
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">
              Build your BlueLink worker identity.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              This onboarding flow is designed for direct access. We are skipping authentication
              for now, but still capturing the right data for matching, verification, and future
              employer trust.
            </p>
          </section>

          <WorkerOnboardingForm />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)] px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-sky-200 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(14,116,144,0.4)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                Worker Dashboard
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight">
                {welcome ? "Welcome to BlueLink" : `Hello, ${profile.full_name}`}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Your profile is active for matching. The next milestone is deep verification and
                live job applications backed by AI scoring and multilingual support.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-sky-50 p-5">
                <p className="text-sm font-semibold text-sky-700">Onboarding</p>
                <p className="mt-2 text-xl font-black">{profile.onboarding_status}</p>
              </div>
              <div className="rounded-3xl bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-700">Verification</p>
                <p className="mt-2 text-xl font-black">{profile.verification_status}</p>
              </div>
              <div className="rounded-3xl bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-700">Completion</p>
                <p className="mt-2 text-xl font-black">{profile.profile_completion}%</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-black">Profile Snapshot</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 text-base font-semibold">
                    {profile.current_city}, {profile.current_state}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Experience
                  </p>
                  <p className="mt-1 text-base font-semibold">
                    {Math.floor(profile.total_experience_months / 12)} years
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Skills
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black">Latest Verification Events</h2>
              <div className="mt-5 space-y-3">
                {profile.verificationEvents.length === 0 ? (
                  <p className="text-sm text-slate-600">
                    No verification events yet. Aadhaar or KYC intake can be added next.
                  </p>
                ) : (
                  profile.verificationEvents.map((event) => (
                    <div key={event.id} className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-bold">{event.event_status}</p>
                      <p className="mt-1 text-sm text-slate-600">{event.notes}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <section className="mt-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-black">Open Jobs</h2>
              <p className="text-sm text-slate-500">Placeholder feed until AI matching is wired in</p>
            </div>

            {jobs.length === 0 ? (
              <div className="mt-4 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                No open jobs yet. Employer job posting is the next module to complete.
              </div>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {jobs.map((job) => (
                  <article key={job.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {job.category}
                    </p>
                    <h3 className="mt-2 text-xl font-black">{job.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{job.description}</p>
                    <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                      <span>{job.city}, {job.state}</span>
                      <span>Rs. {job.payout_amount.toString()}</span>
                    </div>
                    <button className="mt-5 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">
                      Take Up Job
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
