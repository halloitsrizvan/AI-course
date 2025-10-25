import React, { useEffect, useState } from 'react';
import CourseSidebar from '../components/course/CourseSidebar';
import VideoPlayer from '../components/course/VideoPlayer';
import LessonDetails from '../components/course/LessonDetails';
import Quizpage from '../pages/Quizpage';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Course() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [view, setView] = useState('lesson');
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    axios.get('http://localhost:4000/course-users')
      .then((res) => {
        console.log('API Response:', res.data);
        const filter = res.data.find((course) => course._id === id && course.userEmail === user.email);
        console.log('Found course:', filter);
        
        if (filter) {
          console.log('Quiz questions:', filter.quizQuestions);
          // Unlock first part if everything is locked
          const updatedCourse = [...filter.course];
          const hasUnlocked = updatedCourse.some(part => part.status === 'unlocked' || part.status === 'completed');
          
          if (!hasUnlocked && updatedCourse.length > 0) {
            updatedCourse[0].status = 'unlocked';
          }
          
          setCourseData({ ...filter, course: updatedCourse });
          
          // Find first unlocked part index
          const firstUnlockedIndex = updatedCourse.findIndex(part => 
            part.status === 'unlocked' || part.status === 'completed'
          );
          if (firstUnlockedIndex !== -1) {
            setCurrentPartIndex(firstUnlockedIndex);
          }
        } else {
          console.log('Course not found');
          setCourseData(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log('API Error:', err);
        setLoading(false);
      });
  }, [id]);

 const updateCourseProgressInDB = async (updatedCourse) => {
  try {
    const response = await axios.put(`http://localhost:4000/course-users/${courseData._id}`, { 
      course: updatedCourse 
    });
    console.log('Course progress updated in database:', response.data);
    return response.data;
  } catch (err) {
    console.log('Error updating course progress:', err);
    console.log('Error details:', err.response?.data);
    throw err;
  }
};

  const handleCompletePart = async () => {
    const updatedCourse = [...courseData.course];
    
    // Mark current part as completed
    updatedCourse[currentPartIndex].status = 'completed';

    // Unlock next part if exists
    if (currentPartIndex + 1 < updatedCourse.length) {
      updatedCourse[currentPartIndex + 1].status = 'unlocked';
    }

    const updatedData = { ...courseData, course: updatedCourse };
    setCourseData(updatedData);

    // Update in DB
    await updateCourseProgressInDB(updatedCourse);

    // Auto-move to next part if exists
    if (currentPartIndex + 1 < updatedCourse.length) {
      setCurrentPartIndex(currentPartIndex + 1);
    } else {
      alert("🎉 You've completed all parts! The quiz is now unlocked.");
      setView('quiz');
    }
  };

  const handlePartClick = async (index) => {
    if (courseData.course[index].status !== 'locked') {
      setCurrentPartIndex(index);
      setView('lesson');
      
      // If the clicked part is not started, mark it as unlocked
      const updatedCourse = [...courseData.course];
      if (updatedCourse[index].status === 'unlocked') {
        // You can add logic here if you want to track when user starts a part
        console.log(`User started part ${index + 1}`);
      }
      
      // Update current part index in state
      setCurrentPartIndex(index);
    }
  };

  const handleQuizClick = () => {
    const allCompleted = courseData.course.every((p) => p.status === 'completed');
    if (allCompleted) {
      setView('quiz');
    } else {
      alert('⚠️ Complete all parts before taking the quiz!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-xl">Loading course...</div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-xl">Course not found</div>
      </div>
    );
  }

  const progress = Math.round(
    (courseData.course.filter((p) => p.status === 'completed').length / courseData.course.length) * 100
  );

  const courseWithProgress = {
    ...courseData,
    progress,
  };

  const currentPart = courseData.course[currentPartIndex];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white font-sans">
      <CourseSidebar
        course={courseWithProgress}
        courseParts={courseData.course}
        currentPartIndex={currentPartIndex}
        currentView={view}
        onPartClick={handlePartClick}
        onQuizClick={handleQuizClick}
      />

      <main className="flex-grow flex flex-col overflow-y-auto lg:ml-80">
        {view === 'lesson' && currentPart ? (
          <>
            <VideoPlayer currentPart={currentPart} />
            <LessonDetails 
              currentPart={currentPart} 
              onComplete={handleCompletePart} 
            />
          </>
        ) : (
          <Quizpage quizQuestions={courseData.quizQuestions} />
        )}
      </main>
    </div>
  );
}

export default Course;