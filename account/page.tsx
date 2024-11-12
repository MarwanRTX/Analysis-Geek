// src/app/account/page.tsx

"use client"; // Add this line to indicate that this is a client component

import { useEffect, useState } from 'react';
import { auth, database, ref } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { get as getDatabaseData, child } from 'firebase/database';

const AccountPage = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const dbRef = ref(database);
          const snapshot = await getDatabaseData(child(dbRef, `users/${user.uid}`));
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
