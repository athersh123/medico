import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Hide header on login and signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Developer', path: '/developer' },
    { name: 'Scan', path: '/scan' }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-md border-b border-white/30 shadow-glow sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-glow">
                <FaHeartbeat className="text-white text-xl animate-pulse-slow" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gradient">Health Center</h1>
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 font-semibold transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-gradient'
                      : 'text-gray-700 hover:text-gradient'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            {user ? (
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg shadow-glow-green"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-xs" />
                  </div>
                  <span className="text-gray-800 font-semibold text-xs">{user.name}</span>
                </motion.div>
                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg shadow-glow-red hover:shadow-lg transition-all duration-300"
                >
                  <FaSignOutAlt className="text-red-500 text-xs" />
                  <span className="text-red-600 font-semibold text-xs">Logout</span>
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="btn-primary flex items-center space-x-2 px-3 py-1 text-sm"
                >
                  <FaUser className="text-xs" />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-glow"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation - Hidden by default, only shows when mobile menu is toggled */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:hidden mt-4 pt-4 border-t border-gray-200"
        >
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-glow'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header; 