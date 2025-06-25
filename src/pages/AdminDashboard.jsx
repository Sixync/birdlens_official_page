// birdlen_official_page/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import * as userService from '../services/userService';

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState('');

  // Use useEffect to fetch user data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        const response = await userService.getCurrentUserProfile();
        if (response.data && !response.data.error) {
          setProfile(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch profile.');
        }
      } catch (err) {
        setError(err.message);
        // If profile fetch fails (e.g., token expired), log out the user.
        // The interceptor might also trigger a global logout.
        logout();
        navigate('/login');
      } finally {
        setLoadingProfile(false);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser, navigate, logout]); // Depend on currentUser

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      alert('Failed to log out');
    }
  };

  if (loadingProfile) {
    return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Loading Profile...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        {error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : (
          <p className="text-lg text-gray-300">
            {/* Logic: Corrected `firstName` to `first_name` to match the API response. */}
            Welcome, <span className="font-semibold text-green-400">{profile?.first_name || currentUser?.email}</span>
          </p>
        )}
      </div>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>

        {/* Admin Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link
            to="/admin/tours"
            className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors duration-300"
          >
            <h3 className="text-xl font-semibold">Manage Tours</h3>
            <p className="text-sm text-gray-300 mt-2">View, create, edit, and delete tours</p>
          </Link>

          <Link
            to="/admin/tours/create"
            className="p-4 bg-green-600 hover:bg-green-700 rounded-lg text-center transition-colors duration-300"
          >
            <h3 className="text-xl font-semibold">Create New Tour</h3>
            <p className="text-sm text-gray-300 mt-2">Add a new tour to the system</p>
          </Link>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
          <p className="text-gray-400">
            This is where your administrative tools and components will go. You can build out user lists, content management, and other features here.
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-300"
      >
        Log Out
      </button>
    </div>
  );
}