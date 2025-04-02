import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const userId = 5; // Or use dynamic userId if needed

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setError(null); // Reset error if request is successful
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      });
  }, [userId]);

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue
  }

  if (!userData) {
    return <div>Loading...</div>; // Show loading state while waiting for data
  }

  return (
    <div className="user-profile">
      <h1>{userData.name}'s Profile</h1>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Age:</strong> {userData.age}</p>
      <p><strong>Bio:</strong> {userData.bio}</p>
    </div>
  );
};

export default UserProfile;
