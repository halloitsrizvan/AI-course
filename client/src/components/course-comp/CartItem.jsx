import React from 'react'
import { StarIcon, CrownIcon } from '../../Icons';
function CartItem({ item }) {
    
  return (
    
    <div className="flex items-center p-4 border-b border-gray-100">
    <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover mr-4" />
    <div className="flex-grow">
        <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
    </div>
</div>
  
  )
}

export default CartItem