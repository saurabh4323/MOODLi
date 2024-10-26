"use client";
import Track from "@/components/Track";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
export default function page() {
  const rouuter = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkAuthentication = async () => {
        const userId = localStorage.getItem("userId");
        const storedEmail = localStorage.getItem("email");

        if (!userId || !storedEmail) {
          alert("Please log in to access your profile.");
          rouuter.push("/login");
          return;
        }

        try {
          const response = await axios.post("/api/users/sau", { userId });
          if (response.data.email !== storedEmail) {
            alert("Don't try this again");
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            rouuter.push("/login");
          } else {
            setProfile(response.data);
          }
        } catch (error) {
          console.error("Error verifying user email:", error);
          // alert("Authentication error. Redirecting to login.");
          // rouuter.push("/login");
        } finally {
          setLoading(false);
        }
      };

      checkAuthentication();
    }
  }, []);
  return (
    <div>
      <Track></Track>
    </div>
  );
}
