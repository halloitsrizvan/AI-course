import React from 'react'
import { PlayCircle, CheckCircle, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function CourseSidebar({ course, lessons, currentLessonId, onLessonClick }) {
    const navigate = useNavigate()
  return (
    <div className="w-full lg:w-80 flex-shrink-0 bg-black text-white p-4 overflow-y-auto lg:fixed lg:top-0 lg:left-0 lg:h-screen z-10 shadow-xl">
      <div className="mb-8">
        <div className='cursor-pointer'
        onClick={()=>navigate('/')}>

        <h1 className="text-xl font-bold text-gray-100">COURSE</h1> 
        <p className="text-xs text-purple-400 mb-4">BROTHER YOU NEVER HAD</p>
        </div>
        <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
        
        {/* Progress Bar */}
        <div className="h-2 bg-gray-700 rounded-full mb-2">
          <div 
            className="h-full bg-purple-500 rounded-full transition-all duration-500" 
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400">{course.progress}% Complete</p>
      </div>

      {/* Lesson List */}
      <nav>
        {lessons.map((lesson) => {
          const isCurrent = lesson.id === currentLessonId;
          
          return (
            <div
              key={lesson.id}
              onClick={() => onLessonClick(lesson.id)} // Click handler for navigation
              className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition duration-200 
                ${isCurrent ? 'bg-purple-700 text-white font-semibold shadow-lg' : 'hover:bg-gray-800 text-gray-300'}`}
            >
              {lesson.completed ? (
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              ) : (
                <PlayCircle 
                  className={`w-5 h-5 mr-3 ${isCurrent ? 'text-white' : 'text-gray-500'}`} 
                />
              )}
              
              <span className={`text-sm ${isCurrent ? 'text-white' : 'text-gray-300'}`}>
                Part {lesson.part} | {lesson.title}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  )
}

export default CourseSidebar