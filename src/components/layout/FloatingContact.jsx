import CmsLink from "@/components/ui/CmsLink";
import Icon from "@/components/ui/Icon";

export default function FloatingContact({ whatsapp }) {
  if (!whatsapp?.href) return null;
  return (
    <CmsLink
      href={whatsapp.href}
      aria-label={whatsapp.label}
      className="group fixed right-5 bottom-5 z-40 flex items-center gap-2 rounded-full bg-whatsapp p-4 text-white shadow-[0_12px_32px_-8px_rgb(37_211_102/0.7)] transition-all duration-300 hover:brightness-105 sm:right-8 sm:bottom-8"
    >
      <Icon name="message-circle" className="size-6" strokeWidth={1.75} />
      <span className="hidden max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-focus-visible:max-w-40 sm:inline">
        {whatsapp.label}
      </span>
    </CmsLink>
  );
}
