import React from 'react'
import { StarIcon, CrownIcon } from '../../Icons';
function CartItem({ title ,description,imageUrl2}) {
    
  return (
    
    <div className="flex items-center p-4 border-b border-gray-100">
      <img src={imageUrl2} alt={title} className="w-16 h-16 rounded-lg object-cover mr-4" />
      <div className="flex-grow">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  
  )
}

export default CartItem