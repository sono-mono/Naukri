"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  registerWorker,
  type WorkerOnboardingState,
} from "@/app/actions/worker-onboarding";

const initialState: WorkerOnboardingState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-base font-bold text-white disabled:opacity-50"
    >
      {pending ? "Creating worker profile..." : "Save Worker Profile"}
    </button>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-rose-700">{errors[0]}</p>;
}

export function WorkerOnboardingForm() {
  const [state, formAction] = useActionState(registerWorker, initialState);

  return (
    <form action={formAction} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Full Name
          <input
            name="full_name"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4"
            placeholder="Ravi Kumar"
          />
          <FieldError errors={state.fieldErrors?.full_name} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Primary Phone
          <input
            name="primary_phone"
            inputMode="numeric"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4"
            placeholder="9876543210"
          />
          <FieldError errors={state.fieldErrors?.primary_phone} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          WhatsApp Phone
          <input
            name="whatsapp_phone"
            inputMode="numeric"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4"
            placeholder="Optional"
          />
          <FieldError errors={state.fieldErrors?.whatsapp_phone} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Preferred Language
          <select name="preferred_language" defaultValue="hi" className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4">
            <option value="hi">Hindi</option>
            <option value="en">English</option>
            <option value="mr">Marathi</option>
            <option value="bn">Bengali</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="kn">Kannada</option>
            <option value="pa">Punjabi</option>
            <option value="gu">Gujarati</option>
          </select>
          <FieldError errors={state.fieldErrors?.preferred_language} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Current City
          <input
            name="current_city"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4"
            placeholder="Lucknow"
          />
          <FieldError errors={state.fieldErrors?.current_city} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Current State
          <input
            name="current_state"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4"
            placeholder="Uttar Pradesh"
          />
          <FieldError errors={state.fieldErrors?.current_state} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Pincode
          <input
            name="pincode"
            inputMode="numeric"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4"
            placeholder="226001"
          />
          <FieldError errors={state.fieldErrors?.pincode} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Total Experience
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-300 px-4">
            <input
              name="total_experience_months"
              inputMode="numeric"
              defaultValue="24"
              className="h-12 w-full border-0 p-0 outline-none"
              placeholder="24"
            />
            <span className="text-sm text-slate-500">months</span>
          </div>
          <FieldError errors={state.fieldErrors?.total_experience_months} />
        </label>

        <label className="block text-sm font-semibold text-slate-700 lg:col-span-2">
          Skills
          <textarea
            name="skills"
            className="mt-2 min-h-28 w-full rounded-2xl border border-slate-300 px-4 py-3"
            placeholder="mason, shuttering, helper, tile work"
          />
          <FieldError errors={state.fieldErrors?.skills} />
        </label>

        <label className="block text-sm font-semibold text-slate-700 lg:col-span-2">
          Short Bio
          <textarea
            name="biography"
            className="mt-2 min-h-24 w-full rounded-2xl border border-slate-300 px-4 py-3"
            placeholder="Reliable site worker available for daily and contract roles."
          />
          <FieldError errors={state.fieldErrors?.biography} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Latitude
          <input
            name="latitude"
            defaultValue="26.8467"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4"
          />
          <FieldError errors={state.fieldErrors?.latitude} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Longitude
          <input
            name="longitude"
            defaultValue="80.9462"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4"
          />
          <FieldError errors={state.fieldErrors?.longitude} />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Aadhaar Last 4
          <input
            name="aadhaar_last4"
            inputMode="numeric"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4"
            placeholder="Optional"
          />
          <FieldError errors={state.fieldErrors?.aadhaar_last4} />
        </label>

        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">Compliance</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Consent and auditability are stored with the worker profile for StartInUP readiness and
            future verification workflows.
          </p>
          <input type="hidden" name="consent_version" value="startup-v1-2026-04" />
        </div>
      </div>

      <div className="mt-6 space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
          <input type="checkbox" name="privacy_consented" className="mt-1 h-4 w-4" />
          <span>I consent to BlueLink storing my profile data for workforce matching and verification.</span>
        </label>
        <FieldError errors={state.fieldErrors?.privacy_consented} />

        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
          <input type="checkbox" name="data_retention_consented" className="mt-1 h-4 w-4" />
          <span>I consent to data retention required for StartInUP reporting, employer trust, and audit logs.</span>
        </label>
        <FieldError errors={state.fieldErrors?.data_retention_consented} />
      </div>

      {state.error ? (
        <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {state.error}
        </p>
      ) : null}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
