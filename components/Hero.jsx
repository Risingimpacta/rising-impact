"use client";

import styles from "@/styles/Hero.module.scss";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ----------------------------------------------------
   Spark Hybrid (neon line + glow + pulse bars)
---------------------------------------------------- */
function SparkHybrid({ data = [], width = 140, height = 36, color = "rgba(52,199,89,1)" }) {
  if (!data || data.length < 2) return null;

  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const up = data[data.length - 1] >= data[0];

  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * w;
      const y = pad + h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const bars = data.slice(-24);
  const barWidth = Math.max(2, Math.floor(w / bars.length / 1.6));

  return (
    <svg width={width} height={height} className={styles.sparkSvg}>
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* AREA */}
      <polygon points={`${points} ${pad + w},${pad + h} ${pad},${pad + h}`} fill="url(#area)" />

      {/* LINE */}
      <polyline fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" points={points} />

      {/* BARS */}
      {bars.map((v, i) => {
        const bh = ((v - Math.min(...bars)) / (Math.max(...bars) - Math.min(...bars) || 1)) * (h - 6);
        return (
          <rect
            key={i}
            x={pad + i * (barWidth + 2)}
            y={pad + (h - bh)}
            width={barWidth}
            height={bh}
            rx={2}
            fill={up ? "rgba(52,199,89,1)" : "rgba(255,59,48,1)"}
            style={{
              animation: `pulseBar 1.6s ${i * 36}ms infinite`,
            }}
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
  const COIN_IDS = [
    "bitcoin","ethereum","binancecoin","ripple","dogecoin",
    "solana","tron","cardano","zcash","bitcoin-cash",
    "stellar","litecoin","shiba-inu","near","internet-computer",
    "aave","ethereum-classic","polygon","tether","usd-coin"
  ];

  const SYMBOL_MAP = {
    bitcoin: "BTC", ethereum: "ETH", binancecoin: "BNB", ripple: "XRP",
    dogecoin: "DOGE", solana: "SOL", tron: "TRX", cardano: "ADA",
    zcash: "ZEC", "bitcoin-cash": "BCH", stellar: "XLM", litecoin: "LTC",
    "shiba-inu": "SHIB", near: "NEAR", "internet-computer": "ICP",
    aave: "AAVE", "ethereum-classic": "ETC", polygon: "MATIC",
    tether: "USDT", "usd-coin": "USDC"
  };

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  // WebSocket live mode toggle
  const [wsLive, setWsLive] = useState(false);
  const wsRef = useRef(null);

  /* ----------------------------------------------------
     Fetch function - uses proxy /api/crypto if available,
     falls back to CoinGecko
  ---------------------------------------------------- */
  async function fetchCoinsREST() {
    // Try local proxy first (recommended)
    const proxyUrl = "/api/crypto";

    try {
      const r = await fetch(proxyUrl, { cache: "no-store" });
      if (r.ok) {
        const json = await r.json();
        if (Array.isArray(json) && json.length) return json;
      }
    } catch (e) {
      // proxy failed -> fallback
      // console.warn("Proxy failed:", e);
    }

    // fallback to CoinGecko directly (may run into rate limits on localhost)
    try {
      const url =
        "https://api.coingecko.com/api/v3/coins/markets" +
        "?vs_currency=usd" +
        "&ids=" + COIN_IDS.join(",") +
        "&order=market_cap_desc&sparkline=true&price_change_percentage=24h";

      const r2 = await fetch(url, { cache: "no-store" });
      const j2 = await r2.json();
      if (Array.isArray(j2)) return j2;
    } catch (e) {
      console.warn("CoinGecko fetch failed:", e);
    }

    // final fallback: empty
    return [];
  }

  /* ----------------------------------------------------
     Initialize / Poll REST (for initial load, and when WS disabled)
  ---------------------------------------------------- */
  useEffect(() => {
    let mounted = true;
    let iv;

    async function loadOnceAndRepeat() {
      setLoading(true);
      const arr = await fetchCoinsREST();

      const ordered = COIN_IDS.map((id) =>
        arr.find(c => c.id === id || (c.symbol && c.symbol.toLowerCase() === id))
      ).filter(Boolean);

      if (!mounted) return;
      setCoins(ordered);
      setLoading(false);
    }

    loadOnceAndRepeat();
    iv = setInterval(() => {
      if (!wsLive) loadOnceAndRepeat(); // only poll while websocket not enabled
    }, 15000);

    return () => { mounted = false; clearInterval(iv); };
  }, [wsLive]); // reload when wsLive toggles

  /* ----------------------------------------------------
     Map coin -> Binance pair (for streaming)
     Not all coins must be present; we only subscribe for supported symbols.
     Uses common USDT pairs.
  ---------------------------------------------------- */
  const BINANCE_MAP = {
    BTC: "btcusdt",
    ETH: "ethusdt",
    BNB: "bnbusdt",
    XRP: "xrpusdt",
    DOGE: "dogeusdt",
    SOL: "solusdt",
    TRX: "trxusdt",
    ADA: "adausdt",
    ZEC: "zecusdt",
    BCH: "bchusdt",
    XLM: "xlmusdt",
    LTC: "ltcusdt",
    SHIB: "shibusdt",
    NEAR: "nearusdt",
    ICP: "icpusdt",
    AAVE: "aaveusdt",
    ETC: "etcusdt",
    MATIC: "maticusdt",
    USDT: "usdtusdt", // nonsense but we won't subscribe stablecoins
    USDC: "usdcusdt"
  };

  /* ----------------------------------------------------
     Start / stop Binance WebSocket subscription
     - subscribes to <symbol>@miniTicker streams
     - updates coins state with incoming price
  ---------------------------------------------------- */
  useEffect(() => {
    // if wsLive false -> ensure closed
    if (!wsLive) {
      if (wsRef.current) {
        try { wsRef.current.close(); } catch (_) {}
        wsRef.current = null;
      }
      return;
    }

    // build list of binance symbols to subscribe from current coins or default map
    const subscribeSymbols = [];
    // prefer coins array (loaded) else use default map keys
    const candidates = coins.length ? coins : COIN_IDS.map(id => ({ id }));

    candidates.forEach((c) => {
      const id = c.id;
      const sym = (SYMBOL_MAP[id] || (c.symbol || "").toUpperCase()).toUpperCase();
      const pair = BINANCE_MAP[sym];
      if (pair && !subscribeSymbols.includes(pair)) subscribeSymbols.push(pair);
    });

    if (!subscribeSymbols.length) {
      // if none available, try a short list
      subscribeSymbols.push("btcusdt", "ethusdt", "bnbusdt");
    }

    // Binance websocket endpoint
    const wsUrl = "wss://stream.binance.com:9443/ws";
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      // subscribe to miniTicker for each pair
      const params = subscribeSymbols.map((s) => `${s}@miniTicker`);
      const msg = {
        method: "SUBSCRIBE",
        params,
        id: 1,
      };
      ws.send(JSON.stringify(msg));
    };

    ws.onmessage = (ev) => {
      try {
        const payload = JSON.parse(ev.data);

        // Binance miniTicker message has e === '24hrMiniTicker' or '24hrTicker'
        if (payload && payload.e && (payload.e === "24hrMiniTicker" || payload.e === "24hrMiniTicker")) {
          // payload.s is symbol; c is last price; o is open price
          const pair = (payload.s || "").toLowerCase(); // e.g., BTCUSDT -> btcusdt
          const last = Number(payload.c);
          const open = Number(payload.o);
          const changePct = open ? ((last - open) / open) * 100 : 0;

          // find matching coin in coins by BINANCE_MAP
          setCoins(prev => {
            // clone shallow
            const copy = prev.map(item => ({ ...item }));
            for (let i = 0; i < copy.length; i++) {
              const id = copy[i].id;
              const sym = (SYMBOL_MAP[id] || (copy[i].symbol || "").toUpperCase()).toUpperCase();
              const mapped = BINANCE_MAP[sym];
              if (mapped && mapped.toLowerCase() === pair) {
                // update price fields (choose keys your UI expects: price, change24h, sparkline left unchanged)
                copy[i].price = last;
                copy[i].current_price = last; // some code expects this
                // approximate percent field
                copy[i].change24h = changePct;
                copy[i].price_change_percentage_24h = changePct;
                // leave sparkline alone
                break;
              }
            }
            return copy;
          });
        }
      } catch (e) {
        // ignore parse errors for other messages
      }
    };

    ws.onerror = (err) => {
      console.warn("WS error:", err);
    };

    ws.onclose = () => {
      wsRef.current = null;
      // if wsLive still true, attempt reconnect after short delay
      if (wsLive) {
        setTimeout(() => {
          if (wsRef.current === null) setWsLive(false); // disable ws so UI falls back to REST; user can re-enable
        }, 3000);
      }
    };

    return () => {
      try { ws.close(); } catch (_) {}
      wsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsLive, coins.length]); // re-run if user toggles or coins list changes (for subscriptions)

  /* ----------------------------------------------------
     Helper: pick image
  ---------------------------------------------------- */
  function getCoinLogo(c) {
    if (!c) return "";
    // coinGecko returns `image` or `large`; coinstats returns `icon` or `logo`
    return c.image || c.icon || c.logo || `https://assets.coingecko.com/coins/images/1/large/bitcoin.png`;
  }

  /* ----------------------------------------------------
     Split into rows for multi-row ticker
  ---------------------------------------------------- */
  const row1 = coins.slice(0, 10);
  const row2 = coins.slice(10, 20);

  /* ----------------------------------------------------
     Helper: readable price (uses different fields depending on source)
  ---------------------------------------------------- */
  function formatPrice(c) {
    const price = (c.current_price ?? c.price ?? c.market_cap ?? c.last_price ?? c.current) || 0;
    try { return `$${Number(price).toLocaleString()}`; } catch { return `--`; }
  }

  /* ----------------------------------------------------
     UI
  ---------------------------------------------------- */
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
  <a className={styles.heroBtn} href="#" target="_blank">
    Book a Meeting
  </a>

  <button
    className={`${styles.heroBtn} ${wsLive ? styles.wsOn : styles.wsOff}`}
    onClick={() => setWsLive(v => !v)}
  >
    {wsLive ? "Live WS Mode: ON" : "Live WS Mode: OFF"}
  </button>
</div>

      </motion.div>

      {/* MULTI-ROW TICKER */}
      <div className={styles.multiTicker}>

        {/* ROW 1 → left scroll */}
        <div className={`${styles.row} ${styles.rowLeft}`}>
          {(!row1.length ? new Array(6).fill({id:"loading"}).map((_,i)=>({id:`loading-${i}`})) : [...row1, ...row1]).map((c, i) => {
            const sym = SYMBOL_MAP[c.id] || (c.symbol || "").toUpperCase() || "??";
            const up = Number(c.price_change_percentage_24h ?? c.change24h ?? 0) >= 0;
            const spark = c.sparkline_in_7d?.price || c.sparkline || [];
            return (
              <div key={`r1-${i}`} className={styles.tickerItem}>
                <div className={styles.symbolRow}>
                  <div className={styles.coinHolo}>
                    <img src={getCoinLogo(c)} alt={sym} className={styles.coinImg} />
                  </div>
                  <div className={styles.symbol}>{sym}</div>
                </div>

                <div className={styles.price}>
                  {formatPrice(c)}
                  <span className={up ? styles.up : styles.down}>
                    {up ? "▲" : "▼"} {Math.abs(Number(c.price_change_percentage_24h ?? c.change24h ?? 0)).toFixed(2)}%
                  </span>
                </div>

                <div className={styles.sparkWrap}>
                  <SparkHybrid data={spark.slice(-32)} color={up ? "rgba(52,199,89,1)" : "rgba(255,59,48,1)"} width={120} height={36} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ROW 2 → right scroll */}
        <div className={`${styles.row} ${styles.rowRight}`}>
          {(!row2.length ? new Array(6).fill({id:"loading"}).map((_,i)=>({id:`loading2-${i}`})) : [...row2, ...row2]).map((c, i) => {
            const sym = SYMBOL_MAP[c.id] || (c.symbol || "").toUpperCase() || "??";
            const up = Number(c.price_change_percentage_24h ?? c.change24h ?? 0) >= 0;
            const spark = c.sparkline_in_7d?.price || c.sparkline || [];
            return (
              <div key={`r2-${i}`} className={styles.tickerItem}>
                <div className={styles.symbolRow}>
                  <div className={styles.coinHolo}>
                    <img src={getCoinLogo(c)} alt={sym} className={styles.coinImg} />
                  </div>
                  <div className={styles.symbol}>{sym}</div>
                </div>

                <div className={styles.price}>
                  {formatPrice(c)}
                  <span className={up ? styles.up : styles.down}>
                    {up ? "▲" : "▼"} {Math.abs(Number(c.price_change_percentage_24h ?? c.change24h ?? 0)).toFixed(2)}%
                  </span>
                </div>

                <div className={styles.sparkWrap}>
                  <SparkHybrid data={spark.slice(-32)} color={up ? "rgba(52,199,89,1)" : "rgba(255,59,48,1)"} width={120} height={36} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
