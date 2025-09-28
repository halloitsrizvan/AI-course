import React from 'react'
import {StarIcon,InfoIcon,DecorativeCodeIcon} from '../../Icons'
import { Star, Info, Users } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
function CourseHeader() {


      const courseData = {
        title: 'Full Stack Web Developer Career Accelerator',
        description:
          'Your career in full stack web development starts here. Fast-track learning and interview prep. Grow skills at your own pace. Expand your earnings potential.',
        rating: 4.7,
        exercises: 126,
        hours: 87.8,
        price: '₹10,397',
        enrollment: '1.5M learners already enrolled',
        imageUrl: 'https://placehold.co/350x350/fbbf24/000000?text=Developer+Portrait' // Placeholder for the actual image
      };

      const navigate = useNavigate()
      
  return (
    <div className="min-h-screen flex items-center justify-center p-2 font-sans bg-gradient-to-br from-amber-500 to-orange-600" style={{marginTop:"-3rem"}}>
      {/* Main Card Container */}
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left Section: Course Details */}
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-between">
            <div className=''>
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {courseData.title}
              </h1>

              {/* Description */}
              <p className="text-base text-gray-600 mb-8">
                {courseData.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-6 " style={{marginTop:"8rem"}}>
                <div className="flex flex-col">
                  <div className="flex items-center text-xl font-bold text-gray-800">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" fill="#facc15" /> {/* Use Tailwind color for fill */}
                    {courseData.rating}
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    average course rating
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-xl font-bold text-gray-800">
                    {courseData.exercises}
                    <Info className="w-4 h-4 text-gray-400 ml-1 cursor-pointer" />
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    practice exercises
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="text-xl font-bold text-gray-800">
                    {courseData.hours}
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    hours of content
                  </span>
                </div>
              </div>
            </div>

            {/* Action and Enrollment Section */}
            <div >
              <div className="flex items-center space-x-16 mb-4">
                <button 
                onClick={()=>navigate('/payment')}
                className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-800 transition duration-300 transform hover:scale-[1.02]">
                  Get started
                </button>
                <span className="text-2xl font-bold text-gray-900">
                  {courseData.price}
                </span>
              </div>
              <p className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                {courseData.enrollment}
              </p>
            </div>
          </div>

          {/* Right Section: Image and Decoration */}
          <div className="hidden sm:block md:w-1/2 relative min-h-[300px] md:min-h-full  flex items-center justify-center overflow-hidden">
            {/* Decorative Icon - Behind the image */}
            <DecorativeCodeIcon />
            
            {/* The image itself */}
            {/* Note: In a real app, you'd use a fixed-size, optimized image here. */}
            <div className='p-10'>

            <img
              src={courseData.imageUrl}
              alt=""
              className="relative z-10 w-full h-full object-cover object-top rounded-3xl shadow-xl"
              // Fallback image in case the placeholder URL fails
              onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x450/60a5fa/ffffff?text=Image+Missing';
                }}
                />
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseHeader