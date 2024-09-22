import React from "react";
import "./butt.css";
import { Fugaz_One } from "next/font/google";

export default function Button({ children, className }) {
  return (
    <button className={className}>
      <p>{children}</p>{" "}
      {/* Use children to display the text passed inside the Button */}
    </button>
  );
}
