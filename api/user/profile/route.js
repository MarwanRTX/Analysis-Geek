// app/api/user/profile/route.js

import firebase from '@/firebase';

export async function GET(request) {
  const user = firebase.auth().currentUser;

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not authenticated' }), { status: 401 });
  }

  const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();

  if (userDoc.exists) {
    return new Response(JSON.stringify(userDoc.data()), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: 'User profile not found' }), { status: 404 });
  }
}
