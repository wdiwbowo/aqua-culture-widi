import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaDesktop, FaMap, FaLanguage, FaBell, FaBars, FaTimes, FaSearch, FaUser, FaSignOutAlt, FaCog, FaUserCircle } from "react-icons/fa";

const NavbarAdmin = ({ onSidebarToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Mock user data
  const user = {
    name: "John Doe",
    photoUrl: "https://via.placeholder.com/40", // Replace with real user photo URL
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prevState => {
      const newState = !prevState;
      if (onSidebarToggle) {
        onSidebarToggle(newState); // Notify parent component of the state change
      }
      return newState;
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserIconClick = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  // Sidebar items
  const sidebarItems = [
    { title: "Default", path: "/dashboard", icon: <FaTachometerAlt /> },
    { title: "Analytics", path: "/analytics", icon: <FaDesktop /> },
    { title: "Map", path: "/dashboardPeta", icon: <FaMap /> },
    { title: "User", path: "/userProfile", icon: <FaUser /> },
  ];

  // Filtered items based on search query
  const filteredItems = sidebarItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate items into Dashboard, Map, and User sections
  const dashboardItems = filteredItems.filter(item => item.title !== "Map" && item.title !== "User");
  const mapItems = filteredItems.filter(item => item.title === "Map");
  const userItems = filteredItems.filter(item => item.title === "User");

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
          <div className="relative flex items-center bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer" onClick={handleUserIconClick}>
            <img src={user.photoUrl} alt="User" className="w-8 h-8 rounded-full" />
            <span className="ml-2">{user.name}</span>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg z-40">
                <Link to="/account-settings" className="flex items-center p-2 hover:bg-gray-700" onClick={handleDropdownClose}>
                  <FaCog className="mr-2" /> Account Settings
                </Link>
                <Link to="/UserProfile" className="flex items-center p-2 hover:bg-gray-700" onClick={handleDropdownClose}>
                  <FaUserCircle className="mr-2" /> Social Profile
                </Link>
                <Link to="/login" className="flex items-center p-2 hover:bg-gray-700" onClick={handleDropdownClose}>
                  <FaSignOutAlt className="mr-2" /> Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-300 ${isSidebarOpen ? 'w-60' : 'w-16'} bg-gray-900 text-white shadow-lg z-30 overflow-y-auto`}>
        <div className="p-5">
          {/* Dashboard Section */}
          {isSidebarOpen && dashboardItems.length > 0 && <h5 className="text-lg font-semibold mb-4 mt-6">Dashboard</h5>}
          {isSidebarOpen && dashboardItems.length > 0 && (
            <ul>
              {dashboardItems.map((item, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <Link to={item.path} className="flex items-center p-2 hover:bg-blue-700 rounded w-full">
                    {item.icon} <span className="ml-2">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Horizontal Line */}
          {isSidebarOpen && (dashboardItems.length > 0 || mapItems.length > 0 || userItems.length > 0) && <hr className="my-4 border-gray-700" />}

          {/* Map Section */}
          {isSidebarOpen && mapItems.length > 0 && <h5 className="text-lg font-semibold mt-8 mb-4">Forms</h5>}
          {isSidebarOpen && mapItems.length > 0 && (
            <ul>
              {mapItems.map((item, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <Link to={item.path} className="flex items-center p-2 hover:bg-blue-700 rounded w-full">
                    {item.icon} <span className="ml-2">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Horizontal Line to separate Map and User sections */}
          {isSidebarOpen && (mapItems.length > 0 || userItems.length > 0) && <hr className="my-4 border-gray-700" />}

          {/* User Section */}
          {isSidebarOpen && userItems.length > 0 && <h5 className="text-lg font-semibold mt-8 mb-4">User</h5>}
          {isSidebarOpen && userItems.length > 0 && (
            <ul>
              {userItems.map((item, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <Link to={item.path} className="flex items-center p-2 hover:bg-blue-700 rounded w-full">
                    {item.icon} <span className="ml-2">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
