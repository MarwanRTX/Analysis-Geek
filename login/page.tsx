// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';  // Import Firebase auth
import { useRouter } from 'next/navigation'; // For redirecting to the main page

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      
      // Redirect to the main page after successful login
      router.push('/'); // Assuming this is the main page URL

    } catch (err) {
      // Handle errors
      setError('Failed to log in. Please check your credentials and try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
