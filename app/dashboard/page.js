import Dashboard from "@/components/Dashboard";
import Hero from "@/components/Hero";
import Register from "@/components/Register";
import React from "react";

export default function page() {
  const auth = true;
  let current = <Register></Register>;
  if (auth) {
    current = <Dashboard></Dashboard>;
  }
  return <div>{current}</div>;
}
