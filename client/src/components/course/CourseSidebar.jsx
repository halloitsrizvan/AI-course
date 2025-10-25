import React, { useState } from 'react';
import { PlayCircle, CheckCircle, Menu, X, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CourseSidebar({ course, courseParts, currentPartIndex, onPartClick, onQuizClick, currentView }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const allCompleted = courseParts.every((p) => p.status === 'completed');

  return (  
    <>
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden flex items-center justify-between bg-black text-white p-4 shadow-md fixed top-0 left-0 right-0 z-20">
        <h1 className="text-lg font-bold cursor-pointer" onClick={() => navigate('/')}>COURSE</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-black text-white transform transition-transform duration-300 z-30 lg:translate-x-0 lg:w-80 lg:top-0 lg:left-0 lg:h-screen lg:fixed
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="cursor-pointer mb-6" onClick={() => navigate('/')}> 
            <h1 className="text-xl font-bold text-gray-100">COURSE</h1>
            <p className="text-xs text-purple-400 mb-4">{course.section}</p>
          </div>

          <h2 className="text-lg font-semibold mb-2">{course.title}</h2>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-700 rounded-full mb-2">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mb-4">{course.progress}% Complete</p>

          {/* Course Parts List */}
          <nav className="flex-grow overflow-y-auto">
            {courseParts.map((part, index) => {
              const isCurrent = index === currentPartIndex && currentView === 'lesson';
              const isCompleted = part.status === 'completed';
              const isUnlocked = part.status === 'unlocked' || isCompleted;
              
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (isUnlocked) {
                      onPartClick(index);
                      setIsOpen(false);
                    }
                  }}
                  className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition duration-200 
                    ${
                      !isUnlocked
                        ? 'bg-gray-800 opacity-50 cursor-not-allowed'
                        : isCurrent
                        ? 'bg-purple-700 text-white font-semibold shadow-lg'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  ) : (
                    <PlayCircle
                      className={`w-5 h-5 mr-3 ${isCurrent ? 'text-white' : 'text-gray-500'}`}
                    />
                  )}
                  <div className="flex-1">
                    <span className={`text-sm ${isCurrent ? 'text-white' : 'text-gray-300'}`}>
                      Part {part.part} | {part.title}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {part.lessons.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Quiz Option at the Bottom */}
          <div
            onClick={() => {
              if (allCompleted) {
                onQuizClick();
                setIsOpen(false);
              }
            }}
            className={`flex items-center p-3 mt-4 rounded-lg cursor-pointer transition duration-200 ${
              currentView === 'quiz'
                ? 'bg-indigo-700 text-white font-semibold shadow-lg'
                : allCompleted
                ? 'bg-gray-800 hover:bg-indigo-700 text-gray-200 hover:text-white'
                : 'bg-gray-700 opacity-50 cursor-not-allowed'
            }`}
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">Final Quiz</span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
        ></div>
      )}
    </>
  );
}

export default CourseSidebar;