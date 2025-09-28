import React,{useState} from 'react'
import CourseSidebar from '../components/course/CourseSidebar';
import VideoPlayer from '../components/course/VideoPlayer';
import LessonDetails from '../components/course/LessonDetails';
function Course() {

  const course = {
    title: '100K Coding Challenge',
    progress: 22, 
  };
  



  const lessons = [
    // These first three lessons are functional with different video IDs for testing navigation
    { id: 1, part: 1, title: 'Introduction To Programming', completed: true, videoId: 'Z0N2CBRn_jQ?si=gGO3XRR1A8iKoOX5', description: 'Welcome to the first video in our C Programming series! This covers fundamental programming concepts.' },
    { id: 2, part: 1, title: 'Linux Installation | Eclipse IDE', completed: false, videoId: '-QRjwF2zP8g?si=wWBZ-TwXq6O9PWEC', description: 'Step-by-step guide on setting up your Linux environment and installing the Eclipse IDE for development.' },
    { id: 3, part: 1, title: 'Windows Installation | Eclipse IDE', completed: false, videoId: 'a28UKBWqkSE?si=dTUwonj0FBWHv4Pw', description: 'How to install and configure the Eclipse IDE on a Windows machine for a smooth coding experience.' },
    
    // Remaining lessons are placeholders, using the same mock video ID for simplicity
    { id: 4, part: 1, title: 'MAC Installation | Eclipse IDE', completed: false, videoId: 'M7lc1UVf-VE', description: 'A guide for Mac users to get their Eclipse IDE set up.' },
    { id: 5, part: 2, title: 'Variables Datatypes & I/O Operations', completed: false, videoId: 'M7lc1UVf-VE', description: 'Dive into variables, datatypes, and essential input/output operations.' },
    { id: 6, part: 3, title: 'Conditional Statements', completed: false, videoId: 'M7lc1UVf-VE', description: 'Learn how to control program flow using if, else if, and switch statements.' },
    { id: 7, part: 4, title: 'Loops: FOR Loop', completed: false, videoId: 'M7lc1UVf-VE', description: 'Master iteration and repetitive tasks using the powerful FOR loop structure.' },
    { id: 8, part: 5, title: 'Array and Array Operations', completed: false, videoId: 'M7lc1UVf-VE', description: 'Understanding arrays and how to perform basic and advanced operations on them.' },
    { id: 9, part: 6, title: 'Functions and Type of Functions', completed: false, videoId: 'M7lc1UVf-VE', description: 'Explore defining and calling functions, and the different types used in C.' },
  ];
  
  // State to track which lesson is currently being viewed (defaults to the first lesson)
  const [currentLessonId, setCurrentLessonId] = useState(lessons[0].id);
  
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
}

export default Course