import React from 'react'
import Header from '../components/home/Header';
import Banner from '../components/home/Banner';
import Contents from '../components/home/Contents';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/home/Footer';
import FirstContent from '../components/home/FirstContent';

function Home() {
  return (
    <div className='min-h-screen bg-gray-50'  >
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

        <Header/>
        <Banner/>
        
        <FirstContent/>
        <Contents/>
        {/* <TestimonialsSection/> */}
        <Footer/>

     
     
    </div>
  )
}

export default Home