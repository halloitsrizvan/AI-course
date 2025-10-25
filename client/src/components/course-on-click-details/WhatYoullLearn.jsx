import React from 'react'
import OutcomeCard from '../course-comp/OutcomeCard'

function WhatYoullLearn({ outcomes }) {
  // Add safety check for undefined outcomes
  if (!outcomes || !Array.isArray(outcomes)) {
    return (
      <div className="max-w-7xl mx-auto my-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
          What you'll learn
        </h2>
        <div className="text-gray-500">Loading learning outcomes...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
        What you'll learn
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outcomes.map((outcome, index) => (
          <OutcomeCard key={index} index={index} {...outcome} />
        ))}
      </div>
    </div>
  );
}

export default WhatYoullLearn;