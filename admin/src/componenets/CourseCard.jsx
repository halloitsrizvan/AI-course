import React from 'react'

function CourseCard({ course }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md transition-shadow hover:shadow-lg border border-gray-100">
        <div className="w-full h-24 bg-red-100 rounded-lg mb-3">
            {/* Placeholder for Course Thumbnail */}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
            <span className="font-bold text-yellow-600">{course.rating} ★</span> ({course.students.toLocaleString()} students)
        </p>
        <div className="mt-3 flex justify-between items-center">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {course.status}
            </span>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Edit
            </button>
        </div>
    </div>
  )
}

export default CourseCard