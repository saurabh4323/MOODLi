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
    if (typeof window !== "undefined") {
      const email = window.localStorage.getItem("email");
      if (!email) {
        alert(
          "For your privacy and security, we have made some changes. Please log in again from your devices. Sorry for the inconvenience. If anything went wrong contact us"
        );
        route.push("/login");
      }
    }
  }, []);

  return (
    <div>
      {/* <Heros></Heros>
       */}
      <Newhero></Newhero>

      <Faq></Faq>
      <NewsLetter></NewsLetter>
    </div>
  );
}
