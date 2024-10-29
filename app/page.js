"use client";
import Heros from "@/components/Heros";
import Image from "next/image";
import Head from "next/head";
import Newhero from "@/components/Afterchat/Newhero";
import NewsLetter from "@/components/Afterchat/NewsLetter";
import Faq from "@/components/Afterchat/Faq";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useState for managing state
import Pulse from "@/components/Post/Pulse";
import Loading from "@/components/Loading";

export default function Home() {
  const route = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null); // State to track user login status

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      setIsUserLoggedIn(!!userId); // Set state based on userId presence
    }
  }, [route]); // Add route as a dependency

  return (
    <div>
      {/* Conditional rendering based on user login status */}
      {isUserLoggedIn === null ? (
        <div>
          <Loading></Loading>
        </div> // Optional loading state while checking user login
      ) : isUserLoggedIn ? (
        <Pulse />
      ) : (
        <>
          <Newhero />
          <Faq />
          <NewsLetter />
        </>
      )}
    </div>
  );
}
