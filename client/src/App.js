import React, { useEffect, useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import ScrollTop from './ScorllTop';
import Payment from './pages/Payment';
import Course from './pages/Course';
import Certificate from './components/course/Certificate';
import Signup from './pages/Signup';
import Login from './pages/Login';
import axios from 'axios';
import MyCourses from './pages/MyCourses';
import MyLearnig from './pages/MyLearnig';
function App() {
 
  return (
    <div>
        <BrowserRouter>
        <ScrollTop/>
         <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/course-details/:id" element={<CourseDetails/>}/>
          <Route path="/payment/:id" element={<Payment/>}/>
          <Route path="/course/:id" element={<Course/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/certificate" element={<Certificate/>}/>
          <Route path="/my-courses" element={<MyCourses/>}/>
          <Route path="/my-learning" element={<MyLearnig/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App