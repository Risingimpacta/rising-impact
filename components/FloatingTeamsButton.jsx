"use client";

import Link from "next/link";
import styles from "@/styles/FloatingTeamsButton.module.scss";
import { event } from "@/lib/gtag";

export default function FloatingTeamsButton() {
  const trackClick = () => {
    event({
      action: "teams_meeting_click",
      category: "engagement",
      label: "Floating Button",
    });
  };

  return (
    <Link
      href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1"
      target="_blank"
      className={styles.floatingBtn}
      onClick={trackClick}
    >
      Book Meeting
    </Link>
  );
}
