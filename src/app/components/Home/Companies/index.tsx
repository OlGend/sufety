"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { mergeTracking, type Tracking } from "../../../lib/useTracking";

type Brand = {
  brand: { brand_logo?: string };
  content: { value?: string; our_link?: string };
};

export default function Companies({
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

  const displayed = (brands || []).filter(Boolean).slice(0, 7);

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

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <section id="trusted" className="text-center">
      <div className="container">
        <h6 className="text-midnight_text capitalize">
          We recommend these platforms
        </h6>
        <div className="py-7 border-b">
          <Slider {...settings}>
            {displayed.map((item, idx) => {
              if (!item?.brand?.brand_logo || !item?.content?.our_link)
                return null;

              const sanitizedContent = DOMPurify.sanitize(
                String(item.content.value ?? "")
              );
              const imageSrc = `/images/brands/${item.brand.brand_logo}.png`;
              const url = buildTrackedUrl(item.content.our_link);

              return (
                <div key={idx}>
                  <Link href={url} target="_blank">
                    <Image
                      src={imageSrc}
                      alt={imageSrc}
                      width={230}
                      height={115}
                      className="border-none"
                    />
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}
