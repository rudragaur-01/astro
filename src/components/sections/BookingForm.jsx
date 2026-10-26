"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck, ChevronDown } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-sand bg-ivory/60 px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 transition-colors focus:border-amber focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber/15";

function Field({ id, label, required, requiredHint, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="text-copper" aria-hidden="true">
            {" "}*
          </span>
        )}
        {required && <span className="sr-only"> ({requiredHint})</span>}
      </label>
      {children}
    </div>
  );
}

// Preselects the service passed as `?service={slug}` (e.g. from a service page).
function ServicePreselect({ selectRef, options }) {
  const searchParams = useSearchParams();
  const requested = searchParams.get("service");

  useEffect(() => {
    if (selectRef.current && options.some((option) => option.value === requested)) {
      selectRef.current.value = requested;
    }
  }, [requested, options, selectRef]);

  return null;
}

// UI only for this phase: submission shows a confirmation and sends nothing.
export default function BookingForm({ form, serviceOptions }) {
  const [submitted, setSubmitted] = useState(false);
  const statusRef = useRef(null);
  const serviceRef = useRef(null);
  const { fields } = form;

  useEffect(() => {
    if (submitted) statusRef.current?.focus();
  }, [submitted]);

  if (submitted) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-[2rem] bg-white p-10 text-center shadow-card focus:outline-none"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-maroon text-honey">
          <CircleCheck className="size-8" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-serif text-2xl font-bold text-ink">{form.successTitle}</h3>
        <p className="mt-3 max-w-sm text-muted">{form.successMessage}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-copper hover:text-copper"
        >
          {form.resetLabel}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-sand sm:p-9"
    >
      <Suspense fallback={null}>
        <ServicePreselect selectRef={serviceRef} options={serviceOptions} />
      </Suspense>
      <h3 className="font-serif text-2xl font-bold text-ink">{form.title}</h3>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field id="bk-name" label={fields.name.label} required requiredHint={form.requiredHint} className="sm:col-span-2">
          <input id="bk-name" name="name" type="text" autoComplete="name" required placeholder={fields.name.placeholder} className={inputClass} />
        </Field>

        <Field id="bk-email" label={fields.email.label} required requiredHint={form.requiredHint}>
          <input id="bk-email" name="email" type="email" autoComplete="email" required placeholder={fields.email.placeholder} className={inputClass} />
        </Field>

        <Field id="bk-phone" label={fields.phone.label} required requiredHint={form.requiredHint}>
          <div className="flex">
            <span className="flex items-center rounded-l-xl border border-r-0 border-sand bg-cream px-3.5 text-sm font-semibold text-ink">
              {fields.phone.countryCode}
            </span>
            <input
              id="bk-phone"
              name="phone"
              type="tel"
              autoComplete="tel-national"
              required
              placeholder={fields.phone.placeholder}
              className={`${inputClass} rounded-l-none`}
            />
          </div>
        </Field>

        <Field id="bk-dob" label={fields.birthDate.label} required requiredHint={form.requiredHint}>
          <input id="bk-dob" name="birthDate" type="date" required className={inputClass} />
        </Field>

        <Field id="bk-tob" label={fields.birthTime.label}>
          <input id="bk-tob" name="birthTime" type="time" className={inputClass} />
        </Field>

        <Field id="bk-pob" label={fields.birthPlace.label} required requiredHint={form.requiredHint}>
          <input id="bk-pob" name="birthPlace" type="text" required placeholder={fields.birthPlace.placeholder} className={inputClass} />
        </Field>

        <Field id="bk-service" label={fields.service.label} required requiredHint={form.requiredHint}>
          <div className="relative">
            <select ref={serviceRef} id="bk-service" name="service" required defaultValue="" className={`${inputClass} appearance-none pr-10`}>
              <option value="" disabled>
                {fields.service.placeholder}
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          </div>
        </Field>

        <fieldset className="sm:col-span-2">
          <legend className="mb-2 block text-sm font-semibold text-ink">{fields.mode.label}</legend>
          <div className="flex flex-wrap gap-3">
            {fields.mode.options.map((option, i) => (
              <label key={option.value} className="cursor-pointer">
                <input type="radio" name="mode" value={option.value} defaultChecked={i === 0} className="peer sr-only" />
                <span className="inline-flex rounded-full border border-sand px-5 py-2.5 text-sm font-medium text-ink transition-all peer-checked:border-maroon peer-checked:bg-maroon peer-checked:text-honey peer-focus-visible:ring-2 peer-focus-visible:ring-amber peer-focus-visible:ring-offset-2">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field id="bk-message" label={fields.message.label} className="sm:col-span-2">
          <textarea id="bk-message" name="message" rows={4} placeholder={fields.message.placeholder} className={`${inputClass} resize-y`} />
        </Field>
      </div>

      <button
        type="submit"
        className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-6 py-4 text-sm font-semibold tracking-wide text-ivory transition-all hover:bg-rust hover:shadow-[0_14px_40px_-12px_rgb(92_36_16/0.8)]"
      >
        {form.submitLabel}
        <span aria-hidden="true" className="text-amber transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>
      <p className="mt-4 text-center text-xs text-muted">{form.privacyNote}</p>
    </form>
  );
}
