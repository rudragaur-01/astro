import { createSign } from "node:crypto";

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
const TIMEOUT_MS = 10_000;

export function isSheetConfigured() {
  const { GOOGLE_SHEET_ID, GOOGLE_SHEETS_API_KEY, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  return Boolean(GOOGLE_SHEET_ID && (GOOGLE_SHEETS_API_KEY || (GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY)));
}

const base64url = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${base64url({ alg: "RS256", typ: "JWT" })}.${base64url({
    iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  })}`;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  const signature = createSign("RSA-SHA256").update(unsigned).sign(privateKey, "base64url");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Google auth failed with ${res.status}`);
  return (await res.json()).access_token;
}

// Returns every tab as `{ title, rows }`, where rows are arrays of displayed cell text.
export async function fetchSheetTabs() {
  const url = new URL(`${SHEETS_API}/${process.env.GOOGLE_SHEET_ID}`);
  url.searchParams.set("includeGridData", "true");
  url.searchParams.set("fields", "sheets(properties(title),data(rowData(values(formattedValue))))");

  const headers = {};
  if (process.env.GOOGLE_SHEETS_API_KEY) {
    url.searchParams.set("key", process.env.GOOGLE_SHEETS_API_KEY);
  } else {
    headers.Authorization = `Bearer ${await getAccessToken()}`;
  }

  const res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`Google Sheets request failed with ${res.status}`);
  const { sheets = [] } = await res.json();

  return sheets.map((sheet) => ({
    title: sheet.properties?.title ?? "",
    rows: (sheet.data ?? []).flatMap((grid) =>
      (grid.rowData ?? []).map((row) => (row.values ?? []).map((cell) => cell.formattedValue ?? "")),
    ),
  }));
}
