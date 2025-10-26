import React, { useState, useEffect } from 'react';
import { SearchIcon, ShoppingCartIcon, XIcon, MenuIcon } from '../../Icons';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// Add the GlobeIcon since it's used in the new design
const GlobeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || "w-5 h-5"}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"/></svg>
);

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [megaMenuCategory, setMegaMenuCategory] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  // Fetch courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/courses');
        console.log('Fetched courses:', res.data); // Debug log
        setCourses(res.data);
      } catch (err) {
        console.log('Error fetching courses for header:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Group courses by section for mega menu
  const groupCoursesBySection = () => {
    const grouped = {};
    
    courses.forEach(course => {
      if (course.section && course.published) {
        if (!grouped[course.section]) {
          grouped[course.section] = [];
        }
        
        // Format course data for mega menu display
        grouped[course.section].push({
          _id: course._id,
          title: course.title,
          duration: course.totalLength || 'N/A',
          rating: 4.8, // You can calculate this from your database if you have ratings
          price: `₹${course.price}`,
          imageUrl: course.imageUrl,
          enrollment: course.enrollment
        });
      }
    });

    console.log('Grouped courses:', grouped); // Debug log
    return grouped;
  };

  const coursesBySection = groupCoursesBySection();
  
  // Get unique sections for category navigation
  const categories = Object.keys(coursesBySection).filter(section => 
    coursesBySection[section].length > 0
  );

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
  useEffect(() => {
    setActiveLink(getActiveLink());
  }, [location.pathname]);

  const handleLinkClick = (path, name) => {
    setActiveLink(name);
    
    if (name === 'COURSES') {
      if (location.pathname === '/') {
        const section = document.getElementById("contents-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const section = document.getElementById("contents-section");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
    closeMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Component for the primary navigation links
  const NavPill = ({ name, path }) => {
    const isActive = activeLink === name;
    const isHovered = hoveredLink === name;
    const isVisualActive = isActive || isHovered;

    return (
      <div
        className="relative flex flex-col items-center group"
        onMouseEnter={() => setHoveredLink(name)}
        onMouseLeave={() => setHoveredLink(null)}
      >
        <button
          onClick={() => handleLinkClick(path, name)}
          className={`
            px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap
            ${isVisualActive
              ? 'bg-yellow-400 text-gray-900 shadow-md hover:bg-yellow-500'
              : 'bg-transparent text-gray-900 hover:bg-yellow-200 hover:shadow-md'
            }
          `}
        >
          {name}
        </button>
        {/* Three dot indicator */}
        {isVisualActive && (
          <div className="mt-1 flex space-x-0.5 transform -translate-y-0.5">
            <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
            <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
            <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
          </div>
        )}
      </div>
    );
  };

  // Course card component for mega menu
  const CourseCard = ({ course }) => (
    <div 
      className="bg-pink-100 p-3 rounded-lg shadow-sm border border-pink-200 cursor-pointer hover:shadow-lg transition duration-150 transform hover:-translate-y-0.5"
      onClick={() => navigate(`/course-details/${course._id}`)}
    >
      {/* Course Image */}
      <div className=" flex items-center justify-center rounded mb-2 overflow-hidden" style={{height:'10rem'}}>
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x200/4b5563/ffffff?text=Course+Image';
          }}
        />
      </div>
      
      {/* Course Title */}
      <p className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
        {course.title}
      </p>
      
      {/* Tags/Badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full">
          {course.duration}
        </span>
        <span className="bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
          <span>{course.rating}</span>
          <span>⭐</span>
        </span>
        <span className="bg-green-500 text-white px-2 py-0.5 rounded-full ml-auto">
          {course.price}
        </span>
      </div>
    </div>
  );

  // Mega menu content component
  const MegaMenuContent = ({ category }) => {
    const courses = coursesBySection[category] || [];
    
    if (courses.length === 0) {
      return (
        <div className="absolute top-full left-0 right-0 pt-0.5 shadow-xl bg-white border-t-2 border-yellow-400 z-50 animate-fadeIn">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-2">
              Featured {category} Courses
            </h3>
            <div className="text-center py-8 text-gray-500">
              No courses available in this category yet.
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="absolute top-full left-60 right-0 pt-0.5 w-3/4 shadow-xl bg-white border-t-2 border-yellow-400 z-50 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Category Title */}
          <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-2">
            Featured {category} Courses
          </h3>
          
          {/* Course Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.slice(0, 4).map((course, index) => (
              <CourseCard key={course._id || index} course={course} />
            ))}
          </div>

          {/* View All Button */}
          {/* <div className="mt-8 flex justify-center">
            <button 
              onClick={() => {
                navigate('/');
                // You can add logic to filter by category on the home page
              }}
              className="text-purple-600 font-semibold text-lg hover:text-purple-800 transition py-2 px-4 rounded-lg border border-purple-200 hover:bg-purple-50"
            >
              Explore All {category} &rarr;
            </button>
          </div> */}
        </div>
      </div>
    );
  };

  // Define navigation paths for each menu item
  const getNavigationPath = (name) => {
    switch (name) {
      case 'HOME':
        return '/';
      case 'COURSES':
        return '/';
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
      {/* Add fade-in animation */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      
      {/* -------------------- 1. Main Header Row (Desktop & Mobile) -------------------- */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Left Section: Logo and Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
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

        {/* Center Section: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-3">
          <NavPill name="HOME" path={getNavigationPath('HOME')} />
          <NavPill name="COURSES" path={getNavigationPath('COURSES')} />
          {user && <NavPill name="MY LEARNING" path={getNavigationPath('MY LEARNING')} />}
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

      {/* -------------------- 2. Category Navigation Row with Mega Menu -------------------- */}
      {categories.length > 0 && (
        <div 
          className="hidden lg:block border-t border-gray-200 py-2 bg-gray-50 relative"
          onMouseLeave={() => setMegaMenuCategory(null)}
        >
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            <div className="flex space-x-6 text-sm font-medium text-gray-700 overflow-x-auto pb-1">
              {categories.map((cat, index) => (
                <button 
                  key={cat} 
                  onClick={() => {
                    console.log(`Category: ${cat}`);
                    navigate('/');
                    // You can add logic to scroll to specific category section
                  }}
                  onMouseEnter={() => setMegaMenuCategory(cat)}
                  className={`whitespace-nowrap hover:text-gray-900 transition duration-150 py-1 px-2 rounded-lg ${
                    megaMenuCategory === cat ? 'bg-white text-gray-900 font-bold shadow-sm' : ''
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
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
          
          {/* Mega Menu Dropdown */}
          {megaMenuCategory && <MegaMenuContent category={megaMenuCategory} />}
        </div>
      )}

      {/* -------------------- Mobile Menu -------------------- */}

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