import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaDesktop,
  FaMap,
  FaLanguage,
  FaBell,
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaExpand,
  FaCompress,
} from 'react-icons/fa';

const NavbarAdmin = ({ onSidebarToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [userName, setUserName] = useState('Loading...'); // State to manage user's name

  useEffect(() => {
    // Simulate fetching user data from an API or local storage
    const fetchUserName = async () => {
      // Replace with your actual user fetching logic
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUserName(storedUser ? storedUser.name : 'Guest');
    };

    fetchUserName();
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prevState => {
      const newState = !prevState;
      if (onSidebarToggle) {
        onSidebarToggle(newState);
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

  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullScreen(prevState => !prevState);
  };

  // Sidebar items
  const sidebarItems = [
    { title: 'Default', path: '/dashboard', icon: <FaTachometerAlt /> },
    { title: 'Analytics', path: '/analytics', icon: <FaDesktop /> },
    { title: 'Map', path: '/dashboardPeta', icon: <FaMap /> },
    { title: 'User', path: '/userProfile', icon: <FaUserCircle /> },
  ];

  // Filtered items based on search query
  const filteredItems = sidebarItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate items into Dashboard, Map, and User sections
  const dashboardItems = filteredItems.filter(
    item => item.title !== 'Map' && item.title !== 'User'
  );
  const mapItems = filteredItems.filter(item => item.title === 'Map');
  const userItems = filteredItems.filter(item => item.title === 'User');

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
            {isSidebarOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
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
          <div className="flex items-center bg-gray-800 p-2 rounded-lg shadow-md hover:bg-blue-700">
            <FaLanguage className="text-xl" />
          </div>
          {/* Card for Notification Bell Icon */}
          <div className="flex items-center bg-gray-800 p-2 rounded-lg shadow-md hover:bg-yellow-700">
            <FaBell className="text-xl" />
          </div>
          {/* Full Screen Toggle Icon */}
          <div
            className="flex items-center bg-gray-800 p-2 rounded-lg shadow-md hover:bg-purple-700 cursor-pointer"
            onClick={handleFullScreenToggle}
          >
            {isFullScreen ? (
              <FaCompress className="text-xl" />
            ) : (
              <FaExpand className="text-xl" />
            )}
          </div>
          {/* Card for User Profile */}
          <div
            className="relative flex items-center bg-gray-800 p-2 rounded-lg shadow-md hover:bg-purple-700 cursor-pointer"
            onClick={handleUserIconClick}
          >
            <FaUserCircle className="w-8 h-8 text-xl" />
            <span className="ml-2">{userName}</span>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg z-40">
                <Link
                  to="/account-settings"
                  className="flex items-center p-2 hover:bg-gray-700"
                  onClick={handleDropdownClose}
                >
                  <FaCog className="mr-2" /> Account Settings
                </Link>
                <Link
                  to="/userProfile"
                  className="flex items-center p-2 hover:bg-gray-700"
                  onClick={handleDropdownClose}
                >
                  <FaUserCircle className="mr-2" /> Social Profile
                </Link>
                <Link
                  to="/login"
                  className="flex items-center p-2 hover:bg-gray-700"
                  onClick={handleDropdownClose}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-36 left-0 h-[calc(100vh-4rem)] transition-all duration-300 ${
          isSidebarOpen ? 'w-60' : 'w-16'
        } bg-gray-900 text-white shadow-lg z-30 overflow-y-auto flex flex-col`}
      >
        <div className="flex flex-col flex-1">
          <div className="flex flex-col w-full">
            {/* Dashboard Section */}
            {dashboardItems.length > 0 && (
              <>
                {isSidebarOpen && (
                  <h5 className="text-lg font-semibold text-center">Dashboard</h5>
                )}
                <ul className={`space-y-2 w-full ${isSidebarOpen ? 'border-b border-gray-700' : ''}`}>
                  {dashboardItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Link
                        to={item.path}
                        className="flex items-center p-2 hover:bg-blue-700 rounded w-full"
                      >
                        <span className="flex justify-center items-center w-8 h-8 text-lg">
                          {item.icon}
                        </span>
                        <span
                          className={`ml-2 ${
                            !isSidebarOpen ? 'hidden' : 'inline'
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Map Section */}
            {mapItems.length > 0 && (
              <>
                {isSidebarOpen && (
                  <h5 className="text-lg font-semibold text-center">Forms</h5>
                )}
                <ul className={`space-y-2 w-full ${isSidebarOpen ? 'border-b border-gray-700' : ''}`}>
                  {mapItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Link
                        to={item.path}
                        className="flex items-center p-2 hover:bg-blue-700 rounded w-full"
                      >
                        <span className="flex justify-center items-center w-8 h-8 text-lg">
                          {item.icon}
                        </span>
                        <span
                          className={`ml-2 ${
                            !isSidebarOpen ? 'hidden' : 'inline'
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* User Section */}
            {userItems.length > 0 && (
              <>
                {isSidebarOpen && (
                  <h5 className="text-lg font-semibold text-center">User</h5>
                )}
                <ul className={`space-y-2 w-full ${isSidebarOpen ? 'border-b border-gray-700' : ''}`}>
                  {userItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Link
                        to={item.path}
                        className="flex items-center p-2 hover:bg-blue-700 rounded w-full"
                      >
                        <span className="flex justify-center items-center w-8 h-8 text-lg">
                          {item.icon}
                        </span>
                        <span
                          className={`ml-2 ${
                            !isSidebarOpen ? 'hidden' : 'inline'
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
