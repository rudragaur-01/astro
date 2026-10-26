export function Eyebrow({ children, tone = "light", className = "" }) {
  if (!children) return null;
  const color = tone === "dark" ? "text-amber" : "text-copper";
  return (
    <p className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${color} ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  as: Tag = "h2",
  className = "",
}) {
  const centered = align === "center";
  const titleColor = tone === "dark" ? "text-ivory" : "text-ink";
  const bodyColor = tone === "dark" ? "text-mist" : "text-muted";

  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"} ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      {title && (
        <Tag
          id={id}
          className={`mt-4 font-serif text-heading font-bold text-balance ${titleColor}`}
        >
          {title}
        </Tag>
      )}
      {description && <p className={`mt-5 text-base leading-relaxed text-pretty sm:text-lg ${bodyColor}`}>{description}</p>}
    </div>
  );
}
