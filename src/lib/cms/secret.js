import { createHash, timingSafeEqual } from "node:crypto";

const digest = (value) => createHash("sha256").update(value).digest();

export function hasValidSecret(request) {
  const expected = process.env.CMS_SECRET;
  const provided = request.headers.get("x-cms-secret");
  if (!expected || !provided) return false;
  return timingSafeEqual(digest(provided), digest(expected));
}
