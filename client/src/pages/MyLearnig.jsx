import React ,{useState,useEffect}from 'react'
import Header from '../components/home/Header'
import MyCourseData from '../components/course/MyCourseData'
import axios from 'axios'
function MyLearnig() {
      const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
      const [courses, setCourses] = useState([]);
      const [loading, setLoading] = useState(true);
   
  return (
    <div>
        <Header/>
        <h2>Helllo course</h2>
    </div>
  )
}

export default MyLearnig