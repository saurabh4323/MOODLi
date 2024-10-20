import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./contact.css";
const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Send Message</h1>
        <p>Write Us a Message for Any Reason</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h3>Address</h3>
              <p>Noida</p>
            </div>
          </div>
          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <div>
              <h3>Phone</h3>
              <p>+91-8810873052</p>
            </div>
          </div>
          <div className="info-item">
            <FaEnvelope className="icon" />
            <div>
              <h3>Email</h3>
              <p>contact.moodli@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form>
            <div className="form-group">
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Your email" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Your phone" />
              <input type="text" placeholder="Subject" required />
            </div>
            <div className="form-group-full">
              <textarea placeholder="Your message here" required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
