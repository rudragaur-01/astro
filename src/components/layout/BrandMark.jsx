import Image from "next/image";
import CmsLink from "@/components/ui/CmsLink";

const tones = {
  light: { ring: "border-copper/50 group-hover:border-copper", name: "text-ink", tag: "text-copper" },
  dark: { ring: "border-amber/60 group-hover:border-amber", name: "text-ivory", tag: "text-amber" },
};

export default function BrandMark({ brand, tone = "light" }) {
  const t = tones[tone];
  return (
    <CmsLink href={brand.homeHref} className="group flex items-center gap-3" aria-label={`${brand.name}, ${brand.tagline}, home`}>
      <span className={`relative size-11 shrink-0 overflow-hidden rounded-full border transition-colors sm:size-12 ${t.ring}`}>
        <Image src={brand.logo.src} alt={brand.logo.alt} fill sizes="48px" className="object-cover" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-lg font-bold sm:text-xl ${t.name}`}>{brand.name}</span>
        <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] ${t.tag}`}>{brand.tagline}</span>
      </span>
    </CmsLink>
  );
}
