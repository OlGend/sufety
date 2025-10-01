"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CourseType } from "@/app/types/course";
import CourseSkeleton from "../../Skeleton/Course";
import DOMPurify from "isomorphic-dompurify";

import { mergeTracking, type Tracking } from "../../../lib/useTracking";

type Brand = {
  brand: { brand_logo?: string };
  content: { value?: string; our_link?: string };
};

export default function Courses({
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
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div>
        {Array(fullStars).fill(
          <Icon
            icon="tabler:star-filled"
            className="text-yellow-500 text-xl inline-block"
          />
        )}
        {halfStars > 0 && (
          <Icon
            icon="tabler:star-half-filled"
            className="text-yellow-500 text-xl inline-block"
          />
        )}
        {Array(emptyStars).fill(
          <Icon
            icon="tabler:star-filled"
            className="text-gray-400 text-xl inline-block"
          />
        )}
      </div>
    );
  };

  return (
    <section id="courses" className="scroll-mt-12 pb-20">
      <div className="container">
        <div className="sm:flex justify-between items-center mb-10">
          <h2 className="text-midnight_text mb-5 sm:mb-0 capitalize">
            Popular Casinos
          </h2>
   
        </div>
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
                <div className="bg-white m-3 px-3 pt-3 pb-12 shadow-md rounded-2xl h-full border border-black/10 capitalize">
                  <div className="relative rounded-3xl">
                    <div className="rounded-2xl">
                      <Link href={url} target="_blank">
                        <Image
                          src={imageSrc}
                          alt={imageSrc}
                          width={389}
                          height={262}
                          className="w-full rounded-2xl"
                        />
                      </Link>
                    </div>
                    <Link href={url} target="_blank">
                      <div className="absolute right-5 -bottom-3 bg-secondary rounded-full p-4">
                        <p className="text-white uppercase text-center text-sm font-medium">
                          best choice
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="px-3 pt-6">
                    <Link href={url} target="_blank">
                      <h6 className="text-black max-w-75% inline-block hover:text-primary">
                        {item.brand.brand_logo}
                      </h6>
                    </Link>

                    <div className="flex justify-between items-center py-6 border-b">
                      <div className="flex items-center gap-4">
                        <p
                          className="text-cyan text-1xl font-medium"
                          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between pt-6">
                      <div className="flex gap-4">
                        <Link
                          className="hidden max-w-[200px] text-center lg:block bg-primary text-white hover:bg-primary/15 hover:text-primary py-2 px-6 rounded-full text-lg font-medium"
                          href={url}
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
