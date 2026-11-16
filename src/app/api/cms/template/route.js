import { defaultContent, getContent } from "@/lib/cms/load";
import { hasValidSecret } from "@/lib/cms/secret";
import { buildSheetTemplate } from "@/lib/cms/template";

// Used by the sheet's "Website" menu to create tabs. By default the tabs hold
// the live content (code plus sheet edits); `?from=code` uses only the content
// in src/data, for rebuilding the sheet after the code changes.
export async function GET(request) {
  if (!hasValidSecret(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const fromCode = new URL(request.url).searchParams.get("from") === "code";
  const content = fromCode ? defaultContent : await getContent();
  return Response.json({ ok: true, tabs: buildSheetTemplate(content) });
}
