import React from "react";
import { motion } from "framer-motion";
import "./mooslii.css";
import Feat from "./Feat";

const Moodlii = () => {
  return (
    <>
      <div className="mainn" style={{ display: "flex", width: "100%" }}>
        <div className="feat" style={{ width: "100%", marginTop: "10%" }}>
          <Feat />
        </div>
        <div className="moodlii-container">
          <section className="moodlii-features">
            <div className="moodlii-flex-container">
              {[
                {
                  title: "01. Track Your Mood",
                  description:
                    "Ever wonder how your mood changes throughout the day? Now you can easily track your emotions.",
                },
                {
                  title: "02. Make New Friends",
                  description:
                    "Connect with others and share your experiences with like-minded individuals.",
                },
                {
                  title: "03. Powerful Insights",
                  description:
                    "Get insights and suggestions tailored to your current mood.",
                },
                {
                  title: "04. Get Support Easily",
                  description:
                    "Share your feelings with friends and get the support you need.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="moodlii-feature-card"
                  whileHover={{
                    rotateX: [-10, 0, 10],
                    rotateY: [10, 0, -10],
                    scale: 1.05,
                    transition: { duration: 2 },
                  }}
                >
                  <h4 className="moodlii-feature-title">{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Moodlii;
