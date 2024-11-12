// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import Firebase Authentication
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB110IrTFowi761ZXe6G705cfKwvHtNgpA",
  authDomain: "anaylsis-geek.firebaseapp.com",
  projectId: "anaylsis-geek",
  storageBucket: "anaylsis-geek.firebasestorage.app",
  messagingSenderId: "731821075137",
  appId: "1:731821075137:web:ed980a99a30a5820638240",
  measurementId: "G-VCT9DFJ9KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Analytics
const analytics = getAnalytics(app);

export { auth };  // Export auth instance for use in your app
