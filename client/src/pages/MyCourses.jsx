import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import MyCourseData from '../components/course/MyCourseData'
import axios from 'axios'
import { Link } from 'react-router-dom';

function MyCourses() {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!user) {
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     axios.get('http://localhost:4000/course-users').then((res) => {
  //       const enrolledCourses = res.data.filter((crs) => crs.userEmail === user.email);
  //       setCourses(enrolledCourses);
  //       setLoading(false);
  //     }).catch((err) => {
  //       console.log('API Error:', err);
  //       setLoading(false);
  //     });
  //   } catch (error) {
  //     console.log('Unexpected Error:', error);
  //     setLoading(false);
  //   }
  // }, [user]);
  useEffect(()=>{

    axios.get('http://localhost:4000/course-users').then((res)=>{
      const enrolledCourses = res.data.filter((crs)=>crs.userEmail === user.email);
      setCourses(enrolledCourses);
      setLoading(false);
    }).catch((err)=>{
      console.log('API Error:',err);
      setLoading(false);
    })
  },[user.email])



  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <p className="text-lg mb-4">You need to log in to view your courses.</p>
        <a href="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
          Go to Login
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Header/>
        <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
          Loading your courses...
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 text-lg">
          You haven't enrolled in any courses yet.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <MyCourseData course={courses} />
    </div>
  );
}

export default MyCourses;