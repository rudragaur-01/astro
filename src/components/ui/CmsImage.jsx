import Image from "next/image";
import StarField from "./StarField";
import ZodiacWheel from "./ZodiacWheel";

// next/image wrapper for CMS media objects ({ src, alt, width, height }).
// Fills its (relatively positioned) parent; renders a celestial placeholder
// when the image is missing so optional media never breaks the layout.
export default function CmsImage({ image, sizes = "100vw", className = "", preload = false, fallbackLabel }) {
  if (!image?.src) {
    return (
      <div
        role={fallbackLabel ? "img" : undefined}
        aria-label={fallbackLabel}
        aria-hidden={fallbackLabel ? undefined : "true"}
        className="bg-earth absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <StarField count={40} seed={11} />
        <ZodiacWheel className="w-3/4 text-amber/40" />
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt ?? ""}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className}`}
    />
  );
}
