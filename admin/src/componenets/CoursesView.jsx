import React from 'react'
import CourseCard from './CourseCard'
import { LayoutDashboard, Users, BookOpen, UploadCloud, LogOut, Search, Clock, Zap, MessageCircle, Copy, Trash2, Key, Tag } from 'lucide-react';

function CoursesView({ courses, setActiveView }) {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-800">All Courses ({courses.length})</h1>
            <button
                onClick={() => setActiveView('add-course')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-colors flex items-center space-x-2"
            >
                <UploadCloud className="w-5 h-5" />
                <span>Add Course</span>
            </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    </div>
  )
}

export default CoursesView