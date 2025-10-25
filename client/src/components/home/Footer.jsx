import React from 'react'

function Footer() {
  return (
    <div>
         
  <footer className=" text-white py-10 bg-gray-800 mt-6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* About Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">About Us</h3>
        <p className="text-sm text-gray-200">
          We are dedicated to providing the best learning experience with high-quality content and resources.
        </p>
      </div>

      {/* Navigation Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="#about" className="text-gray-200 hover:text-white">About</a></li>
          <li><a href="#courses" className="text-gray-200 hover:text-white">Courses</a></li>
          <li><a href="#testimonials" className="text-gray-200 hover:text-white">Testimonials</a></li>
          <li><a href="#contact" className="text-gray-200 hover:text-white">Contact</a></li>
        </ul>
      </div>

      {/* Social Media Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-700 mt-8 pt-4">
      <p className="text-center text-sm text-indigo-200">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer