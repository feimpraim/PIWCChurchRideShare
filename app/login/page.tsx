"use client";

import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import Head from 'next/head';
import Link from 'next/link';
import { toast, Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.push('/ride-request');
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');

    try {
      await signInWithPopup(auth, provider);
      setLoading(false);
      router.push('/ride-request');
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-300">
      <Head>
        <title>Login to Church Ride Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-10 shadow-lg max-w-sm mx-auto">
          <h1 className="text-4xl md:text-4xl font-bold text-gray-600 mb-8">Login to Church Ride Service</h1>

          <Toaster toastOptions={{ duration: 4000 }} />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
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
                {loading ? <CgSpinner size={20} className="animate-spin" /> : "Login"}
              </button>
            </div>
          </form>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            {loading && <CgSpinner size={20} className="mr-2 animate-spin" />}
            <span>Sign In with Google</span>
          </button>

          <div className="mt-4 text-grey-600">
            Need to Register? 
            <Link href="/register" passHref legacyBehavior>
              <a className="text-blue-200 hover:underline">Create an account</a>
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

export default Login;
