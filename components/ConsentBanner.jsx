"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("userConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("userConsent", "accepted", { expires: 365 });
    setShowBanner(false);
  };

  const handleReject = () => {
    Cookies.set("userConsent", "rejected", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={bannerStyles}>
      <p>
        We use cookies and similar technologies to show personalized ads and
        analyze our traffic. By clicking “Accept,” you consent to our use of
        cookies.
      </p>
      <div>
        <button onClick={handleAccept} style={buttonStyles}>
          Accept
        </button>
        <button onClick={handleReject} style={buttonStyles}>
          Reject
        </button>
      </div>
    </div>
  );
};

const bannerStyles = {
  position: "fixed",
  bottom: "0",
  width: "100%",
  backgroundColor: "#000",
  color: "#fff",
  padding: "15px",
  textAlign: "center",
  zIndex: 1000,
};

const buttonStyles = {
  margin: "0 10px",
  padding: "10px 20px",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ConsentBanner;
