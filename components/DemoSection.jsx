"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "@/styles/DemosPage.module.scss";
import DemoCard from "@/components/DemoCard";
import Demos3DWall from "@/components/Demos3DWall";
import { motion } from "framer-motion";

const DEMOS = [
  {
    title: "Rising Star — DeFi",
    desc: "Next-gen decentralized finance ecosystem with staking, charts and simulation.",
    image: "/risingstar.png",
    yt: "WHFtpe8HTl4",
    demoUrl: "https://risingsstardex.risingimpact.in/",
  },
  {
    title: "Simba Dex",
    desc: "A Jungle-themed DEX with swap engine, liquidity pools and smooth animations.",
    image: "/simbadex.png",
    yt: "jt9JDMvMiDo",
    demoUrl: "https://simbadex.risingimpact.in/",
  },
  {
    title: "Royal Things — E-Commerce",
    desc: "Modern E-commerce with dashboards, inventory management & checkout.",
    image: "/royalthings.png",
    yt: "4zs12Kovde0",
    demoUrl: "https://royal-thing-web.netlify.app/",
    codeUrl: "https://royal-things-admin.netlify.app/",
  },
  {
    title: "Smart Contract Testing Pipeline",
    desc: "Full testing pipeline: local simulation → Goerli → Sepolia → audits.",
    image: "/smartcontracttesting.jpg",
    yt: "6RIGrYo1bb8",
    demoUrl: null,
  },
];

export default function DemoSection() {
  const [nowPlaying, setNowPlaying] = useState(DEMOS[0]);
  const [modalVideo, setModalVideo] = useState(null);
  const carouselIndex = useRef(0);

  const wallItems = useMemo(() => {
    return DEMOS.map((d) => ({
      title: d.title,
      yt: d.yt,
      demoUrl: d.demoUrl,
      thumb:
        d.image || `https://img.youtube.com/vi/${d.yt}/hqdefault.jpg`,
    }));
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      carouselIndex.current = (carouselIndex.current + 1) % DEMOS.length;
      setNowPlaying(DEMOS[carouselIndex.current]);
    }, 9000);

    return () => clearInterval(iv);
  }, []);

  const openVideo = (item) => {
    setModalVideo(item);
    setNowPlaying(item);
  };

  return (
    <section className={styles.section} id="demos">

      {/* TOP STRIP — LEVEL-7 */}
      <div className={styles.neonStrip}>LIVE DEMOS</div>

      {/* HERO */}
      <motion.h1
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Watch Our Live Product Demos
      </motion.h1>

      <p className={styles.subtitle}>
        Explore Rising Impact’s Web3, DeFi, Blockchain & E-Commerce showcase in action.
      </p>

      {/* 3D WALL */}
      <div className={styles.wallContainer}>
        <Demos3DWall items={wallItems} onOpenVideo={openVideo} />
      </div>

      {/* NOW PLAYING — LEVEL-7 NEON STRIP */}
      <div className={styles.nowPlaying}>
        <span className={styles.nowPlayingLabel}>NOW PLAYING</span>
        <span className={styles.nowPlayingTitle}>{nowPlaying.title}</span>

        {nowPlaying.demoUrl && (
          <a
            href={nowPlaying.demoUrl}
            target="_blank"
            className={styles.visitDemoBtn}
          >
            Visit Demo →
            <span className={styles.btnBacklight}></span>
          </a>
        )}
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {DEMOS.map((d, i) => (
          <DemoCard
            key={i}
            {...{
              title: d.title,
              desc: d.desc,
              image: d.image,
              yt: d.yt,
              demoUrl: d.demoUrl,
              codeUrl: d.codeUrl,
            }}
            onOpenVideo={openVideo}
          />
        ))}
      </div>

      {/* BOTTOM STRIP — LEVEL-7 */}
      <div className={styles.neonStripBottom}>
        POWERED • BY • RISING IMPACT
      </div>

      {/* MODAL */}
      {modalVideo && (
        <div className={styles.modal} onClick={() => setModalVideo(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${modalVideo.yt}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={modalVideo.title}
            />
          </div>
        </div>
      )}
    </section>
  );
}
