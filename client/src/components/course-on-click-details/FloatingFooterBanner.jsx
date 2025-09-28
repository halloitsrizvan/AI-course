import React from 'react'
import {CheckSquare,StarIcon,InfoIcon} from '../../Icons'
function FloatingFooterBanner() {
    const INCLUDED_ITEMS = [
        { icon: CheckSquare, text: 'top-rated courses', highlight: '3' },
        { icon: StarIcon, text: 'average course rating', highlight: '4.7', iconClass: 'text-yellow-600' },
        { icon: CheckSquare, text: 'hands-on practice exercises', highlight: '126', showInfo: true },
        { icon: CheckSquare, text: 'hours of on-demand content', highlight: '87.8' },
    ];
    
  return (
    <div className="bg-gray-900 text-white py-16  font-inter ">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        
        {/* Left Content (Title, Description, CTA) */}
        <div className="md:max-w-xl md:pr-10 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Break into a full stack web development career.
            </h2>
            <p className="text-lg text-gray-300 mb-6">
                Get the skills, structure, and hands-on experience to launch your career.
            </p>
            
            {/* Price and Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
                <button className="bg-purple-700 text-white px-6 py-3 font-bold text-lg rounded-lg hover:bg-purple-800 transition duration-200 shadow-xl w-full sm:w-auto">
                    Get started
                </button>
                <p className="text-4xl font-extrabold">₹10,397</p>
            </div>
            <p className="text-sm text-gray-400 mt-2">
                30-Day Money-Back Guarantee
            </p>
        </div>

        {/* Right Content - What's Included Box (Styled to pop out visually) */}
        <div className="w-full md:w-96 bg-white text-gray-900 p-8 rounded-xl shadow-2xl border border-gray-100"> 
            <h4 className="font-bold text-xl mb-4 text-gray-900">What's included</h4>
            <ul className='space-y-4 text-base'>
                {INCLUDED_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    // Larger icons in the banner list for emphasis
                    return (
                        <li key={index} className='flex items-start space-x-3'>
                            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.iconClass || 'text-purple-600'}`} />
                            <span>
                                <strong className='font-bold'>{item.highlight}</strong> {item.text}
                                {item.showInfo && <InfoIcon className="w-3 h-3 ml-1 text-gray-500 cursor-help inline-block" />}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    </div>
</div>
  )
}

export default FloatingFooterBanner