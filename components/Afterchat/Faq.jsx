"use client";

import React, { useState } from "react";
import Head from "next/head";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./f.css";
const faqs = [
  {
    id: 1,
    question: "Why should I track my mood?",
    answer:
      "Tracking your mood can help you understand emotional patterns, identify triggers, and improve mental well-being. It provides a record you can reflect on to better manage your emotions.",
  },
  {
    id: 2,
    question: "What are the benefits of mood tracking?",
    answer:
      "Mood tracking enhances self-awareness, helps with mental health management, and allows you to set goals for emotional well-being. You can also share your mood data with mental health professionals to improve treatment.",
  },
  {
    id: 7,
    question: "How can I earn money thorugh Moodli?",
    answer:
      "When you will have a good number of connection a confirmation mail will come to you and you will be eligible to create username and then our partners will connect with you",
  },
  {
    id: 3,
    question: "How can I connect with others on Moodli?",
    answer:
      "Moodli allows you to connect with friends and meet people who are experiencing similar emotions, offering a supportive community to share and chat with.",
  },
  {
    id: 4,
    question: "Can I share my mood data?",
    answer:
      "Yes, you can share your mood data with friends or mental health professionals to gain insights into your emotional patterns and improve well-being.",
  },
  {
    id: 5,
    question: "Is there a chat feature?",
    answer:
      "Yes, Moodli has a chat feature that allows you to message your friends and others, sharing your mood and connecting based on your emotional state.",
  },
  {
    id: 6,
    question: "How do I start tracking my mood?",
    answer:
      "Simply sign up for Moodli, set your mood using an emoji, and start logging your feelings. You can also access personalized mood suggestions based on your data.",
  },
];

export default function Faq() {
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const toggleFAQ = (id) => {
    if (openQuestionId === id) {
      setOpenQuestionId(null); // Close if already op Faqen
    } else {
      setOpenQuestionId(id); // Open clicked question
    }
  };

  return (
    <div className="faq-container">
      <Head>
        <title>Moodli FAQ - Mood Tracking Questions</title>
        <meta
          name="description"
          content="Frequently asked questions about using Moodli to track your mood, connect with friends, and enhance emotional well-being."
        />
      </Head>

      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Get all your answers about Moodli!</p>
      </div>

      <div className="faq-section">
        {faqs.map((faq) => (
          <div key={faq.id} className="faq-item">
            <button onClick={() => toggleFAQ(faq.id)} className="faq-button">
              <span>{faq.question}</span>
              <span>
                {openQuestionId === faq.id ? <FaMinus /> : <FaPlus />}
              </span>
            </button>
            {openQuestionId === faq.id && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
