import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, BookOpen, UploadCloud, LogOut, Search, Clock, Zap, MessageCircle, Copy, Trash2, Key, Tag } from 'lucide-react';

// --- MOCK DATA ---
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


// --- UTILITY COMPONENTS ---

const NavItem = ({ icon: Icon, title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-xl transition-colors w-full text-left
      ${isActive
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{title}</span>
  </button>
);

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between">
    <div className={`p-3 rounded-full ${color} w-fit mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
    <h2 className="text-3xl font-bold text-gray-900 mt-1">{value}</h2>
  </div>
);

// Utility function to copy text to clipboard safely in an iframe environment
const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

// --- VIEW COMPONENTS ---

const DashboardView = ({ courses, users, totalEnrollments }) => {
  // Simple Bar Chart data based on student enrollment
  const bestCourses = [...courses].sort((a, b) => b.students - a.students).slice(0, 5);
  const maxStudents = bestCourses[0]?.students || 1;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>

      {/* 1. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={BookOpen} title="Total Courses" value={totalCourses} color="bg-blue-500" />
        <StatCard icon={Users} title="Total Users" value={users.length} color="bg-green-500" />
        <StatCard icon={Zap} title="Total Enrollments" value={totalEnrollments.toLocaleString()} color="bg-red-500" />
      </div>

      {/* 2. Best Courses / Enrollment Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Top 5 Courses by Enrollment</h2>
        
        {/* Chart Container: Flex, items-end to align bars to the bottom */}
        <div className="h-64 flex items-end justify-between space-x-2 p-2">
          {bestCourses.map((course, index) => (
            <div key={course.id} className="flex flex-col items-center justify-end h-full w-1/5 max-w-20 group">
              
              {/* Bar element */}
              <div
                className="w-full bg-indigo-500 rounded-t-lg transition-all duration-300 hover:bg-indigo-600 relative shadow-md"
                // Ensure bars start from the bottom and have a min height of 10%
                style={{ height: `${(course.students / maxStudents) * 90 + 10}%` }}
              >
                {/* Data Label (Tooltip style on hover) */}
                <div className="absolute -top-6 w-full text-center text-xs font-bold text-indigo-700 bg-indigo-100 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {course.students} students
                </div>
              </div>
              
              {/* Course Title/Label at the bottom */}
              <p className="mt-3 text-xs sm:text-sm text-center font-medium text-gray-600 w-full whitespace-nowrap overflow-hidden overflow-ellipsis" title={course.title}>
                {course.title.split(' ')[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 3. Quick Overview: Course Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Status Overview</h2>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                        <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-medium text-gray-700">Active Courses</span>
                    </div>
                    <span className="text-lg font-bold text-blue-700">{courses.filter(c => c.status === 'Active').length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 text-yellow-600 mr-3" />
                        <span className="font-medium text-gray-700">Archived Courses</span>
                    </div>
                    <span className="text-lg font-bold text-yellow-700">{courses.filter(c => c.status === 'Archived').length}</span>
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Activity Snapshot</h2>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                        <Users className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-medium text-gray-700">New Users (Last 30 Days)</span>
                    </div>
                    <span className="text-lg font-bold text-green-700">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center">
                        <MessageCircle className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="font-medium text-gray-700">Pending Support Tickets</span>
                    </div>
                    <span className="text-lg font-bold text-purple-700">4</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => (
    <div className="bg-white p-5 rounded-xl shadow-md transition-shadow hover:shadow-lg border border-gray-100">
        <div className="w-full h-24 bg-red-100 rounded-lg mb-3">
            {/* Placeholder for Course Thumbnail */}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
            <span className="font-bold text-yellow-600">{course.rating} ★</span> ({course.students.toLocaleString()} students)
        </p>
        <div className="mt-3 flex justify-between items-center">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {course.status}
            </span>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Edit
            </button>
        </div>
    </div>
);

const CoursesView = ({ courses, setActiveView }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-800">All Courses ({courses.length})</h1>
            <button
                onClick={() => setActiveView('add-course')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-colors flex items-center space-x-2"
            >
                <UploadCloud className="w-5 h-5" />
                <span>Add Course</span>
            </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    </div>
);

const UsersView = ({ users }) => (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-800">User Management ({users.length})</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">
                User ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrolled
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-indigo-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.coursesEnrolled}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);

const CourseForm = ({ setActiveView }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        category: 'AI',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Course Data Submitted:', formData);
        
        // Use console.log instead of alert
        console.log("Course '"+formData.title+"' submitted! Check console for data.");
        setFormData({ title: '', description: '', duration: '', category: 'AI', price: '' });
        setActiveView('courses');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-800">Upload New Course</h1>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Course Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., Advanced Prompt Engineering"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Course Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows="4"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="A concise summary of what students will learn."
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (Hours)</label>
                            <input
                                type="number"
                                name="duration"
                                id="duration"
                                required
                                value={formData.duration}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                id="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option>AI</option>
                                <option>Web Dev</option>
                                <option>Design</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setActiveView('courses')}
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            <UploadCloud className="w-5 h-5 mr-2" />
                            Publish Course
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- NEW COUPON MANAGEMENT VIEW ---
const CouponManageView = () => {
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
};


// --- MAIN APP COMPONENT ---

const App = () => {
  // Set default active view to 'coupon' so the user can immediately test the new feature
  const [activeView, setActiveView] = useState('coupon'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView courses={mockCourses} users={mockUsers} totalEnrollments={totalEnrollments} />;
      case 'courses':
        return <CoursesView courses={mockCourses} setActiveView={setActiveView} />;
      case 'users':
        return <UsersView users={mockUsers} />;
      case 'add-course':
        return <CourseForm setActiveView={setActiveView} />;
      case 'coupon': // New Coupon View
        return <CouponManageView />;
      default:
        return <DashboardView courses={mockCourses} users={mockUsers} totalEnrollments={totalEnrollments} />;
    }
  };

  return (
    // Updated font to 'Roboto' for a more professional, "awesome" look.
    <div className="min-h-screen bg-gray-50 flex ">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-full bg-indigo-600 text-white shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <LayoutDashboard className="w-6 h-6" />
      </button>

      {/* Sidebar - Desktop and Mobile */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-indigo-800 p-6 flex flex-col justify-between z-30 shadow-2xl md:shadow-none`}
        onClick={() => setIsSidebarOpen(false)} // Close on click on mobile
      >
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            <span className="text-indigo-300">AI</span> Course Admin
          </h1>

          {/* Navigation */}
          <nav className="space-y-2">
            <NavItem
              icon={LayoutDashboard}
              title="Dashboard"
              isActive={activeView === 'dashboard'}
              onClick={() => setActiveView('dashboard')}
            />
            <NavItem
              icon={BookOpen}
              title="Course List"
              isActive={activeView === 'courses'}
              onClick={() => setActiveView('courses')}
            />
            {/* Coupon Nav Item */}
            <NavItem
              icon={Tag}
              title="Coupon Manage"
              isActive={activeView === 'coupon'}
              onClick={() => setActiveView('coupon')}
            />
            <NavItem
              icon={UploadCloud}
              title="Add Course"
              isActive={activeView === 'add-course'}
              onClick={() => setActiveView('add-course')}
            />
            <NavItem
              icon={Users}
              title="Users Manage"
              isActive={activeView === 'users'}
              onClick={() => setActiveView('users')}
            />
          </nav>
        </div>

        {/* Logout Button */}
        <button
          className="flex items-center space-x-3 p-3 rounded-xl transition-colors w-full text-left text-indigo-200 hover:bg-red-700 hover:text-white"
          onClick={() => console.log('Logged out')}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 p-4 sm:p-8 pt-20 md:pt-8 overflow-y-auto">
        {/* Top Bar for Desktop (Search/User Info, if needed) */}
        <header className="hidden md:flex justify-between items-center mb-8">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, users, or reports..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700 font-medium">Admin User</div>
            <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">A</div>
          </div>
        </header>

        {/* Content View */}
        {renderView()}
      </div>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
