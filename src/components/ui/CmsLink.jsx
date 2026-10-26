import Link from "next/link";

const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href);

// Renders CMS-provided hrefs: in-page anchors, internal routes or external URLs.
export default function CmsLink({ href = "#", children, ...props }) {
  if (isExternal(href)) {
    const opensNewTab = href.startsWith("http");
    return (
      <a href={href} {...(opensNewTab && { target: "_blank", rel: "noopener noreferrer" })} {...props}>
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
