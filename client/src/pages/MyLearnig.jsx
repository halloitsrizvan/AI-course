import React ,{useState,useEffect}from 'react'
import Header from '../components/home/Header'
import MyCourseData from '../components/course/MyCourseData'
import axios from 'axios'
function MyLearnig() {
      const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
      const [courses, setCourses] = useState([]);
      const [loading, setLoading] = useState(true);
   
      useEffect(()=>{
        axios.get('http://localhost:4000/course-users').then((res)=>{
          const enrolledCourses = res.data.filter((crs) => crs.userId === user.id);
          setCourses(enrolledCourses);
          setLoading(false);
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
        });
      },[user.id])
  return (
    <div>
        {courses.length === 0 ? <Header/> :
         <div>
            <Header/><MyCourseData course={courses}/>
          
         </div>

        }
        
        
    </div>
  )
}

export default MyLearnig