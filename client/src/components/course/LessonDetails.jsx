import React from 'react'
import { PlayCircle, CheckCircle, Video } from 'lucide-react';
function LessonDetails({ currentLesson }) {
  return (
    <div className="p-6">
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-3xl font-bold text-gray-900 leading-snug">
        {currentLesson.title}
      </h2>
      <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
        Mark as complete
        <CheckCircle className="w-5 h-5" />
      </button>
    </div>

    <div className="mt-6 border-t pt-4 border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        C Programming Malayalam Tutorial for Beginners - Part {currentLesson.part}
      </h3>
      <p className="text-gray-600 text-base">
        {currentLesson.description}
      </p>
    </div>
  </div>
  )
}

export default LessonDetails