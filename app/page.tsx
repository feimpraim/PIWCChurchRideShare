import React from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Import Link from Next.js

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-300">
      <Head>
        <title>Welcome to Church Ride Service</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Include a font from Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Welcome to <span className="text-blue-200">Church Ride Service!</span>
        </h1>

        <p className="mt-4 md:mt-6 text-lg md:text-xl font-light max-w-xl">
          Your community journey starts here. Get a ride to church with just a click.
        </p>

        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/login" passHref>
            <button className="px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-md text-white bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out">
              Login
            </button>
          </Link>
          <Link href="/register" passHref>
            <button className="px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-md text-blue-700 bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
              Register
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
