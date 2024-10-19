import React from "react";
import "./mooslii.css";
import Feat from "./Feat";
import NewsLetter from "./NewsLetter";

const Moodlii = () => {
  return (
    <>
      <div
        className="mainn"
        style={{ display: "flex", width: "100%", height: "102vh" }}
      >
        <div
          className="feat"
          style={{
            width: "100%",
            marginTop: "10%",
            marginLeft: "3%",
          }}
        >
          <Feat></Feat>
        </div>
        <div className="moodlii-container">
          <section className="moodlii-features">
            <div className="moodlii-flex-container">
              <div className="moodlii-feature-card">
                <h4 className="moodlii-feature-title">01. Track Your Mood</h4>
                <p>
                  Ever wonder how your mood changes throughout the day? Now you
                  can easily track your emotions.
                </p>
              </div>
              <div className="moodlii-feature-card">
                <h4 className="moodlii-feature-title">02. Make New Friends</h4>
                <p>
                  Connect with others and share your experiences with
                  like-minded individuals.
                </p>
              </div>
              <div className="moodlii-feature-card">
                <h4 className="moodlii-feature-title">03. Powerful Insights</h4>
                <p>
                  Get insights and suggestions tailored to your current mood.
                </p>
              </div>
              <div className="moodlii-feature-card">
                <h4 className="moodlii-feature-title">
                  04. Get Support Easily
                </h4>
                <p>
                  Share your feelings with friends and get the support you need.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <NewsLetter></NewsLetter> */}
    </>
  );
};

export default Moodlii;
