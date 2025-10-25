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
function App() {
  const [course,setCourse] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:4000/').then((res)=>{
      setCourse(res.data);
      console.log(res.data);  
    }).catch((err)=>{
      console.log(err);
    })
  },[])
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
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App