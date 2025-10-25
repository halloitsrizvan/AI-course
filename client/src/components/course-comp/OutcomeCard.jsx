import React from 'react'

function OutcomeCard({ index, title, description }) {
  return (
    <div className=""> {/* Fixed height */}
      <div className="p-6 md:p-8 border border-gray-200 rounded-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
        
        {/* Large Number Background - Dynamic based on index */}
        <div className='absolute -top-4 right-8 transform translate-x-1/2 translate-y-1/2'>
            <span className='text-[10rem] font-extrabold text-purple-100 opacity-80 select-none'>
                {index + 1} {/* Dynamic number starting from 1 */}
            </span>
        </div>

        <div className='relative z-10 flex-grow'>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        </div>
        
        <a href="#" className="text-sm font-semibold text-purple-700 hover:underline relative z-10 mt-auto">
            Enroll Now &gt;
        </a>
      </div>
    </div>
  )
}

export default OutcomeCard