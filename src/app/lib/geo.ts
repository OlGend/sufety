// src/lib/geo.ts
import { headers, cookies } from "next/headers";

export async function getUserCountry(): Promise<string> {
  // 1) Vercel/edge заголовки
  try {
    const h = await headers();
    const fromHeader =
      h.get("x-vercel-ip-country") ||
      h.get("x-forwarded-country") ||
      h.get("cf-ipcountry");
    if (fromHeader && /^[A-Za-z]{2}$/.test(fromHeader)) {
      console.log("🌍 From header:", fromHeader);
      return fromHeader.toUpperCase();
    }
  } catch {
    // noop
  }
  

  // 2) Фолбэк по куке, если ты её ставишь где-то
  try {
    const c = await cookies();
    const fromCookie = c.get("geo")?.value;
    if (fromCookie && /^[A-Za-z]{2}$/.test(fromCookie)) {
      console.log("🌍 From cookie:", fromCookie);
      return fromCookie.toUpperCase();
    }
  } catch {
    // noop
  }

  // 3) Жёсткий дефолт
  return "CA";
}
