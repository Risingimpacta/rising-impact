"use client";

import React, { useRef, useMemo, useState, Suspense, useEffect } from "react";
import styles from "@/styles/ServicesPage.module.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, useTexture, OrbitControls, Instances, Instance } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { motion } from "framer-motion";

/* ------------------------------------------------------
   🔥 SERVICE DEFINITIONS (Category + Neon Gradient Tags)
------------------------------------------------------- */
const SERVICES = [
  {
    key: "web",
    title: "Web Development",
    desc: "Blazing-fast, SEO-optimized websites using Next.js, React & Node.js.",
    tech: ["Next.js", "React", "Node.js"],
    logo: "/logos/webdevelopment.png",
    color: [1.0, 0.48, 0.0],
    category: "web",
    asset: "bitcoin"
  },
  {
    key: "software",
    title: "Software Development",
    desc: "Automation tools, dashboards, admin systems & enterprise solutions.",
    tech: ["Express", "MongoDB", "MySQL"],
    logo: "/logos/Software_Development.jpg",
    color: [0.2, 0.6, 1.0],
    category: "software",
    asset: "ethereum"
  },
  {
    key: "blockchain",
    title: "Blockchain Development",
    desc: "Smart contracts, tokens, DEXs, and DeFi apps.",
    tech: ["Solidity", "Hardhat", "OpenZeppelin"],
    logo: "/logos/Blockchain_Development.jpg",
    color: [1.0, 0.12, 0.0],
    category: "blockchain",
    asset: "binancecoin" // Using existing coin ID
  },
  {
    key: "web3",
    title: "Web3 & DApps",
    desc: "Decentralized apps, wallet integration, NFTs & digital asset systems.",
    tech: ["Web3.js", "Ethers", "IPFS"],
    logo: "/logos/web3anddapps.png",
    color: [0.16, 0.8, 0.6],
    category: "web3",
    asset: "cardano" // Using existing coin ID
  },
  {
    key: "ecom",
    title: "E-Commerce",
    desc: "High-performance e-commerce stores and headless setups.",
    tech: ["Shopify", "Stripe", "Sanity"],
    logo: "/logos/E-Commerce.jpg",
    color: [0.7, 0.2, 1.0],
    category: "ecom",
    asset: "solana"
  },
  {
    key: "security",
    title: "Security Audits",
    desc: "Comprehensive smart contract & platform security assessments.",
    tech: ["PenTest", "Audits", "Vulnerability"],
    logo: "/logos/SecurityAudits.png", // ✅ Fixed case sensitivity
    color: [1.0, 0.9, 0.1],
    category: "security",
    asset: "tron" // Using existing coin ID
  }
];

/* ------------------------------------------------------
   SPARKLINE SVG
------------------------------------------------------- */
function SparklineSVG({ data = [], width = 140, height = 34, color = "rgba(52,199,89,1)" }) {
  if (!data || data.length < 2) return null;
  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * w;
      const y = pad + h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

/* ------------------------------------------------------
   PARTICLE CLOUD FOR 3D SCENE
------------------------------------------------------- */
function ParticleCloud({ count = 80 }) {
  const meshRef = useRef();
  const positions = useMemo(() => {
    const out = [];
    for (let i = 0; i < count; i++)
      out.push([(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 2.4, -Math.random() * 5]);
    return out;
  }, [count]);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.0008;
  });

  return (
    <Instances ref={meshRef}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshStandardMaterial emissive={[0.02, 0.04, 0.08]} color={[0.02, 0.02, 0.03]} />
      {positions.map((pos, i) => (
        <Instance key={i} position={pos} />
      ))}
    </Instances>
  );
}

/* ------------------------------------------------------
   3D SERVICE CARD
------------------------------------------------------- */
function ServiceCard3D({ idx, data, spark = [] }) {
  const groupRef = useRef();
  const logo = useTexture(data.logo);
  const seed = idx * 0.35;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    groupRef.current.rotation.y = 0.12 * Math.sin(t * 0.2 + seed);
    groupRef.current.rotation.x = 0.05 * Math.sin(t * 0.13 + seed);
    groupRef.current.position.y = 0.6 * Math.sin(t * 0.4 + seed) - 0.2;
  });

  return (
    <group
      ref={groupRef}
      position={[(idx % 3 - 1) * 2.15, 0, -Math.floor(idx / 3) * 0.9]} // ✅ Fixed positioning calculation
    >
      <Float floatIntensity={0.6} rotationIntensity={0.8} speed={0.8}>
        <mesh>
          <boxGeometry args={[1.9, 1.12, 0.16]} />
          <meshStandardMaterial color={[0.04, 0.04, 0.06]} />
        </mesh>

        <mesh position={[0, 0.14, 0.085]}>
          <planeGeometry args={[0.96, 0.44]} />
          <meshStandardMaterial map={logo} transparent />
        </mesh>

        <Html position={[0, -0.34, 0.14]} center>
          <div className={styles.card3dHtml}>
            <div className={styles.cardTitle3D}>{data.title}</div>
            <div className={styles.cardDesc3D}>{data.desc}</div>

            {/* Sparkline - only show if we have data */}
            {spark.length > 0 && <SparklineSVG data={spark} />}

            <div className={styles.techList3D}>
              {data.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------
   3D SCENE
------------------------------------------------------- */
function Scene({ services, sparks }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 8, 6]} intensity={1} />
      <Suspense fallback={null}>
        <group rotation={[-0.05, 0.07, 0]}>
          {services.map((s, i) => (
            <ServiceCard3D key={s.key} idx={i} data={s} spark={sparks[s.asset] || []} />
          ))}
        </group>

        <ParticleCloud count={90} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

/* ------------------------------------------------------
   MAIN PAGE
------------------------------------------------------- */
export default function ServicesPage() {
  const [filter, setFilter] = useState("all");
  const [cryptoData, setCryptoData] = useState({});
  const filtered = filter === "all" ? SERVICES : SERVICES.filter((s) => s.category === filter);

  // Fetch crypto data from local API to avoid CORS
  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const response = await fetch('/api/crypto');
        if (response.ok) {
          const data = await response.json();
          
          // Process the data for sparklines
          const sparks = {};
          data.forEach(coin => {
            if (coin.sparkline_in_7d?.price) {
              // Take every 4th point to reduce data size
              sparks[coin.id] = coin.sparkline_in_7d.price.filter((_, i) => i % 4 === 0);
            }
          });
          
          setCryptoData(sparks);
        }
      } catch (error) {
        console.log('Failed to fetch crypto data:', error);
        // Continue without crypto data - sparklines will be hidden
      }
    }

    fetchCryptoData();
  }, []);

  return (
    <section className={styles.page}>
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.header}
      >
        {/* PARTICLES */}
        <div className={styles.stripParticles}>
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={styles.particle} style={{ "--i": i }} />
          ))}
        </div>

        {/* NEON STRIP */}
        <div className={styles.stripWrap}>
          <div className={styles.neonStrip}>
            OUR SERVICES
            <div className={styles.sweep} />
          </div>
        </div>

        <h1 className={styles.sectionTitle}>Our Services</h1>

        <p className={styles.lead}>
          High-performance Web, Software, Blockchain, and Web3 solutions for startups and enterprises.
        </p>

        <div className={styles.ctaRow}>
          <a
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer" // ✅ Added for security
            href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1"
          >
            Book Meeting on Microsoft Teams
          </a>

          <label className={styles.toggle}>
            <input type="checkbox" defaultChecked /> Live WS Mode
          </label>
        </div>
      </motion.header>

      {/* 3D CANVAS */}
      <div className={styles.canvasWrap}>
        <Canvas shadows camera={{ position: [0, 1.55, 6.4], fov: 32 }}>
          <EffectComposer>
            <Bloom intensity={1} luminanceThreshold={0.2} />
            <Noise opacity={0.08} />
          </EffectComposer>

          <Suspense fallback={null}>
            <Scene services={filtered} sparks={cryptoData} /> {/* ✅ Pass crypto data */}
          </Suspense>
        </Canvas>

        {/* FILTER BUTTONS */}
        <div className={styles.overlay}>
          <div className={styles.filterRow}>
            {["all", "web", "blockchain", "software", "security", "ecom", "web3"].map((f) => (
              <button
                key={f}
                className={filter === f ? styles.filterBtnActive : styles.filterBtn}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.techStrip}>
            <strong>Technologies:</strong>
            <div className={styles.techChips}>
              <span>Next.js</span>
              <span>React</span>
              <span>Node.js</span>
              <span>Solidity</span>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className={styles.details}>
        <h2>What We Offer</h2>
        <p>Solutions designed to scale, empower, and accelerate your business.</p>

        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <article key={s.key} className={`${styles.card} ${styles[`tag_${s.key}`]}`}>
              <img src={s.logo} alt={s.title} className={styles.cardLogo} />
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>

              <div className={styles.techList}>
                {s.tech.map((t) => (
                  <span key={t} className={`${styles.tech} ${styles[`tag_${s.key}`]}`}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}