import React from 'react'
import { CheckCircle } from 'lucide-react';

function LessonDetails({ currentPart, onComplete }) {
  const isLocked = currentPart.status === 'locked';
  const isCompleted = currentPart.status === 'completed';

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-3xl font-bold text-gray-900 leading-snug">
          {currentPart.lessons.title}
        </h2>

        <button
          onClick={onComplete}
          disabled={isLocked || isCompleted}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-md font-semibold transition duration-300 ${
            isLocked
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : isCompleted
              ? 'bg-green-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          <CheckCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-6 border-t pt-4 border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {currentPart.title} - Part {currentPart.part}
        </h3>
        <p className="text-gray-600 text-base">
          {currentPart.lessons.description}
        </p>

        {currentPart.lessons.keyNotes && (
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <h4 className="font-semibold text-gray-800 mb-2">Key Notes:</h4>
            <p className="text-gray-700">{currentPart.lessons.keyNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonDetails;
