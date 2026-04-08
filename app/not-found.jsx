"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {

  const router = useRouter();

  useEffect(() => {

    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);

  }, [router]);

  return (

    <div style={{
      background: "linear-gradient(180deg,#05030A,#07091A)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#eaf3ff",
      textAlign: "center",
      padding: "20px"
    }}>

      <div>

        <h1 style={{
          fontSize: "48px",
          fontWeight: "800",
          background: "linear-gradient(90deg,#FF7A00,#0084FF)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          404
        </h1>

        <h2 style={{ marginTop: "10px" }}>
          Page Not Found
        </h2>

        <p style={{ color: "#9fb0c8", marginTop: "10px" }}>
          Redirecting to homepage...
        </p>

      </div>

    </div>

  );
}