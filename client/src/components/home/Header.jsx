import React, { use, useState } from 'react';
import {SearchIcon,ShoppingCartIcon,XIcon,MenuIcon} from '../../Icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
const navigate = useNavigate()
const token = localStorage.getItem("token")
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

     const handleLearnMoreClick = () => {
    const section = document.getElementById("contents-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

   const handleLogout = ()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
    }

  return (
    <>
     <header className="border-b shadow-sm sticky top-0 bg-white z-20 font-inter">
      {/* -------------------- Main Header Row -------------------- */}
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
        {/* Left Section (Logo and Hamburger) */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          
          {/* Mobile Menu Button - visible on small screens */}
          <button 
            className="md:hidden p-1 text-gray-700 hover:text-black rounded-lg" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <MenuIcon className="w-7 h-7" />
          </button>
          
          <a href="#" className="text-xl font-bold text-purple-700"
          onClick={()=>navigate('/')}
          >Course</a>
          <a href="#" className="hidden lg:block text-sm text-gray-500 hover:text-gray-900 transition duration-150">Explore</a>
          
          {/* Search Bar (Full Width on Desktop) */}
          <div className="relative flex-grow hidden md:flex">
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </div>
          </div>
        </div>

        {/* Right Section (Buttons and Cart) */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a href="#" className="hidden lg:block text-sm text-gray-500 hover:text-gray-900 transition duration-150" onClick={()=>navigate('/')}>Home</a>
          <a href="#" className="hidden lg:block text-sm text-gray-500 hover:text-gray-900 transition duration-150" onClick={()=>handleLearnMoreClick()}>Courses</a>
          <a href="#" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition duration-150">Teach on Course</a>
          
          {/* Cart Icon */}
          <button className="hidden sm:block p-2 text-gray-700 hover:text-black rounded-full">
              <ShoppingCartIcon />
          </button>
          
          {/* Mobile Search Icon - visible on smallest screens */}
          <button className="sm:hidden p-2 text-gray-700 hover:text-black rounded-full">
              <SearchIcon className="w-6 h-6" />
          </button>


          
          {!user && <button
          onClick={()=>navigate('/login')}
          className="hidden md:block border border-gray-800 text-gray-800 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 transition duration-150">
            Log in
          </button>}
         {!user && <button
          onClick={()=>navigate('/signup')}
          className="hidden md:block bg-purple-700 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-purple-800 transition duration-150">
            Sign up
          </button>}

          {user &&
          <button
          onClick={()=>navigate('/profile')}
          className="hidden md:block bg-purple-700 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-purple-800 transition duration-150">
            {user.name}
          </button>
          }

             {user && <button
          onClick={()=>handleLogout()}
          className="hidden md:block border border-gray-800 text-gray-800 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 transition duration-150">
            Logout
          </button>}

        </div>
      </div>
   

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile Menu (Slide-out Sidebar) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5">
          {/* Close Button and Header */}
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
            <button 
              onClick={closeMenu} 
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Close mobile menu"
            >
              <XIcon />
            </button>
          </div>
          
          {/* Mobile Links */}
          <nav className="flex flex-col space-y-2">
            <a
              href="#"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:text-purple-700 transition-colors duration-200"
              onClick={closeMenu}
            >
              Explore
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:text-purple-700 transition-colors duration-200"
              onClick={closeMenu}
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:text-purple-700 transition-colors duration-200"
              onClick={closeMenu}
            >
              Udemy Business
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:text-purple-700 transition-colors duration-200"
              onClick={closeMenu}
            >
              Teach on Udemy
            </a>
          </nav>
          
          {/* Mobile Login/Signup Buttons */}
          <div className="mt-6 pt-4 border-t space-y-3">
              <button className="w-full border border-gray-800 text-gray-800 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 transition duration-150">
                Log in
              </button>
              <button className="w-full bg-purple-700 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-purple-800 transition duration-150">
                Sign up
              </button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}

export default Header;
