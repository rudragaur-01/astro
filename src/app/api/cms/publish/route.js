import { revalidateTag } from "next/cache";
import { after } from "next/server";
import { applyEdits, readSheetEdits } from "@/lib/cms/edits";
import { fetchSheetTabs, isSheetConfigured } from "@/lib/cms/google-sheets";
import { CONTENT_TAG, defaultContent } from "@/lib/cms/load";
import { hasValidSecret } from "@/lib/cms/secret";
import { getProductSlugs, getServiceSlugs } from "@/lib/content";

// Called by the sheet's "Website → Publish changes" menu.
export async function POST(request) {
  if (!hasValidSecret(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // Surface skipped new rows to the sheet so the client knows why nothing appeared.
  const warnings = [];
  if (isSheetConfigured()) {
    try {
      const { ignored } = applyEdits(defaultContent, readSheetEdits(await fetchSheetTabs()));
      for (const message of ignored) {
        if (message.startsWith("new ")) warnings.push(message);
      }
    } catch {
      // Publish still invalidates cache; getContent will log fetch errors.
    }
  }

  // `{ expire: 0 }` would force a blocking re-render that the dynamic
  // service/product routes can't do, so mark stale and regenerate in the
  // background by requesting every approved page once.
  revalidateTag(CONTENT_TAG, "max");

  const { origin } = new URL(request.url);
  const [serviceSlugs, productSlugs] = await Promise.all([getServiceSlugs(), getProductSlugs()]);
  const paths = ["/", ...serviceSlugs.map((slug) => `/services/${slug}`), ...productSlugs.map((slug) => `/store/${slug}`)];
  after(() => Promise.allSettled(paths.map((path) => fetch(new URL(path, origin), { cache: "no-store" }))));

  return Response.json({ ok: true, publishedAt: new Date().toISOString(), warnings });
}
