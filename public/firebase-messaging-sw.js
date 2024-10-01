importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD8dGdZUkJib-J0ycdg69tstJwyP2LXmcE",
  authDomain: "moodli-8bdf9.firebaseapp.com",
  projectId: "moodli-8bdf9",
  storageBucket: "moodli-8bdf9.appspot.com",
  messagingSenderId: "1006748244823",
  appId: "1:1006748244823:web:b028c9c097d394e2c4fc12",
  measurementId: "G-TYZ0FBYNTW",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
