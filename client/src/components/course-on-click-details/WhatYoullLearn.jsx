import React from 'react'
import OutcomeCard from '../course-comp/OutcomeCard'

function WhatYoullLearn() {
    const OUTCOMES = [
        { 
          number: 1, 
          title: 'JavaScript, React js, & Node.js', 
          description: 'Build fully-fledged websites and web apps and algorithm interviews.', 
          link: 'Course content',
        },
        { 
          number: 2, 
          title: 'JavaScript Interviews and MERN Stack', 
          description: 'Prepare for JavaScript Interviews and algorithm interviews.', 
          link: 'Course content',
        },
        { 
          number: 3, 
          title: 'Data Structures & Algorithms', 
          description: 'Prepare for the data structures and algorithm interviews.', 
          link: 'Course content',
        },
      ];
      
  return (
    
        <div className="max-w-7xl mx-auto my-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
            What you'll learn
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {OUTCOMES.map((outcome, index) => (
                <OutcomeCard key={index} {...outcome} />
            ))}
        </div>
    </div>
    
  )
}

export default WhatYoullLearn