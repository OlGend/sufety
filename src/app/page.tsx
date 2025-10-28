import React from "react";
import Hero from "@/app/components/Home/Hero";
import Companies from "@/app/components/Home/Companies";
import Courses from "@/app/components/Home/Courses";
import Newsletter from "@/app/components/Home/Newsletter";
// import Frame from "@/app/components/Frame";
import { getUserCountry } from "../app/lib/geo";
import { CookieWriter } from "@/app/components/CookieWriter";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sufety Game VIP" };
export const dynamic = "force-dynamic"; // не валим билд, если внешка шатает

// --------- тип для пропсов в Hero/Frame/др. ---------
type BrandPair = {
  brand: { brand_logo: string; casino_brand: string; id?: string | number };
  content: { value: string; our_link: string; geo: string };
};

const ALLOWED = ["partner1039", "partner1043", "partner1044", "partner1045", "partnerCLD"];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ partner?: string; keyword?: string; ad_campaign_id?: string }>;
}) {
  const sp = (await searchParams) || {};
  const cookieStore = await cookies();

  // Приоритет: URL → cookies → fallback
  const urlPartner = sp.partner && ALLOWED.includes(sp.partner) ? sp.partner : null;

  const partner_id = urlPartner || cookieStore.get("partnerId")?.value || "partner1000";
  const keyword = sp.keyword || cookieStore.get("rawKeyword")?.value || "";
  const ad_campaign_id = sp.ad_campaign_id || cookieStore.get("ad_campaign_id")?.value || "";

  const geo = await getUserCountry();

  const buildUrl = (category: string) =>
    `https://born.topbon.us/end/fetch/brand_fetcher.php?partner_id=${encodeURIComponent(
      partner_id
    )}&geo=${geo}&category=${category}`;

  const safeFetch = async (url: string) => {
    try {
      const r = await fetch(url, { next: { revalidate: 300 } });
      if (!r.ok) return [];
      const json = await r.json();
      return Array.isArray(json) ? json : [];
    } catch {
      return [];
    }
  };

  const [dataHottest, dataPopular, dataVip] = await Promise.all([
    safeFetch(buildUrl("Hottest")),
    safeFetch(buildUrl("Popular")),
    safeFetch(buildUrl("Vip")),
  ]);

  const processedBrandsHottest = processDataNoGeo(dataHottest, partner_id, geo);
  const processedBrandsPopular = processDataNoGeo(dataPopular, partner_id, geo);
  const processedBrandsVip = processDataNoGeo(dataVip, partner_id, geo);

  return (
    <main>
      <CookieWriter />

      {/* <Frame
        brands={processedBrandsVip}
        keyword={keyword}
        partnerId={partner_id}
        adCampaignId={ad_campaign_id}
      /> */}

      <Hero
        brands={processedBrandsHottest}
        keyword={keyword}
        partnerId={partner_id}
        ad_campaign_id={ad_campaign_id}
      />

      <Companies
        brands={processedBrandsPopular}
        keyword={keyword}
        partnerId={partner_id}
        ad_campaign_id={ad_campaign_id}
      />

      <Courses
        brands={processedBrandsVip}
        keyword={keyword}
        partnerId={partner_id}
        ad_campaign_id={ad_campaign_id}
      />

      <Newsletter />
    </main>
  );
}

// ---------- helpers ----------
type LangContent = { geo?: string; value?: string; our_link?: string };
type LangBlock = {
  partner_id?: string;
  our_link?: string;
  content?: LangContent[];
};

function pickLangBlock(languages: unknown, partnerId: string): LangBlock | null {
  const arr: LangBlock[] = Array.isArray(languages)
    ? (languages as LangBlock[])
    : typeof languages === "string"
    ? JSON.parse(languages || "[]")
    : [];
  if (!arr.length) return null;
  return (
    arr.find((l) => (l.partner_id || "").toLowerCase() === partnerId.toLowerCase()) ||
    arr.find((l) => (l.partner_id || "").toLowerCase() === "partner1039") ||
    arr[0] ||
    null
  );
}

function pickContent(block: LangBlock | null, geo: string): LangContent | null {
  if (!block?.content?.length) return null;
  const G = geo.toUpperCase();
  return (
    block.content.find((c) => (c.geo || "").toUpperCase() === G) ||
    block.content.find((c) => (c.geo || "").toUpperCase() === "ALL") ||
    block.content[0] ||
    null
  );
}

function processDataNoGeo(data: any[], partner_id: string, geo: string = "CA"): BrandPair[] {
  if (!Array.isArray(data)) return [];
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled
    .map((brand: any) => {
      const block = pickLangBlock(brand?.languages, partner_id);
      if (!block) return null;
      const c = pickContent(block, geo);
      if (!c) return null;
      const our_link = String(c.our_link || block.our_link || "");
      if (!our_link) return null;
      return {
        brand: {
          brand_logo: String(brand?.brand_logo ?? ""),
          casino_brand: String(brand?.casino_brand ?? ""),
        },
        content: {
          value: String(c.value ?? ""),
          our_link,
          geo: String(c.geo ?? "ALL"),
        },
      };
    })
    .filter(Boolean) as BrandPair[];
}
