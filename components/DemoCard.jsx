"use client";

import React from "react";
import styles from "@/styles/DemosPage.module.scss";
import { motion } from "framer-motion";

export default function DemoCard({
  id,
  title,
  desc,
  image,
  yt,
  demoUrl,
  codeUrl,
  onOpenVideo
}) {
  const thumbnail = image || `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className={styles.cardHolo} />

      <div
        className={styles.thumbWrap}
        onClick={() => onOpenVideo({ id, yt, title })}
        role="button"
      >
        <img src={thumbnail} alt={title} className={styles.thumb} />

        <div className={styles.playBtn}>
          ▶
        </div>

        <div className={styles.cardOverlay}>
          Click to Watch Demo
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{desc}</p>

        <div className={styles.cardActions}>
          <a
            className={styles.primaryBtn}
            href={demoUrl || "#"}
            target={demoUrl ? "_blank" : "_self"}
            style={{
              opacity: demoUrl ? 1 : 0.5,
              pointerEvents: demoUrl ? "auto" : "none"
            }}
          >
            Visit Website
          </a>

          <button
            className={styles.secondaryBtn}
            onClick={() => onOpenVideo({ id, yt, title })}
          >
            Watch Video
          </button>

          {codeUrl && (
            <a className={styles.secondaryBtn} href={codeUrl} target="_blank">
              View Admin
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
