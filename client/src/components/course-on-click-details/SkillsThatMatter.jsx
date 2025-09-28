import React from 'react'
import { StarIcon,CheckSquare } from '../../Icons';
function SkillsThatMatter() {
    const SKILLS = [
        { name: 'Web Development', learners: '18M' },
        { name: 'JavaScript', learners: '16M' },
        { name: 'HTML', learners: '12M' },
        { name: 'CSS', learners: '9.8M' },
        { name: 'Node.js', learners: '3.5M' },
    ];
  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
            Learn the skills that matter most
        </h2>
        
        <div className="flex flex-wrap gap-4">
            {SKILLS.map((skill, index) => (
                <div key={index} className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-200 cursor-pointer shadow-sm">
                    <CheckSquare className="w-4 h-4 mr-2 text-purple-600" />
                    {skill.name} <span className="ml-2 text-xs text-gray-500">({skill.learners} learners)</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SkillsThatMatter