import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

function CourseCard({ title, imageUrl, enrollment, totalLength, price, createdBy, section ,_id}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/course-details/${_id}`)}
      className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x200/4b5563/ffffff?text=Course";
          }}
        />
        <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
          {section}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-500 mb-2">
          By <span className="font-medium text-gray-800">{createdBy}</span>
        </p>

        {/* Rating + Enrollment */}
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} className="text-gray-300" />
            <span className="ml-1 text-gray-600 font-medium">4.8</span>
          </div>
          <span className="text-gray-500">{enrollment} Enrollments</span>
        </div>

        {/* Duration and Price */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray-600 text-sm">{totalLength}</p>
          <p className="text-indigo-700 font-bold text-lg">₹{price}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
