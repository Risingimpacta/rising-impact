"use client";

import Image from "next/image";
import styles from "@/styles/ApiPartners.module.scss";
import { motion } from "framer-motion";

export default function ApiPartners() {
  const apis = [
    { file: "Moralis.png", name: "Moralis" },
    { file: "CoinGecko.png", name: "CoinGecko" },
    { file: "alchemy.png", name: "Alchemy" },
    { file: "Infura.png", name: "Infura" },
    { file: "quicknode.png", name: "QuickNode" },
    { file: "Chainlink.png", name: "Chainlink" },
    { file: "Coinbase.png", name: "Coinbase Cloud" },
    { file: "Kraken.png", name: "Kraken API" },
  ];

  return (
    <section className={styles.section}>
      {/* UNIFIED NEON STRIP */}
      <div className={styles.neonStrip}>API PROVIDER PARTNERS</div>

      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our API Provider Partners
      </motion.h2>

      <div className={styles.ticker}>
        <motion.div
          className={styles.track}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[...apis, ...apis].map((p, i) => (
            <motion.div
              key={i}
              className={styles.logoCard}
              whileHover={{ rotateY: 15, rotateX: 8, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 140, damping: 12 }}
            >
              <div className={styles.holo}></div>
              <Image 
                src={`/logos/${p.file}`} 
                alt={p.name} 
                className={styles.logo} 
                width={100}
                height={60}
                unoptimized
              />
              <div className={styles.name}>{p.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}