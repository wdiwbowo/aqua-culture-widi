import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaMap, FaSignOutAlt, FaSearch, FaBars, FaTimes, FaLanguage, FaBell } from "react-icons/fa";

const NavbarAdmin = ({ onSidebarToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query

  // Mock user data
  const user = {
    name: "John Doe",
    photoUrl: "https://via.placeholder.com/40", // Replace with real user photo URL
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => {
      const newState = !prevState;
      onSidebarToggle(newState); // Notify parent component of the state change
      return newState;
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Sidebar items
  const sidebarItems = [
    { title: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { title: "Logout", path: "/logout", icon: <FaSignOutAlt /> }
  ];

  // Filtered items based on search query
  const filteredItems = sidebarItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Main Navbar */}
      <nav className="bg-gray-900 text-white p-5 shadow-lg fixed top-0 left-0 w-full z-50 flex items-center">
        {/* Navbar Title with Sidebar Toggle and Search */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Navbar Title */}
          <div className="text-xl font-bold">
            <Link to="/">Saqti</Link>
          </div>

          {/* Sidebar Toggle Button */}
          <button
            onClick={handleSidebarToggle}
            className="bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-700 flex items-center"
          >
            {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs mx-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-lg border-none outline-none w-full"
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Right Section: Additional Icons */}
        <div className="flex items-center space-x-4">
          {/* Card for Translation Icon */}
          <div className="flex items-center bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-700">
            <FaLanguage className="text-xl" />
          </div>
          {/* Card for Notification Bell Icon */}
          <div className="flex items-center bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-700">
            <FaBell className="text-xl" />
          </div>
          {/* Card for User Profile */}
          <div className="flex items-center bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-700">
            <img src={user.photoUrl} alt="User" className="w-8 h-8 rounded-full" />
            <span className="ml-2">{user.name}</span>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed top-16 left-0 h-full transition-all duration-300 ${isSidebarOpen ? 'w-60' : 'w-16'} bg-gray-900 text-white shadow-lg z-30`}>
        <div className="p-5">
          {/* Dashboard Section */}
          {isSidebarOpen && <h5 className="text-lg font-semibold mb-4 mt-6">Dashboard</h5>}
          {isSidebarOpen ? (
            <ul>
              {filteredItems.map((item, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <Link to={item.path} className="flex items-center p-2 hover:bg-blue-700 rounded w-full">
                    {item.icon} <span className="ml-2">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center pt-4">
              {filteredItems.map((item, index) => (
                <Link key={index} to={item.path} className="p-2 hover:bg-blue-700 rounded flex items-center">
                  {item.icon}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
