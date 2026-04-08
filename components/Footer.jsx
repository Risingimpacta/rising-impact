"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Footer.module.scss";

/* ===== Tiny SVG icons (inline) ===== */
function Icon({ name }) {
  switch (name) {
    case "instagram":
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6-2a1.2 1.2 0 11-1.2 1.2A1.2 1.2 0 0118 5z"/>
        </svg>
      );
    case "facebook":
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 3h4V0h-4c-3.3 0-6 2.7-6 6v3H4v4h3v11h4V13h3l1-4h-4V6a2 2 0 012-2z"/>
        </svg>
      );
    case "twitter":
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 4.5a10 10 0 01-2.8.8A4.8 4.8 0 0023.3 3a9.6 9.6 0 01-3 1.2A4.9 4.9 0 0016.6 3a4.8 4.8 0 00-4.8 4.8c0 .4 0 .8.1 1.1A13.6 13.6 0 011.7 3.1a4.8 4.8 0 001.5 6.4A4.8 4.8 0 01.9 9v.1a4.8 4.8 0 003.8 4.7 4.7 4.7 0 01-2.2.1A4.8 4.8 0 007 16a9.8 9.8 0 01-6 2A13.6 13.6 0 008.3 20C17 20 22 13.1 22 7.3v-.6A9.5 9.5 0 0024 4.5z"/>
        </svg>
      );
    case "youtube":
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.2 3.5 12 3.5 12 3.5s-7.2 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c2.2.6 9.4.6 9.4.6s7.2 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.8 15.5V8.5L16 12z"/>
        </svg>
      );
    case "telegram":
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9.5 14.7l-.4 5.3c.6 0 .8-.3 1.1-.6l2.6-2.5 5.4 4c1 .6 1.7.3 2-.9L24 4.5c.3-1.2-.4-1.7-1.3-1.4L1.6 10.7C.4 11.2.4 12 .9 12.3l5.4 1.7 12.6-7.9c.6-.4.9-.2.5.2L9.5 14.7z"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1 5 2 5 3.5zM0 8h5v13H0zm7 0h4.8v1.8h.1c.7-1.3 2.4-2.3 4.6-2.3C22.3 7.5 24 10 24 14.1V21h-5v-6.3c0-1.5-.1-3.5-2.3-3.5-2.3 0-2.7 1.7-2.7 3.4V21H7z"/>
        </svg>
      );
    default:
      return null;
  }
}

/* ===== Back to top (rocket) ===== */
function BackToTop() {
  function goTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  return (
    <button
      aria-label="Back to top"
      className={styles.backToTop}
      onClick={goTop}
      title="Back to top"
    >
      🚀
    </button>
  );
}

/* ===== Sparkline small SVG for footer (7-day) ===== */
function Sparkline({ data = [], color = "rgba(255,122,0,1)", width = 160, height = 36 }) {
  if (!Array.isArray(data) || data.length === 0) return null;
  const pad = 6;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1 || 1)) * w;
      const y = pad + h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const up = data[data.length - 1] >= data[0];

  return (
    <svg className={styles.footerSpark} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <defs>
        <linearGradient id="footGrad" x1="0%" x2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
        <filter id="footGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <polyline
        fill="none"
        stroke="url(#footGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        points={points}
        style={{ filter: "url(#footGlow)" }}
      />
      <polyline
        fill="none"
        stroke={up ? "rgba(52,199,89,0.06)" : "rgba(255,59,48,0.06)"}
        strokeWidth="8"
        points={points}
      />
    </svg>
  );
}

/* ===== Footer component ===== */
export default function Footer() {
  const [sentiment, setSentiment] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [globalSpark, setGlobalSpark] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadSentiment() {
      try {
        const res = await fetch("https://api.alternative.me/fng/?limit=1&format=json", { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;
        setSentiment(json.data?.[0] ?? null);
      } catch (e) {
        console.warn("Sentiment fetch failed", e);
      }
    }

    async function loadGlobal() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/global", { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;
        setGlobalData(json.data ?? null);
      } catch (e) {
        console.warn("Global fetch failed", e);
      }
    }

    // Try to fetch a 7-day market cap series. CoinGecko may not have a dedicated route for global chart
    // — we attempt a best-effort route and fallback to a short line from market-cap snapshots.
    async function loadGlobalSpark() {
      try {
        // Preferred attempt (may work on newer CoinGecko deployments)
        const chartRes = await fetch("https://api.coingecko.com/api/v3/global/market_cap_chart?vs_currency=usd&days=7", { cache: "no-store" });
        if (chartRes.ok) {
          const chartJson = await chartRes.json();
          // expect chartJson.market_cap (array of [timestamp, value])
          if (chartJson && Array.isArray(chartJson.market_cap)) {
            const arr = chartJson.market_cap.map((p) => p[1]);
            if (mounted) return setGlobalSpark(arr);
          }
        }
      } catch (e) {
        // ignore and fallthrough to fallback
      }

      // Fallback: fetch BTC 7d market cap as a proxy (still useful visual)
      try {
        const btcChart = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7", { cache: "no-store" });
        if (btcChart.ok) {
          const btcJson = await btcChart.json();
          const arr = (btcJson.market_caps || []).map((p) => p[1]);
          if (mounted && arr.length) setGlobalSpark(arr);
        }
      } catch (e) {
        console.warn("Global spark fallback failed", e);
      }
    }

    loadSentiment();
    loadGlobal();
    loadGlobalSpark();

    const interval = setInterval(() => {
      loadSentiment();
      loadGlobal();
      loadGlobalSpark();
    }, 30_000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Ticker items: create an ordered small summary line array
  const tickerItems = [];
  if (sentiment) {
    tickerItems.push({
      id: "sentiment",
      label: `🧭 Sentiment: ${sentiment.value_classification} (${sentiment.value})`,
    });
  }
  if (globalData) {
    const btcDom = globalData.market_cap_percentage?.btc ?? null;
    const ethDom = globalData.market_cap_percentage?.eth ?? null;
    const totalMcap = globalData.total_market_cap?.usd ?? null;
    const mcapChange = globalData.market_cap_change_percentage_24h_usd ?? null;

    if (btcDom != null) tickerItems.push({ id: "btcdom", label: `🟧 BTC Dom: ${btcDom.toFixed(2)}%` });
    if (ethDom != null) tickerItems.push({ id: "ethdom", label: `🟦 ETH Dom: ${ethDom.toFixed(2)}%` });
    if (totalMcap != null) tickerItems.push({ id: "mcap", label: `💰 M.Cap: $${(totalMcap / 1e9).toFixed(2)}B` });
    if (mcapChange != null) tickerItems.push({ id: "mcapchg", label: `${mcapChange >= 0 ? "📈" : "📉"} ${mcapChange.toFixed(2)}%` });
  }

  // Duplicate tickerItems so the CSS animation can run continuously
  const tickerLoop = [...tickerItems, ...tickerItems];

  return (
    <footer className={styles.footer}>
      {/* Top neon strip (always on top) */}
      <div className={styles.neonStrip}>MEDIA • PARTNERS • POWERED • BY • RISING IMPACT</div>

      {/* decorative layers */}
      <div className={styles.gridBg} aria-hidden></div>
      <div className={styles.shapes}><div className={styles.blob1} /><div className={styles.blob2} /></div>
      <div className={styles.holo} aria-hidden />
      <div className={styles.globeWrap}><div className={styles.globe} /></div>

      {/* main content (4-column layout) */}
      <div className={styles.inner}>
        <div className={styles.column}>
          <h4>Rising Impact</h4>
          <p>High-performance development for modern Web3, Blockchain, SaaS, E-Commerce and enterprise applications.</p>
        </div>

        <div className={styles.column}>
          <h4>Navigation</h4>
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/#demos">Demos</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={styles.column}>
          <h4>Email Us</h4>
          <Link href="mailto:raj@risingimpact.in">raj@risingimpact.in</Link>
          <Link href="mailto:rising_impact@outlook.com">rising_impact@outlook.com</Link>
          <Link href="mailto:risingimpacta@gmail.com">risingimpacta@gmail.com</Link>
          <p className={styles.label}>We respond within 24 hours.</p>

          <h4 style={{ marginTop: 14 }}>Telegram</h4>
          <Link href="https://t.me/risingimpacta" target="_blank">@risingimpacta</Link>
        </div>

        <div className={styles.column}>
          <h4>Social</h4>
          <div className={styles.socialRow}><Icon name="instagram" /><Link href="https://www.instagram.com/risingimpactt" target="_blank">Instagram</Link></div>
          <div className={styles.socialRow}><Icon name="facebook" /><Link href="https://www.facebook.com/Risingimpactt" target="_blank">Facebook</Link></div>
          <div className={styles.socialRow}><Icon name="twitter" /><Link href="https://x.com/Rising_impactt" target="_blank">X</Link></div>
          <div className={styles.socialRow}><Icon name="youtube" /><Link href="https://www.youtube.com/@Rising_Impact" target="_blank">YouTube</Link></div>
          <div className={styles.socialRow}><Icon name="linkedin" /><Link href="https://in.linkedin.com/company/risingimpact" target="_blank">LinkedIn</Link></div>
          <div className={styles.socialRow}><Icon name="telegram" /><Link href="https://t.me/risingimpacta" target="_blank">Telegram</Link></div>

          <a className={styles.cta} href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1" target="_blank">Book a Meeting</a>
        </div>
      </div>

      {/* -----------------------------
          SENTIMENT SCROLLING TICKER (continuous)
         ----------------------------- */}
      <div className={styles.sentimentWrap} aria-live="polite">
        <div className={styles.ticker}>
          {/* duplicated blocks for smooth continuous scroll */}
          <div className={styles.tickerTrack}>
            {tickerLoop.length === 0 ? (
              <span className={styles.tickerText}>Loading market sentiment…</span>
            ) : (
              tickerLoop.map((it, idx) => (
                <div key={`${it.id}-${idx}`} className={styles.tickerItem}>
                  <span className={styles.tickerText}>{it.label}</span>

                  {/* show sparkline on M.Cap item (centered style) */}
                  {it.id === "mcap" && globalSpark.length > 0 && (
                    <div className={styles.sparkWrap}>
                      <Sparkline data={globalSpark} color="rgba(255,122,0,1)" width={140} height={32} />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* bottom neon strip */}
      <div className={styles.neonStripBottom}>© {new Date().getFullYear()} Rising Impact — ALL SYSTEMS ONLINE ✦ POWERED BY WEB3</div>

      {/* back to top rocket */}
      <BackToTop />
    </footer>
  );
}
