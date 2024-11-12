// app/api/auth/signup/route.js

import firebase from '@/firebase'; // import your firebase config file

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    // Create a new user using Firebase Authentication
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    
    return new Response(JSON.stringify({ message: 'User created successfully', user: userCredential.user }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
