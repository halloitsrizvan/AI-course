import React from 'react'
import { useNavigate } from 'react-router-dom';

function CourseCard({ title, rating, reviews, students, imageUrl }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
    onClick={()=>navigate('/course-details')}
    >
    {/* Image container with aspect ratio */}
    <div className="relative aspect-[3/2] w-full p-2">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover rounded-2xl" 
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/4b5563/ffffff?text=Course"; }}
      />
    </div>

    {/* Text content */}
    <div className="p-4 flex flex-col justify-between flex-grow">
      <h3 className="text-lg font-bold text-gray-900 mb-2 truncate" title={title}>
        {title}
      </h3>
      <div className="space-y-1 text-sm">
        <div className="flex items-center text-yellow-600 font-bold">
          {rating} 
          <span className="ml-1 text-xs text-gray-500 font-normal">({reviews})</span>
        </div>
        <p className="text-gray-500">{students}</p>
      </div>
    </div>
  </div>
  )
}

export default CourseCard