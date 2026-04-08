"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Navbar.module.scss";

/* ----------------------------------------------
   SVG ICONS (Hologram-Ready)
---------------------------------------------- */
const Icon = ({ path }) => (
  <svg viewBox="0 0 24 24" className={styles.icon}>
    <path fill="currentColor" d={path} />
  </svg>
);

const Icons = {
  home: "M12 3l10 9h-3v9H5v-9H2z",
  about: "M12 3a9 9 0 110 18 9 9 0 010-18zm0 4a2 2 0 100 4 2 2 0 000-4zm0 6c-2.7 0-4 1.3-4 2v1h8v-1c0-.7-1.3-2-4-2z",
  services: "M4 4h6l2 3h8v13H4z",
  tech: "M12 2l9 5v10l-9 5-9-5V7zm0 2.2L5 8v8l7 3.8 7-3.8V8z",
  demos: "M3 6h18v12H3z",
  meeting: "M4 4h16v12H4z M8 20h8",
};

/* ----------------------------------------------
   NAVBAR
---------------------------------------------- */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  /* ----------------------------------------------
     Scroll Spy
  ---------------------------------------------- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y < 400) setActive("home");
      else if (y < 1100) setActive("about");
      else if (y < 1800) setActive("services");
      else if (y < 2600) setActive("technologies");
      else setActive("demos");
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ----------------------------------------------
     NAVIGATION ITEM
  ---------------------------------------------- */
  const NavItem = ({ href, id, label, icon }) => (
    <Link
      href={href}
      className={`${styles.navItem} ${active === id ? styles.activeLink : ""}`}
    >
      <Icon path={icon} />
      <span>{label}</span>
    </Link>
  );

  /* ----------------------------------------------
     VIEW
  ---------------------------------------------- */
  return (
    <header className={styles.navbar}>

      {/* Particle Layer */}
      <div className={styles.particles}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={styles.pDot}></div>
        ))}
      </div>

      {/* Neon Rail */}
      <div className={styles.neonRail}></div>

      <div className={styles.inner}>

        {/* Logo */}
        <Link href="/" className={styles.logoWrap}>
          <Image
            src="/logoH.png"
            alt="Rising Impact Logo"
            width={165}
            height={90}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.links}>
          <NavItem href="/" id="home" label="Home" icon={Icons.home} />
          <NavItem href="/about" id="about" label="About" icon={Icons.about} />
          <NavItem href="/services" id="services" label="Services" icon={Icons.services} />
          <NavItem href="/technologies" id="technologies" label="Technologies" icon={Icons.tech} />
          <NavItem href="/demos" id="demos" label="Demos" icon={Icons.demos} />

          {/* Contact (Book a Meeting) */}
          <a
            href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1"
            target="_blank"
            className={styles.meetingBtn}
          >
            <Icon path={Icons.meeting} />
            Contact
          </a>
        </nav>

        {/* LIVE MODE BADGE */}
        <div className={styles.wsBadge}>● LIVE MODE</div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.menuBtn}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <div className={open ? styles.barOpen : styles.bar}></div>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className={styles.mobileMenu}>
          <NavItem href="/" id="home" label="Home" icon={Icons.home} />
          <NavItem href="/about" id="about" label="About" icon={Icons.about} />
          <NavItem href="/services" id="services" label="Services" icon={Icons.services} />
          <NavItem href="/technologies" id="technologies" label="Technologies" icon={Icons.tech} />
          <NavItem href="/#demos" id="demos" label="Demos" icon={Icons.demos} />

          <a
            href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1"
            target="_blank"
            className={styles.meetingBtnMobile}
          >
            <Icon path={Icons.meeting} />
            Contact
          </a>

          <div className={styles.wsBadgeMobile}>● LIVE MODE</div>
        </div>
      )}
    </header>
  );
}
