// app/ride-request/page.client.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';

const RideRequest = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [rideDate, setRideDate] = useState('');
  const [rideTime, setRideTime] = useState('');
  const [numberOfPassengers, setNumberOfPassengers] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      pickupLocation,
      dropoffLocation,
      rideDate,
      rideTime,
      numberOfPassengers,
      specialInstructions,
    });
    setSubmissionSuccess(true);
    setPickupLocation('');
    setDropoffLocation('');
    setRideDate('');
    setRideTime('');
    setNumberOfPassengers('');
    setSpecialInstructions('');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Access Denied</title>
        </Head>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">Access Denied</h1>
          <p className="mb-6">You must be logged in to request a ride.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-300">
      <Head>
        <title>Request a Ride</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div className="text-white my-4">
          <h2 className="text-2xl font-semibold">Hello, {user.displayName || user.email || 'Guest'}</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8">Request a Ride</h1>
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg">
          {submissionSuccess && (
            <div className="mb-6 text-green-600">
              Ride request submitted successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-white">Pickup Location</label>
              <input
                id="pickupLocation"
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="1234 Main St"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dropoffLocation" className="block text-sm font-medium text-white">Dropoff Location</label>
              <input
                id="dropoffLocation"
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="5678 Elm St"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="rideDate" className="block text-sm font-medium text-white">Ride Date</label>
                <input
                  id="rideDate"
                  type="date"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={rideDate}
                  onChange={(e) => setRideDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="rideTime" className="block text-sm font-medium text-white">Ride Time</label>
                <input
                  id="rideTime"
                  type="time"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={rideTime}
                  onChange={(e) => setRideTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="numberOfPassengers" className="block text-sm font-medium text-white">Number of Passengers</label>
              <input
                id="numberOfPassengers"
                type="number"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="1"
                min="1"
                value={numberOfPassengers}
                onChange={(e) => setNumberOfPassengers(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="specialInstructions" className="block text-sm font-medium text-white">Special Instructions</label>
              <textarea
                id="specialInstructions"
                rows={4}
                className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Any special instructions or requests?"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Ride Request
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RideRequest;
