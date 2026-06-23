import React from 'react';

const Profile = () => {
  // TODO: Fetch and display user data from AuthContext
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold my-4">My Profile</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
      </div>
    </div>
  );
};

export default Profile;
