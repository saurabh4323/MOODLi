"use client";
import React from "react";
import Heroleft from "./Heroleft";
import Heroright from "./Heroright";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import "./hl.css";
import Hero from "../Hero";
import Moodlii from "./Moodlii";
import NewsLetter from "./NewsLetter";
import Faq from "./Faq";

export default function Newhero() {
  const { scrollYProgress } = useViewportScroll();

  const yTranslate = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="Newhero">
      <div className="containerk">
        <Heroleft />
        <Heroright />
      </div>

      <motion.div style={{ y: yTranslate }}>
        <Hero />
      </motion.div>

      <Moodlii />
    </div>
  );
}
