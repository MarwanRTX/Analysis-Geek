// app/layout.tsx
"use client"; // Ensure this is marked as a client component

import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import './globals.css'; 
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
