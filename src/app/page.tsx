import React from "react";
import Hero from "@/app/components/Home/Hero";
import Companies from "@/app/components/Home/Companies";
import Courses from "@/app/components/Home/Courses";
import Newsletter from "@/app/components/Home/Newsletter";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sufety Game VIP" };

// --------- тип для пропсов в Hero/Platform ---------
type BrandPair = {
  brand: { brand_logo: string; casino_brand: string; id?: string | number };
  content: { value: string; our_link: string };
};

export default async function Home() {
  const cookieStore = await cookies();

  const partner_id = cookieStore.get("partnerId")?.value ?? "partner1039";
  const keyword = cookieStore.get("rawKeyword")?.value ?? "";
  const ad_campaign_id = cookieStore.get("ad_campaign_id")?.value ?? "";

  const hottest = `https://born.topbon.us/end/fetch/brand_fetcher.php?partner_id=${encodeURIComponent(
    partner_id
  )}&geo=CA&category=Hottest`;
  const popular = `https://born.topbon.us/end/fetch/brand_fetcher.php?partner_id=${encodeURIComponent(
    partner_id
  )}&geo=CA&category=Popular`;
  const vip = `https://born.topbon.us/end/fetch/brand_fetcher.php?partner_id=${encodeURIComponent(
    partner_id
  )}&geo=CA&category=Vip`;

  const res = await fetch(hottest, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  const data: any[] = await res.json();

  const res2 = await fetch(popular, { next: { revalidate: 300 } });
  if (!res2.ok) throw new Error(`fetch failed: ${res2.status}`);
  const data2: any[] = await res2.json();

  const res3 = await fetch(vip, { next: { revalidate: 300 } });
  if (!res3.ok) throw new Error(`fetch failed: ${res3.status}`);
  const data3: any[] = await res3.json();

  const processedBrandsHottest = processDataNoGeo(data, partner_id);
  const processedBrandsPopular = processDataNoGeo(data2, partner_id);
  const processedBrandsVip = processDataNoGeo(data3, partner_id);

  return (
    <main>
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
function parseJson(v: unknown) {
  if (!v) return null;
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch {
      return null;
    }
  }
  if (typeof v === "object") return v as Record<string, unknown>;
  return null;
}

// type guard, чтобы TS понял, что это BrandPair
function isBrandPair(x: any): x is BrandPair {
  return Boolean(x && x.brand && x.content && x.content.our_link);
}

type LangContent = { geo?: string; value?: string; our_link?: string };
type LangBlock = {
  partner_id?: string;
  our_link?: string;
  content?: LangContent[];
};

function pickLangBlock(
  languages: unknown,
  partnerId: string
): LangBlock | null {
  const arr: LangBlock[] = Array.isArray(languages)
    ? (languages as LangBlock[])
    : typeof languages === "string"
    ? JSON.parse(languages || "[]")
    : [];
  if (!arr.length) return null;
  return (
    arr.find(
      (l) => (l.partner_id || "").toLowerCase() === partnerId.toLowerCase()
    ) ||
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

function processDataNoGeo(
  data: any[],
  partner_id: string,
  geo: string = "CA"
): BrandPair[] {
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
        content: { value: String(c.value ?? ""), our_link },
      };
    })
    .filter(Boolean) as BrandPair[];
}
