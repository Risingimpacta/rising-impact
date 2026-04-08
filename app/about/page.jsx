"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/AboutPage.module.scss";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.neonStrip}>ABOUT RISING IMPACT</div>
        <h1 className={styles.heroTitle}>
          Building the Future of
          <span className={styles.gradientText}> Digital Innovation</span>
        </h1>
        <p className={styles.heroSubtitle}>
          We bridge cutting-edge Web3 technology with real-world applications, 
          crafting high-performance platforms that drive the next generation 
          of digital transformation.
        </p>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Projects Delivered</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>3+</div>
            <div className={styles.statLabel}>Years Experience</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>15+</div>
            <div className={styles.statLabel}>Technologies</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'mission' ? styles.active : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              Our Mission
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'vision' ? styles.active : ''}`}
              onClick={() => setActiveTab('vision')}
            >
              Our Vision
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'values' ? styles.active : ''}`}
              onClick={() => setActiveTab('values')}
            >
              Our Values
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'mission' && (
              <div className={styles.content}>
                <h2>Accelerating Web3 Adoption</h2>
                <p>
                  Our mission is to accelerate the adoption of Web3 and blockchain technologies 
                  by building intuitive, powerful, and scalable solutions that solve complex 
                  business challenges while pushing the boundaries of what's possible in the 
                  digital landscape.
                </p>
                <div className={styles.missionPoints}>
                  <div className={styles.point}>
                    <div className={styles.pointIcon}>⚡</div>
                    <div className={styles.pointText}>
                      <strong>Innovation First</strong>
                      <span>Pioneering next-gen solutions</span>
                    </div>
                  </div>
                  <div className={styles.point}>
                    <div className={styles.pointIcon}>🛡️</div>
                    <div className={styles.pointText}>
                      <strong>Security Focused</strong>
                      <span>Enterprise-grade protection</span>
                    </div>
                  </div>
                  <div className={styles.point}>
                    <div className={styles.pointIcon}>🚀</div>
                    <div className={styles.pointText}>
                      <strong>Performance Driven</strong>
                      <span>High-speed, scalable platforms</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className={styles.content}>
                <h2>Shaping the Digital Future</h2>
                <p>
                  We envision a world where blockchain and Web3 technologies are seamlessly 
                  integrated into everyday digital experiences, empowering businesses and 
                  individuals with decentralized, transparent, and efficient solutions.
                </p>
                <ul className={styles.visionList}>
                  <li>Democratizing access to DeFi and Web3 technologies</li>
                  <li>Building the infrastructure for the decentralized web</li>
                  <li>Creating user-friendly interfaces for complex blockchain systems</li>
                  <li>Pioneering sustainable and scalable Web3 solutions</li>
                </ul>
              </div>
            )}

            {activeTab === 'values' && (
              <div className={styles.content}>
                <h2>Our Core Values</h2>
                <div className={styles.valuesGrid}>
                  <div className={styles.valueCard}>
                    <h3>Innovation</h3>
                    <p>Constantly pushing boundaries and exploring emerging technologies to deliver cutting-edge solutions.</p>
                  </div>
                  <div className={styles.valueCard}>
                    <h3>Excellence</h3>
                    <p>Committed to quality in every line of code, every design, and every client interaction.</p>
                  </div>
                  <div className={styles.valueCard}>
                    <h3>Transparency</h3>
                    <p>Open communication, clear processes, and honest relationships with clients and partners.</p>
                  </div>
                  <div className={styles.valueCard}>
                    <h3>Impact</h3>
                    <p>Focusing on solutions that create real value and drive meaningful change for our clients.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className={styles.expertise}>
        <div className={styles.neonStrip}>OUR EXPERTISE</div>
        <h2 className={styles.sectionTitle}>What We Build</h2>
        
        <div className={styles.expertiseGrid}>
          <div className={styles.expertiseCard}>
            <div className={styles.expertiseIcon}>🔗</div>
            <h3>Web3 & Blockchain</h3>
            <ul>
              <li>Smart Contract Development</li>
              <li>DeFi Platforms</li>
              <li>DEX Solutions</li>
              <li>NFT Marketplaces</li>
              <li>Blockchain Consulting</li>
            </ul>
          </div>

          <div className={styles.expertiseCard}>
            <div className={styles.expertiseIcon}>💻</div>
            <h3>Digital Solutions</h3>
            <ul>
              <li>Enterprise SaaS</li>
              <li>E-Commerce Systems</li>
              <li>Custom Web Apps</li>
              <li>API Development</li>
              <li>Cloud Infrastructure</li>
            </ul>
          </div>

          <div className={styles.expertiseCard}>
            <div className={styles.expertiseIcon}>⚡</div>
            <h3>High-Performance Platforms</h3>
            <ul>
              <li>Scalable Architecture</li>
              <li>Real-time Systems</li>
              <li>Data Analytics</li>
              <li>Microservices</li>
              <li>DevOps & CI/CD</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className={styles.techStack}>
        <h2 className={styles.sectionTitle}>Technology Stack</h2>
        <div className={styles.techCategories}>
          <div className={styles.techCategory}>
            <h3>Blockchain & Web3</h3>
            <div className={styles.techTags}>
              <span>Ethereum</span>
              <span>Polygon</span>
              <span>Solidity</span>
              <span>Web3.js</span>
              <span>Hardhat</span>
              <span>IPFS</span>
            </div>
          </div>

          <div className={styles.techCategory}>
            <h3>Frontend</h3>
            <div className={styles.techTags}>
              <span>React.js</span>
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>Three.js</span>
              <span>WebGL</span>
              <span>Framer Motion</span>
            </div>
          </div>

          <div className={styles.techCategory}>
            <h3>Backend & Infrastructure</h3>
            <div className={styles.techTags}>
              <span>Node.js</span>
              <span>Python</span>
              <span>PostgreSQL</span>
              <span>MongoDB</span>
              <span>AWS</span>
              <span>Docker</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Build the Future Together?</h2>
          <p>Let's discuss how we can transform your vision into a cutting-edge digital solution.</p>
          <div className={styles.ctaButtons}>
            <Link href="/demos" className={styles.btnPrimary}>
              View Our Demos
            </Link>
            <a 
              href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1"
              target="_blank"
              className={styles.btnSecondary}
            >
              Book a Meeting
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}