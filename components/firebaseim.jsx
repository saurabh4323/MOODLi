import { generateToken } from "@/app/firebase";
import { getMessaging } from "firebase/messaging";
import React, { useEffect } from "react";

export default function firebaseim() {
  useEffect(() => {
    const messaging = getMessaging();
    generateToken();
  });
  return <div></div>;
}
