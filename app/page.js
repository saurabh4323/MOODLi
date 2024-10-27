"use client";
import Heros from "@/components/Heros";
import Image from "next/image";
import Head from "next/head";
import Newhero from "@/components/Afterchat/Newhero";
import NewsLetter from "@/components/Afterchat/NewsLetter";
import Faq from "@/components/Afterchat/Faq";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        route.push("/dashboard");
      }
    }
  }, [route]); // Add route as a dependency

  return (
    <div>
      <Newhero></Newhero>

      <Faq></Faq>
      <NewsLetter></NewsLetter>
    </div>
  );
}
