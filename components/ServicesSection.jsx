"use client";

import React, { useRef, useMemo, Suspense } from "react";
import styles from "@/styles/ServicesPage.module.scss";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, SoftShadows, Float, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";

/**
 * Level-5 Services Page with React-Three-Fiber cards.
 *
 * Notes:
 * - Place your logo files in /public/logos/ and update names below if needed.
 * - This file uses simple geometry + phong-like material + glow via emissive color.
 */

/* ---------- Services content ---------- */
const SERVICES = [
  {
    key: "web",
    title: "Web Development",
    desc: "Blazing-fast, SEO-optimized websites using Next.js, React & Node.js.",
    tech: ["Next.js", "React", "Node.js"],
    logo: "/logos/Quicknode_logo.png",
    color: [1.0, 0.48, 0.0], // orange (rgb normalized)
  },
  {
    key: "software",
    title: "Software Development",
    desc: "Automation tools, dashboards, admin systems & enterprise solutions.",
    tech: ["Express", "MongoDB", "MySQL"],
    logo: "/logos/Entrepreneur.jpg",
    color: [0.2, 0.6, 1.0], // blue-ish
  },
  {
    key: "blockchain",
    title: "Blockchain Development",
    desc: "Smart contracts, staking, tokens, NFT systems, DEX & DeFi apps.",
    tech: ["Solidity", "Hardhat", "OpenZeppelin"],
    logo: "/logos/Chainlink.png",
    color: [1.0, 0.12, 0.0], // red
  },
  {
    key: "web3",
    title: "Web3 & DApps",
    desc: "Decentralized apps, wallet integration, NFTs & digital asset systems.",
    tech: ["Web3.js", "Ethers", "IPFS"],
    logo: "/logos/CoinGecko_logo.png",
    color: [0.16, 0.8, 0.6], // green teal
  },
  {
    key: "ecom",
    title: "E-Commerce",
    desc: "High-performance stores with payments, PIM, and headless CMS.",
    tech: ["Shopify", "Stripe", "Sanity"],
    logo: "/logos/cointelegraph5356.jpg",
    color: [0.7, 0.2, 1.0],
  },
  {
    key: "security",
    title: "Security Audits",
    desc: "Comprehensive smart contract and system security assessments.",
    tech: ["PenTest", "Audits", "Vulnerability"],
    logo: "/logos/Decrypt.png",
    color: [1.0, 0.9, 0.1],
  },
];

/* ---------- 3D Card (mesh) ---------- */
function ServiceCard3D({ index = 0, service = {}, hoverable = true }) {
  const ref = useRef();
  const logoTex = useTexture(service.logo); // drei texture loader

  // unique seed for subtle motion
  const seed = index * 0.37;
  useFrame((state, delta) => {
    // gentle bob & slow rotation
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = 0.15 * Math.sin(t * 0.2 + seed);
      ref.current.rotation.x = 0.06 * Math.sin(t * 0.13 + seed);
      ref.current.position.y = 0.6 * Math.sin(t * 0.4 + seed) - 0.2;
    }
  });

  // card colors (emissive)
  const emissive = service.color ? service.color.map((c) => c * 0.55) : [0.2, 0.4, 0.8];

  return (
    <group ref={ref} position={[ (index % 3 - 1) * 2.1, 0, -Math.floor(index / 3) * 0.8 ]} >
      <Float rotationIntensity={0.8} floatIntensity={0.9} speed={1.1}>
        {/* Slightly extruded card plane */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.1, 0.16]} />
          <meshStandardMaterial
            color={[0.05, 0.05, 0.06]}
            metalness={0.3}
            roughness={0.05}
            emissive={emissive}
            emissiveIntensity={0.03}
          />
        </mesh>

        {/* logo plate on front */}
        <mesh position={[0, 0.12, 0.09]}>
          <planeGeometry args={[0.92, 0.4]} />
          <meshStandardMaterial map={logoTex} transparent={true} />
        </mesh>

        {/* title & holo stripe (HTML overlay mapped to 3D position) */}
        <Html position={[0, -0.18, 0.12]} center>
          <div className={styles.card3D}>
            <div className={styles.cardTitle3D}>{service.title}</div>
            <div className={styles.cardDesc3D}>{service.desc}</div>
            <div className={styles.techList3D}>
              {service.tech.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

/* ---------- Small scene wrapper to setup lights ---------- */
function Scene({ services }) {
  // camera & lights handled by Canvas props and helpers
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        position={[5, 8, 6]}
        intensity={1.2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-6, -2, -6]} intensity={0.25} color={[0.2, 0.6, 1]} />
      <Suspense fallback={null}>
        <group rotation={[ -0.05, 0.12, 0 ]}>
          {services.map((s, i) => (
            <ServiceCard3D key={s.key} index={i} service={s} />
          ))}
        </group>
      </Suspense>

      {/* subtle floor reflection */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={[0.02, 0.02, 0.02]} metalness={0.2} roughness={0.8} />
      </mesh>

      <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 3.2} />
    </>
  );
}

/* ---------- Page component ---------- */
export default function ServicesPage() {
  // Desktop canvas size tweaks
  const canvasStyle = { width: "100%", height: 560 };

  return (
    <section className={styles.page}>
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.header}>
        <h1 className={styles.title}>Our Services</h1>
        <p className={styles.lead}>High-performance Web, Software, Blockchain, and Web3 solutions for startups and enterprises.</p>
        <div className={styles.ctaRow}>
          <a className={styles.cta} href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1" target="_blank">Book Meeting on Microsoft Teams</a>
        </div>
      </motion.header>

      <div className={styles.canvasWrap}>
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 1.6, 6], fov: 32 }}>
          <SoftShadows />
          <Scene services={SERVICES} />
        </Canvas>

        {/* Ambient UI overlay (tech stack + quick filters) */}
        <div className={styles.overlay}>
          <div className={styles.filterRow}>
            <button className={styles.filterBtn}>All</button>
            <button className={styles.filterBtn}>Web</button>
            <button className={styles.filterBtn}>Blockchain</button>
            <button className={styles.filterBtn}>Security</button>
            <button className={styles.filterBtn}>E-Commerce</button>
          </div>

          <div className={styles.techStrip}>
            <strong>Technologies:</strong>
            <div className={styles.techChips}>
              <span>Next.js</span>
              <span>React</span>
              <span>Node.js</span>
              <span>Solidity</span>
              <span>Hardhat</span>
              <span>MongoDB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fallback grid + details for accessibility / SEO */}
      <div className={styles.details}>
        <h2>What We Offer</h2>
        <p>Solutions designed to scale, empower, and accelerate your business.</p>

        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <article key={s.key} className={styles.card}>
              <img src={s.logo} alt={`${s.title} logo`} className={styles.cardLogo} />
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.techList}>
                {s.tech.map((t) => <span key={t} className={styles.tech}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
