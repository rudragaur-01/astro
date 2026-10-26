"use client";

import { useState } from "react";

// UI only: no data is sent anywhere in this phase.
export default function NewsletterForm({ placeholder, buttonLabel, successMessage }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p role="status" className="rounded-2xl border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-honey">
        {successMessage}
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {placeholder}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-ivory placeholder:text-mist/70 focus:border-amber/60 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-amber-gradient px-6 py-3 text-sm font-semibold text-cocoa transition hover:brightness-105"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
