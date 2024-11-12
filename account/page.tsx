// src/app/account/page.tsx
"use client"; // Ensures this component is a client component

import { useEffect, useState } from 'react';
import { auth, database, ref, child, get } from '../../lib/firebase';  // Corrected import

import { onAuthStateChanged } from 'firebase/auth';

const AccountPage = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = child(ref(database), `users/${user.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          }
        }
      });
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Account</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default AccountPage;
