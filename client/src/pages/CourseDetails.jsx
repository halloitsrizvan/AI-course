import React from 'react'
import Header from '../components/home/Header'
import CourseHeader from '../components/course-on-click-details/CourseHeader'
import WhatYouWillLearn from '../components/course-on-click-details/WhatYoullLearn'
import SkillsThatMatter from '../components/course-on-click-details/SkillsThatMatter'
import FloatingFooterBanner from '../components/course-on-click-details/FloatingFooterBanner'
import Footer from '../components/home/Footer'
import CurriculumCard from '../components/course-on-click-details/CurriculumCard'
function CourseDetails() {
  return (
    <div className="min-h-screen bg-white ">
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .main-content { padding-bottom: 80px; /* Space for the floating footer banner */ }
    `}</style>
    
    <Header/>
    
    <main className="main-content">
        <CourseHeader />
        <WhatYouWillLearn />
        <SkillsThatMatter />
        <CurriculumCard/>
    </main>
        

    <FloatingFooterBanner />
        
    <Footer/>
    
</div>
  )
}

export default CourseDetails