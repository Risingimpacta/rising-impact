export const GA_TRACKING_ID = "G-36R2J791CF";

// Send generic event
export const event = ({ action, category, label, value }) => {
  if (typeof window !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
