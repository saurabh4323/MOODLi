import { initializeApp } from "firebase/app";

import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD8dGdZUkJib-J0ycdg69tstJwyP2LXmcE",
  authDomain: "moodli-8bdf9.firebaseapp.com",
  projectId: "moodli-8bdf9",
  storageBucket: "moodli-8bdf9.appspot.com",
  messagingSenderId: "1006748244823",
  appId: "1:1006748244823:web:b028c9c097d394e2c4fc12",
  measurementId: "G-TYZ0FBYNTW",
};

const app = initializeApp(firebaseConfig);
let messaging;

if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export const requestForToken = async () => {
  if (!messaging) {
    console.error("Messaging is not available");
    return;
  }
  try {
    const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
    if (token) {
      console.log("Token received: ", token);
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token.", error);
  }
};
