import React from 'react';
import { PlayCircle, CheckCircle, Video } from 'lucide-react';

// --- MOCK DATA ---
const course = {
  title: '100K Coding Challenge',
  progress: 22, // Set a mock progress value for demonstration
};

const lessons = [
  // These first three lessons are functional with different video IDs for testing navigation
  { id: 1, part: 1, title: 'Introduction To Programming', completed: true, videoId: 'dQw4w9WgXcQ', description: 'Welcome to the first video in our C Programming series! This covers fundamental programming concepts.' },
  { id: 2, part: 1, title: 'Linux Installation | Eclipse IDE', completed: false, videoId: '7mB4L5u9lA9', description: 'Step-by-step guide on setting up your Linux environment and installing the Eclipse IDE for development.' },
  { id: 3, part: 1, title: 'Windows Installation | Eclipse IDE', completed: false, videoId: 'M7lc1UVf-VE', description: 'How to install and configure the Eclipse IDE on a Windows machine for a smooth coding experience.' },
  
  // Remaining lessons are placeholders, using the same mock video ID for simplicity
  { id: 4, part: 1, title: 'MAC Installation | Eclipse IDE', completed: false, videoId: 'M7lc1UVf-VE', description: 'A guide for Mac users to get their Eclipse IDE set up.' },
  { id: 5, part: 2, title: 'Variables Datatypes & I/O Operations', completed: false, videoId: 'M7lc1UVf-VE', description: 'Dive into variables, datatypes, and essential input/output operations.' },
  { id: 6, part: 3, title: 'Conditional Statements', completed: false, videoId: 'M7lc1UVf-VE', description: 'Learn how to control program flow using if, else if, and switch statements.' },
  { id: 7, part: 4, title: 'Loops: FOR Loop', completed: false, videoId: 'M7lc1UVf-VE', description: 'Master iteration and repetitive tasks using the powerful FOR loop structure.' },
  { id: 8, part: 5, title: 'Array and Array Operations', completed: false, videoId: 'M7lc1UVf-VE', description: 'Understanding arrays and how to perform basic and advanced operations on them.' },
  { id: 9, part: 6, title: 'Functions and Type of Functions', completed: false, videoId: 'M7lc1UVf-VE', description: 'Explore defining and calling functions, and the different types used in C.' },
];

// --- COMPONENTS ---

// 1. Sidebar Component (Fixed Position)
const CourseSidebar = ({ course, lessons, currentLessonId, onLessonClick }) => {
  return (
    // 'lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-80' fixes the sidebar on large screens
    <div className="w-full lg:w-80 flex-shrink-0 bg-black text-white p-4 overflow-y-auto lg:fixed lg:top-0 lg:left-0 lg:h-screen z-10 shadow-xl">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-100">BROTOTYPE</h1>
        <p className="text-xs text-purple-400 mb-4">BROTHER YOU NEVER HAD</p>
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
  );
};

// 2. Video Player Component (Functional YouTube Iframe)
const VideoPlayer = ({ currentLesson }) => {
  // Construct the YouTube embed URL with autoplay, lesson ID, and minimal controls
  const videoUrl = `https://www.youtube.com/embed/${currentLesson.videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="relative w-full aspect-video bg-gray-900">
      {/* YouTube Iframe */}
      <iframe
        className="w-full h-full"
        src={videoUrl}
        title={`YouTube video player: ${currentLesson.title}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      
      {/* Mock 'More Videos' Button (kept for UI consistency with image) */}
      <button className="absolute top-4 left-4 text-xs bg-gray-700 text-white px-3 py-1 rounded-full opacity-90 hover:bg-gray-600 transition">
        MORE VIDEOS
      </button>
    </div>
  );
};

// 3. Lesson Details Component
const LessonDetails = ({ currentLesson }) => {
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
  );
};


// Main App component
const App = () => {
  // State to track which lesson is currently being viewed (defaults to the first lesson)
  const [currentLessonId, setCurrentLessonId] = React.useState(lessons[0].id);
  
  // Find the full lesson object based on the current ID
  const currentLesson = lessons.find(l => l.id === currentLessonId);

  // Function to handle lesson navigation
  const handleLessonClick = (id) => {
    setCurrentLessonId(id);
  };

  return (
    // Added 'lg:ml-80' margin to the main content to account for the fixed sidebar width (w-80)
    <div className="flex flex-col lg:flex-row min-h-screen bg-white font-sans">
      
      {/* Sidebar */}
      <CourseSidebar 
        course={course} 
        lessons={lessons} 
        currentLessonId={currentLessonId} 
        onLessonClick={handleLessonClick} 
      />

      {/* Main Content Area - Pushed over by the fixed sidebar */}
      <main className="flex-grow flex flex-col overflow-y-auto lg:ml-80">
        
        {/* Video Player Section */}
        <VideoPlayer currentLesson={currentLesson} />
        
        {/* Lesson Details Section */}
        <LessonDetails currentLesson={currentLesson} />
      </main>
    </div>
  );
};

export default App;
