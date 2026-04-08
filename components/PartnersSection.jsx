"use client";

import React from "react";
import styles from "@/styles/Partners.module.scss";

/* Replace these with your PNGs in /public/logos/ */
const API_PROVIDERS = [
  { id: "coingecko", name: "CoinGecko", logoUrl: "/logos/CoinGecko.png" },
  { id: "cmc", name: "CoinMarketCap", logoUrl: "/logos/cointelegraph5356.png" },
  { id: "binance", name: "Binance", logoUrl: "/logos/binance-coin-logo-png-transparent.png" },
  { id: "kraken", name: "Kraken", logoUrl: "/logos/kraken.png" },
  { id: "coinbase", name: "Coinbase", logoUrl: "/logos/coinbase.png" },
  { id: "alchemy", name: "Alchemy", logoUrl: "/logos/alchemy.png" },
  { id: "infura", name: "Infura", logoUrl: "/logos/Infura.png" },
  { id: "moralis", name: "Moralis", logoUrl: "/logos/moralis.png" },
  { id: "chainlink", name: "Chainlink", logoUrl: "/logos/Chainlink.png" },
  { id: "quicknode", name: "QuickNode", logoUrl: "/logos/QuickNode.png" },
];

export default function PartnersSection() {
  return (
    <section className={styles.partnersSection} aria-labelledby="partners-heading">
      <div className={styles.container}>
        <h3 id="partners-heading" className={styles.sectionTitle}>Trusted API Providers</h3>
        <p className={styles.sectionSub}>Top crypto API providers we integrate with</p>

        <div className={styles.tickerWrap} aria-hidden="false">
          <div className={styles.tickerTrack}>
            {API_PROVIDERS.map((p) => (
              <div key={p.id} className={styles.logoCard} title={p.name}>
                <div className={styles.logoWrap}>
                  <img src={p.logoUrl} alt={p.name} className={styles.logoImg} />
                </div>
                <div className={styles.logoName}>{p.name}</div>
              </div>
            ))}
            {API_PROVIDERS.map((p) => (
              <div key={`dup-${p.id}`} className={styles.logoCard} title={p.name}>
                <div className={styles.logoWrap}>
                  <img src={p.logoUrl} alt={p.name} className={styles.logoImg} />
                </div>
                <div className={styles.logoName}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
