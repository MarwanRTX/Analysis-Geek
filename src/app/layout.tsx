// app/layout.tsx
"use client";

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { auth } from '../lib/firebase';  // Import Firebase auth
import Navbar from './components/Navbar';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth'; // Firebase Auth listener

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);  // User state to track if logged in
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Optionally, you can redirect to the main page if the user is logged in
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/');  // Redirect to the main page after login
    }
  }, [user]);

  if (!mounted) return null;

  return (
    <html lang="en">
      <body className="transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
