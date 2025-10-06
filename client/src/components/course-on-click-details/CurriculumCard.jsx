import React,{useState} from 'react'
import {StarIcon,ChevronDown} from '../../Icons';
function CurriculumCard() {
    const CURRICULUM_SECTIONS = [
        { 
            number: 1, 
            title: 'Introduction to Web Development', 
            topics: ['How the Web Works', 'Setting up Your Development Environment', 'Basic HTML Structure'] 
        },
        { 
            number: 2, 
            title: 'Frontend Development', 
            topics: ['Advanced CSS (Flexbox & Grid)', 'Responsive Design', 'Introduction to React'] 
        },
        { 
            number: 3, 
            title: 'Backend Development', 
            topics: ['Node.js and Express', 'REST APIs', 'Database Integration (MongoDB)'] 
        },
        { 
            number: 4, 
            title: 'Git, GitHub, and Version Control', 
            topics: ['Basic Git Commands', 'Branching and Merging', 'Collaboration on GitHub'] 
        },
        { 
            number: 5, 
            title: 'Authentication and Security', 
            topics: ['OAuth', 'JWT (JSON Web Tokens)', 'Input Validation'] 
        },
        { 
            number: 6, 
            title: 'Building Applications using React.js', 
            topics: ['State Management with Hooks', 'Routing in React', 'Deployment'] 
        },
        { 
            number: 7, 
            title: 'Web3 Decentralized App Development and Deployment', 
            topics: ['Introduction to Blockchain', 'Smart Contracts', 'Connecting to the Wallet'] 
        },
    ];

    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (number) => {
        setOpenSection(openSection === number ? null : number);
    };

    return (
        <div className="mt-2 p-6">
       
            
            <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-8  bg-white rounded-xl shadow-lg border border-gray-100">
                
                {/* Left Side: Course Overview Card */}
                <div className="lg:col-span-1 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className='text-xl font-bold text-gray-800 mb-4'>Course 1</h3>
                    <div className="relative w-full h-auto mb-4">
                        <img 
                            src="https://placehold.co/400x250/503d98/ffffff?text=Course+Image" 
                            alt="Course Thumbnail" 
                            className="w-full rounded-lg shadow-md"
                        />
                        <div className='absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-bl-lg'>
                            Bestseller
                        </div>
                    </div>

                    <h4 className="text-lg font-bold text-purple-700 mb-1">
                        JavaScript, React, & Node.js
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                        The Complete Full-Stack Web Development Bootcamp
                    </p>

                    <p className="text-xs text-gray-500 mb-4">
                        Become a Full-Stack Web Developer with just ONE course. HTML, CSS, JavaScript, Node, React...
                    </p>
                    
                    {/* Instructor & Stats */}
                    <div className='border-t pt-4 space-y-2'>
                        <div className='flex items-center text-sm font-semibold text-gray-700'>
                             <img 
                                src="https://placehold.co/30x30/f0ab00/ffffff?text=RW" 
                                alt="Instructor" 
                                className="w-6 h-6 rounded-full mr-2"
                            />
                           Mr. Rizwin
                        </div>
                        <div className="flex items-center text-xs text-gray-600 space-x-3">
                            <span className='flex items-center'>
                                <StarIcon className="w-3 h-3 text-yellow-500 mr-1" /> 4.7
                            </span>
                            <span>(663,304 ratings)</span>
                            <span>61.5 total hours</span>
                           
                        </div>
                        <p className="text-xs font-semibold text-gray-700 mt-2">
                            ₹3,109
                        </p>
                    </div>
                </div>

                {/* Right Side: Content Covered (Accordion) */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h4 className="text-xl font-bold text-gray-800">Content Covered</h4>
                        <button 
                            className="text-sm font-semibold text-purple-700 hover:text-purple-900 transition duration-150"
                            onClick={() => setOpenSection(openSection === null ? -1 : null)} // Toggle all open/close
                        >
                            {openSection !== null ? 'Collapse all' : 'Expand all'}
                        </button>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {CURRICULUM_SECTIONS.map((section) => (
                            <div key={section.number}>
                                <button
                                    className="flex justify-between items-center w-full py-4 text-left group transition duration-150 ease-in-out"
                                    onClick={() => toggleSection(section.number)}
                                    aria-expanded={openSection === section.number}
                                >
                                    <span className="text-base font-semibold text-gray-900 group-hover:text-purple-700 transition duration-150">
                                        <span className='mr-3 text-gray-500 font-normal'>{String(section.number).padStart(2, '0')}</span>
                                        {section.title}
                                    </span>
                                    <ChevronDown 
                                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openSection === section.number ? 'rotate-180 text-purple-600' : ''}`}
                                    />
                                </button>
                                
                                {/* Accordion Content */}
                                <div 
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openSection === section.number ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'}`}
                                >
                                    <ul className="pl-12 space-y-1 text-sm text-gray-600 pb-2">
                                        {section.topics.map((topic, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurriculumCard