"use client"
import React , {useState} from "react";
import "./newsletter.css"; // Ensure you create this CSS file.


 const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    // Add your subscription logic here
    setIsSubscribed(true);
  };

  return (
    <div className="newsletter-container">
      <h2 className="newsletter-title">Get Reminder</h2>
      <p className="newsletter-subtitle">Get updated with news, updates</p>
      <div className="newsletter-form">
        <input
          style={{ color: "#000" }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email here"
          className="newsletter-input"
        />
        <button
          className="newsletter-button"
          onClick={handleSubscribe}
          disabled={isSubscribed}
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};
export default NewsLetter;

