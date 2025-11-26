"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/DemosPage.module.scss";
import { useState, useRef, useEffect } from "react";

const YT_DEMOS = [
  {
    id: 1,
    title: "Rising Star: The Future of Decentralized Finance (DeFi)",
    yt: "WHFtpe8HTl4",
    desc: "A feature-rich DeFi platform built by Rising Impact — trading, staking & tokenomics.",
    category: "DeFi Platform",
    tags: ["Web3", "Blockchain", "Staking", "Trading"],
    demoUrl: "https://risingsstardex.risingimpact.in/",
    featured: true
  },
  {
    id: 2,
    title: "Simba Dex – Official Demo",
    yt: "jt9JDMvMiDo",
    desc: "A jungle-themed DEX built for smooth Web3 user experience with advanced swap features.",
    category: "DEX Platform",
    tags: ["DEX", "Web3", "Swap", "Liquidity"],
    demoUrl: "https://simbadex.risingimpact.in/",
    featured: true
  },
  {
    id: 3,
    title: "Royal Things E-Commerce Demo",
    yt: "4zs12Kovde0",
    desc: "A complete e-commerce store with admin panel and dynamic product catalog.",
    category: "E-Commerce",
    tags: ["E-Commerce", "Admin Panel", "Inventory", "Checkout"],
    demoUrl: "https://royal-thing-web.netlify.app/",
    codeUrl: "https://royal-things-admin.netlify.app/"
  },
  {
    id: 4,
    title: "Smart Contract Testing & Audit Process",
    yt: "6RIGrYo1bb8",
    desc: "A multi-stage contract testing pipeline including simulations, testnets & audits.",
    category: "Blockchain Tools",
    tags: ["Smart Contracts", "Testing", "Audit", "Security"],
    demoUrl: null
  },
  {
    id: 5,
    title: "Web3 Wallet Integration Demo",
    yt: "TpsPHjhakzI",
    desc: "Seamless MetaMask and WalletConnect integration for dApp connectivity.",
    category: "Web3 Integration",
    tags: ["Wallet", "MetaMask", "dApp", "Web3"],
    demoUrl: null
  },
  {
    id: 6,
    title: "NFT Marketplace Prototype",
    yt: "EmZbvFBREHU",
    desc: "Next-generation NFT marketplace with bidding, collections, and creator tools.",
    category: "NFT Platform",
    tags: ["NFT", "Marketplace", "Collections", "Bidding"],
    demoUrl: null
  }
];

const CATEGORIES = ["All", "DeFi Platform", "DEX Platform", "E-Commerce", "Blockchain Tools", "Web3 Integration", "NFT Platform"];

export default function DemosPage() {
  const [open, setOpen] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);
  const searchRef = useRef(null);

  // Filter demos based on category and search
  const filteredDemos = YT_DEMOS.filter(demo => {
    const matchesCategory = activeCategory === "All" || demo.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
                         demo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         demo.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Auto-rotate featured demos
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoPlayIndex(prev => (prev + 1) % YT_DEMOS.filter(d => d.featured).length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredDemos = YT_DEMOS.filter(d => d.featured);

  return (
    <section className={styles.section}>
      {/* TOP NEON STRIP */}
      <div className={styles.neonStrip}>LIVE DEMOS</div>

      {/* HERO SECTION */}
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.title}>
          Rising Impact <span className={styles.gradientText}>Product Demos</span>
        </h1>
        <p className={styles.subtitle}>
          Experience our cutting-edge Web3, Blockchain, DeFi, and E-Commerce solutions in action. 
          Each demo showcases real-world applications built with precision and innovation.
        </p>
      </motion.div>

      {/* FEATURED DEMOS CAROUSEL */}
      {featuredDemos.length > 0 && (
        <div className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Demos</h2>
            <div className={styles.carouselIndicators}>
              {featuredDemos.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === autoPlayIndex ? styles.active : ''}`}
                  onClick={() => setAutoPlayIndex(index)}
                />
              ))}
            </div>
          </div>
          
          <div className={styles.featuredCarousel}>
            {featuredDemos.map((demo, index) => (
              <motion.div
                key={demo.id}
                className={styles.featuredCard}
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: index === autoPlayIndex ? 1 : 0.3,
                  x: index === autoPlayIndex ? 0 : 50,
                  scale: index === autoPlayIndex ? 1 : 0.95
                }}
                transition={{ duration: 0.5 }}
                onClick={() => setOpen(demo)}
              >
                <div className={styles.featuredThumb}>
                  <img
                    src={`https://img.youtube.com/vi/${demo.yt}/maxresdefault.jpg`}
                    alt={demo.title}
                    className={styles.featuredImage}
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${demo.yt}/hqdefault.jpg`;
                    }}
                  />
                  <div className={styles.featuredPlayBtn}>
                    <div className={styles.playIcon}>▶</div>
                    <span>Watch Demo</span>
                  </div>
                  <div className={styles.featuredBadge}>Featured</div>
                </div>
                <div className={styles.featuredContent}>
                  <h3 className={styles.featuredTitle}>{demo.title}</h3>
                  <p className={styles.featuredDesc}>{demo.desc}</p>
                  <div className={styles.featuredTags}>
                    {demo.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  {demo.demoUrl && (
                    <a 
                      href={demo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.liveDemoLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      🚀 Visit Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* FILTERS AND SEARCH SECTION */}
      <div className={styles.filtersContainer}>
        <div className={styles.filtersContent}>
          {/* Search Box */}
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <div className={styles.searchIcon}>🔍</div>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search demos by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button 
                  className={styles.clearSearch}
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className={styles.categoriesContainer}>
            <h4 className={styles.categoriesTitle}>Filter by Category:</h4>
            <div className={styles.categoryFilters}>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`${styles.categoryFilter} ${activeCategory === category ? styles.active : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                  {category !== "All" && (
                    <span className={styles.categoryCount}>
                      {YT_DEMOS.filter(d => d.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || activeCategory !== "All") && (
            <div className={styles.activeFilters}>
              <span className={styles.activeFiltersLabel}>Active Filters:</span>
              {searchTerm && (
                <div className={styles.activeFilter}>
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")}>✕</button>
                </div>
              )}
              {activeCategory !== "All" && (
                <div className={styles.activeFilter}>
                  Category: {activeCategory}
                  <button onClick={() => setActiveCategory("All")}>✕</button>
                </div>
              )}
              <button 
                className={styles.clearAllFilters}
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DEMOS GRID SECTION */}
      <div className={styles.gridSection}>
        <div className={styles.gridHeader}>
          <h3 className={styles.gridTitle}>
            All Demos <span className={styles.demoCount}>({filteredDemos.length})</span>
          </h3>
          <div className={styles.gridControls}>
            <span className={styles.resultsText}>
              Showing {filteredDemos.length} of {YT_DEMOS.length} demos
            </span>
          </div>
        </div>
        
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredDemos.map((demo, index) => (
              <motion.div
                key={demo.id}
                className={styles.card}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                layout
              >
                <div className={styles.cardHolo} />
                
                {demo.featured && <div className={styles.featuredRibbon}>Featured</div>}

                <div 
                  className={styles.thumbWrap}
                  onClick={() => setOpen(demo)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${demo.yt}/hqdefault.jpg`}
                    className={styles.thumb}
                    alt={demo.title}
                  />
                  <div className={styles.playBtn}>
                    <div className={styles.playTriangle}></div>
                  </div>
                  <div className={styles.cardOverlay}>
                    <span>Click to Watch Demo</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardCategory}>{demo.category}</div>
                    <div className={styles.demoStatus}>
                      {demo.demoUrl ? (
                        <span className={styles.liveBadge}>🟢 Live</span>
                      ) : (
                        <span className={styles.demoBadge}>🎬 Demo</span>
                      )}
                    </div>
                  </div>
                  
                  <h4 className={styles.cardTitle}>{demo.title}</h4>
                  <p className={styles.cardDesc}>{demo.desc}</p>
                  
                  <div className={styles.tags}>
                    {demo.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>

                  <div className={styles.cardActions}>
                    <button 
                      className={styles.primaryBtn}
                      onClick={() => setOpen(demo)}
                    >
                      <span className={styles.btnIcon}>▶</span>
                      Watch Demo
                    </button>
                    {demo.demoUrl && (
                      <a 
                        href={demo.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.secondaryBtn}
                      >
                        <span className={styles.btnIcon}>🌐</span>
                        Live Site
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDemos.length === 0 && (
          <motion.div 
            className={styles.noResults}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.noResultsIcon}>🎬</div>
            <h3>No demos found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button 
              className={styles.resetFiltersBtn}
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* CTA SECTION */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Build Something Amazing?</h2>
          <p>Let's discuss how we can bring your Web3, blockchain, or digital product vision to life.</p>
          <div className={styles.ctaButtons}>
            <a 
              href="https://teams.live.com/l/invite/FEAQ_SAnU1l-eZ7kwI?v=g1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Book a Consultation
            </a>
            <a 
              href="/technologies"
              className={styles.ctaSecondary}
            >
              View Our Technologies
            </a>
          </div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeBtn}
                onClick={() => setOpen(null)}
              >
                ×
              </button>
              <div className={styles.modalHeader}>
                <h3>{open.title}</h3>
                <div className={styles.modalMeta}>
                  <span className={styles.modalCategory}>{open.category}</span>
                  {open.demoUrl && <span className={styles.modalLive}>🟢 Live Demo Available</span>}
                </div>
                <p>{open.desc}</p>
              </div>
              <div className={styles.videoContainer}>
                <iframe
                  src={`https://www.youtube.com/embed/${open.yt}?autoplay=1&rel=0`}
                  title={open.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className={styles.modalFooter}>
                <div className={styles.modalTags}>
                  {open.tags.map(tag => (
                    <span key={tag} className={styles.modalTag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.modalActions}>
                  {open.demoUrl && (
                    <a 
                      href={open.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.liveDemoBtn}
                    >
                      🚀 Visit Live Demo
                    </a>
                  )}
                  <button 
                    className={styles.closeModalBtn}
                    onClick={() => setOpen(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM NEON STRIP */}
      <div className={styles.neonStrip}>POWERED • BY • RISING IMPACT</div>
    </section>
  );
}