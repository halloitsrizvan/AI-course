import React from 'react'

function CourseHeaderLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-gradient-to-br from-amber-500 to-orange-600" style={{marginTop:"-3rem"}}>
      {/* Main Card Container */}
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden mt-10 animate-pulse">
        {/* Mobile: Image on Top Loading */}
        <div className="block md:hidden relative min-h-[300px] bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="absolute inset-4 flex items-center justify-center">
            <div className="w-full h-full bg-gray-300 rounded-2xl"></div>
          </div>
          {/* Section Badge Loading */}
          <div className="absolute top-6 right-6 bg-gray-300 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20 w-20 h-8"></div>
        </div>

        <div className="md:flex">
          {/* Left Section: Course Details Loading */}
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col">
            {/* Title Loading */}
            <div className="h-8 bg-gray-300 rounded mb-6 w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded mb-2 w-full"></div>
            <div className="h-6 bg-gray-300 rounded mb-2 w-5/6"></div>
            <div className="h-6 bg-gray-300 rounded mb-8 w-4/6"></div>

            {/* Description Loading */}
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>

            {/* Stats Grid Loading */}
            <div className="flex flex-row justify-between items-center border-b border-gray-200 pb-8 mb-8 md:grid md:grid-cols-3 md:gap-8">
              {/* Exercises Section Loading */}
              <div className="flex flex-col items-center text-center h-full flex-1">
                <div className="flex justify-center mb-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
                  <div className="h-6 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="mt-auto">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
              
              {/* Duration Section Loading */}
              <div className="flex flex-col items-center text-center h-full flex-1">
                <div className="flex justify-center mb-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
                  <div className="h-6 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="mt-auto">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
              </div>

              {/* Rating Section Loading */}
              <div className="flex flex-col items-center text-center h-full flex-1">
                <div className="flex justify-center items-center mb-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
                  <div className="h-6 bg-gray-300 rounded w-12"></div>
                </div>
                <div className="mt-auto">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            </div>

            {/* Action and Enrollment Section Loading */}
            <div className="mt-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="px-8 py-4 bg-gray-300 rounded-lg flex-1 sm:flex-none text-center h-12"></div>
                
                {/* Price and Enrollment Loading */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:block">
                  <div className="text-center sm:text-right">
                    <div className="h-8 bg-gray-300 rounded w-20 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                  
                  <div className="sm:hidden flex items-center text-sm text-gray-500 ml-4">
                    <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>

              {/* Enrollment Loading for desktop */}
              <div className="hidden sm:flex items-center justify-center sm:justify-start text-sm text-gray-500 mb-4">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
                      
              {/* Additional Info Loading */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-48"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Image on Right Loading */}
          <div className="hidden md:block md:w-1/2 relative min-h-[400px] md:min-h-full bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="absolute inset-8 flex items-center justify-center">
              <div className="w-full h-full bg-gray-300 rounded-2xl"></div>
            </div>
            
            {/* Section Badge Loading */}
            <div className="absolute top-6 right-6 bg-gray-300 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20 w-20 h-8"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseHeaderLoading