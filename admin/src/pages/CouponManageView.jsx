import React,{useState} from 'react'
import { LayoutDashboard, Users, BookOpen, UploadCloud, LogOut, Search, Clock, Zap, MessageCircle, Copy, Trash2, Key, Tag } from 'lucide-react';

const initialCoupons = [
    { id: 1, code: 'SUMMER2025A', discount: 10, expiry: '2025-11-30', type: 'Percent' },
    { id: 2, code: 'FALLSAVE25B', discount: 25, expiry: '2025-12-31', type: 'Percent' },
    { id: 3, code: 'WELCOME50USD', discount: 50, expiry: '2026-03-01', type: 'Fixed' },
  ];
  
  const mockCourses = [
    { id: 1, title: "Web Development", students: 1240, rating: 4.8, status: 'Active' },
    { id: 2, title: "Web Design (UI/UX)", students: 980, rating: 4.5, status: 'Active' },
    { id: 3, title: "Prompt Engineering", students: 2100, rating: 4.9, status: 'Active' },
    { id: 4, title: "AI and ML Fundamentals", students: 1550, rating: 4.7, status: 'Archived' },
    { id: 5, title: "AI History & Ethics", students: 720, rating: 4.6, status: 'Active' },
  ];
  
  const mockUsers = [
    { id: 'usr-1001', name: 'Alice Johnson', email: 'alice@example.com', joined: '2023-01-15', coursesEnrolled: 3 },
    { id: 'usr-1002', name: 'Bob Smith', email: 'bob@example.com', joined: '2023-02-20', coursesEnrolled: 1 },
    { id: 'usr-1003', name: 'Charlie Brown', email: 'charlie@example.com', joined: '2023-03-01', coursesEnrolled: 5 },
    { id: 'usr-1004', name: 'Diana Prince', email: 'diana@example.com', joined: '2023-04-10', coursesEnrolled: 2 },
  ];
  
  const totalUsers = mockUsers.length;
  const totalCourses = mockCourses.length;
  const totalEnrollments = mockCourses.reduce((sum, course) => sum + course.students, 0);
  
  // Mock admin password for client-side demo
  const ADMIN_PASSWORD = 'ADMINPASS';
function CouponManageView() {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [newCoupon, setNewCoupon] = useState({ discount: '', type: 'Percent', expiry: '' });
    const [adminPassword, setAdminPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' }); // type: 'success' or 'error'

    // Generates a 10-letter uppercase code
    const generateCode = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const handlePasswordCheck = (action) => {
        if (adminPassword !== ADMIN_PASSWORD) {
            setStatusMessage({ message: `Error: Invalid admin password. Cannot ${action} coupon.`, type: 'error' });
            return false;
        }
        return true;
    };

    const handleAddCoupon = (e) => {
        e.preventDefault();
        setStatusMessage({ message: '', type: '' });

        if (!handlePasswordCheck('add')) return;

        if (!newCoupon.discount || !newCoupon.expiry) {
            setStatusMessage({ message: 'Error: Discount and Expiry date are required.', type: 'error' });
            return;
        }

        const newId = coupons.length > 0 ? Math.max(...coupons.map(c => c.id)) + 1 : 1;
        const generatedCode = generateCode();

        const couponToAdd = {
            id: newId,
            code: generatedCode,
            discount: parseInt(newCoupon.discount),
            expiry: newCoupon.expiry,
            type: newCoupon.type
        };

        setCoupons(prev => [...prev, couponToAdd]);
        setNewCoupon({ discount: '', type: 'Percent', expiry: '' });
        setAdminPassword('');
        setStatusMessage({ message: `Success: New coupon "${generatedCode}" created!`, type: 'success' });
    };

    const handleDeleteCoupon = (id) => {
        setStatusMessage({ message: '', type: '' });

        if (!handlePasswordCheck('delete')) return;

        const couponToDelete = coupons.find(c => c.id === id);
        if (!couponToDelete) return; // Should not happen

        setCoupons(prev => prev.filter(c => c.id !== id));
        setAdminPassword('');
        setStatusMessage({ message: `Success: Coupon "${couponToDelete.code}" deleted.`, type: 'success' });
    };

    const handleCopy = (code) => {
        copyToClipboard(code);
        setStatusMessage({ message: `Copied coupon code: ${code}`, type: 'success' });
    };

    const copyToClipboard = (text) => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-gray-800">Coupon Management</h1>
            
            {/* Status Message */}
          

            {/* Add New Coupon Form */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Tag className="w-6 h-6 mr-2 text-indigo-500" />
                    Create New Coupon 
                    {/* (Admin Password: <code className='mx-1 bg-gray-100 text-sm font-mono p-1 rounded'>{ADMIN_PASSWORD}</code>) */}
                </h2>
                <form onSubmit={handleAddCoupon} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        
                        {/* Discount */}
                        <div>
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount Value</label>
                            <input
                                type="number"
                                name="discount"
                                id="discount"
                                required
                                value={newCoupon.discount}
                                onChange={(e) => setNewCoupon(prev => ({ ...prev, discount: e.target.value }))}
                                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                name="type"
                                id="type"
                                required
                                value={newCoupon.type}
                                onChange={(e) => setNewCoupon(prev => ({ ...prev, type: e.target.value }))}
                                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Percent">% Off</option>
                                <option value="Fixed">Fixed Amount ($)</option>
                            </select>
                        </div>
                        
                        {/* Expiry Date */}
                        <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input
                                type="date"
                                name="expiry"
                                id="expiry"
                                required
                                value={newCoupon.expiry}
                                onChange={(e) => setNewCoupon(prev => ({ ...prev, expiry: e.target.value }))}
                                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        
                        {/* Admin Password */}
                        <div>
                            <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">Admin Password</label>
                            <input
                                type="password"
                                name="adminPassword"
                                id="adminPassword"
                                required
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Required for security"
                            />
                        </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className='pt-2'>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            <Tag className="w-5 h-5 mr-2" />
                            Generate & Publish Coupon Code
                        </button>
                    </div>
                </form>
            </div>
            
              {statusMessage.message && (
                <div 
                    className={`p-4 rounded-xl font-medium ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                    {statusMessage.message}
                </div>
            )}

            {/* Current Coupons Table */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Coupons ({coupons.length})</h2>
                <p className="text-sm text-gray-500 mb-4">Enter the admin password in the form above to enable deletion.</p>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">
                                Code (10 Letters)
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Discount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Expiry Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {coupons.map((coupon) => (
                            <tr key={coupon.id} className="hover:bg-indigo-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-indigo-700">{coupon.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {coupon.type === 'Percent' ? `${coupon.discount}% Off` : `$${coupon.discount} Fixed`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.expiry}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                    <button 
                                        onClick={() => handleCopy(coupon.code)}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                        title="Copy Code"
                                    >
                                        <Copy className='w-4 h-4 inline' /> Copy
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteCoupon(coupon.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                        title="Delete Coupon"
                                    >
                                        <Trash2 className='w-4 h-4 inline' /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {coupons.length === 0 && (
                    <p className="text-center py-6 text-gray-500">No active coupons found. Add one above!</p>
                )}
            </div>
        </div>
    );
}

export default CouponManageView