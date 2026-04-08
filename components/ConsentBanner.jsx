"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/ConsentBanner.module.scss";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("user-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("user-consent", "granted");
    setVisible(false);

    // Enable analytics
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  };

  const reject = () => {
    localStorage.setItem("user-consent", "denied");
    setVisible(false);

    // Keep everything disabled
    window.gtag("consent", "update", {
      analytics_storage: "denied",
    });
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <p>
        We use cookies to improve user experience and analyze website traffic.
        You can accept or decline analytics tracking.
      </p>

      <div className={styles.buttons}>
        <button onClick={reject} className={styles.reject}>
          Reject
        </button>
        <button onClick={accept} className={styles.accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
