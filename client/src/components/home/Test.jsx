import React from 'react';
// Since we are creating a single file component, we will mock 'useNavigate' 
// and the external components like CartItem.
import { CheckCircle, MessageCircle, DollarSign, Gift, Copy, AlertTriangle } from 'lucide-react';

// --- MOCK DATA AND UTILITIES ---

// Mocking external dependency for a single-file environment
const useNavigate = () => (path) => console.log(`Navigating to: ${path}`);
const CartItem = ({ item }) => (
    <div className="flex items-center p-4 border-b border-gray-100">
        <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover mr-4" />
        <div className="flex-grow">
            <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-500">Price: ₹{item.price.toLocaleString('en-IN')}</p>
        </div>
    </div>
);

const CART_ITEMS = [
    { id: 1, title: 'Full Stack Web Accelerator', price: 10397, imageUrl: 'https://placehold.co/100x100/f3f4f6/333333?text=FS' },
];

const originalTotal = 15000;
const total = 10397;
const percentageOff = Math.round(((originalTotal - total) / originalTotal) * 100);

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

// --- COMPONENTS ---

// Step Card Component
const StepCard = ({ step }) => {
    const IconComponent = step.icon;
    return (
        <div className={`p-6 rounded-2xl shadow-lg transform hover:scale-[1.03] transition duration-300 ${step.color} text-white`}>
            <div className='flex items-center mb-3'>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/30 mr-3 text-white font-bold text-lg`}>
                    {step.id < 6 ? step.id : '!'}
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
            </div>
            <p className="text-sm opacity-90 leading-snug">{step.description}</p>
        </div>
    );
};

// Action Button Component
const ActionButton = ({ onClick, children, className = '' }) => (
    <button 
        onClick={onClick} 
        className={`bg-purple-700 text-white px-6 py-3 font-bold rounded-xl shadow-lg hover:bg-purple-800 transition duration-200 text-lg ${className}`}
    >
        {children}
    </button>
);


// Main ShoppingCart Component
function ShoppingCart() {
    const navigate = useNavigate();
    
    // Handler for the main Whatsapp button
    const handleWhatsappContact = () => {
        // Mock WhatsApp link (replace with actual number/message)
        const whatsappUrl = "https://wa.me/919999999999?text=I%20want%20to%20purchase%20the%20Full%20Stack%20Web%20Accelerator%20Course%20for%20₹10%2C397.";
        window.open(whatsappUrl, '_blank');
    };
    
    // Handler for applying coupon (mocked)
    const handleCouponApply = () => {
        // In a real app, this would validate the coupon and update the price.
        alert('Coupon applied! Navigating to course page.'); // Using temporary 'alert' mock
        navigate('/course');
    };

    // State for coupon input (mocked)
    const [couponCode, setCouponCode] = React.useState('');
    
    // Function to replace alert() which is not allowed
    const alert = (message) => {
        console.log("ALERT:", message);
      
    };

    return (
        <div className='min-h-screen bg-gray-50 font-sans antialiased'>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10">
                    Shopping Cart
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left Column: Payment Steps & Cart Items */}
                    <div className="lg:col-span-2">
                        {/* Course Items List (kept for completeness) */}
                        <p className="text-lg font-bold text-gray-700 mb-4">{CART_ITEMS.length} Item in Cart</p>
                        <div className='divide-y divide-gray-200 border border-gray-200 rounded-xl mb-10 bg-white shadow-sm'>
                            {CART_ITEMS.map(item => <CartItem key={item.id} item={item} />)}
                        </div>
                        
                        {/* Payment Method Steps (New Design) */}
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
                            
                            {/* Total Summary */}
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

                            {/* Main Action Button */}
                            <ActionButton 
                                className="w-full mb-4 text-lg font-semibold" 
                                onClick={handleWhatsappContact}
                            >
                                Contact on Whatsapp &rarr;
                            </ActionButton>
                            
                            <p className="text-xs text-center text-gray-500 mb-6">
                                Make payment via Whatsapp and receive your exclusive coupon code instantly.
                            </p>
                            

                            {/* Apply Coupon Section */}
                            <div className='border-t pt-4 mt-4'>
                                <h3 className='text-sm font-bold text-gray-700 mb-2'>Apply Coupon</h3>
                                <div className='flex space-x-2'>
                                    <input 
                                        type="text" 
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className='flex-grow border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
                                    />
                                    <button
                                        onClick={handleCouponApply}
                                        className='bg-white text-purple-700 border border-purple-700 px-4 py-3 text-sm font-bold rounded-lg hover:bg-purple-50 transition duration-150 shadow-sm'>
                                        Apply
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

// Since this is the main file now, we export it as App
const App = () => <ShoppingCart />;
export default App;
