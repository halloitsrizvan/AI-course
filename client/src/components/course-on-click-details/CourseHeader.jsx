import React, { useEffect, useState } from 'react'
import {StarIcon, InfoIcon, DecorativeCodeIcon} from '../../Icons'
import { Star, Info, Users, Clock, BookOpen } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CourseHeader({title,description,exercises,totalLength,price,enrollment,imageUrl2,section,_id}) {
  const [checkEnrollment,setCheckEnrollment]=useState("Enroll Now");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
 useEffect(() => {
  if (!user) return; // 

  axios.get('http://localhost:4000/course-users')
    .then((res) => {
      const isEnrolled = res.data.some(
        (courseUser) => courseUser.userId === user._id && courseUser.courseId === _id
      );
      if (isEnrolled) {
        setCheckEnrollment("Go to Course");
      }
    })
    .catch((err) => {
      console.log(err);
    });

    console.log(checkEnrollment);
    
}, [user, _id]);

  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-gradient-to-br from-amber-500 to-orange-600" style={{marginTop:"-3rem"}}>
      {/* Main Card Container */}
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden mt-10">
        {/* Mobile: Image on Top */}
        <div className="block md:hidden relative min-h-[300px] bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="absolute inset-4 flex items-center justify-center">
            <img
              src={imageUrl2}
              alt={title}
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/60a5fa/ffffff?text=Course+Image';
              }}
            />
          </div>
          {/* Section Badge */}
          <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20">
            {section}
          </div>
        </div>

        <div className="md:flex">
          {/* Left Section: Course Details */}
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Stats Grid */}
            <div className="flex flex-row justify-between items-center border-b border-gray-200 pb-8 mb-8 md:grid md:grid-cols-3 md:gap-8">
            {/* Exercises Section */}
            <div className="flex flex-col items-center text-center h-full flex-1">
              {/* Icon on Top */}
              <div className="flex justify-center mb-2">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              </div>
              {/* Data in Middle */}
              <div className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
                {exercises}
              </div>
              {/* Fixed Text at Bottom */}
              <div className="mt-auto">
                <span className="text-xs md:text-sm text-gray-500">
                  practice exercises
                </span>
              </div>
            </div>
            
            {/* Duration Section */}
            <div className="flex flex-col items-center text-center h-full flex-1">
              {/* Icon on Top */}
              <div className="flex justify-center mb-2">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              </div>
              {/* Data in Middle */}
              <div className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
                {totalLength}
              </div>
              {/* Fixed Text at Bottom */}
              <div className="mt-auto">
                <span className="text-xs md:text-sm text-gray-500">
                  hours of content
                </span>
              </div>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col items-center text-center h-full flex-1">
              {/* Icon on Top */}
              <div className="flex justify-center items-center mb-2">
                <Star className="w-5 h-5 text-yellow-500" fill="#facc15" />
              </div>
              {/* Data in Middle */}
              <div className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
                4.8  
              </div>
              {/* Fixed Text at Bottom */}
              <div className="mt-auto">
                <span className="text-xs md:text-sm text-gray-500">
                  average rating
                </span>
              </div>
            </div>
          </div>

            {/* Action and Enrollment Section */}
            <div className="mt-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <button 
            onClick={() =>{
              if(!user){
                navigate('/login');
                return;
              }
              if(checkEnrollment==="Go to Course"){
                navigate(`/course/${_id}`);
              }else{

                navigate(`/payment/${_id}`)}}
              }
            className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-800 transition duration-300 transform hover:scale-[1.02] flex-1 sm:flex-none text-center"
          >
           {checkEnrollment}
          </button>
          
          {/* Price and Enrollment in one line on mobile */}
          <div className="flex items-center justify-between w-full sm:w-auto sm:block">
            {/* Price Section */}
            <div className="text-center sm:text-right">
              <span className="text-2xl font-bold text-gray-900 block">
                ₹{price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{price + 1900}
              </span>
            </div>
            
            {/* Enrollment Section - Hidden on mobile since it's now combined */}
            <div className="sm:hidden flex items-center text-sm text-gray-500 ml-4">
              <Users className="w-4 h-4 mr-2" />
              {enrollment}
            </div>
          </div>
        </div>

        {/* Enrollment Section - Show on desktop only */}
        <div className="hidden sm:flex items-center justify-center sm:justify-start text-sm text-gray-500">
          <Users className="w-4 h-4 mr-2" />
          {enrollment}
        </div>
                      
                      
              
              {/* Additional Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <Info className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Lifetime access • Certificate of completion</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Image on Right (Hidden on Mobile) */}
          <div className="hidden md:block md:w-1/2 relative min-h-[400px] md:min-h-full bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Image container with moderate padding */}
            <div className="absolute inset-8 flex items-center justify-center">
              <img
                src={imageUrl2}
                alt={title}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400/60a5fa/ffffff?text=Course+Image';
                }}
              />
            </div>
            
            {/* Section Badge */}
            <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20">
              {section}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseHeader