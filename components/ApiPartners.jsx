"use client";

import React from "react";
import styles from "@/styles/ApiPartners.module.scss";
import { motion } from "framer-motion";

export default function ApiPartners({ logos = null }) {
  const partners = logos || [
    { file: "/logos/Moralis.png", name: "Moralis" },
    { file: "/logos/CoinGecko.png", name: "CoinGecko" },
    { file: "/logos/alchemy.png", name: "Alchemy" },
    { file: "/logos/Infura.png", name: "Infura" },
    { file: "/logos/quicknode.png", name: "QuickNode" },
    { file: "/logos/Chainlink.png", name: "Chainlink" },
    { file: "/logos/Coinbase.png", name: "Coinbase Cloud" },
    { file: "/logos/Kraken.png", name: "Kraken API" }
  ];

  const longList = [...partners, ...partners];

  return (
    <section className={styles.section} aria-labelledby="api-partners-title">
      
      {/* Background particles */}
      <div className={styles.bgParticles} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{ "--i": i }} />
        ))}
      </div>

      <div className={styles.stripWrap}>
        <div className={styles.neonStrip}>API PROVIDER PARTNERS</div>
      </div>

      <motion.h2
        id="api-partners-title"
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our API Provider Partners
      </motion.h2>

      <div className={styles.subText}>
        Trusted building blocks we integrate daily — data feeds, nodes, and developer tooling.
      </div>

      {/* Ticker */}
      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          <motion.div
            className={styles.track}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 48, repeat: Infinity }}
          >
            {longList.map((p, idx) => (
              <motion.div
                key={`${p.name}-${idx}`}
                className={styles.logoCard}
                whileHover={{ rotateY: 6, translateY: -6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
              >
                <div className={styles.holo} />
                <img
                  src={p.file}
                  alt={p.name}
                  className={styles.logo}
                  onError={(e) => {
                    e.currentTarget.src = "/logos/placeholder.png";
                  }}
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
