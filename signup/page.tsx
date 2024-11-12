// src/app/signup/page.tsx
"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, database, ref, set, googleProvider } from '../../lib/firebase'; // Ensure googleProvider is exported from firebase.js
import { useRouter } from 'next/navigation';
import { get } from 'firebase/database'; // Import `get` for fetching data

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = formData;

    try {
      // Step 1: Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created successfully with UID:", user.uid);

      // Step 2: Store username and email in Realtime Database
      await set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
      });
      console.log("User data saved to Realtime Database");

      router.push('/main');  // Redirect to main page after successful signup
    } catch (err) {
      const error = err as { code: string };
      // Log detailed error messages
      console.error("Signup error:", err);
      if (error.code === 'auth/email-already-in-use') {
        setError("This email is already in use. Please try a different one.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email format. Please check and try again.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
    }
  };

  // Moved outside handleSubmit
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in with Google:", user);

      // Check if user data exists in Realtime Database; if not, create it
      const userRef = ref(database, 'users/' + user.uid);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await set(userRef, {
          username: user.displayName || 'Unknown',  // Use Google display name as default
          email: user.email,
        });
      }

      router.push('/main'); // Redirect to main page after successful sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      
      <button onClick={handleGoogleSignIn} style={{ marginTop: "1rem" }}>Sign Up with Google</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;
