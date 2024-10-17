"use client";
import React, { useState } from "react";
import "./ky.css";
import Button from "../Button"; // Assuming you have a custom button component
import { useRouter } from "next/navigation";

const questions = [
  {
    question: "How do you feel after a long day with people?",
    options: [
      { text: "Energized and ready for more!", value: "extrovert" },
      { text: "I'm okay, but need a bit of alone time.", value: "ambivert" },
      { text: "Exhausted, I need to recharge alone.", value: "introvert" },
    ],
  },
  {
    question: "What do you prefer doing on a free weekend?",
    options: [
      { text: "Going out with friends!", value: "extrovert" },
      { text: "I like a balance of both.", value: "ambivert" },
      { text: "Staying at home and relaxing.", value: "introvert" },
    ],
  },
  {
    question: "How do you usually make decisions?",
    options: [
      { text: "I trust my gut.", value: "extrovert" },
      {
        text: "I weigh pros and cons, but also follow my instinct.",
        value: "ambivert",
      },
      { text: "I analyze everything in detail.", value: "introvert" },
    ],
  },
  {
    question: "What emoji do you most relate to?",
    options: [
      { text: "😎", value: "confident" },
      { text: "😊", value: "calm" },
      { text: "🤔", value: "thoughtful" },
    ],
  },
  {
    question: "How do you handle stressful situations?",
    options: [
      { text: "I talk to others to feel better.", value: "extrovert" },
      { text: "I think about it, then talk it out.", value: "ambivert" },
      {
        text: "I keep it to myself and process it internally.",
        value: "introvert",
      },
    ],
  },
  {
    question: "What is your favorite type of activity?",
    options: [
      { text: "Attending social events!", value: "extrovert" },
      { text: "A mix of social and quiet time.", value: "ambivert" },
      { text: "Spending quiet time reading or relaxing.", value: "introvert" },
    ],
  },
  {
    question: "How do you prefer to communicate with friends?",
    options: [
      { text: "Calling or meeting them in person.", value: "extrovert" },
      { text: "A mix of in-person and messaging.", value: "ambivert" },
      { text: "Messaging or emailing works best for me.", value: "introvert" },
    ],
  },
];

const KnowYourself = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleNext = () => {
    if (selectedOption !== null) {
      setAnswers([...answers, selectedOption]);
      setStep(step + 1);
      setSelectedOption(null);
    } else {
      alert("Please select an option before proceeding!");
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnswers(answers.slice(0, -1));
    }
  };
  const cl = () => {
    console.log("o");
    router.push("/"); // Correct use of router.push
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const calculateResult = () => {
    const counts = {
      extrovert: 0,
      ambivert: 0,
      introvert: 0,
      confident: 0,
      calm: 0,
      thoughtful: 0,
    };

    answers.forEach((answer) => {
      counts[answer] += 1;
    });

    const personality =
      counts.extrovert > counts.ambivert && counts.extrovert > counts.introvert
        ? "Extrovert"
        : counts.ambivert > counts.extrovert &&
          counts.ambivert > counts.introvert
        ? "Ambivert"
        : "Introvert";

    const favoriteEmoji =
      counts.confident > counts.calm && counts.confident > counts.thoughtful
        ? "😎"
        : counts.calm > counts.confident && counts.calm > counts.thoughtful
        ? "😊"
        : "🤔";

    const mood =
      counts.extrovert > counts.introvert
        ? "Social environments."
        : "Peace and Quiet.";
    const situationHandling =
      counts.extrovert > counts.introvert ? "talk things out." : " Alone.";

    return {
      personality,
      favoriteEmoji,
      mood,
      situationHandling,
      overallType: personality === "Extrovert" ? "Explorer" : "Strategist",
    };
  };

  const result = calculateResult();

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        {step < questions.length ? (
          <div className="question-container">
            <h5 className="question-title">{questions[step].question}</h5>
            <div className="option-group">
              {questions[step].options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    name="option"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={handleOptionChange}
                  />
                  {option.text}
                </label>
              ))}
            </div>
            <div className="button-container">
              {step > 0 && (
                <button onClick={handlePrev} className="prev-button">
                  Previous
                </button>
              )}
              <button onClick={handleNext} className="next-button">
                {step === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <div className="results-container">
            <h4 className="results-title">Your Results:</h4>
            <div className="results-item">
              <span>Personality Type:</span>
              <span className="results-value">{result.personality}</span>
            </div>
            <div className="results-item">
              <span>Mood Tendency:</span>
              <span className="results-value">{result.mood}</span>
            </div>
            <div className="results-item">
              <span>Favorite Emoji:</span>
              <span className="results-value">{result.favoriteEmoji}</span>
            </div>
            <div className="results-item">
              <span>Situation Handling:</span>
              <span className="results-value">{result.situationHandling}</span>
            </div>
            <div className="results-item">
              <span>Personality Type:</span>
              <span className="results-value">{result.overallType}</span>
            </div>
            <div className="btn" onClick={cl}>
              <button onClick={cl}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowYourself;
