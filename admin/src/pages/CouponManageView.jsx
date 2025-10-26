import React, { useState, useEffect } from 'react';
import { Tag, Copy, Trash2, Key, Users, Search } from 'lucide-react';
import axios from 'axios';

function CouponManageView() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    // New coupon form state
    const [newCoupon, setNewCoupon] = useState({
        nameOfUser: '',
        userEmail: '',
        code: '',
        courseId: '',
        courseName: '',
        expiresInDays: 7
    });

    // Fetch all coupons on component mount
    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:4000/coupons');
            if (response.data.success) {
                setCoupons(response.data.coupons || []);
            }
        } catch (error) {
            console.error('Error fetching coupons:', error);
            showStatus('Error fetching coupons', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showStatus = (message, type = 'success') => {
        setStatusMessage({ message, type });
        setTimeout(() => setStatusMessage({ message: '', type: '' }), 5000);
    };

    // Generate random coupon code
    const generateCouponCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setNewCoupon(prev => ({ ...prev, code }));
    };

    // Handle form submission
    const handleAddCoupon = async (e) => {
        e.preventDefault();
        
        if (!adminPassword) {
            showStatus('Please enter admin password', 'error');
            return;
        }

        // Basic validation
        if (!newCoupon.nameOfUser || !newCoupon.userEmail || !newCoupon.code || !newCoupon.courseId || !newCoupon.courseName) {
            showStatus('Please fill all required fields', 'error');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:4000/coupons', newCoupon);
            
            if (response.data.success) {
                showStatus('Coupon created successfully!', 'success');
                setNewCoupon({
                    nameOfUser: '',
                    userEmail: '',
                    code: '',
                    courseId: '',
                    courseName: '',
                    expiresInDays: 7
                });
                setAdminPassword('');
                fetchCoupons(); // Refresh the list
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Error creating coupon';
            showStatus(message, 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle coupon deletion
    const handleDeleteCoupon = async (couponId) => {
        if (!adminPassword) {
            showStatus('Please enter admin password to delete', 'error');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this coupon?')) {
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:4000/coupons/${couponId}`);
            
            if (response.data.success) {
                showStatus('Coupon deleted successfully!', 'success');
                fetchCoupons(); // Refresh the list
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Error deleting coupon';
            showStatus(message, 'error');
        }
    };

    // Copy coupon code to clipboard
    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        showStatus('Coupon code copied to clipboard!', 'success');
    };

    // Toggle coupon active status
    const handleToggleActive = async (couponId, currentStatus) => {
        try {
            const response = await axios.put(`http://localhost:4000/coupons/${couponId}`, {
                isActive: !currentStatus
            });
            
            if (response.data.success) {
                showStatus(`Coupon ${!currentStatus ? 'activated' : 'deactivated'}!`, 'success');
                fetchCoupons();
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Error updating coupon';
            showStatus(message, 'error');
        }
    };

    // Filter coupons based on search
    const filteredCoupons = coupons.filter(coupon => 
        (coupon.code && coupon.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (coupon.nameOfUser && coupon.nameOfUser.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (coupon.userEmail && coupon.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (coupon.courseName && coupon.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    // Check if coupon is expired
    const isExpired = (expiresAt) => {
        if (!expiresAt) return false;
        try {
            return new Date(expiresAt) < new Date();
        } catch (error) {
            return false;
        }
    };

    // Safe course ID display
    const getCourseIdDisplay = (courseId) => {
        if (!courseId) return 'N/A';
        if (courseId.length > 8) {
            return `ID: ${courseId.slice(-8)}`;
        }
        return `ID: ${courseId}`;
    };

    return (
        <div className="space-y-8 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-gray-800">Coupon Management</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search coupons..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Status Message */}
            {statusMessage.message && (
                <div className={`p-4 rounded-xl font-medium ${
                    statusMessage.type === 'success' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                    {statusMessage.message}
                </div>
            )}

            {/* Add New Coupon Form */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Tag className="w-6 h-6 mr-2 text-indigo-500" />
                    Create New Coupon
                </h2>
                
                <form onSubmit={handleAddCoupon} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* User Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={newCoupon.nameOfUser}
                                onChange={(e) => setNewCoupon(prev => ({ ...prev, nameOfUser: e.target.value }))}
                                className="w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter user's full name"
                            />
                        </div>

                        {/* User Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User Email *
                            </label>
                            <input
                                type="email"
                                required
                                value={newCoupon.userEmail}
                                onChange={(e) => setNewCoupon(prev => ({ ...prev, userEmail: e.target.value }))}
                                className="w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="user@example.com"
                            />
                        </div>

                        {/* Course ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course ID *
                            </label>
                            <input
                                type="text"
                                required
                                value={newCoupon.courseId}
                                onChange={(e) => setNewCoupon(prev => ({ ...prev, courseId: e.target.value }))}
                                className="w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Course MongoDB ID"
                            />
                        </div>

                        {/* Course Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={newCoupon.courseName}
                                onChange={(e) => setNewCoupon(prev => ({ ...prev, courseName: e.target.value }))}
                                className="w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Digital Marketing Mastery"
                            />
                        </div>

                        {/* Coupon Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Coupon Code *
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    required
                                    value={newCoupon.code}
                                    onChange={(e) => setNewCoupon(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                                    className="flex-1 border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="WELCOME123"
                                />
                                <button
                                    type="button"
                                    onClick={generateCouponCode}
                                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>

                        {/* Expiry Days */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Valid For (Days) *
                            </label>
                            <select
                                required
                                value={newCoupon.expiresInDays}
                                onChange={(e) => setNewCoupon(prev => ({ ...prev, expiresInDays: parseInt(e.target.value) }))}
                                className="w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value={1}>1 Day</option>
                                <option value={3}>3 Days</option>
                                <option value={7}>7 Days</option>
                                <option value={15}>15 Days</option>
                                <option value={30}>30 Days</option>
                                <option value={90}>90 Days</option>
                            </select>
                        </div>
                    </div>

                    {/* Admin Password */}
                    <div className="border-t pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Key className="w-4 h-4 mr-2" />
                            Admin Password *
                        </label>
                        <input
                            type="password"
                            required
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="w-full max-w-md border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter admin password for security"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Tag className="w-5 h-5 mr-2" />
                            {loading ? 'Creating Coupon...' : 'Create Coupon'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Current Coupons Table */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Current Coupons ({filteredCoupons.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        Total: {coupons.length} | Active: {coupons.filter(c => c.isActive).length} | Used: {coupons.filter(c => c.used).length}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-2 text-gray-500">Loading coupons...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Expiry
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCoupons.map((coupon) => (
                                    <tr key={coupon.id || coupon._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-mono font-bold text-indigo-700 text-sm">
                                                {coupon.code || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {coupon.nameOfUser || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {coupon.userEmail || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                                {coupon.courseName || 'N/A'}
                                            </div>
                                            <div className="text-xs text-gray-500 font-mono">
                                                {getCourseIdDisplay(coupon.courseId)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    coupon.isActive 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {coupon.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    coupon.used 
                                                        ? 'bg-blue-100 text-blue-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {coupon.used ? 'Used' : 'Unused'}
                                                </span>
                                                {isExpired(coupon.expiresAt) && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                        Expired
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(coupon.expiresAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <button 
                                                onClick={() => handleCopyCode(coupon.code)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                                                title="Copy Code"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleToggleActive(coupon.id || coupon._id, coupon.isActive)}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    coupon.isActive 
                                                        ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-50' 
                                                        : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                                                }`}
                                                title={coupon.isActive ? 'Deactivate' : 'Activate'}
                                            >
                                                {coupon.isActive ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteCoupon(coupon.id || coupon._id)}
                                                className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                                                title="Delete Coupon"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {filteredCoupons.length === 0 && (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No coupons found</p>
                                <p className="text-gray-400 text-sm mt-2">
                                    {searchTerm ? 'Try adjusting your search terms' : 'Create your first coupon above'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CouponManageView;