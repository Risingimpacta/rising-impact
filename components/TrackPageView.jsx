"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "@/lib/gtag"; // Changed from pageView to pageview

export default function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.location.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += "?" + search;
      }
      
      pageview(url); // Changed from pageView to pageview
    }
  }, [pathname, searchParams]);

  return null;
}