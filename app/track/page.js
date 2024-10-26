"use client";
import Track from "@/components/Track";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";

export default function Page() {
  // Change 'page' to 'Page'
  const router = useRouter(); // Fix the typo from 'rouuter' to 'router'
  const [profile, setProfile] = useState(null); // Add state for profile data
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkAuthentication = async () => {
        const userId = localStorage.getItem("userId");
        const storedEmail = localStorage.getItem("email");

        if (!userId || !storedEmail) {
          alert("Please log in to access your profile.");
          router.push("/login"); // Use 'router' instead of 'rouuter'
          return;
        }

        try {
          const response = await axios.post("/api/users/sau", { userId });
          if (response.data.email !== storedEmail) {
            alert("Don't try this again");
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            router.push("/login");
          } else {
            setProfile(response.data);
          }
        } catch (error) {
          console.error("Error verifying user email:", error);
        } finally {
          setLoading(false); // Ensure loading is set to false
        }
      };

      checkAuthentication();
    }
  }, [router]); // Add 'router' to the dependency array

  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    ); // Show a loading indicator
  }
  return (
    <div>
      <Track></Track>
    </div>
  );
}
