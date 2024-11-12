// app/api/auth/login/route.js

import firebase from '@/firebase'; // import your firebase config file

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    // Sign in the user using Firebase Authentication
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

    // Generate a token (optional)
    const token = await userCredential.user.getIdToken();

    return new Response(JSON.stringify({ message: 'Login successful', token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 401 });
  }
}
