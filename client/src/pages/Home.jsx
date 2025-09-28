import React from 'react'
import Header from '../components/home/Header';
import Banner from '../components/home/Banner';
import Contents from '../components/home/Contents';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/home/Footer';
function Home() {
  return (
    <div className='min-h-screen bg-cover bg-no-repeat bg-center'  style={{backgroundImage:"url('images/Desktop - 2.jpg')"}} >
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

        <Header/>
        <Banner/>
        <Contents/>
        <TestimonialsSection/>
        <Footer/>

     
     
    </div>
  )
}

export default Home