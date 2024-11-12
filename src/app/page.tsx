// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase"; // Make sure `auth` is correctly initialized in firebase.js
import UploadComponent from "./upload/UploadComponent";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // To show a loading state while checking auth

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        router.push("/login"); // Redirect if user is not authenticated
      }
      setLoading(false); // Set loading to false once the check is complete
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [router]);

  // Show a loading indicator or nothing while checking authentication
  if (loading) return <p>Loading...</p>;

  // Render the upload component only if the user is authenticated
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Upload Your File</h1>
      <UploadComponent />
    </main>
  );
}
