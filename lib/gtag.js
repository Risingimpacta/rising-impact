// lib/gtag.js
export const GA_TRACKING_ID = "G-36R2J791CF";

// Initialize gtag
export const initGA = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      send_page_view: true
    });
  }
};

// Page views
export const pageview = (url, title) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
      page_title: title,
    });
  }
};

// Enhanced event tracking for marketing
export const event = ({ action, category, label, value, customParams = {} }) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams
    });
  }
};

// Button Click Tracking (MISSING EXPORT)
export const trackButtonClick = (buttonName, location = "unknown") => {
  event({
    action: "button_click",
    category: "UI Interaction",
    label: buttonName,
    customParams: {
      button_name: buttonName,
      location: location,
      interaction_type: "click"
    }
  });
};

// MARKETING-SPECIFIC EVENTS

// Lead Generation
export const trackLead = (source, formName = "contact_form") => {
  event({
    action: "generate_lead",
    category: "Lead Generation",
    label: `${source}_${formName}`,
    value: 1,
    customParams: {
      lead_source: source,
      form_name: formName
    }
  });
};

// Service Interest
export const trackServiceInterest = (serviceName, section = "homepage") => {
  event({
    action: "service_interest",
    category: "Services",
    label: serviceName,
    customParams: {
      service_name: serviceName,
      section: section,
      engagement_type: "click"
    }
  });
};

// Technology Engagement
export const trackTechnologyView = (techName, interactionType = "view") => {
  event({
    action: "technology_engagement",
    category: "Technologies",
    label: techName,
    customParams: {
      technology: techName,
      interaction_type: interactionType,
      business_area: "web3_blockchain"
    }
  });
};

// Demo Interactions
export const trackDemoEngagement = (demoName, actionType = "view", duration = null) => {
  event({
    action: "demo_engagement",
    category: "Demos",
    label: demoName,
    value: duration,
    customParams: {
      demo_name: demoName,
      action_type: actionType,
      duration_seconds: duration
    }
  });
};

// Contact Methods
export const trackContactMethod = (method, context = "floating_button") => {
  event({
    action: "contact_initiated",
    category: "Contact",
    label: method,
    customParams: {
      contact_method: method,
      context: context,
      timestamp: new Date().toISOString()
    }
  });
};

// File Downloads
export const trackDownload = (fileName, fileType = "pdf") => {
  event({
    action: "file_download",
    category: "Resources",
    label: fileName,
    customParams: {
      file_name: fileName,
      file_type: fileType,
      resource_type: "marketing_material"
    }
  });
};

// Scroll Depth
export const trackScrollDepth = (depth) => {
  event({
    action: "scroll_depth",
    category: "Engagement",
    label: `scroll_${depth}%`,
    value: depth,
    customParams: {
      scroll_percentage: depth,
      page_section: "main_content"
    }
  });
};

// Time on Page
export const trackTimeOnPage = (page, seconds) => {
  event({
    action: "time_spent",
    category: "Engagement",
    label: page,
    value: seconds,
    customParams: {
      page_name: page,
      time_seconds: seconds,
      engagement_level: seconds > 60 ? "high" : seconds > 30 ? "medium" : "low"
    }
  });
};

// Form Interactions
export const trackFormSubmission = (formName) => {
  event({
    action: "form_submit",
    category: "Form",
    label: formName,
    customParams: {
      form_name: formName,
      submission_type: "contact"
    }
  });
};