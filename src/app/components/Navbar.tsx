// app/components/Navbar.tsx
"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ position: "relative", padding: "1rem" }}>
      <div style={{ textAlign: "right" }}>
        {/* Account Icon */}
        <div onClick={() => setMenuOpen(!menuOpen)} style={{ display: "inline-block", cursor: "pointer" }}>
          <FaUserCircle size={30} />
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "2rem",
              background: "#fff",
              padding: "1rem",
              borderRadius: "5px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {/* Dark Mode Toggle */}
              <li>
                <ThemeToggleButton />
              </li>
              {/* Account Page Link */}
              <li style={{ marginTop: "0.5rem" }}>
                <Link href="/account">Go to Account</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
