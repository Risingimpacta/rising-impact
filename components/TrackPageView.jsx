"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
