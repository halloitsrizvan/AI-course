import React from 'react'
import { Users, Star, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function MyCourseData({ course }) {
  const navigate = useNavigate();

  // Safety check
  if (!course || !Array.isArray(course)) {
    return <div className="p-8 text-center text-gray-600">No courses found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
      {course.map((courseItem) => (
        <div
          key={courseItem._id} // ← Added key prop
          onClick={() => navigate(`/course/${courseItem._id}`)}
          className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 cursor-pointer"
        >
          {/* Image Section */}
          <div className="relative w-full overflow-hidden" style={{ height: "15rem" }}>
            <img 
              src={courseItem.imageUrl || 'https://placehold.co/400x200/4b5563/ffffff?text=Course+Image'} 
              alt={courseItem.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x200/4b5563/ffffff?text=Course+Image';
              }}
            />
            {/* Status Badge */}
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-green-500/90 text-white">
              {courseItem.section || 'Active'}
            </div>
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
          </div>

          {/* Content Section */}
          <div className="p-5">
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
              {courseItem.title || 'Untitled Course'}
            </h3>

            {/* Instructor */}
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="font-medium text-gray-800">{courseItem.createdBy || 'Unknown Instructor'}</span>
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
                  <span>{(courseItem.enrollment || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>25h</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button className="flex items-center space-x-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-all duration-200">
                <span className="font-medium">Continue</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCourseData;