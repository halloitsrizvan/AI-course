import React, { useState, useEffect, useRef } from 'react';
import Course from '../../pages/Course';

// Mock data for the course cards
const mockCourses = [
  {
    id: 1,
    title: 'Generative AI',
    students: '1M+',
    imageUrl: 'https://placehold.co/400x250/f0f0f0/6b7280?text=AI+Illustration',
  },
  {
    id: 2,
    title: 'IT Certifications',
    students: '14.4M+',
    imageUrl: 'https://placehold.co/400x250/f0f0f0/6b7280?text=Golden+Trophy',
  },
  {
    id: 3,
    title: 'Data Science',
    students: '8M+',
    imageUrl: 'https://placehold.co/400x250/f0f0f0/6b7280?text=Data+Visualization',
  },
  {
    id: 4,
    title: 'Web Development',
    students: '20M+',
    imageUrl: 'https://placehold.co/400x250/f0f0f0/6b7280?text=Code+Screen',
  },
  {
    id: 5,
    title: 'Cybersecurity',
    students: '5M+',
    imageUrl: 'https://placehold.co/400x250/f0f0f0/6b7280?text=Lock+Icon',
  },
];

// Helper component for the arrow icon (inline SVG)
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 transition-transform group-hover:translate-x-1">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

// Course Card Component
const CourseCard = ({ course }) => {
  // Determine if the card is the central, visually highlighted card (like in the image)
  const isCentral = course.id === 2; 

  return (
    <div
      key={course.id}
      className={`relative flex-shrink-0 w-[300px] sm:w-[320px] lg:w-[360px] h-[480px] bg-white rounded-xl shadow-lg m-2 transition-all duration-300 ${
        isCentral ? 'shadow-xl ring-2 ring-purple-500' : 'shadow-md'
      }`}
    >
      {/* Image Container (Simulated 3D Graphics) */}
      <div className="h-2/3 overflow-hidden rounded-t-xl">
        <img
          src={course.imageUrl}
          alt={`Illustration for ${course.title}`}
          className="w-full h-full object-cover rounded-t-xl"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/e5e7eb/6b7280?text=Content"; }}
        />
        {/* Placeholder for the tablet glow effect, only visible in the first card in the image */}
        {course.id === 1 && (
             <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white/50 backdrop-blur-sm shadow-inner"></div>
        )}
      </div>

      {/* Content Box */}
      <div className="absolute inset-x-4 bottom-4 p-6 bg-white rounded-xl shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          {/* Student Metric */}
          <span className="text-lg font-semibold text-gray-700">{course.students}</span>
        </div>
        
        {/* Course Title & Link Arrow */}
        <div className="flex justify-between items-center group cursor-pointer">
          <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

const CourseSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Function to simulate scrolling when arrows are clicked (optional enhancement)
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Width of one card + margin
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });

      // Update active index based on scroll position (simplified logic)
      setTimeout(() => {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        const newIndex = Math.round(scrollLeft / scrollAmount);
        setActiveIndex(newIndex);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-7xl w-full mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Text Content */}
          <div className="flex flex-col justify-center px-4 md:px-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Learn essential <span className="text-purple-600">career</span> and <span className="text-purple-600">life skills</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Udemy helps you build in-demand skills fast and advance your career in a changing job market.
            </p>
          </div>

          {/* Right Cards / Carousel Section */}
          <div className="w-full overflow-hidden">
            
            {/* Horizontal Scroll Container (The actual carousel behavior) */}
            <div
              ref={scrollRef}
              className="flex overflow-x-scroll snap-x snap-mandatory pb-8 pt-4 -m-2 custom-scrollbar"
              style={{ scrollbarWidth: 'none' /* For Firefox */ }}
            >
              {/* Custom Scrollbar hiding for Webkit browsers */}
              <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {mockCourses.map((course) => (
                <div key={course.id} className="snap-center">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

            {/* Carousel Navigation (Dots and Arrows) */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              
              {/* Left Arrow */}
              <button 
                onClick={() => handleScroll('left')}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>

              {/* Navigation Dots (Simplified to mockCourses length) */}
              <div className="flex space-x-2">
                {mockCourses.slice(0, 3).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-6 bg-purple-600'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={() => handleScroll('right')}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
                aria-label="Next slide"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSlider;
