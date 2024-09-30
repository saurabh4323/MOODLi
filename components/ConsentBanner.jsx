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
      <p style={paragraphStyles}>
        We use cookies and similar technologies to show personalized ads and
        analyze our traffic. By clicking “Accept,” you consent to our use of
        cookies.
      </p>
      <div style={buttonContainerStyles}>
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
  borderTop: "1px solid #fff",
  backgroundColor: "#2b1c4f",
  color: "#fff",
  padding: "15px",
  textAlign: "center",
  zIndex: 1000,
  boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.5)",
};

const paragraphStyles = {
  margin: "0 0 10px 0",
  fontSize: "1rem",
  lineHeight: "1.5",
  padding: "0 10px",
};

const buttonContainerStyles = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const buttonStyles = {
  padding: "10px 20px",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s",
};

export default ConsentBanner;
