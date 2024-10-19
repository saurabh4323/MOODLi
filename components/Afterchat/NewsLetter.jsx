import React from "react";
import "./Newsletter.css"; // Ensure you create this CSS file.

const NewsLetter = () => {
  return (
    <div className="newsletter-container">
      <h2 className="newsletter-title">Get Newsletter</h2>
      <p className="newsletter-subtitle">Get updated with news, updates</p>
      <div className="newsletter-form">
        <input
          style={{ color: "#000" }}
          type="email"
          placeholder="Your email here"
          className="newsletter-input"
        />
        <button className="newsletter-button">Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
