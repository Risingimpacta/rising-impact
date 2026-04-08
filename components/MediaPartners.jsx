"use client";

import React from "react";
import Image from "next/image";
import styles from "@/styles/MediaPartners.module.scss";
import { motion } from "framer-motion";

export default function MediaPartners() {

  const mediaPartners = [
    { file: "/logos/Bloomberg.png", name: "Bloomberg" },
    { file: "/logos/business_insider.png", name: "Business Insider" },
    { file: "/logos/coindesk.png", name: "CoinDesk" },
    { file: "/logos/Cointelegraph.png", name: "CoinTelegraph" },
    { file: "/logos/Decrypt.png", name: "Decrypt" },
    { file: "/logos/entrepreneur.png", name: "Entrepreneur" },
    { file: "/logos/TechCrunch.png", name: "TechCrunch" },
    { file: "/logos/nasdaqnews.png", name: "Nasdaq" },
    { file: "/logos/yahoofinance.png", name: "Yahoo Finance" },
  ];

  // Triple for seamless looping
  const longList = [...mediaPartners, ...mediaPartners, ...mediaPartners];

  return (
    <section className={styles.section} aria-labelledby="media-partners-title">

      {/* Background particles - matching API Partners */}
      <div className={styles.bgParticles} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{ "--i": i }} />
        ))}
      </div>

      <div className={styles.stripWrap}>
        <div className={styles.neonStrip}>MEDIA & PUBLICATIONS</div>
      </div>

      <motion.h2
        id="media-partners-title"
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our Media Partners & Publications
      </motion.h2>

      <div className={styles.subText}>
        Trusted by global publications covering blockchain, Web3 and emerging tech.
      </div>

      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          <motion.div
            className={styles.track}
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          >
            {longList.map((p, idx) => (
              <motion.div
                key={`${p.name}-${idx}`}
                className={styles.logoCard}
                whileHover={{ rotateY: 6, translateY: -6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
              >
                <div className={styles.holo} />
                <Image
                  src={p.file}
                  alt={p.name}
                  className={styles.logo}
                  width={130}
                  height={65}
                  onError={(e) => {
                    e.currentTarget.src = "/logos/placeholder.png";
                  }}
                  unoptimized
                />
                <div className={styles.name}>{p.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}