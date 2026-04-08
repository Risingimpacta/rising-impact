"use client";

import React, { useRef, useMemo, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, useTexture, OrbitControls } from "@react-three/drei";
import styles from "@/styles/TechnologiesSection.module.scss";

/**
 * Enhanced Technologies Section — Level-7 3D Experience
 */
const TECHNOLOGY_RINGS = [
  { 
    key: "blockchain", 
    radius: 2.6, 
    speed: 0.02, 
    category: "Blockchain & Web3",
    description: "Building decentralized applications, smart contracts, and Web3 infrastructure",
    color: "#FF7A00",
    items: [
      "ethereum", "solana", "polygon", "avalanche", "bnb-chain", 
      "arbitrum", "optimism", "polkadot", "cosmos", "aptos", "sui", "ton"
    ] 
  },
  { 
    key: "backend",    
    radius: 2.0, 
    speed: -0.015, 
    category: "Backend & Infrastructure",
    description: "Scalable server architecture, databases, and cloud infrastructure",
    color: "#0084FF",
    items: [
      "nodejs", "python", "rust", "go", "java", "cpp", 
      "postgresql", "mongodb", "redis", "docker", "kubernetes", "aws"
    ] 
  },
  { 
    key: "frontend",   
    radius: 1.5, 
    speed: 0.018, 
    category: "Frontend & UX",
    description: "Modern web interfaces and user experience",
    color: "#9D4EDD",
    items: [
      "nextjs", "react", "typescript", "tailwind", "scss", 
      "webpack", "vite", "redux", "graphql", "astro", "sst"
    ] 
  },
  { 
    key: "mobile",     
    radius: 1.0, 
    speed: -0.02, 
    category: "Mobile & Cross-Platform",
    description: "Native and cross-platform mobile development",
    color: "#3EE58F",
    items: [
      "react-native", "flutter", "ios", "android", "walletconnect"
    ] 
  }
];

const TECH_CATEGORIES = {
  blockchain: {
    title: "Blockchain & Web3",
    description: "Building decentralized applications, smart contracts, and Web3 infrastructure",
    features: [
      "Smart Contract Development",
      "DeFi Protocol Architecture",
      "DEX & Trading Platforms",
      "NFT Marketplaces",
      "Cross-Chain Bridges",
      "Web3 Integration"
    ]
  },
  backend: {
    title: "Backend & Infrastructure",
    description: "Scalable server architecture, databases, and cloud infrastructure",
    features: [
      "Microservices Architecture",
      "Real-time APIs",
      "Database Optimization",
      "Cloud Deployment",
      "DevOps & CI/CD",
      "Security & Monitoring"
    ]
  },
  frontend: {
    title: "Frontend & UX",
    description: "Modern, responsive interfaces with exceptional user experience",
    features: [
      "React & Next.js Applications",
      "3D & Interactive Experiences",
      "Progressive Web Apps",
      "Performance Optimization",
      "Accessibility First",
      "Modern Animations"
    ]
  },
  mobile: {
    title: "Mobile & Cross-Platform",
    description: "Native and cross-platform mobile applications",
    features: [
      "React Native Development",
      "Flutter Applications",
      "Wallet Integration",
      "Push Notifications",
      "Offline Capabilities",
      "App Store Deployment"
    ]
  }
};

function useIcons(list) {
  return useMemo(() => {
    return list.map((name) => {
      return [
        `/logos/${name}.png`,
        `/logos/${name}.webp`,
        `/logos/${name}.jpg`,
        `/logos/${name}.svg`
      ];
    });
  }, [list]);
}

function IconRing({ radius = 2, items = [], speed = 0.02, seed = 0, y = 0, color, onTechHover }) {
  const ref = useRef();
  const candidates = useIcons(items);
  
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z += speed;
    if (ref.current) ref.current.position.y = y + Math.sin(state.clock.getElapsedTime() * 0.6 + seed) * 0.04;
  });

  return (
    <group ref={ref}>
      {items.map((name, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const src = `/logos/${name}.png`;
        
        return (
          <Float key={name + i} rotationIntensity={0.9} floatIntensity={0.24}>
            <mesh 
              position={[x, 0, z]} 
              rotation={[0, -angle + Math.PI / 2, 0]}
              onPointerEnter={() => onTechHover(name)}
              onPointerLeave={() => onTechHover(null)}
            >
              <planeGeometry args={[0.46, 0.46]} />
              <meshStandardMaterial color={[1,1,1]} emissive={[0.02,0.02,0.02]} transparent={true} />
              <Html position={[0, 0, 0]} center transform occlude>
                <div 
                  className={styles.iconWrap}
                  style={{ '--ring-color': color }}
                  data-tech={name}
                >
                  <img
                    src={src}
                    alt={name}
                    className={styles.techIcon}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) parent.classList.add(styles.iconMissing);
                    }}
                  />
                  <div className={styles.techTooltip}>{name}</div>
                </div>
              </Html>
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function CenterHologram({ logo }) {
  const tex = useTexture(logo);
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y += 0.003;
  });

  return (
    <group>
      <mesh ref={ref} position={[0, -0.05, 0]}>
        <sphereGeometry args={[0.75, 48, 48]} />
        <meshStandardMaterial
          map={tex}
          emissive={[0.12, 0.06, 0.02]}
          emissiveIntensity={0.9}
          metalness={0.6}
          roughness={0.1}
          transparent
          opacity={0.98}
        />
      </mesh>

      {/* Enhanced Holographic Effects */}
      <Html position={[0, 0, 0]} center>
        <div className={styles.holoOverlay}>
          <div className={styles.scanlines}></div>
          <div className={styles.pulseRing}></div>
          <div className={styles.pulseRing} style={{ animationDelay: '1s' }}></div>
          <div className={styles.pulseRing} style={{ animationDelay: '2s' }}></div>
        </div>
      </Html>
    </group>
  );
}

// Simple HTML-based category labels instead of Text from drei
function CategoryLabels() {
  return (
    <group>
      {TECHNOLOGY_RINGS.map((ring, index) => {
        const angle = (index / TECHNOLOGY_RINGS.length) * Math.PI * 2;
        const x = Math.cos(angle) * 3.2;
        const z = Math.sin(angle) * 3.2;
        
        return (
          <Html
            key={ring.key}
            position={[x, 0.2, z]}
            center
            transform
          >
            <div 
              className={styles.categoryLabel}
              style={{ color: ring.color }}
            >
              {ring.category}
            </div>
          </Html>
        );
      })}
    </group>
  );
}

export default function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState("blockchain");
  const [hoveredTech, setHoveredTech] = useState(null);
  const risingLocal = "/logos/rising-impact.png";

  return (
    <section className={styles.section}>
      {/* Enhanced Header */}
      <div className={styles.header}>
        <div className={styles.neonStrip}>TECHNOLOGY STACK</div>
        <h1 className={styles.title}>
          Our <span className={styles.gradientText}>Technology</span> Ecosystem
        </h1>
        <p className={styles.subtitle}>
          Explore the cutting-edge technologies powering our Web3, blockchain, and full-stack solutions
        </p>
      </div>

      {/* Category Navigation */}
      <div className={styles.categoryNav}>
        {TECHNOLOGY_RINGS.map((ring) => (
          <button
            key={ring.key}
            className={`${styles.categoryBtn} ${activeCategory === ring.key ? styles.active : ''}`}
            onClick={() => setActiveCategory(ring.key)}
            style={{ '--category-color': ring.color }}
          >
            {ring.category}
          </button>
        ))}
      </div>

      {/* 3D Scene - Full Width */}
      <div className={styles.sceneContainer}>
        <div className={styles.sceneWrap}>
          <Canvas camera={{ position: [0, 1.6, 8], fov: 35 }} dpr={[1, 1.75]}>
            <ambientLight intensity={0.8} />
            <directionalLight intensity={0.9} position={[5, 8, 6]} />
            <pointLight intensity={0.5} position={[-5, -5, -5]} color="#0084FF" />
            <pointLight intensity={0.5} position={[5, 5, 5]} color="#FF7A00" />
            
            <Suspense fallback={
              <Html center>
                <div className={styles.loadingFallback}>
                  Loading 3D Technology Ecosystem...
                </div>
              </Html>
            }>
              {TECHNOLOGY_RINGS.map((r, idx) => (
                <IconRing 
                  key={r.key} 
                  radius={r.radius} 
                  items={r.items} 
                  speed={r.speed} 
                  seed={idx * 0.3} 
                  y={0.06 * (idx - 1.5)}
                  color={r.color}
                  onTechHover={setHoveredTech}
                />
              ))}

              <CenterHologram logo={risingLocal} />
              <CategoryLabels />
            </Suspense>

            <OrbitControls 
              enableZoom={true} 
              enablePan={false} 
              maxPolarAngle={Math.PI/2} 
              minPolarAngle={Math.PI/4}
              minDistance={6}
              maxDistance={12}
            />
          </Canvas>

          {/* Enhanced Overlay */}
          <div className={styles.overlay}>
            <div className={styles.legend}>
              <strong>TECHNOLOGY ORBITS:</strong> 
              <span style={{ color: '#FF7A00' }}> BLOCKCHAIN</span> · 
              <span style={{ color: '#0084FF' }}> BACKEND</span> · 
              <span style={{ color: '#9D4EDD' }}> FRONTEND</span> · 
              <span style={{ color: '#3EE58F' }}> MOBILE</span>
            </div>
            <div className={styles.controls}>
              <div className={styles.controlItem}>🖱️ Scroll to Zoom</div>
              <div className={styles.controlItem}>🎯 Click & Drag to Rotate</div>
              {hoveredTech && (
                <div className={styles.techDisplay}>Hovering: <strong>{hoveredTech}</strong></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Details Panel - Below the 3D Scene */}
      <div className={styles.detailsSection}>
        <div className={styles.detailsPanel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              {TECH_CATEGORIES[activeCategory].title}
            </h2>
            <div 
              className={styles.categoryIndicator}
              style={{ backgroundColor: TECHNOLOGY_RINGS.find(r => r.key === activeCategory)?.color }}
            ></div>
          </div>
          
          <p className={styles.panelDescription}>
            {TECH_CATEGORIES[activeCategory].description}
          </p>

          <div className={styles.featuresSection}>
            <h3 className={styles.featuresTitle}>Key Capabilities</h3>
            <div className={styles.featuresGrid}>
              {TECH_CATEGORIES[activeCategory].features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div 
                    className={styles.featureIcon}
                    style={{ backgroundColor: TECHNOLOGY_RINGS.find(r => r.key === activeCategory)?.color }}
                  >
                    ⚡
                  </div>
                  <span className={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.techStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>
                {TECHNOLOGY_RINGS.find(r => r.key === activeCategory)?.items.length}+
              </div>
              <div className={styles.statLabel}>Technologies</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>3+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Philosophy Section */}
      <div className={styles.philosophy}>
        <div className={styles.philosophyContent}>
          <h2>Our Technology Philosophy</h2>
          <div className={styles.philosophyGrid}>
            <div className={styles.principle}>
              <h3>🚀 Future-Proof</h3>
              <p>We choose technologies that scale and evolve with your business needs</p>
            </div>
            <div className={styles.principle}>
              <h3>🛡️ Security First</h3>
              <p>Enterprise-grade security practices across all technology stacks</p>
            </div>
            <div className={styles.principle}>
              <h3>⚡ Performance</h3>
              <p>Optimized solutions that deliver exceptional speed and reliability</p>
            </div>
            <div className={styles.principle}>
              <h3>🎯 Right Tool</h3>
              <p>Selecting the perfect technology stack for each unique challenge</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}