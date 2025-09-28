import React from 'react'

function TestimonialCard({ quote, initials, name, course, color }) {
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between transition duration-300 hover:shadow-lg h-full">
    {/* Quote Icon */}
    <div className="mb-4">
      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 12c0-1.657 1.343-3 3-3s3 1.343 3 3v2c0 1.657-1.343 3-3 3s-3-1.343-3-3v-2zm-6 0c0-1.657 1.343-3 3-3s3 1.343 3 3v2c0 1.657-1.343 3-3 3s-3-1.343-3-3v-2z"/>
      </svg>
    </div>

    {/* Quote Text */}
    <p className="text-gray-700 italic text-base mb-6 flex-grow">
      {quote}
    </p>

    {/* Author and Course */}
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-3">
        {/* Initials Circle */}
        <div className={`w-8 h-8 ${color} text-white font-semibold flex items-center justify-center rounded-full text-sm flex-shrink-0`}>
          {initials}
        </div>
        <span className="font-semibold text-gray-900 text-sm">{name}</span>
      </div>
      
      {/* Course Link */}
      <a href="#" className="text-sm text-purple-700 font-medium hover:underline">
        {course} &gt;
      </a>
    </div>
  </div>
  )
}

export default TestimonialCard