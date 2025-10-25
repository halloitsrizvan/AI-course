import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import CourseHeader from '../components/course-on-click-details/CourseHeader'
import WhatYouWillLearn from '../components/course-on-click-details/WhatYoullLearn'
import SkillsThatMatter from '../components/course-on-click-details/SkillsThatMatter'
import FloatingFooterBanner from '../components/course-on-click-details/FloatingFooterBanner'
import Footer from '../components/home/Footer'
import CurriculumCard from '../components/course-on-click-details/CurriculumCard'
import CourseHeaderLoading from '../components/course-on-click-details/CourseHeaderLoading'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourses] = useState(null); // Start with null instead of {}
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/courses').then((res) => {
      const filter = res.data.find((course) => course._id === id);
      setCourses(filter || null);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <CourseHeaderLoading/>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .main-content { padding-bottom: 80px; }
      `}</style>
      
      <Header/>
      
      <main className="main-content">
        <CourseHeader 
          title={course.title}
          description={course.description}
          exercises={course.exercises}
          totalLength={course.totalLength}
          price={course.price}
          enrollment={course.enrollment}
          imageUrl2={course.imageUrl2}
          section={course.section}
          _id={course._id}
        />
        <WhatYouWillLearn outcomes={course.whatYoullLearn} />
        <SkillsThatMatter skill={course.skillsThatMatter} />
        <CurriculumCard curriculumCard={course.curriculumCard} course={course} />
      </main>

      <FloatingFooterBanner course={course}/>
      <Footer/>
    </div>
  )
}

export default CourseDetails