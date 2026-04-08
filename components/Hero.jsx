"use client";

import Image from "next/image";
import styles from "@/styles/Hero.module.scss";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// SYMBOL_MAP - Maps coin IDs to display symbols
const SYMBOL_MAP = {
  bitcoin: "BTC",
  ethereum: "ETH",
  binancecoin: "BNB",
  ripple: "XRP",
  dogecoin: "DOGE",
  solana: "SOL",
  tron: "TRX",
  cardano: "ADA",
  zcash: "ZEC",
  "bitcoin-cash": "BCH",
  stellar: "XLM",
  litecoin: "LTC",
  "shiba-inu": "SHIB",
  near: "NEAR",
  "internet-computer": "ICP",
  aave: "AAVE",
  "ethereum-classic": "ETC",
  polygon: "MATIC",
  tether: "USDT",
  usdcoin: "USDC",
};

// COIN_IDS - List of cryptocurrencies to fetch
const COIN_IDS = [
  "bitcoin", "ethereum", "binancecoin", "ripple", "dogecoin",
  "solana", "tron", "cardano", "zcash", "bitcoin-cash",
  "stellar", "litecoin", "shiba-inu", "near", "internet-computer",
  "aave", "ethereum-classic", "polygon"
];

// ✅ FIX 1: Static sample data (no Math.random during render)
const SAMPLE_SPARKLINE = [45, 48, 52, 49, 55, 58, 62, 60, 65, 68, 72, 70, 75, 78, 82, 85, 88, 86, 90, 92, 95, 98, 96, 100, 102, 105, 108, 110, 112, 115];

// Fallback data in case API fails
const FALLBACK_COINS = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 65000, price_change_percentage_24h: 2.5, image: "/logos/placeholder.png", sparkline_in_7d: { price: SAMPLE_SPARKLINE } },
  { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 3500, price_change_percentage_24h: 1.8, image: "/logos/placeholder.png", sparkline_in_7d: { price: SAMPLE_SPARKLINE } },
  { id: "solana", symbol: "sol", name: "Solana", current_price: 180, price_change_percentage_24h: -1.2, image: "/logos/placeholder.png", sparkline_in_7d: { price: SAMPLE_SPARKLINE } },
  { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 580, price_change_percentage_24h: 0.5, image: "/logos/placeholder.png", sparkline_in_7d: { price: SAMPLE_SPARKLINE } },
  { id: "ripple", symbol: "xrp", name: "XRP", current_price: 0.52, price_change_percentage_24h: -0.8, image: "/logos/placeholder.png", sparkline_in_7d: { price: SAMPLE_SPARKLINE } },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", current_price: 0.12, price_change_percentage_24h: 3.2, image: "/logos/placeholder.png", sparkline_in_7d: { price: SAMPLE_SPARKLINE } }
];

/* ----------------------------------------------------
   Spark Hybrid (neon line + glow + pulse bars)
---------------------------------------------------- */
function SparkHybrid({ data = [], width = 140, height = 36, color = "rgba(52,199,89,1)" }) {
  // Use provided data or fallback to static sample data
  const sparkData = data.length >= 2 ? data : SAMPLE_SPARKLINE;
  
  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const min = Math.min(...sparkData);
  const max = Math.max(...sparkData);
  const range = max - min || 1;
  const up = sparkData[sparkData.length - 1] >= sparkData[0];

  const points = sparkData
    .map((v, i) => {
      const x = pad + (i / (sparkData.length - 1)) * w;
      const y = pad + h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const bars = sparkData.slice(-24);
  const barWidth = Math.max(2, Math.floor(w / bars.length / 1.6));

  return (
    <svg width={width} height={height} className={styles.sparkSvg}>
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <polygon points={`${points} ${pad + w},${pad + h} ${pad},${pad + h}`} fill="url(#area)" />
      <polyline fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" points={points} />
      {bars.map((v, i) => {
        const barMin = Math.min(...bars);
        const barMax = Math.max(...bars);
        const barRange = barMax - barMin || 1;
        const bh = ((v - barMin) / barRange) * (h - 6);
        return (
          <rect
            key={i}
            x={pad + i * (barWidth + 2)}
            y={pad + (h - bh)}
            width={barWidth}
            height={bh}
            rx={2}
            fill={up ? "rgba(52,199,89,1)" : "rgba(255,59,48,1)"}
            style={{ animation: `pulseBar 1.6s ${i * 36}ms infinite` }}
          />
        );
      })}
      <style>{`
        @keyframes pulseBar {
          0% {opacity:1; transform:scaleY(1);}
          50% {opacity:0.6; transform:scaleY(1.15);}
          100% {opacity:1; transform:scaleY(1);}
        }
      `}</style>
    </svg>
  );
}

/* ----------------------------------------------------
   HERO MAIN
---------------------------------------------------- */
export default function Hero() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wsLive, setWsLive] = useState(false);
  const wsRef = useRef(null);

  /* ----------------------------------------------------
     Fetch function using local API endpoint
  ---------------------------------------------------- */
  const fetchCoinsREST = useCallback(async () => {
    try {
      const response = await fetch("/api/crypto", {
        cache: "no-store"
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      throw new Error("No data received");
    } catch (error) {
      console.warn("Local API fetch failed:", error);
      return FALLBACK_COINS;
    }
  }, []);

  /* ----------------------------------------------------
     Initialize and refresh data
  ---------------------------------------------------- */
  useEffect(() => {
    let mounted = true;
    let intervalId;

    async function loadData() {
      if (!mounted) return;
      
      setLoading(true);
      setError(false);
      
      const data = await fetchCoinsREST();
      
      if (!mounted) return;
      
      if (data && data.length > 0) {
        const ordered = COIN_IDS.map(id => data.find(c => c.id === id)).filter(Boolean);
        setCoins(ordered.length > 0 ? ordered : data.slice(0, 12));
        setError(false);
      } else {
        setError(true);
        setCoins(FALLBACK_COINS);
      }
      
      setLoading(false);
    }

    loadData();
    
    intervalId = setInterval(() => {
      if (!wsLive) {
        loadData();
      }
    }, 30000);

    return () => {
      mounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchCoinsREST, wsLive]);

  /* ----------------------------------------------------
     Helper functions
  ---------------------------------------------------- */
  function getCoinLogo(c) {
    if (!c) return "/logos/placeholder.png";
    return c.image || c.icon || c.logo || "/logos/placeholder.png";
  }

  function formatPrice(c) {
    const price = c.current_price || c.price || 0;
    if (price === 0) return "$--";
    return `$${Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function getPriceChange(c) {
    const change = c.price_change_percentage_24h || c.change24h || 0;
    return change;
  }

  const row1 = coins.slice(0, 10);
  const row2 = coins.slice(10, 20);

  return (
    <section className={styles.hero}>
      <div className={styles.grid}></div>
      <div className={styles.orb}></div>
      <div className={styles.rays}></div>
      <div className={styles.beam}></div>

      <div className={styles.particleField}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className={styles.particle}></div>
        ))}
      </div>

      <div className={styles.shards}>
        <div className={styles.shard1}></div>
        <div className={styles.shard2}></div>
        <div className={styles.shard3}></div>
      </div>

      <div className={styles.fog}></div>
      <div className={styles.fog2}></div>
      <div className={styles.fog3}></div>

      <motion.div className={styles.inner} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={styles.title}>
          <span>Rising Impact</span><br />
          Building the Future of Digital Innovation
        </h1>

        <p className={styles.tagline}>Web3 • Blockchain • Digital Solutions • Web Development</p>

        <p className={styles.sub}>High-performance platforms for DeFi, DEXs, SaaS, E-Commerce & enterprise systems.</p>

        <div className={styles.buttonRow}>
          <a className={styles.heroBtn} href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1" target="_blank" rel="noopener noreferrer">
            Book a Meeting
          </a>
          <button className={`${styles.heroBtn} ${wsLive ? styles.wsOn : styles.wsOff}`} onClick={() => setWsLive(v => !v)}>
            {wsLive ? "Live WS Mode: ON" : "Live WS Mode: OFF"}
          </button>
        </div>
      </motion.div>

      {/* Crypto Ticker */}
      <div className={styles.multiTicker}>
        {loading ? (
          <div className={styles.loadingTicker}>Loading market data...</div>
        ) : error ? (
          <div className={styles.errorTicker}>Market data temporarily unavailable</div>
        ) : (
          <>
            {/* ROW 1 */}
            <div className={`${styles.row} ${styles.rowLeft}`}>
              {row1.map((c, i) => {
                const sym = SYMBOL_MAP[c.id] || (c.symbol || "").toUpperCase() || "???";
                const change = getPriceChange(c);
                const up = change >= 0;
                const spark = c.sparkline_in_7d?.price || [];
                
                return (
                  <div key={`r1-${c.id}-${i}`} className={styles.tickerItem}>
                    <div className={styles.symbolRow}>
                      <div className={styles.coinHolo}>
                        {/* ✅ FIX 2: Use Next.js Image component with unoptimized for external URLs */}
                        <Image 
                          src={getCoinLogo(c)} 
                          alt={sym} 
                          className={styles.coinImg} 
                          width={40} 
                          height={40}
                          unoptimized
                        />
                      </div>
                      <div className={styles.symbol}>{sym}</div>
                    </div>
                    <div className={styles.price}>
                      {formatPrice(c)}
                      <span className={up ? styles.up : styles.down}>
                        {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
                      </span>
                    </div>
                    <div className={styles.sparkWrap}>
                      <SparkHybrid data={spark.slice(-32)} color={up ? "rgba(52,199,89,1)" : "rgba(255,59,48,1)"} width={120} height={36} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ROW 2 */}
            <div className={`${styles.row} ${styles.rowRight}`}>
              {row2.map((c, i) => {
                const sym = SYMBOL_MAP[c.id] || (c.symbol || "").toUpperCase() || "???";
                const change = getPriceChange(c);
                const up = change >= 0;
                const spark = c.sparkline_in_7d?.price || [];
                
                return (
                  <div key={`r2-${c.id}-${i}`} className={styles.tickerItem}>
                    <div className={styles.symbolRow}>
                      <div className={styles.coinHolo}>
                        {/* ✅ FIX 2: Use Next.js Image component with unoptimized for external URLs */}
                        <Image 
                          src={getCoinLogo(c)} 
                          alt={sym} 
                          className={styles.coinImg} 
                          width={40} 
                          height={40}
                          unoptimized
                        />
                      </div>
                      <div className={styles.symbol}>{sym}</div>
                    </div>
                    <div className={styles.price}>
                      {formatPrice(c)}
                      <span className={up ? styles.up : styles.down}>
                        {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
                      </span>
                    </div>
                    <div className={styles.sparkWrap}>
                      <SparkHybrid data={spark.slice(-32)} color={up ? "rgba(52,199,89,1)" : "rgba(255,59,48,1)"} width={120} height={36} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}