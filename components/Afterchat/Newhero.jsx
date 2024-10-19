"use client";
import React from "react";
import Heroleft from "./Heroleft";
import Heroright from "./Heroright";
import "./hl.css";
import Hero from "../Hero";
import Moodlii from "./Moodlii";
import NewsLetter from "./NewsLetter";
export default function Newhero() {
  return (
    <div className="Newhero">
      <div className="containerk">
        <Heroleft></Heroleft>
        <Heroright></Heroright>
      </div>
      <Hero></Hero>
      <Moodlii></Moodlii>
    </div>
  );
}
