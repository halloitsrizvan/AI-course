import React from 'react'
import TestimonialCard from '../course details/TestimonialCard'

function TestimonialsSection() {
    const TESTIMONIALS = [
        {
          quote: "Because of this course I was able to clear my first interview. Thanks for making such wonderful content.",
          initials: "DS",
          name: "Dennis S.",
          course: "Business Intelligence (BI)",
          color: "bg-teal-500",
        },
        {
          quote: "This has helped me so much in my career... I am now a certified engineer and eventually transitioned to full stack developer with the help of this course.",
          initials: "CB",
          name: "Christian B.",
          course: "View this Go-lang course",
          color: "bg-blue-500",
        },
        {
          quote: "Today I am a software developer and I credit a significant part of my success to the solid foundation laid by this course.",
          initials: "DK",
          name: "Dipak K.",
          course: "View this Java course",
          color: "bg-yellow-500",
        },
        {
          quote: "I would highly recommend this Web Development Bootcamp for anyone interested in pursuing a career in web development and looking to enhance their skills in this field.",
          initials: "AK",
          name: "Aniket K.",
          course: "View this Web Development course",
          color: "bg-red-500",
        },
      ];
  return (
    <div>
         <div className="max-w-7xl mx-auto my-20 px-4">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
      See what others are achieving through learning
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {TESTIMONIALS.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </div>
  </div>
    </div>
  )
}

export default TestimonialsSection