import { useEffect, useMemo, useRef, useState } from "react";
import { BriefcaseBusiness, HardHat, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { routeForRole, useAuth, type UserRole } from "../auth/AuthContext";
import { AuthApi, type AuthUser } from "../lib/api";

const OTP_LENGTH = 4;
const DEMO_OTP = "1234";
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
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
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
    if (step !== "otp") return;
    otpRefs.current[0]?.focus();
  }, [step]);

  useEffect(() => {
    if (step !== "otp" || resendSeconds <= 0) return;
    const timeoutId = window.setTimeout(() => {
      setResendSeconds((c) => Math.max(c - 1, 0));
    }, 1000);
    return () => window.clearTimeout(timeoutId);
  }, [resendSeconds, step]);

  function updateOtpValue(index: number, value: string) {
    const sanitized = value.replace(/\D/g, "");
    if (!sanitized) {
      setOtpDigits((c) => { const n = [...c]; n[index] = ""; return n; });
      return;
    }
    if (sanitized.length > 1) {
      const pastedDigits = sanitized.slice(0, OTP_LENGTH).split("");
      const nextDigits = Array(OTP_LENGTH).fill("");
      pastedDigits.forEach((d, i) => { nextDigits[i] = d; });
      setOtpDigits(nextDigits);
      otpRefs.current[Math.min(pastedDigits.length, OTP_LENGTH) - 1]?.focus();
      return;
    }
    setOtpDigits((c) => { const n = [...c]; n[index] = sanitized; return n; });
    if (index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpPaste(event: React.ClipboardEvent<HTMLDivElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    event.preventDefault();
    const nextDigits = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((d, i) => { nextDigits[i] = d; });
    setOtpDigits(nextDigits);
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
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
    } catch (e) {
      setError(e instanceof Error ? e.message : "OTP request failed");
    } finally {
      setIsSendingOtp(false);
    }
  }

  async function handleVerifyOtp() {
    setIsVerifyingOtp(true);
    setError(null);
    try {
      const response = await AuthApi.verifyOtp({ phone_number: phoneNumber, otp: otpCode, language_preference: "en" });
      if (response.user.role) {
        setSession({ token: response.token, user: response.user });
        navigate(routeForRole(response.user.role), { replace: true });
        return;
      }
      setPendingAuth({ token: response.token, user: response.user });
      setStep("role");
    } catch (e) {
      setError(e instanceof Error ? e.message : "OTP verification failed");
    } finally {
      setIsVerifyingOtp(false);
    }
  }

  async function handleResendOtp() {
    if (resendSeconds > 0 || isResendingOtp) return;
    setIsResendingOtp(true);
    setError(null);
    try {
      const response = await AuthApi.requestOtp(phoneNumber);
      setDevOtp(response.dev_otp ?? null);
      setOtpDigits(Array(OTP_LENGTH).fill(""));
      setResendSeconds(RESEND_SECONDS);
      otpRefs.current[0]?.focus();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to resend OTP");
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
    setSession({ token: pendingAuth.token, user: { ...pendingAuth.user, role } });
    navigate(routeForRole(role), { replace: true });
  }

  const stepLabels = ["Phone", "Verify", "Role"];

  return (
    <div className="relative min-h-screen bg-[#1a3c6e] px-4 py-6 sm:px-6 sm:py-10 font-body flex items-center justify-center">

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Demo OTP Banner */}
        <div className="mb-4 rounded-xl bg-white px-4 py-3 text-center shadow-sm">
          <p className="text-sm font-semibold text-[#1a3c6e]">
            Demo Mode — Use OTP <span className="font-mono font-bold bg-[#1a3c6e] text-white px-2 py-0.5 rounded-md ml-1">{DEMO_OTP}</span> to login
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl bg-white px-5 py-6 shadow-xl sm:px-7 sm:py-8">
          {/* Header */}
          <header className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a3c6e]">Namaste</p>
            <h1 className="mt-2 font-display text-[2.25rem] font-extrabold tracking-[-0.03em] text-slate-900 leading-tight">BlueLink</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">Find jobs or hire quickly with OTP login.</p>

            {/* Stepper */}
            <div className="mt-6 flex items-center justify-between">
              {stepLabels.map((label, i) => {
                const stepNum = i + 1;
                const isActive = currentStep >= stepNum;
                const isCurrent = currentStep === stepNum;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold transition-all duration-300 ${
                      isCurrent ? "bg-[#1a3c6e] text-white" :
                      isActive ? "bg-blue-100 text-[#1a3c6e]" :
                      "bg-slate-100 text-slate-400"
                    }`}>
                      {stepNum}
                    </div>
                    <span className={`text-sm font-semibold ${isActive ? "text-slate-800" : "text-slate-400"}`}>{label}</span>
                    {i < stepLabels.length - 1 && (
                      <div className="w-10 sm:w-14 h-[2px] bg-slate-200 mx-1 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#1a3c6e] rounded-full"
                          initial={false}
                          animate={{ width: currentStep > stepNum ? "100%" : "0%" }}
                          transition={{ duration: 0.35 }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </header>

          <AnimatePresence mode="wait" initial={false}>
            {/* ── PHONE STEP ── */}
            {step === "phone" && (
              <motion.section key="phone" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.25 }}>
                <div className="rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-medium text-[#1a3c6e]">
                  Secure entry with one-time password verification.
                </div>

                <div className="mt-5">
                  <label htmlFor="phone-input" className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <div className="relative mt-2 rounded-xl border-2 border-slate-200 bg-white transition-all duration-200 focus-within:border-[#1a3c6e]">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-base font-bold text-slate-500">+91</span>
                    <input
                      id="phone-input"
                      aria-label="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile number"
                      inputMode="numeric"
                      autoComplete="tel"
                      className="h-14 w-full rounded-xl bg-transparent pl-16 pr-4 text-xl font-bold tracking-[0.08em] text-slate-900 outline-none placeholder:text-sm placeholder:font-medium placeholder:tracking-normal placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {error && <p className="mt-4 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700">{error}</p>}

                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={!isPhoneValid || isSendingOtp}
                  className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#1a3c6e] text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#15305a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  {isSendingOtp ? (<><LoaderCircle className="h-5 w-5 animate-spin" />Sending OTP...</>) : "Get OTP"}
                </button>
              </motion.section>
            )}

            {/* ── OTP STEP ── */}
            {step === "otp" && (
              <motion.section key="otp" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.25 }}>
                <div className="rounded-xl bg-blue-50 px-4 py-3">
                  <h2 className="font-display text-xl font-extrabold text-slate-900">Verify OTP</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Enter the 4-digit code sent to <span className="font-bold text-slate-800">+91 {formatPhone(phoneNumber)}</span>.{" "}
                    <button type="button" className="font-semibold text-[#1a3c6e] underline underline-offset-2" onClick={() => { setStep("phone"); setPendingAuth(null); setError(null); }}>Edit</button>
                  </p>
                </div>

                <div className="mt-6 flex justify-center gap-3" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, index) => (
                    <input
                      key={`otp-${index}`}
                      ref={(el) => { otpRefs.current[index] = el; }}
                      value={digit}
                      onChange={(e) => updateOtpValue(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      aria-label={`OTP digit ${index + 1}`}
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      className="h-16 w-16 rounded-xl border-2 border-slate-200 bg-white text-center text-2xl font-black text-slate-900 outline-none transition-all duration-200 focus:border-[#1a3c6e]"
                      maxLength={1}
                    />
                  ))}
                </div>

                {error && <p className="mt-4 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700">{error}</p>}

                {devOtp && (
                  <p className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700">Dev OTP: {devOtp}</p>
                )}

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otpCode.length !== OTP_LENGTH || isVerifyingOtp}
                  className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#1a3c6e] text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#15305a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  {isVerifyingOtp ? (<><LoaderCircle className="h-5 w-5 animate-spin" />Verifying...</>) : "Verify & Login"}
                </button>

                <p className="mt-4 text-center text-sm text-slate-500">
                  Didn&apos;t receive code?{" "}
                  {resendSeconds > 0 ? (
                    <span className="font-semibold text-slate-700">Resend in {formatResendTime(resendSeconds)}</span>
                  ) : (
                    <button type="button" onClick={handleResendOtp} disabled={isResendingOtp} className="font-semibold text-[#1a3c6e] underline underline-offset-2">
                      {isResendingOtp ? "Sending..." : "Resend OTP"}
                    </button>
                  )}
                </p>
              </motion.section>
            )}

            {/* ── ROLE STEP ── */}
            {step === "role" && (
              <motion.section key="role" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.25 }}>
                <h2 className="font-display text-2xl font-extrabold text-slate-900">Welcome! How will you use BlueLink?</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Pick a role to continue. You can update details later.</p>

                <div className="mt-6 space-y-3">
                  <motion.button
                    type="button"
                    onClick={() => handleRoleSelection("WORKER")}
                    className="group flex w-full items-start gap-4 rounded-2xl border-2 border-blue-100 bg-blue-50 p-5 text-left transition-all duration-200 hover:border-[#1a3c6e] hover:shadow-md"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#1a3c6e] text-white">
                      <HardHat className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-lg font-bold text-slate-900">I am a Worker</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-500">Find daily wage and contract jobs near you. Get matched with verified employers.</span>
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => handleRoleSelection("EMPLOYER")}
                    className="group flex w-full items-start gap-4 rounded-2xl border-2 border-amber-100 bg-amber-50 p-5 text-left transition-all duration-200 hover:border-amber-500 hover:shadow-md"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-500 text-white">
                      <BriefcaseBusiness className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-lg font-bold text-slate-900">I am an Employer</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-500">Post jobs and hire verified workers quickly. Manage your hiring pipeline.</span>
                    </span>
                  </motion.button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-blue-200">
          By continuing, you agree to BlueLink&apos;s Terms of Service.
        </p>
      </motion.div>
    </div>
  );
}
