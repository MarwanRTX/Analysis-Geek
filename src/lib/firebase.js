import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";  // Import Realtime Database functions
import { GoogleAuthProvider } from "firebase/auth";
export const googleProvider = new GoogleAuthProvider();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB110IrTFowi761ZXe6G705cfKwvHtNgpA",
  authDomain: "anaylsis-geek.firebaseapp.com",
  databaseURL: "https://anaylsis-geek-default-rtdb.firebaseio.com",
  projectId: "anaylsis-geek",
  storageBucket: "anaylsis-geek.firebasestorage.app",
  messagingSenderId: "731821075137",
  appId: "1:731821075137:web:ed980a99a30a5820638240",
  measurementId: "G-VCT9DFJ9KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app); // Initialize Realtime Database

export { auth, database, ref, set, get, child };
