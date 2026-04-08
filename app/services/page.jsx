"use client";

import React, { useRef, useMemo, useState, Suspense, useEffect } from "react";
import styles from "@/styles/ServicesPage.module.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, useTexture, OrbitControls, Instances, Instance } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Noise } from "@react-three/postprocessing";
import { motion } from "framer-motion";

/* Services list — use PNG logos */
const SERVICES = [
  { key: "web", title: "Web Development", desc: "Blazing-fast, SEO-optimized websites using Next.js, React & Node.js.", tech: ["Next.js", "React", "Node.js"], logo: "/logos/webdevelopment.png", color: [1.0, 0.48, 0.0], category: "web", asset: "bitcoin" },
  { key: "software", title: "Software Development", desc: "Automation tools, dashboards, admin systems & enterprise solutions.", tech: ["Express", "MongoDB", "MySQL"], logo: "/logos/Software_Development.jpg", color: [0.2, 0.6, 1.0], category: "software", asset: "ethereum" },
  { key: "blockchain", title: "Blockchain Development", desc: "Smart contracts, tokens, DEXs, and DeFi apps.", tech: ["Solidity", "Hardhat", "OpenZeppelin"], logo: "/logos/Blockchain_Development.jpg", color: [1.0, 0.12, 0.0], category: "blockchain", asset: "blockchain-development" },
  { key: "web3", title: "Web3 & DApps", desc: "Decentralized apps, wallet integration, NFTs & digital asset systems.", tech: ["Web3.js", "Ethers", "IPFS"], logo: "/logos/web3anddapps.png", color: [0.16, 0.8, 0.6], category: "web3", asset: "web3anddapps" },
  { key: "ecom", title: "E-Commerce", desc: "High-performance e-commerce stores and headless setups.", tech: ["Shopify", "Stripe", "Sanity"], logo: "/logos/E-Commerce.jpg", color: [0.7, 0.2, 1.0], category: "ecom", asset: "solana" },
  { key: "security", title: "Security Audits", desc: "Comprehensive smart contract & platform security assessments.", tech: ["PenTest", "Audits", "Vulnerability"], logo: "/logos/securityaudits.png", color: [1.0, 0.9, 0.1], category: "security", asset: "securityaudits" },
];

function SparklineSVG({ data = [], width = 140, height = 34, color = "rgba(52,199,89,1)" }) {
  if (!data || data.length < 2) return null;
  const pad = 4;
  const w = Math.max(20, width - pad * 2);
  const h = Math.max(8, height - pad * 2);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v,i)=> {
    const x = pad + (i / (data.length-1)) * w;
    const y = pad + h - ((v - min)/range) * h;
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = `${points} ${pad + w},${pad + h} ${pad},${pad + h}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#sg)" />
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" points={points} />
    </svg>
  );
}

function ParticleCloud({ count = 80 }) {
  const meshRef = useRef();
  const positions = useMemo(()=> {
    const out = [];
    for (let i=0;i<count;i++) out.push([ (Math.random()-0.5)*10, (Math.random()-0.5)*2.4, -Math.random()*5 ]);
    return out;
  }, [count]);

  useFrame(() => { if (meshRef.current) meshRef.current.rotation.y += 0.0008; });

  return (
    <Instances ref={meshRef}>
      <sphereGeometry args={[0.02,6,6]} />
      <meshStandardMaterial emissive={[0.02,0.04,0.08]} color={[0.02,0.02,0.03]} />
      {positions.map((p,i)=> <Instance key={i} position={p} />)}
    </Instances>
  );
}

function ServiceCard3D({ idx, data, spark = [] }) {
  const groupRef = useRef();
  const logo = useTexture(data.logo || "/logos/coingecko.png");
  const seed = idx * 0.35;
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = 0.12 * Math.sin(t * 0.2 + seed);
    groupRef.current.rotation.x = 0.05 * Math.sin(t * 0.13 + seed);
    groupRef.current.position.y = 0.6 * Math.sin(t * 0.4 + seed) - 0.2;
  });

  const emissive = data.color ? data.color.map(c => c * 0.45) : [0.08, 0.25, 0.6];

  return (
    <group ref={groupRef} position={[ (idx % 3 - 1) * 2.15, 0, -Math.floor(idx / 3) * 0.9 ]}>
      <Float floatIntensity={0.6} rotationIntensity={0.8} speed={0.8}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.9, 1.12, 0.16]} />
          <meshStandardMaterial color={[0.04,0.04,0.06]} metalness={0.25} roughness={0.06} emissive={emissive} emissiveIntensity={0.02} />
        </mesh>

        <mesh position={[0, 0.14, 0.085]}>
          <planeGeometry args={[0.96, 0.44]} />
          <meshStandardMaterial map={logo} transparent />
        </mesh>

        <Html position={[0, -0.34, 0.14]} center>
          <div className={styles.card3dHtml}>
            <div className={styles.cardTitle3D}>{data.title}</div>
            <div className={styles.cardDesc3D}>{data.desc}</div>

            <div style={{ marginTop: 8, display: "flex", justifyContent: "center" }}>
              <SparklineSVG data={spark} width={140} height={34} color={`rgba(${Math.round(emissive[0]*255)},${Math.round(emissive[1]*255)},${Math.round(emissive[2]*255)},1)`} />
            </div>

            <div className={styles.techList3D} style={{ marginTop: 8 }}>
              {data.tech.map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function Scene({ services, sparks }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[6,8,6]} intensity={1.05} castShadow />
      <pointLight position={[-6,-4,-6]} intensity={0.18} color={[0.2,0.5,1]} />

      <Suspense fallback={null}>
        <group rotation={[-0.05, 0.07, 0]}>
          {services.map((s,i)=> <ServiceCard3D key={s.key} idx={i} data={s} spark={sparks[s.asset] || []} />)}
        </group>

        <ParticleCloud count={90} />
      </Suspense>

      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.1,0]} receiveShadow>
        <planeGeometry args={[28,16]} />
        <meshStandardMaterial color={[0.02,0.02,0.02]} roughness={0.9} metalness={0.2} />
      </mesh>

      <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI/2.2} minPolarAngle={Math.PI/3.2} />
    </>
  );
}

export default function ServicesPage() {
  const [filter, setFilter] = useState("all");
  const [filtered, setFiltered] = useState(SERVICES);
  const [sparks, setSparks] = useState({});
  const BUFFER_LEN = 42;
  const assets = useMemo(() => Array.from(new Set(SERVICES.map(s => s.asset).filter(Boolean))), []);

  useEffect(()=> setFiltered(filter==="all"?SERVICES:SERVICES.filter(s=>s.category===filter)), [filter]);

  useEffect(() => {
    let mounted = true;
    async function initSparks() {
      const base = {};
      assets.forEach(a => base[a] = Array(BUFFER_LEN).fill(null));

      try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assets.join(",")}&sparkline=true`;
        const r = await fetch(url, { cache: "no-store" });
        const j = await r.json();
        if (Array.isArray(j) && j.length) {
          j.forEach(item => {
            const id = item.id;
            const p = (item.sparkline_in_7d && item.sparkline_in_7d.price) || [];
            base[id] = p.length ? p.slice(-BUFFER_LEN) : Array(BUFFER_LEN).fill(item.current_price || 0);
          });
          if (mounted) setSparks(base);
          return;
        }
      } catch (e) { console.warn("CoinGecko sparkline fetch failed, fallback:", e); }

      try {
        const ccUrl = `https://api.coincap.io/v2/assets?ids=${assets.join(",")}`;
        const r2 = await fetch(ccUrl, { cache: "no-store" });
        const j2 = await r2.json();
        if (j2?.data) {
          j2.data.forEach(item => {
            const id = (item.id || "").toString();
            const price = Number(item.priceUsd || item.price || 0);
            base[id] = Array(BUFFER_LEN).fill(price);
          });
          if (mounted) setSparks(base);
          return;
        }
      } catch (e) { console.warn("CoinCap REST failed:", e); }

      if (mounted) {
        const zeroBase = {};
        assets.forEach(a => zeroBase[a] = Array(BUFFER_LEN).fill(0));
        setSparks(zeroBase);
      }
    }

    initSparks();
    return () => { mounted = false; };
  }, [assets]);

  useEffect(() => {
    if (!assets.length) return;
    let ws;
    try {
      const wsUrl = `wss://ws.coincap.io/prices?assets=${assets.join(",")}`;
      ws = new WebSocket(wsUrl);
      ws.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          setSparks(prev => {
            const next = { ...(prev||{}) };
            Object.keys(data).forEach(asset => {
              const price = Number(data[asset]);
              if (!Number.isFinite(price)) return;
              const arr = (next[asset]||[]).slice();
              arr.push(price);
              while (arr.length > BUFFER_LEN) arr.shift();
              next[asset] = arr;
            });
            return next;
          });
        } catch (err) { /* ignore */ }
      };
    } catch (err) {
      console.warn("Failed to open WS:", err);
    }
    return () => { try { if (ws && ws.readyState === WebSocket.OPEN) ws.close(); } catch(e){} };
  }, [assets]);

  const renderServices = useMemo(()=> (filtered.slice(0,6)), [filtered]);

  return (
    <section className={styles.page}>
      <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className={styles.header}>
        <h1 className={styles.title}>Our Services</h1>
        <p className={styles.lead}>High-performance Web, Software, Blockchain, and Web3 solutions for startups and enterprises.</p>
        <div className={styles.ctaRow}>
          <a className={styles.cta} href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1" target="_blank" rel="noreferrer">Book Meeting on Microsoft Teams</a>
          <label className={styles.toggle}><input type="checkbox" defaultChecked /> <span>Live WS Mode</span></label>
        </div>
      </motion.header>

      <div className={styles.canvasWrap}>
        <Canvas shadows dpr={[1,1.6]} camera={{ position: [0,1.55,6.4], fov: 32 }}>
          <EffectComposer multisampling={4}>
            <DepthOfField focusDistance={0.02} focalLength={0.18} bokehScale={6} />
            <Bloom luminanceThreshold={0.2} intensity={0.9} mipmapBlur radius={0.8} />
            <Noise opacity={0.03} />
          </EffectComposer>

          <Suspense fallback={null}>
            <Scene services={renderServices} sparks={sparks} />
          </Suspense>
        </Canvas>

        <div className={styles.overlay}>
          <div className={styles.filterRow}>
            <button className={filter==="all"?styles.filterBtnActive:styles.filterBtn} onClick={()=>setFilter("all")}>All</button>
            <button className={filter==="web"?styles.filterBtnActive:styles.filterBtn} onClick={()=>setFilter("web")}>Web</button>
            <button className={filter==="blockchain"?styles.filterBtnActive:styles.filterBtn} onClick={()=>setFilter("blockchain")}>Blockchain</button>
            <button className={filter==="software"?styles.filterBtnActive:styles.filterBtn} onClick={()=>setFilter("software")}>Software</button>
            <button className={filter==="security"?styles.filterBtnActive:styles.filterBtn} onClick={()=>setFilter("security")}>Security</button>
            <button className={filter==="ecom"?styles.filterBtnActive:styles.filterBtn} onClick={()=>setFilter("ecom")}>E-Commerce</button>
          </div>

          <div className={styles.techStrip}>
            <strong>Technologies:</strong>
            <div className={styles.techChips}><span>Next.js</span><span>React</span><span>Node.js</span><span>Solidity</span></div>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <h2>What We Offer</h2>
        <p>Solutions designed to scale, empower, and accelerate your business.</p>

        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <article key={s.key} className={styles.card}>
              <img src={s.logo} alt={`${s.title} logo`} className={styles.cardLogo} />
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.techList}>{s.tech.map(t => <span key={t} className={styles.tech}>{t}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
