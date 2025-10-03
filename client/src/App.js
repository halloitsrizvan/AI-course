import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import ScrollTop from './ScorllTop';
import Payment from './pages/Payment';
import Course from './pages/Course';
import Certificate from './components/course/Certificate';
import Signup from './pages/Signup';
import Login from './pages/Login';
function App() {
  return (
    <div>
        <BrowserRouter>
        <ScrollTop/>
         <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/course-details" element={<CourseDetails/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/course" element={<Course/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/certificate" element={<Certificate/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App