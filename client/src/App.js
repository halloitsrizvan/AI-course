import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import ScrollTop from './ScorllTop';
import Payment from './pages/Payment';
import Course from './pages/Course';
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
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App