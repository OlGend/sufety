"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../Header/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FooterLinkType } from "@/app/types/footerlink";

const Footer = () => {
  const [footerlink, SetFooterlink] = useState<FooterLinkType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        SetFooterlink(data.FooterLinkData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="bg-deep-slate pt-10">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-6 lg:gap-20 md:gap-24 sm:gap-12 gap-12 pb-10">
          <div className="col-span-2">
            <div className="mb-10">
              <Logo />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex gap-20">
              {footerlink.map((product, i) => (
                <div key={i} className="group relative col-span-2">
                  <p className="text-black text-xl font-semibold mb-9">
                    {product.section}
                  </p>
                  <ul>
                    {product.links.map((item, i) => (
                      <li key={i} className="mb-3">
                        <Link
                          href={item.href}
                          className="text-black/60 hover:text-primary text-base font-normal mb-6"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

      
            </div>
          </div>
        </div>

        <div className="mt-10 lg:flex items-center justify-between border-t border-black/10 py-5">
          <p className="text-black/50 text-base text-center lg:text-center font-normal">
            Copyright © 2025, jackpotrealm.pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
