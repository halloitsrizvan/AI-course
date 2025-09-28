import React from 'react'
import CourseCard from '../course details/CourseCard';

function Contents() {
    const COURSES = [
        {
          title: "Full Stack Web Developer",
          rating: 4.7,
          reviews: "45,806 ratings",
          totalLength: "1.2 Hours",
          imageUrl: "https://placehold.co/300x200/f59e0b/ffffff?text=Web+Dev"
        },
        {
          title: "Digital Marketer",
          rating: 4.5,
          reviews: "3,951 ratings",
          totalLength: "2.2 Hours",
          imageUrl: "https://placehold.co/300x200/ec4899/ffffff?text=Marketing"
        },
        {
          title: "Data Scientist",
          rating: 4.6,
          reviews: "23,071 ratings",
          totalLength: "1.6 Hours",
          imageUrl: "https://placehold.co/300x200/8b5cf6/ffffff?text=Data+Sci"
        },
        {
          title: "Business Analyst",
          rating: 4.4,
          reviews: "15,122 ratings",
          totalLength: "2.8 Hours",
          imageUrl: "https://placehold.co/300x200/06b6d4/ffffff?text=Business"
        },
      ];

      
  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        Ready to reimagine your career?
      </h2>
      <p className="text-lg text-gray-900 mt-2">
        Get the skills and real-world experience employers want with Career Accelerators.
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {COURSES.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </div>
    
  </div>
  )
}

export default Contents