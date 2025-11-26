// lib/analytics.js
export const isGAEnabled = () => {
  return process.env.NODE_ENV === "production" && typeof window !== "undefined";
};

export const safeGA = (callback) => {
  if (isGAEnabled() && typeof window.gtag !== "undefined") {
    callback();
  }
};