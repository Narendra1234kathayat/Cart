import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('userdetail'));
    
    if (storedUser) {
      setUser(storedUser);
    } else {
      // If no user data, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage and redirect to login page
    localStorage.removeItem('userdetail');
    localStorage.removeItem('AuthToken');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-80 border-2 rounded-md border-gray-300 p-6 bg-white shadow-lg">
        <h1 className="text-center text-3xl text-gray-800 mb-6">Profile</h1>
        <div className="space-y-4">
          <div className="flex flex-col text-gray-700">
            <label className="text-xl mb-2">Username:</label>
            <p className="text-lg">{user.username}</p>
          </div>
          <div className="flex flex-col text-gray-700">
            <label className="text-xl mb-2">Email:</label>
            <p className="text-lg">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 w-full py-2 rounded-md text-xl text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
