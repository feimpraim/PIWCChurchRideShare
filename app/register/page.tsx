// app/register/page.client.tsx
"use client";

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Ensure this import is correct
import { auth } from '../../lib/firebase';
import Head from 'next/head';
import Link from 'next/link';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/ride-request');
    } catch (error) {
      // First, check if error is an instance of Error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        // If it's not an Error instance, you might want to handle it differently
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/ride-request');
    } catch (error) {
      // First, check if error is an instance of Error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        // If it's not an Error instance, you might want to handle it differently
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-300">
      <Head>
        <title>Register for Church Ride Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center">
  <div className="bg-white/10 backdrop-blur-md rounded-lg p-10 shadow-lg max-w-sm mx-auto"> {/* Adjusted max-w-md to max-w-sm and added mx-auto */}
    <h1 className="text-4xl md:text-4xl font-bold text-gray-600 mb-8">Register for Church Ride Service</h1>
          <form onSubmit={handleRegister} className="space-y-6">
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div>
              <input 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button 
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <button 
            onClick={handleGoogleSignIn} 
            className="mt-4 w-full items-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            SignUp with Google
          </button>
          <div className="mt-6 text-grey-600">
            Already have an account? 
            <Link href="/login" legacyBehavior>
              <a className="text-blue-200 hover:underline">Log in</a>
            </Link>
          </div>
          <p className="text-center text-gray-500 text-xs mt-8">
            &copy;2024 Church Ride Service. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
