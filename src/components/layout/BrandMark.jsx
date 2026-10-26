import CmsLink from "@/components/ui/CmsLink";

const tones = {
  light: { ring: "border-copper/50 text-maroon group-hover:border-copper", inner: "border-copper/20", name: "text-ink", tag: "text-copper" },
  dark: { ring: "border-amber/60 text-honey group-hover:border-amber", inner: "border-amber/20", name: "text-ivory", tag: "text-amber" },
};

export default function BrandMark({ brand, tone = "light" }) {
  const t = tones[tone];
  return (
    <CmsLink href={brand.homeHref} className="group flex items-center gap-3" aria-label={`${brand.name}, ${brand.tagline}, home`}>
      <span className={`relative flex size-10 items-center justify-center rounded-full border font-serif text-base font-bold transition-colors sm:size-11 ${t.ring}`}>
        <span aria-hidden="true" className={`absolute inset-1 rounded-full border ${t.inner}`} />
        {brand.monogram}
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-lg font-bold sm:text-xl ${t.name}`}>{brand.name}</span>
        <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] ${t.tag}`}>{brand.tagline}</span>
      </span>
    </CmsLink>
  );
}
