"use client";

import styles from "@/styles/MediaPartners.module.scss";
import { motion } from "framer-motion";

export default function MediaPartners() {
  const media = [
    { file: "/logos/Bloomberg.png", name: "Bloomberg" },
    { file: "/logos/business_insider.png", name: "Business Insider" },
    { file: "/logos/coindesk.png", name: "CoinDesk" },
    { file: "/logos/Cointelegraph.png", name: "CoinTelegraph" },
    { file: "/logos/Decrypt.png", name: "Decrypt" },
    { file: "/logos/entrepreneur.png", name: "Entrepreneur" },
    { file: "/logos/nasdaqnews.png", name: "Nasdaq" },
    { file: "/logos/TechCrunch.png", name: "TechCrunch" },
    { file: "/logos/yahoofinance.png", name: "Yahoo Finance" },
  ];

  const longList = [...media, ...media];

  return (
    <section className={styles.section}>
      {/* Floating particles */}
      <div className={styles.bgParticles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{ "--i": i }} />
        ))}
      </div>

      {/* Neon strip */}
        <div className={styles.stripWrap}>
        <div className={styles.neonStrip}>
             MEDIA • FEATURES • COVERAGE
          </div>
        </div>

      {/* Title */}
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Featured In Major Media
      </motion.h2>

      <p className={styles.subtext}>
        Trusted by global publications covering blockchain, Web3 and emerging tech.
      </p>

      {/* Cinematic holo ticker */}
      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          <motion.div
            className={styles.track}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 55,
              repeat: Infinity
            }}
          >
            {longList.map((m, i) => (
              <motion.div
                key={`${m.name}-${i}`}
                className={styles.logoCard}
                whileHover={{ scale: 1.08, rotateY: 8, translateY: -8 }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
              >
                <div className={styles.holo}></div>
                <img
                  src={m.file}
                  alt={m.name}
                  onError={(e) => (e.currentTarget.src = "/media/placeholder.png")}
                  className={styles.logo}
                />
                <div className={styles.name}>{m.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
