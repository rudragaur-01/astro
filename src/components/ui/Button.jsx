import CmsLink from "./CmsLink";
import Icon from "./Icon";

const variants = {
  amber: "bg-amber-gradient text-cocoa hover:brightness-105 shadow-[0_12px_30px_-12px_rgb(227_134_42/0.8)]",
  ghostLight: "border border-white/20 text-ivory hover:border-amber/70 hover:text-honey hover:bg-white/5",
  brand: "bg-maroon text-ivory hover:bg-rust shadow-[0_12px_30px_-12px_rgb(92_36_16/0.7)]",
  ghostDark: "border border-ink/15 text-ink hover:border-copper hover:text-copper",
};

const sizes = {
  md: "px-5 py-3 text-[13px] sm:px-6 sm:py-3.5 sm:text-sm",
  sm: "px-5 py-2.5 text-[13px]",
};

export function buttonClasses({ variant = "brand", size = "md", className = "" } = {}) {
  return `group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;
}

export default function Button({ cta, variant, size, arrow = false, className, ...props }) {
  if (!cta?.label) return null;
  return (
    <CmsLink href={cta.href} className={buttonClasses({ variant, size, className })} {...props}>
      {cta.label}
      {arrow && <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </CmsLink>
  );
}
