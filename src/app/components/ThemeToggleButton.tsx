// app/components/ThemeToggleButton.tsx
"use client";

import { useTheme } from 'next-themes';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggleButton;
