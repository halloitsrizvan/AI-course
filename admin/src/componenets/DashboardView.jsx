import React from 'react'
import StatCard from './StatCard';
import { LayoutDashboard, Users, BookOpen, UploadCloud, LogOut, Search, Clock, Zap, MessageCircle, Copy, Trash2, Key, Tag } from 'lucide-react';


  
  

function DashboardView({ courses, users, totalEnrollments }) {
    const bestCourses = [...courses].sort((a, b) => b.students - a.students).slice(0, 5);
    const totalCourses =courses.length;
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
}

export default DashboardView