import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import {BookOpen,UploadCloud,Users,LayoutDashboard,Tag,LogOut,Search,} from "lucide-react";
import DashboardView from "./componenets/DashboardView";
import CoursesView from "./componenets/CoursesView";
import UsersView from "./componenets/UsersView";
import CourseForm from "./componenets/CourseForm";
import CouponManageView from "./pages/CouponManageView";
import axios from "axios";
import CourseDetailed from "./componenets/CourseDetailed";


// Example mock data

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:4000/courses`)
    .then(response=>{
      setCourses(response.data)
    })
    .catch(error=>{
      alert('There was an error fetching the courses!',error)
    })
  },[])

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
  const totalCourses = courses.length;
  const totalEnrollments = "Not Set"
  
  // Reusable Nav Item Component
  const NavItem = ({ icon: Icon, title, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 p-3 rounded-xl transition-colors w-full text-left ${
          isActive
            ? "bg-indigo-700 text-white"
            : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{title}</span>
    </NavLink>
  )
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-full bg-indigo-600 text-white shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <LayoutDashboard className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out
            w-64 bg-indigo-800 p-6 flex flex-col justify-between z-30 shadow-2xl md:shadow-none`}
        >
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              <span className="text-indigo-300">AI</span> Course Admin
            </h1>

            {/* Navigation */}
            <nav className="space-y-2">
              <NavItem icon={LayoutDashboard} title="Dashboard" to="/dashboard" />
              <NavItem icon={BookOpen} title="Course List" to="/courses" />
              <NavItem icon={Tag} title="Coupon Manage" to="/coupon" />
              <NavItem icon={UploadCloud} title="Add Course" to="/add-course" />
              <NavItem icon={Users} title="Users Manage" to="/users" />
            </nav>
          </div>

          {/* Logout Button */}
          <button
            className="flex items-center space-x-3 p-3 rounded-xl transition-colors w-full text-left text-indigo-200 hover:bg-red-700 hover:text-white"
            onClick={() => console.log("Logged out")}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-4 sm:p-8 pt-20 md:pt-8 overflow-y-auto">
          {/* Top Bar */}
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
              <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                A
              </div>
            </div>
          </header>

          {/* Routes */}
          <Routes>
            <Route
              path="/dashboard"
              element={
                <DashboardView
                  courses={courses}
                  users={mockUsers}
                  totalEnrollments={totalEnrollments}
                />
              }
            />
            <Route
              path="/courses"
              element={<CoursesView courses={courses} />}
            />
            <Route
              path="/courses-view/:id"
              element={<CourseDetailed courses={courses} />}
            />
            <Route
              path="/add-course"
              element={<CourseForm setActiveView={() => {}} />}
            />
            <Route path="/users" element={<UsersView users={mockUsers} />} />
            <Route path="/coupon" element={<CouponManageView />} />
            {/* Default Redirect */}
            <Route
              path="*"
              element={
                <DashboardView
                  courses={courses}
                  users={mockUsers}
                  totalEnrollments={totalEnrollments}
                />
              }
            />
          </Routes>
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
