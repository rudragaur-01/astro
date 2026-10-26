"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import CmsLink from "@/components/ui/CmsLink";
import BrandMark from "./BrandMark";

export default function Header({ brand, navigation, cta, menuLabels }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled || open ? "border-sand shadow-[0_8px_30px_-12px_rgb(44_20_8/0.18)]" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-20">
        <BrandMark brand={brand} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {navigation.map((item) => (
              <li key={item.id}>
                <CmsLink
                  href={item.href}
                  className="relative rounded-full px-3 py-2 text-[15px] font-semibold text-ink/85 transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-copper after:transition-transform after:duration-300 hover:text-copper hover:after:scale-x-100 xl:px-4 xl:after:inset-x-4"
                >
                  {item.label}
                </CmsLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full p-[3px] ring-2 ring-amber/70 sm:block">
            <Button cta={cta} size="sm" arrow />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? menuLabels.close : menuLabels.open}
            className="inline-flex size-11 items-center justify-center rounded-full border border-sand text-ink transition-colors hover:border-copper hover:text-copper lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-sand bg-white lg:hidden">
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.id}>
                <CmsLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-sand/70 py-4 font-serif text-xl font-bold text-ink transition-colors hover:text-copper"
                >
                  {item.label}
                </CmsLink>
              </li>
            ))}
          </ul>
          <Button cta={cta} className="mt-5 mb-2 w-full sm:hidden" onClick={() => setOpen(false)} />
        </nav>
      </div>
    </header>
  );
}
