"use client";
// components/useAds.js
import { useEffect } from "react";
import Cookies from "js-cookie";

const useAds = () => {
  useEffect(() => {
    const consent = Cookies.get("userConsent");
    if (consent === "accepted") {
      // Load ad scripts or analytics tools only after consent
      const script = document.createElement("script");
      script.src = "https://path-to-your-ad-network.js"; // Replace with actual ad script
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
};

export default useAds;
