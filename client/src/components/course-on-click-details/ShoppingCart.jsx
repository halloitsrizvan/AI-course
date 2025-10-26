import React, { useState } from 'react'
import CartItem from '../course-comp/CartItem';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, DollarSign, Gift, Copy, AlertTriangle } from 'lucide-react';
import StepCard from '../course-comp/StepCard';
import axios from 'axios';

const ActionButton = ({ onClick, children, className = '' }) => (
    <button 
        onClick={onClick} 
        className={`bg-purple-700 text-white px-6 py-3 font-bold rounded-xl shadow-lg hover:bg-purple-800 transition duration-200 text-lg ${className}`}
    >
        {children}
    </button>
);

const paymentSteps = [
    { 
        id: 1, 
        icon: MessageCircle, 
        title: 'Contact on Whatsapp', 
        description: 'Click the button below to start a chat with us.',
        color: 'bg-green-500', 
        iconColor: 'text-green-200'
    },
    { 
        id: 2, 
        icon: CheckCircle, 
        title: 'Share Course Details', 
        description: 'Message us the course name and price you wish to purchase.',
        color: 'bg-purple-500', 
        iconColor: 'text-purple-200'
    },
    { 
        id: 3, 
        icon: DollarSign, 
        title: 'Make Payment (UPI)', 
        description: 'Complete the payment using the UPI details provided in the chat.',
        color: 'bg-blue-500', 
        iconColor: 'text-blue-200'
    },
    { 
        id: 4, 
        icon: Gift, 
        title: 'Receive Coupon Code', 
        description: 'We will send you a unique coupon code after payment confirmation.',
        color: 'bg-amber-500', 
        iconColor: 'text-amber-200'
    },
    { 
        id: 5, 
        icon: Copy, 
        title: 'Apply Code Here', 
        description: 'Copy the code and paste it into the "Apply Coupon" section.',
        color: 'bg-teal-500', 
        iconColor: 'text-teal-200'
    },
    { 
        id: 6, 
        icon: AlertTriangle, 
        title: 'Important Caution', 
        description: 'The generated coupon code is strictly for one-time use only.',
        color: 'bg-red-500', 
        iconColor: 'text-red-200'
    },
];

function ShoppingCart({ course }) {
    const navigate = useNavigate();
    const [couponCode, setCouponCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    // Handler for the main Whatsapp button
    const handleWhatsappContact = () => {
        const message = `Hello,\n\nI am interested in purchasing the following course:\n\n📚 *Course Name:* ${course.title}\n💰 *Price:* ₹${total} (Original: ₹${originalTotal})\n🎯 *Discount:* ${percentageOff}% OFF\n\nPlease provide me with the payment instructions.\n\nThank you!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/918921342964?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    // Add this state at the top of your component
const [showSuccessPopup, setShowSuccessPopup] = useState(false);

// Add this popup component before the return statement
const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations! 🎉</h3>
            <p className="text-gray-600 mb-6">
                You have successfully enrolled in <strong>{course.title}</strong>
            </p>
            <button
                onClick={() => {
                    setShowSuccessPopup(false);
                    navigate('/my-courses');
                }}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
                Go to My Courses
            </button>
        </div>
    </div>
);
    // Handler for applying coupon
// Handler for applying coupon
const handleCouponApply = async () => {
    if (!user) {
        navigate('/login');
        return;
    }

    if (!couponCode.trim()) {
        setError('Please enter a coupon code');
        return;
    }

    setIsLoading(true);
    setError('');

    try {
        // Step 1: Check if user already enrolled in this course (Frontend check)
        try {
            const userCoursesResponse = await axios.get(`http://localhost:4000/course-users/user/${user.email}`);
            const existingCourse = userCoursesResponse.data.find(userCourse => 
                userCourse.title === course.title || 
                userCourse._id === course._id
            );

            if (existingCourse) {
                setError('You are already enrolled in this course!');
                return;
            }
        } catch (enrollErr) {
            console.log('Enrollment check failed, continuing...', enrollErr);
            // Continue even if enrollment check fails
        }

        // Step 2: Try coupon validation (with fallback)
        let couponValid = true;
        
        try {
            const validationResponse = await axios.post('http://localhost:4000/coupons/validate', {
                code: couponCode.trim(),
                userEmail: user.email,
                courseId: course._id // Add courseId for validation
            });

            if (!validationResponse.data.success) {
                couponValid = false;
                setError(validationResponse.data.message);
                return;
            }
        } catch (couponErr) {
            console.log('Coupon validation failed, proceeding with basic enrollment', couponErr);
            // If coupon validation fails, we'll proceed with basic enrollment
            // but show a warning
          
        }

        // Step 3: Prepare enrollment data (simplified)
        const enrollmentData = {
            // Course basic info
            title: course.title,
            description: course.description,
            exercises: course.exercises,
            titleOfCreator: course.titleOfCreator,
            enrollment: course.enrollment,
            price: course.price,
            imageUrl: course.imageUrl,
            imageUrl2: course.imageUrl2,
            createdBy: course.createdBy,
            totalLength: course.totalLength,
            section: course.section,
            published: course.published,
            whatYoullLearn: course.whatYoullLearn,
            skillsThatMatter: course.skillsThatMatter,
            curriculumCard: course.curriculumCard,
            course: course.course,
            quizQuestions: course.quizQuestions,
            
            // User info
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            
            // Enrollment info
            status: 'in progress',
            couponCode: couponCode.trim(),
            courseId: course._id
        };

        console.log('Sending enrollment data:', enrollmentData);

        // Step 4: Enroll in the course
        const enrollmentResponse = await axios.post('http://localhost:4000/course-users/enroll', enrollmentData);
        
        if (enrollmentResponse.data) {
            console.log('Enrollment successful:', enrollmentResponse.data);
            
            // Try to mark coupon as used (optional)
            try {
                await axios.post('http://localhost:4000/coupons/apply', {
                    code: couponCode.trim(),
                    userEmail: user.email,
                    courseId: course._id
                });
                console.log('Coupon marked as used');
            } catch (applyErr) {
                console.log('Could not mark coupon as used', applyErr);
            }

            // Show success popup
            setShowSuccessPopup(true);
        }
        
    } catch (err) {
        console.error('Enrollment error:', err);
        console.error('Error response:', err.response?.data);
        
        // Better error handling
        if (err.response?.status === 400) {
            if (err.response.data?.error?.includes('E11000') || err.response.data?.error?.includes('duplicate')) {
                setError('You are already enrolled in this course!');
            } else if (err.response.data?.error?.includes('validation')) {
                setError('Invalid data. Please try again.');
            } else {
                setError(err.response.data?.error || 'Invalid request. Please try again.');
            }
        } else if (err.response?.status === 500) {
            if (err.response.data?.error?.includes('E11000')) {
                setError('You are already enrolled in this course!');
            } else {
                setError('Server error. Please try again later.');
            }
        } else if (err.code === 'ERR_NETWORK') {
            setError('Network error. Please check your connection.');
        } else {
            setError('Failed to enroll. Please try again.');
        }
    } finally {
        setIsLoading(false);
    }
};

    const originalTotal = course.price;
    const total = course.price - 199; 
    const percentageOff = Math.round(((originalTotal - total) / originalTotal) * 100);
    
    return (
        <div className='min-h-screen bg-gray-50 font-sans antialiased'>
             {showSuccessPopup && <SuccessPopup />}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-xl sm:text-4xl font-extrabold text-gray-900 mb-10">
                    Shopping Cart
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left Column: Payment Steps & Cart Items */}
                    <div className="lg:col-span-2">
                        <p className="text-lg font-bold text-gray-700 mb-4">Course</p>
                        <div className='divide-y divide-gray-200 border border-gray-200 rounded-xl mb-10 bg-white shadow-sm'>
                            <CartItem 
                                imageUrl2={course.imageUrl2} 
                                title={course.title}
                                description={course.description}
                            />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Purchase Steps</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {paymentSteps.map(step => (
                                <StepCard key={step.id} step={step} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Order Summary & Coupon */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-12 bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
                            
                            <h2 className='text-xl font-bold text-gray-900 mb-4 border-b pb-3'>Order Summary</h2>
                            
                            <div className='space-y-1 mb-6'>
                                <p className="text-5xl font-extrabold text-gray-900">
                                    ₹{total.toLocaleString('en-IN')}
                                </p>
                                <div className='flex items-center text-sm text-gray-600'>
                                    <span className='line-through mr-2'>₹{originalTotal.toLocaleString('en-IN')}</span>
                                    <span className='text-green-600 font-bold'>
                                        {percentageOff}% off!
                                    </span>
                                </div>
                            </div>

                            <ActionButton 
                                className="w-full mb-4 text-lg font-semibold" 
                                onClick={handleWhatsappContact}
                            >
                                Contact on Whatsapp &rarr;
                            </ActionButton>
                            
                            <p className="text-xs text-center text-gray-500 mb-6">
                                Make payment via Whatsapp and receive your exclusive coupon code instantly.
                            </p>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Apply Coupon Section */}
                            <div className='border-t pt-4 mt-4'>
                                <h3 className='text-sm font-bold text-gray-700 mb-2'>Apply Coupon</h3>
                                <div className='flex space-x-2'>
                                    <input 
                                        type="text" 
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) => {
                                            setCouponCode(e.target.value);
                                            setError(''); // Clear error when typing
                                        }}
                                        className='flex-grow border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={handleCouponApply}
                                        disabled={isLoading}
                                        className={`px-4 py-3 text-sm font-bold rounded-lg transition duration-150 shadow-sm ${
                                            isLoading 
                                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                                : 'bg-white text-purple-700 border border-purple-700 hover:bg-purple-50'
                                        }`}
                                    >
                                        {isLoading ? 'Applying...' : 'Apply'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ShoppingCart;