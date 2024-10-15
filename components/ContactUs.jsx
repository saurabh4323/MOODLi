// pages/contact.js
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/contact", {
        userId,
        name,
        email,
        reason,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Contact Us</h1>
        <div className="input-field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label>Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
        <div class="pa" style={{ marginTop: "10px" }}>
          {" "}
          or just click here
          <a href="mailto:moodly.mine@gmail.com" style={{ color: "red" }}>
            {" "}
            moodly.mine@gmail.com
          </a>
        </div>
      </form>

      <style jsx>{`
        .container {
          background-color: #583de8;
          color: #fff;
          max-width: 600px;
          margin: 50px auto;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-weight: 800;
          text-align: center;
          color: #fff;
        }
        .input-field {
          margin-bottom: 20px;
        }
        .input-field label {
          display: block;
          margin-bottom: 8px;
          color: #fff;
        }
        .input-field input,
        .input-field textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #333;
          border-radius: 4px;
          background-color: #222;
          color: #fff;
        }
        .submit-btn {
          background-color: #00aaff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 4px;
          width: 100%;
          font-size: 16px;
        }
        .submit-btn:hover {
          background-color: #007acc;
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
