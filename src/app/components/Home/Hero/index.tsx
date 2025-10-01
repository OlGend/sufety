"use client";

import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";
import { mergeTracking, type Tracking } from "../../../lib/useTracking";

import { Icon } from "@iconify/react/dist/iconify.js";
type Brand = {
  brand: { brand_logo?: string };
  content: { value?: string; our_link?: string };
};
export default function Hero({
  brands,
  keyword,
  partnerId,
  ad_campaign_id,
}: {
  brands: Brand[];
  keyword: string;
  partnerId: string;
  ad_campaign_id: string;
}) {
  const [track, setTrack] = useState<Tracking>({
    keyword,
    partnerId,
    ad_campaign_id,
  });
  useEffect(() => {
    setTrack(mergeTracking({ keyword, partnerId, ad_campaign_id }));
  }, [keyword, partnerId, ad_campaign_id]);

  const displayed = (brands || []).filter(Boolean).slice(0, 1);

  const buildTrackedUrl = (base?: string) => {
    if (!base) return "#";
    const params = new URLSearchParams();
    if (track.keyword) params.set("keyword", track.keyword);
    if (track.partnerId) params.set("source", track.partnerId);
    if (track.ad_campaign_id)
      params.set("ad_campaign_id", track.ad_campaign_id);
    const qs = params.toString();
    return qs ? `${base}${base.includes("?") ? "&" : "?"}${qs}` : base;
  };
  return (
    <section id="home-section" className="bg-slate-gray">
      <div className="container pt-16">
        {displayed.map((item, idx) => {
          if (!item?.brand?.brand_logo || !item?.content?.our_link) return null;

          const sanitizedContent = DOMPurify.sanitize(
            String(item.content.value ?? "")
          );
          const imageSrc = `/images/brands/${item.brand.brand_logo}.png`;
          const url = buildTrackedUrl(item.content.our_link);

          return (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 lg:gap-1 gap-10 items-center"
            >
              <div className="col-span-6 flex flex-col gap-8">
                {/* <div className="flex gap-2 mx-auto lg:mx-0">
                  <Icon
                    icon="solar:verified-check-bold"
                    className="text-success text-xl inline-block me-2"
                  />
                  <p className="text-success text-sm font-semibold text-center lg:text-start tracking-widest uppercase">
                    Get 30% off on first enroll
                  </p>
                </div> */}
                <h1 className="text-midnight_text lg:text-start text-center font-semibold leading-tight capitalize">
                  {item.brand.brand_logo} - Your Lucky Break
                </h1>
                <p className="text-black/70 text-lg lg:text-start text-center max-w-xl capitalize">
                  Claim{" "}
                  <span
                    className="text-sky-500"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  />{" "}
                  and start spinning
                </p>
                <div className="relative rounded-full mobdiv">
                  <Link href={url} target="_blank">
                    <Image
                      src={imageSrc}
                      alt={imageSrc}
                      width={250}
                      height={125}
                      loading="lazy"
                      quality={70}
                      placeholder="blur"
                      blurDataURL="/placeholder.png"
                    />
                  </Link>
                  <Link className="mt-3 max-w-[200px] text-center lg:block bg-primary text-white hover:bg-primary/15 hover:text-primary py-2 px-6 rounded-full text-lg font-medium" href={url}>Claim Bonus</Link>
                </div>
                <div className="flex items-center justify-between pt-10 lg:pt-4 flex-wrap gap-4">
                  <div className="flex gap-2">
                    <Image
                      src="/images/banner/check-circle.svg"
                      alt="check-image"
                      width={30}
                      height={30}
                      className="smallImage"
                    />
                    <p className="text-sm sm:text-lg font-normal text-black">
                      Quick Cashout
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Image
                      src="/images/banner/check-circle.svg"
                      alt="check-image"
                      width={30}
                      height={30}
                      className="smallImage"
                    />
                    <p className="text-sm sm:text-lg font-normal text-black">
                      Hot Bonuses
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src="/images/banner/check-circle.svg"
                      alt="check-image"
                      width={30}
                      height={30}
                      className="smallImage"
                    />
                    <p className="text-sm sm:text-lg font-normal text-black">
                      Mega Jackpots
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-6 flex justify-center">
                <Link href={url} target="_blank">
                  <Image
                    src="/images/banner/cas2.png"
                    alt="nothing"
                    width={1000}
                    height={805}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
