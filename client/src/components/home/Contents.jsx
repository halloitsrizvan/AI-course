import React, { useEffect, useState } from 'react'
import CourseCard from '../course details/CourseCard';
import axios from 'axios';

function Contents() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/courses').then((res) => {
      setCourses(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4" style={{ marginTop: '-6rem' }}>
        <div className="text-center py-8">Loading courses...</div>
      </div>
    );
  }

  return (
    <div id="contents-section" className="max-w-7xl mx-auto px-4" style={{ marginTop: '-6rem' }}>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Ready to reimagine your career?
        </h2>
        <p className="text-lg text-gray-900 mt-2">
          Get the skills and real-world experience employers want with Career Accelerators.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={course._id || index} {...course} />
        ))}
      </div>
    </div>
  );
}

export default Contents;