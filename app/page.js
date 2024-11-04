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
      <Head>
        <title>Moodli - Your Anonymous Mood Tracking and Chat Platform</title>
        <meta
          name="description"
          content="Join Moodli to track your mood, connect with friends, and share feelings. Experience a supportive community and powerful insights tailored for you."
        />
        <meta
          name="keywords"
          content="Mood tracker, Emotional support, Connect with friends, Mood reflection, Online community, Mental wellness , online chat , "
        />
      </Head>
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
          <Link
            href="https://www.producthunt.com/posts/moodli?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-moodli"
            target="_blank"
          >
            <Image
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=573818&theme=dark"
              alt="Moodli - Your anonymous mood tracking and chat platform | Product Hunt"
              width={250}
              height={54}
            />
          </Link>
        </>
      )}
    </div>
  );
}
