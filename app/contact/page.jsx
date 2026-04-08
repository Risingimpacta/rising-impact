"use client";

import { useState } from "react";
import styles from "@/styles/contact.module.scss";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    teams: "",
    googleMeet: "",
    linkedin: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    alert(data.message);

    setForm({
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      teams: "",
      googleMeet: "",
      linkedin: "",
      message: ""
    });
  };

  return (

    <div className={styles.contactPage}>

      <div className={styles.contactHeader}>
        <h1 className={styles.contactTitle}>
          Contact Rising Impact
        </h1>

        <p className={styles.contactLead}>
          Tell us about your project and how we can reach you.
        </p>
      </div>

      <div className={styles.contactContainer}>

        <div className={styles.contactGrid}>

          {/* CONTACT INFO */}

          <div className={styles.contactCard}>

            <h3 className={styles.infoTitle}>
              Get In Touch
            </h3>

            <p className={styles.infoText}>
              Need a website or digital solution?  
              Send us your enquiry and we will respond quickly.
            </p>

            <p className={styles.infoItem}>📞 Phone: +91 7559257159</p>

            <p className={styles.infoItem}>
              💬 WhatsApp
              <a
                href="https://wa.me/917559257159"
                className={styles.whatsappLink}
                target="_blank"
              >
                Chat Now
              </a>
            </p>

            <p className={styles.infoItem}>📧 contact@rising-impact.in</p>

          </div>


          {/* CONTACT FORM */}

          <div className={styles.contactCard}>

            <form
              className={styles.contactForm}
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className={styles.input}
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={styles.input}
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className={styles.input}
                value={form.phone}
                onChange={handleChange}
              />

              <input
                type="text"
                name="whatsapp"
                placeholder="WhatsApp Number (optional)"
                className={styles.input}
                value={form.whatsapp}
                onChange={handleChange}
              />

              <input
                type="text"
                name="teams"
                placeholder="Microsoft Teams ID (optional)"
                className={styles.input}
                value={form.teams}
                onChange={handleChange}
              />

              <input
                type="email"
                name="googleMeet"
                placeholder="Google Meet Email (optional)"
                className={styles.input}
                value={form.googleMeet}
                onChange={handleChange}
              />

              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn Profile URL"
                className={styles.input}
                value={form.linkedin}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Tell us about your project"
                className={styles.textarea}
                value={form.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className={styles.submitBtn}
              >
                Send Enquiry
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );
}