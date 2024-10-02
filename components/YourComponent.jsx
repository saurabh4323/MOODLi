// "use client";
// import { useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyD8dGdZUkJib-J0ycdg69tstJwyP2LXmcE",
//   authDomain: "moodli-8bdf9.firebaseapp.com",
//   projectId: "moodli-8bdf9",
//   storageBucket: "moodli-8bdf9.appspot.com",
//   messagingSenderId: "1006748244823",
//   appId: "1:1006748244823:web:b028c9c097d394e2c4fc12",
//   measurementId: "G-TYZ0FBYNTW",
// };

// const app = initializeApp(firebaseConfig);

// const messaging = getMessaging(app);

// export const generateToken = async () => {
//   const permission = await Notification.requestPermission();
//   console.log(permission);

//   if (permission === "granted") {
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BCA66Q3r-sMFOS5-QBOWqE6DSNHSOJE_KEiTzy6S36vMlmwD8jDP4yuHZf9WG3hlp2mn1D-OidzGeicOxgqLK7I",
//     });
//     console.log(token);
//   }
// };

// const YourComponent = () => {
//   useEffect(() => {
//     if (typeof window !== "undefined" && typeof navigator !== "undefined") {
//       // This ensures the code only runs in the browser, not on the server.
//       const messaging = getMessaging();
//       generateToken();

//       onMessage(messaging, (payload) => {
//         console.log("Message received. ", payload);
//       });
//     }
//   }, []);

//   return <div>Your Component Content</div>;
// };

// export default YourComponent;
