// UserProfile.jsx
import React, { useState } from 'react';
import NavbarAdmin from "../components/NavbarAdmin";

const UserProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (newState) => {
    setIsSidebarOpen(newState);
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-white p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-16'} pl-4`}>
      <NavbarAdmin onSidebarToggle={handleSidebarToggle} />
      <div className="mt-44"> {/* Added margin top to avoid navbar overlap */}
        {/* Header */}
        <div className="bg-gray-800 p-4 rounded-lg relative border border-gray-700">
          <img
            src="data:image/png;base64,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"
            alt="Cover"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute -bottom-0 left-1 border-4 border-gray-700 bg-gray-800 rounded-full p-1">
            <img
              src="path/to/profile-pic.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="mt-12 ml-24">
            <h1 className="text-xl font-bold">JWT User</h1>
            <p className="text-gray-400">Android Developer</p>
            <div className="flex space-x-4 mt-2">
              <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded">Message</button>
              <button className="bg-gray-700 hover:bg-gray-800 p-2 rounded">Send Request</button>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h2 className="text-lg font-bold">239k</h2>
            <p>Friends</p>
            <h2 className="text-lg font-bold">234k</h2>
            <p>Followers</p>
          </div>
          <div className="col-span-2 bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h2 className="text-lg font-bold">About</h2>
            <p>
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="https://codedthemes.com" className="text-blue-500">Website</a>
              <a href="https://www.instagram.com/codedthemes" className="text-pink-500">Instagram</a>
              <a href="https://www.facebook.com/codedthemes" className="text-blue-700">Facebook</a>
              <a href="https://in.linkedin.com/company/codedthemes" className="text-blue-800">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-4">
          <h2 className="text-lg font-bold">Posts</h2>
          <div className="mt-4">
            <div className="bg-gray-700 p-4 rounded-lg mb-4 border border-gray-600">
              <p>What's on your mind, Larry?</p>
              <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded mt-2">Post</button>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4 border border-gray-600">
              <div className="flex space-x-4">
                <img
                  src="path/to/profile-pic.jpg"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold">JWT User</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="text-blue-500">Like</button>
                    <button className="text-blue-500">Comment</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more posts as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
