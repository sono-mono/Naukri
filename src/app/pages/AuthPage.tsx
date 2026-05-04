import { useEffect, useMemo, useRef, useState } from "react";
import { BriefcaseBusiness, HardHat, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { routeForRole, useAuth, type UserRole } from "../auth/AuthContext";
import { AuthApi, type AuthUser } from "../lib/api";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

type PendingAuth = {
  token: string;
  user: AuthUser;
};

function formatPhone(phone: string): string {
  const safePhone = phone.padEnd(10, "X").slice(0, 10);
  return `${safePhone.slice(0, 5)} ${safePhone.slice(5, 10)}`;
}

function formatResendTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export function AuthPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "role">("phone");
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(RESEND_SECONDS);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [pendingAuth, setPendingAuth] = useState<PendingAuth | null>(null);
  const [error, setError] = useState<string | null>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isPhoneValid = useMemo(() => /^\d{10}$/.test(phoneNumber), [phoneNumber]);
  const otpCode = useMemo(() => otpDigits.join(""), [otpDigits]);
  const currentStep = step === "phone" ? 1 : step === "otp" ? 2 : 3;

  useEffect(() => {
    if (step !== "otp") {
      return;
    }

    const firstInput = otpRefs.current[0];
    firstInput?.focus();
  }, [step]);

  useEffect(() => {
    if (step !== "otp" || resendSeconds <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setResendSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [resendSeconds, step]);

  function updateOtpValue(index: number, value: string) {
    const sanitized = value.replace(/\D/g, "");

    if (!sanitized) {
      setOtpDigits((current) => {
        const next = [...current];
        next[index] = "";
        return next;
      });
      return;
    }

    if (sanitized.length > 1) {
      const pastedDigits = sanitized.slice(0, OTP_LENGTH).split("");
      const nextDigits = Array(OTP_LENGTH).fill("");
      pastedDigits.forEach((digit, digitIndex) => {
        nextDigits[digitIndex] = digit;
      });
      setOtpDigits(nextDigits);

      const nextFocusIndex = Math.min(pastedDigits.length, OTP_LENGTH) - 1;
      otpRefs.current[Math.max(nextFocusIndex, 0)]?.focus();
      return;
    }

    setOtpDigits((current) => {
      const next = [...current];
      next[index] = sanitized;
      return next;
    });

    if (index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpPaste(event: React.ClipboardEvent<HTMLDivElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) {
      return;
    }

    event.preventDefault();
    const nextDigits = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    setOtpDigits(nextDigits);

    const focusIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    otpRefs.current[Math.max(focusIndex, 0)]?.focus();
  }

  function handleOtpKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  async function handleRequestOtp() {
    setIsSendingOtp(true);
    setError(null);

    try {
      const response = await AuthApi.requestOtp(phoneNumber);
      setDevOtp(response.dev_otp ?? null);
      setPendingAuth(null);
      setStep("otp");
      setOtpDigits(Array(OTP_LENGTH).fill(""));
      setResendSeconds(RESEND_SECONDS);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "OTP request failed");
    } finally {
      setIsSendingOtp(false);
    }
  }

  async function handleVerifyOtp() {
    setIsVerifyingOtp(true);
    setError(null);

    try {
      const response = await AuthApi.verifyOtp({
        phone_number: phoneNumber,
        otp: otpCode,
        language_preference: "en",
      });

      if (response.user.role) {
        setSession({
          token: response.token,
          user: response.user,
        });
        navigate(routeForRole(response.user.role), { replace: true });
        return;
      }

      setPendingAuth({ token: response.token, user: response.user });
      setStep("role");
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "OTP verification failed");
    } finally {
      setIsVerifyingOtp(false);
    }
  }

  async function handleResendOtp() {
    if (resendSeconds > 0 || isResendingOtp) {
      return;
    }

    setIsResendingOtp(true);
    setError(null);

    try {
      const response = await AuthApi.requestOtp(phoneNumber);
      setDevOtp(response.dev_otp ?? null);
      setOtpDigits(Array(OTP_LENGTH).fill(""));
      setResendSeconds(RESEND_SECONDS);
      otpRefs.current[0]?.focus();
    } catch (resendError) {
      setError(resendError instanceof Error ? resendError.message : "Unable to resend OTP");
    } finally {
      setIsResendingOtp(false);
    }
  }

  function handleRoleSelection(role: UserRole) {
    if (!pendingAuth) {
      setError("Session expired. Please request OTP again.");
      setStep("phone");
      return;
    }

    setSession({
      token: pendingAuth.token,
      user: {
        ...pendingAuth.user,
        role,
      },
    });

    navigate(routeForRole(role), { replace: true });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(155deg,#e8f1ff_0%,#f3f9ff_45%,#fff8ef_100%)] px-4 py-6 sm:px-6 sm:py-10 font-body">
      <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center">
        <div className="rounded-[32px] border border-white/80 bg-white/90 px-5 py-6 shadow-[0_35px_80px_-45px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:px-7 sm:py-7">
          <header className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700/90">Namaste</p>
            <h1 className="mt-2 font-display text-[2.15rem] font-extrabold tracking-[-0.03em] text-slate-950">BlueLink</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">Find jobs or hire quickly with OTP login.</p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em]">
                <span className={currentStep >= 1 ? "text-slate-900" : "text-slate-400"}>Phone</span>
                <span className={currentStep >= 2 ? "text-slate-900" : "text-slate-400"}>OTP</span>
                <span className={currentStep >= 3 ? "text-slate-900" : "text-slate-400"}>Role</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200/80">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#0f3d9a_0%,#0ea5e9_55%,#f59e0b_100%)]"
                  initial={false}
                  animate={{ width: `${(currentStep / 3) * 100}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait" initial={false}>
            {step === "phone" ? (
              <motion.section
                key="phone"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <div className="rounded-2xl border border-sky-100 bg-sky-50/70 px-3 py-2 text-xs font-semibold text-sky-700">
                  Secure entry with one-time password verification.
                </div>

                <div className="mt-5">
                  <label htmlFor="phone-input" className="text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <div className="relative mt-2 rounded-2xl border border-slate-300 bg-white transition-all duration-200 focus-within:border-sky-500 focus-within:shadow-[0_0_0_4px_rgba(14,165,233,0.16)]">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-bold text-slate-500">
                      +91
                    </span>
                    <input
                      id="phone-input"
                      aria-label="Phone number"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile number"
                      inputMode="numeric"
                      autoComplete="tel"
                      className="h-14 w-full rounded-2xl bg-transparent pl-16 pr-4 text-xl font-bold tracking-[0.08em] text-slate-900 outline-none placeholder:text-base placeholder:font-medium placeholder:tracking-normal placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {error ? (
                  <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
                    {error}
                  </p>
                ) : null}

                <button
                  type="button"
                  aria-label="Get OTP"
                  onClick={handleRequestOtp}
                  disabled={!isPhoneValid || isSendingOtp}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(120deg,#0b1f54_0%,#0f3d9a_48%,#0ea5e9_100%)] text-base font-bold text-white shadow-[0_12px_26px_-16px_rgba(30,64,175,0.8)] transition-all duration-200 hover:brightness-105 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  {isSendingOtp ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Get OTP"
                  )}
                </button>
              </motion.section>
            ) : null}

            {step === "otp" ? (
              <motion.section
                key="otp"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <div className="rounded-2xl border border-sky-100 bg-sky-50/60 px-3 py-3">
                  <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-slate-900">Verify OTP</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Enter the 4-digit code sent to <span className="font-bold text-slate-800">+91 {formatPhone(phoneNumber)}</span>.{" "}
                    <button
                      type="button"
                      aria-label="Edit phone number"
                      className="font-semibold text-sky-700 underline underline-offset-2"
                      onClick={() => {
                        setStep("phone");
                        setPendingAuth(null);
                        setError(null);
                      }}
                    >
                      Edit
                    </button>
                  </p>
                </div>

                <div className="mt-6 flex justify-center gap-3" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, index) => (
                    <input
                      key={`otp-${index}`}
                      ref={(element) => {
                        otpRefs.current[index] = element;
                      }}
                      value={digit}
                      onChange={(event) => updateOtpValue(index, event.target.value)}
                      onKeyDown={(event) => handleOtpKeyDown(index, event)}
                      aria-label={`OTP digit ${index + 1}`}
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      className="h-14 w-14 rounded-2xl border border-slate-300 bg-white text-center text-2xl font-black text-slate-900 outline-none transition-all duration-200 focus:border-sky-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.16)]"
                      maxLength={1}
                    />
                  ))}
                </div>

                {error ? (
                  <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
                    {error}
                  </p>
                ) : null}

                {devOtp ? (
                  <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                    Dev OTP: {devOtp}
                  </p>
                ) : null}

                <button
                  type="button"
                  aria-label="Verify and login"
                  onClick={handleVerifyOtp}
                  disabled={otpCode.length !== OTP_LENGTH || isVerifyingOtp}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(120deg,#0b1f54_0%,#0f3d9a_48%,#0ea5e9_100%)] text-base font-bold text-white shadow-[0_12px_26px_-16px_rgba(30,64,175,0.8)] transition-all duration-200 hover:brightness-105 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  {isVerifyingOtp ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Login"
                  )}
                </button>

                <p className="mt-4 text-center text-sm text-slate-600">
                  Didn&apos;t receive code?{" "}
                  {resendSeconds > 0 ? (
                    <span className="font-semibold text-slate-700">Resend in {formatResendTime(resendSeconds)}</span>
                  ) : (
                    <button
                      type="button"
                      aria-label="Resend OTP"
                      onClick={handleResendOtp}
                      disabled={isResendingOtp}
                      className="font-semibold text-sky-700 underline underline-offset-2 disabled:no-underline"
                    >
                      {isResendingOtp ? "Sending..." : "Resend OTP"}
                    </button>
                  )}
                </p>
              </motion.section>
            ) : null}

            {step === "role" ? (
              <motion.section
                key="role"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-slate-900">
                  Welcome! How do you want to use BlueLink?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Pick one role to continue. You can still edit your profile details later.
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    aria-label="I am a Worker"
                    onClick={() => handleRoleSelection("WORKER")}
                    className="group flex min-h-32 w-full items-start gap-3 rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#ecfeff_0%,#f8fdff_100%)] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_16px_34px_-22px_rgba(14,165,233,0.75)]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-100 text-cyan-700 transition-colors group-hover:bg-cyan-200">
                      <HardHat className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-lg font-bold text-slate-900">I am a Worker</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        Find daily wage and contract jobs near you.
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    aria-label="I am an Employer"
                    onClick={() => handleRoleSelection("EMPLOYER")}
                    className="group flex min-h-32 w-full items-start gap-3 rounded-2xl border border-amber-100 bg-[linear-gradient(135deg,#fff7ed_0%,#fffdfa_100%)] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-[0_16px_34px_-22px_rgba(245,158,11,0.75)]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700 transition-colors group-hover:bg-amber-200">
                      <BriefcaseBusiness className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-lg font-bold text-slate-900">I am an Employer</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        Hire verified workers quickly.
                      </span>
                    </span>
                  </button>
                </div>
              </motion.section>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
