import React from 'react'
import { StarIcon, CrownIcon } from '../../Icons';
function CartItem({ item }) {
  return (
    
        <div className='flex py-6 border-b border-gray-200'>
        {/* Course Thumbnail */}
        <div className='relative flex-shrink-0 w-20 h-20 overflow-hidden rounded-md mr-4'>
             <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/007bff/ffffff?text=${item.imageText}`; }}
            />
        </div>

        {/* Course Details */}
        <div className='flex-grow'>
            <h3 className='text-base font-bold text-gray-900 hover:text-purple-700 cursor-pointer transition duration-150'>
                {item.title}
            </h3>
            <p className='text-xs text-gray-600 mb-1'>By {item.instructor}</p>
            
            <div className='flex items-center text-sm mb-2'>
                <span className='font-bold text-yellow-800 mr-1'>{item.rating}</span>
                <span className='flex'>
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
                    ))}
                </span>
                <span className='text-xs text-gray-500 ml-2'>({item.ratingsCount} ratings)</span>
            </div>

            <div className='text-xs text-gray-600 space-y-0.5'>
                <span>{item.hours} total hours &bull; {item.lectures} lectures &bull; {item.levels}</span>
            </div>
            
            <div className='mt-2'>
                {item.isPremium && (
                    <span className='inline-flex items-center px-2 py-1 bg-purple-600 rounded-full text-xs font-semibold text-white'>
                        <CrownIcon className="mr-1 w-3 h-3" /> Premium
                    </span>
                )}
            </div>
        </div>

        {/* Actions and Price */}
        <div className='flex flex-col items-end pl-4'>
           
            <div className='text-right'>
                <p className='text-lg font-bold text-gray-900'>₹{item.price.toLocaleString('en-IN')}</p>
                <p className='text-xs text-gray-500 line-through'>₹{item.originalPrice.toLocaleString('en-IN')}</p>
            </div>
        </div>
    </div>
  
  )
}

export default CartItem