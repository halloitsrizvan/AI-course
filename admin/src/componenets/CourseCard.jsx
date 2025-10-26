import React from 'react'
import { Edit3, Users, Star, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function CourseCard({ course }) {
  const navigate = useNavigate();
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 cursor-pointer"
    onClick={()=>navigate(`/courses-view/${course._id}`)}
    >
      {/* Image Section */}
      <div className="relative w-full  overflow-hidden" style={{height:"15rem"}}>
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x200/4b5563/ffffff?text=Course+Image';
          }}
        />
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
          course.published 
            ? 'bg-green-500/90 text-white' 
            : 'bg-yellow-500/90 text-white'
        }`}>
          {course.published ? 'Published' : 'Pending'}
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="font-medium text-gray-800">{course.createdBy}</span>
          <div className="flex items-center mx-2 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-gray-600 font-medium">4.8</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{course.enrollment.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>25h</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">₹{course.price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">₹{course.price + 1999}</span>
          </div>
          
          <button className="flex items-center space-x-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-all duration-200 group-hover:bg-indigo-100">
            <Edit3 size={16} />
            <span className="font-medium">Edit</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard