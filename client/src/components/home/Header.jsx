import React, { useState } from 'react';
import { SearchIcon, ShoppingCartIcon, XIcon, MenuIcon } from '../../Icons';
import { useNavigate, useLocation } from 'react-router-dom';

// Add the GlobeIcon since it's used in the new design
const GlobeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || "w-5 h-5"}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"/></svg>
);

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  // Determine active link based on current route
  const getActiveLink = () => {
    const path = location.pathname;
    if (path === '/') return 'HOME';
    if (path === '/my-courses') return 'MY LEARNING';
    if (path.startsWith('/course-details')) return 'COURSES';
    if (path.startsWith('/course/')) return 'MY LEARNING';
    if (path === '/teach') return 'TEACH';
    if (path === '/about') return 'ABOUT US';
    return 'HOME';
  };

  const [activeLink, setActiveLink] = useState(getActiveLink());

  // Update active link when route changes
  React.useEffect(() => {
    setActiveLink(getActiveLink());
  }, [location.pathname]);

  // Categories for the bottom bar
  const categories = ['DEVELOPMENT', 'MARKETING', 'COMMUNICATION', 'PROMPT ENGINEERING', 'GENERATIVE AI', 'DATA SCIENCE'];

  const handleLinkClick = (path, name) => {
    setActiveLink(name);
    
    if (name === 'COURSES') {
      // For COURSES, navigate to home and scroll to courses section
      if (location.pathname === '/') {
        // Already on home page, just scroll
        const section = document.getElementById("contents-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home first, then scroll
        navigate('/');
        // Use setTimeout to ensure navigation completes before scrolling
        setTimeout(() => {
          const section = document.getElementById("contents-section");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      // For all other links, simply navigate to the path
      navigate(path);
    }
    closeMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

// Component for the primary navigation links (with pill style)
const NavPill = ({ name, path }) => {
  const isActive = activeLink === name;
  return (
    <button
      onClick={() => handleLinkClick(path, name)}
      className={`
        px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap
        ${isActive
          ? 'bg-yellow-400 text-gray-900 shadow-md hover:bg-yellow-500'
          : 'bg-transparent text-gray-900 hover:bg-yellow-200 hover:shadow-md'
        }
      `}
    >
      {name}
    </button>
  );
};

  // Define navigation paths for each menu item
  const getNavigationPath = (name) => {
    switch (name) {
      case 'HOME':
        return '/';
      case 'COURSES':
        return '/'; // Courses goes to home and scrolls to section
      case 'MY LEARNING':
        return '/my-courses';
      case 'TEACH':
        return '/teach';
      case 'ABOUT US':
        return '/about';
      default:
        return '/';
    }
  };

  return (
    <header className="sticky top-0 bg-white z-50 font-sans shadow-lg border-b border-gray-200">
      {/* -------------------- 1. Main Header Row (Desktop & Mobile) -------------------- */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Left Section: Logo and Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button - visible on small screens */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-black rounded-full"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <MenuIcon className="w-7 h-7" />
          </button>

          <button 
            className="text-3xl font-extrabold tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            Course
          </button>
        </div>

        {/* Center Section: Desktop Navigation Links (Pill Style) */}
        <nav className="hidden lg:flex items-center space-x-3">
          <NavPill name="HOME" path={getNavigationPath('HOME')} />
          <NavPill name="COURSES" path={getNavigationPath('COURSES')} />
        {user &&  <NavPill name="MY LEARNING" path={getNavigationPath('MY LEARNING')} />}
          <NavPill name="TEACH" path={getNavigationPath('TEACH')} />
          <NavPill name="ABOUT US" path={getNavigationPath('ABOUT US')} />
        </nav>

        {/* Right Section: Icons and Auth/Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Globe Icon */}
          <button className="p-2 text-gray-700 hover:text-gray-900 rounded-full hidden sm:block" aria-label="Change language">
            <GlobeIcon className="w-6 h-6" />
          </button>

          {/* Cart Icon */}
          <button className="p-2 text-gray-700 hover:text-gray-900 rounded-full hidden sm:block" aria-label="Shopping Cart">
            <ShoppingCartIcon className="w-6 h-6" />
          </button>

          {/* Search Icon for mobile */}
          <button className="sm:hidden p-2 text-gray-700 hover:text-gray-900 rounded-full">
            <SearchIcon className="w-6 h-6" />
          </button>

          {/* Auth/Profile Button */}
          {user ? (
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => navigate('/profile')}
                className="bg-purple-600 text-white px-4 py-2 text-sm font-bold rounded-lg shadow-md hover:bg-purple-700 transition duration-150"
              >
                {user.name}
              </button>
              <button
                onClick={handleLogout}
                className="border border-gray-800 text-gray-800 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-200 transition duration-150"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-purple-600 text-white px-5 py-2 text-sm font-bold rounded-lg shadow-md hover:bg-purple-700 transition duration-150"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* -------------------- 2. Category Navigation Row (Desktop Only) -------------------- */}
      <div className="hidden lg:block border-t border-gray-200 py-2 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex space-x-6 text-sm font-medium text-gray-700 overflow-x-auto pb-1">
            {categories.map((cat, index) => (
              <button 
                key={cat} 
                onClick={() => console.log(`Category: ${cat}`)}
                className={`whitespace-nowrap hover:text-gray-900 transition duration-150 ${index === 0 ? 'text-gray-900 font-bold' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar - styled to match a quick-search field */}
          <div className="relative flex items-center ml-auto">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-40 bg-white border border-gray-300 rounded-full py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 p-0.5 rounded-full" aria-label="Search">
              <SearchIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* -------------------- Mobile Menu (Overlay and Sidebar) -------------------- */}

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5">
          {/* Close Button and Header */}
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <button className="text-xl font-bold text-gray-900" onClick={() => navigate('/')}>
              Course
            </button>
            <button
              onClick={closeMenu}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-700"
              aria-label="Close mobile menu"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col space-y-2">
            {['HOME', 'COURSES', 'MY LEARNING', 'TEACH', 'ABOUT US'].map(name => {
              const path = getNavigationPath(name);
              const isActive = activeLink === name;
              return (
                <button
                  key={name}
                  className={`block px-3 py-2 text-left rounded-lg text-base font-semibold ${
                    isActive ? 'text-yellow-600 bg-yellow-50' : 'text-gray-800 hover:bg-gray-50'
                  } transition-colors duration-200`}
                  onClick={() => handleLinkClick(path, name)}
                >
                  {name}
                </button>
              );
            })}
          </nav>

          {/* Mobile Login/Signup Buttons */}
          <div className="mt-6 pt-4 border-t space-y-3">
            {!user ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full border border-gray-800 text-gray-800 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 transition duration-150"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="w-full bg-purple-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-purple-700 transition duration-150"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <div className="text-sm font-medium text-gray-700 p-2 border border-gray-200 rounded-lg">
                  Logged in as: <span className="font-bold">{user.name}</span>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full bg-purple-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-purple-700 transition duration-150"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full border border-gray-800 text-gray-800 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 transition duration-150"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;