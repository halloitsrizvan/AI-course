import React from 'react'
import CartItem from '../course-comp/CartItem';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {
    const CART_ITEMS = [
        {
            id: 1,
            title: "The Complete Full-Stack Web Development Bootcamp",
            instructor: "Dr. Angela Yu, Developer and Lead Instructor",
            rating: 4.7,
            ratingsCount: "453,393",
            hours: 61.5,
            lectures: 374,
            levels: "All Levels",
            price: 549,
            originalPrice: 3199,
            isBestseller: true,
            isPremium: true,
            image: "https://placehold.co/80x80/007bff/ffffff?text=JS+Node",
            imageText: "JS", // For thumbnail
        },
        {
            id: 2,
            title: "JavaScript - Marathon Interview Questions Series",
            instructor: "Nimal Joshi",
            rating: 4.6,
            ratingsCount: "1,300",
            hours: 17.5,
            lectures: 146,
            levels: "All Levels",
            price: 569,
            originalPrice: 3199,
            isBestseller: false,
            isPremium: true,
            image: "https://placehold.co/80x80/28a745/ffffff?text=JS+Int",
            imageText: "JS",
        },
        {
            id: 3,
            title: "JavaScript Data Structures & Algorithms + LEETCODE Exercises",
            instructor: "Scott Barrett",
            rating: 4.8,
            ratingsCount: "3,705",
            hours: 9.5,
            lectures: 137,
            levels: "All Levels",
            price: 729,
            originalPrice: 4099,
            isBestseller: true,
            isPremium: true,
            image: "https://placehold.co/80x80/dc3545/ffffff?text=JS+DSA",
            imageText: "JS",
        },
    ];
    
    const calculateTotals = (items) => {
        const total = items.reduce((sum, item) => sum + item.price, 0);
        const originalTotal = items.reduce((sum, item) => sum + item.originalPrice, 0);
        const discount = originalTotal - total;
        const percentageOff = Math.round((discount / originalTotal) * 100);
        return { total, originalTotal, percentageOff };
    };
    
    const { total, originalTotal, percentageOff } = calculateTotals(CART_ITEMS);

    const ActionButton = ({ onClick, children, className = '' }) => (
        <button 
            onClick={onClick} 
            className={`bg-purple-700 text-white px-6 py-3 font-bold rounded-lg hover:bg-purple-800 transition duration-200 shadow-md text-lg ${className}`}
        >
            {children}
        </button>
    );

    const navigate = useNavigate()
    
  return (
    <div className='min-h-screen bg-gray-50 font-inter'>
         <main className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left Column: Cart Items List */}
                    <div className="lg:col-span-2">
                        <p className="text-lg font-bold text-gray-700 mb-6">{CART_ITEMS.length} Courses in Cart</p>
                        <div className='divide-y divide-gray-200'>
                            {CART_ITEMS.map(item => <CartItem key={item.id} item={item} />)}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className='text-lg font-bold text-gray-900 mb-4'>Total:</h2>
                            
                            <div className='space-y-1 mb-4'>
                                <p className="text-4xl font-extrabold text-gray-900">
                                    ₹{total.toLocaleString('en-IN')}
                                </p>
                                <div className='flex items-center text-sm text-gray-600'>
                                    <span className='line-through mr-2'>₹{originalTotal.toLocaleString('en-IN')}</span>
                                    <span className='text-green-600 font-semibold'>
                                        {percentageOff}% off
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-center text-gray-500 mb-6">
                               Contact on Whatsapp and make payment, then we will give you Coupon code to access the course.
                            </p> 
                            <ActionButton className="w-full mb-4 text-base font-semibold" onClick={() => {/* Proceed to Checkout logic */}}>
                               Contact on Whatsapp &rarr;
                            </ActionButton>
                            
                            

                            <div className='border-t pt-4'>
                                <h3 className='text-sm font-bold text-gray-700 mb-2'>Apply Coupon</h3>
                                <div className='flex space-x-2'>
                                    <input 
                                        type="text" 
                                        placeholder="Enter coupon code"
                                        className='flex-grow border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
                                    />
                                    <button
                                    onClick={()=>navigate('/course')}
                                    className='bg-white text-purple-700 border border-purple-700 px-4 py-3 text-sm font-bold rounded-lg hover:bg-purple-50 transition duration-150'>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    </div>
  )
}

export default ShoppingCart