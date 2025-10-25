// lib/useTracking.ts (любой путь, главное "use client" в потребителе)
export type Tracking = { keyword: string; partnerId: string; ad_campaign_id: string };

export function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
}

export function readSearchParam(name: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

export function mergeTracking(initial: Tracking): Tracking {
  // Порядок приоритетов: URL → cookies → initial (сервера)
  const keyword = readSearchParam("keyword") || readCookie("rawKeyword") || initial.keyword || "";
  const partnerId = readSearchParam("source") || readCookie("partnerId") || initial.partnerId || "";
  const ad_campaign_id =
    readSearchParam("ad_campaign_id") || readCookie("ad_campaign_id") || initial.ad_campaign_id || "";
  return { keyword, partnerId, ad_campaign_id };
}
