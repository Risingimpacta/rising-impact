"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/HeroIntro.module.scss";

export default function HeroIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className={styles.introWrap}>
      
      {/* PARTICLES behind logo */}
      <div className={styles.particleField}>
        {Array.from({ length: 75 }).map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>

      {/* LOGO + TEXT */}
      <div className={styles.logoWrap}>
        <img
          src="/risingimpactlogo.png"
          alt="Rising Impact Logo"
          className={styles.logo}
        />

        <h1 className={styles.text}>RISING IMPACT</h1>

        <div className={styles.sweep} />
      </div>
    </div>
  );
}
