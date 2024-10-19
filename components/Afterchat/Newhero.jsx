"use client";
import React from "react";
import Heroleft from "./Heroleft";
import Heroright from "./Heroright";
import "./hl.css";
import Hero from "../Hero";
export default function Newhero() {
  return (
    <>
      <div className="containerk">
        <Heroleft></Heroleft>
        <Heroright></Heroright>
      </div>
      <Hero></Hero>
    </>
  );
}
