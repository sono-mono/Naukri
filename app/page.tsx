import { continueAsEmployer, continueAsWorker } from "./actions/entry";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff4d6_0%,#fff9ec_35%,#f7fbff_100%)] px-4 py-8 text-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <section className="overflow-hidden rounded-[2rem] border border-amber-200 bg-white shadow-[0_35px_90px_-50px_rgba(120,53,15,0.45)]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 sm:p-10 lg:p-14">
              <p className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-800">
                StartInUP Workforce Infra
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                BlueLink for India&apos;s real workforce economy.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                A mobile-first digital operating system for blue-collar workers and verified
                employers across logistics, construction, manufacturing, and field operations.
                Direct entry is enabled for this build, so users can enter the correct panel
                instantly without authentication.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <form action={continueAsWorker}>
                  <button className="group w-full rounded-[1.75rem] bg-slate-950 px-6 py-6 text-left text-white transition-transform hover:-translate-y-1">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                      Worker Panel
                    </span>
                    <span className="mt-3 block text-3xl font-black">Continue as Worker</span>
                    <span className="mt-3 block text-sm leading-6 text-slate-300">
                      Create your profile, get verified, and take up nearby jobs matched to your
                      skills.
                    </span>
                  </button>
                </form>

                <form action={continueAsEmployer}>
                  <button className="group w-full rounded-[1.75rem] bg-amber-500 px-6 py-6 text-left text-slate-950 transition-transform hover:-translate-y-1">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-950">
                      Employer Panel
                    </span>
                    <span className="mt-3 block text-3xl font-black">Continue as Employer</span>
                    <span className="mt-3 block text-sm leading-6 text-amber-950/80">
                      Post work requirements, manage attendance, and run operations from one
                      workforce dashboard.
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,#0f172a_0%,#12233f_100%)] p-8 text-white sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
                Core System
              </p>
              <div className="mt-6 space-y-5">
                {[
                  "Direct worker and employer entry with no auth wall during pilot stage",
                  "Structured worker onboarding with compliance, verification, and multilingual data",
                  "Prisma + PostgreSQL domain model ready for AI matching and government reporting",
                  "Future Python services for geospatial matching, fraud checks, and autonomous agents",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
