// components/TrackPageView.jsx
"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { pageview, trackScrollDepth, trackTimeOnPage } from "@/lib/gtag";

export default function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageLoadTime = useRef(Date.now());
  const scrollTracked = useRef(new Set());

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // Track page view
    pageview(url, document.title);

    // Track time on page when user leaves
    return () => {
      const timeSpent = Math.round((Date.now() - pageLoadTime.current) / 1000);
      trackTimeOnPage(pathname, timeSpent);
    };
  }, [pathname, searchParams]);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track at 25%, 50%, 75%, 90%
      const milestones = [25, 50, 75, 90];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollTracked.current.has(milestone)) {
          trackScrollDepth(milestone);
          scrollTracked.current.add(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}