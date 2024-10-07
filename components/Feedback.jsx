"use client";
import { useState, useEffect } from "react";
import axios from "axios";
const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feeddata, setfeeddata] = useState({
    name: "saurabh",
    feedback: "",
  });

  useEffect(() => {
    // Check localStorage to see if feedback has already been submitted
    const hasSubmitted = localStorage.getItem("hasSubmittedFeedback");
    if (hasSubmitted) {
      setIsSubmitted(true);
    }
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    console.log("Feedback Submitted: ", feedback, "Rating: ", rating);
    const res = axios.post("api/users/feedback", {
      name: "saurabh",
      feedback: feedback,
    });
    console.log("sending", res);

    localStorage.setItem("hasSubmittedFeedback", "true");

    setIsSubmitted(true);
  };

  const handleShare = () => {
    const shareText = "Check out this mood tracking website!"; // Customize your share text
    navigator.share({
      title: "Feedback for Mood Tracker",
      text: shareText,
      url: window.location.href,
    });
  };

  return (
    <div className="feedback-card">
      {isSubmitted ? (
        <div style={{ display: "none" }}>hddd</div>
      ) : (
        <>
          <h2>We value your feedback!</h2>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Share your experience of 10 days"
            rows="4"
            className="feedback-input"
          />
          <div className="rating-section">
            <h3>Rate Us:</h3>
            {[1, 2, 3, 4, 5].map((rate) => (
              <span
                key={rate}
                className={`star ${rate <= rating ? "filled" : ""}`}
                onClick={() => handleRatingClick(rate)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="button-container">
            <button onClick={handleSubmit} className="submit-button">
              Submit Feedback
            </button>
          </div>
        </>
      )}
      <style jsx>{`
        .feedback-card {
          position: absolute;
          background-color: #fff;
          border-radius: 10px;
          padding: 20px;
          z-index: 999;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 300px;
           {
            /* margin-left: 40%; */
          }
          margin-top: 70px;
        }
        .feedback-input {
          color: #000;
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 15px;
        }
        .rating-section {
          display: flex;
          align-items: center;
        }
        .star {
          font-size: 24px;
          cursor: pointer;
          color: #ccc;
        }
        .star.filled {
          color: gold;
        }
        .button-container {
          display: flex;
          justify-content: space-between;
        }
        .submit-button,
        .share-button {
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .submit-button {
          background-color: #28a745;
          color: white;
        }
        .share-button {
          background-color: #007bff;
          color: white;
        }
        .thank-you-message {
          text-align: center;
          font-size: 18px;
          color: #28a745;
        }
      `}</style>
    </div>
  );
};

export default Feedback;
