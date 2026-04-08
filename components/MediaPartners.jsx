"use client";

import styles from "@/styles/MediaPartners.module.scss";
import { motion } from "framer-motion";

export default function MediaPartners() {
  const media = [
    { file: "Bloomberg.png", name: "Bloomberg" },
    { file: "business_insider.png", name: "Business Insider" },
    { file: "coindesk.png", name: "CoinDesk" },
    { file: "Cointelegraph.png", name: "CoinTelegraph" },
    { file: "Decrypt.png", name: "Decrypt" },
    { file: "Entrepreneur.png", name: "Entrepreneur" },
    { file: "nasdaqnews.png", name: "Nasdaq" },
    { file: "TechCrunch.png", name: "TechCrunch" },
    { file: "yahoofinance.png", name: "Yahoo Finance" },
  ];

  return (
    <section className={styles.section}>

      {/* UNIFIED NEON STRIP */}
      <div className={styles.neonStrip}>MEDIA & PUBLICATIONS</div>

      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our Media Partners & Publications
      </motion.h2>

      <div className={styles.grid}>
        {media.map((m, i) => (
          <motion.div
            key={i}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ rotateY: 10, rotateX: 5, scale: 1.06 }}
          >
            <div className={styles.holo}></div>
            <img src={`/logos/${m.file}`} alt={m.name} className={styles.logo} />
            <div className={styles.name}>{m.name}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
