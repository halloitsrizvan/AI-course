import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { 
    Calendar, 
    Clock, 
    Users, 
    BookOpen, 
    Target,
    Star,
    FileText,
    PlayCircle,
    BarChart3,
    Award,
    Zap,
    Eye,
    IdCard
} from 'lucide-react';

function CourseDetailed({ courses }) {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const selectedCourse = courses.find(c => c._id === id);
        setCourseDetails(selectedCourse);
        setLoading(false);
    }, [id, courses]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading course details...</p>
                </div>
            </div>
        );
    }

    if (!courseDetails) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
                    <p className="text-gray-600">The requested course could not be found.</p>
                </div>
            </div>
        );
    }

    const {
        title,
        description,
        exercises,
        titleOfCreator,
        enrollment,
        price,
        imageUrl,
        imageUrl2,
        createdBy,
        totalLength,
        section,
        published,
        whatYoullLearn,
        skillsThatMatter,
        curriculumCard,
        course,
        quizQuestions,
        createdAt,
        updatedAt
    } = courseDetails;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Course Image */}
                        <div className="flex-shrink-0">
                            <img 
                                src={imageUrl || imageUrl2} 
                                alt={title}
                                className="w-48 h-32 object-cover rounded-xl shadow-md"
                            />
                        </div>
                        
                        {/* Course Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                                    <p className="text-lg text-gray-600 mb-4">{description}</p>
                                    
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                            <Zap className="w-4 h-4 mr-1" />
                                            {section}
                                        </span>
                                        <span className={`flex items-center px-3 py-1 rounded-full ${
                                            published 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            <Eye className="w-4 h-4 mr-1" />
                                            {published ? 'Published' : 'Draft'}
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            Created: {formatDate(createdAt)}
                                        </span>
                                        <span className="flex items-center">
                                            <IdCard className="w-4 h-4 mr-1" />
                                            ID: {id}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">₹{price}</p>
                                    <p className="text-sm text-gray-500">Course Price</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {['overview', 'curriculum', 'lessons', 'quiz', 'stats'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                                    activeTab === tab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.replace('_', ' ')}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Instructor & Course Info */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Course Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Instructor Details</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Instructor</span>
                                                    <span className="font-medium">{createdBy}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Title</span>
                                                    <span className="font-medium">{titleOfCreator}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Course Stats</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Enrollment</span>
                                                    <span className="font-medium flex items-center">
                                                        <Users className="w-4 h-4 mr-1" />
                                                        {enrollment?.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Duration</span>
                                                    <span className="font-medium flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {totalLength}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Exercises</span>
                                                    <span className="font-medium">{exercises}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* What You'll Learn */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <Target className="w-6 h-6 mr-2 text-indigo-500" />
                                        What You'll Learn
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {whatYoullLearn?.map((item) => (
                                            <div key={item._id} className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                                                    {item.number}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <Star className="w-6 h-6 mr-2 text-yellow-500" />
                                        Skills You'll Gain
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsThatMatter?.map((skill) => (
                                            <span
                                                key={skill._id}
                                                className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Curriculum Tab */}
                        {activeTab === 'curriculum' && (
                            <div className="bg-white rounded-xl shadow-sm border">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                        <BookOpen className="w-6 h-6 mr-2 text-indigo-500" />
                                        Course Curriculum
                                    </h2>
                                    <p className="text-gray-600 mt-2">
                                        {curriculumCard?.length || 0} modules • {course?.length || 0} lessons • {totalLength}
                                    </p>
                                </div>
                                <div className="divide-y">
                                    {curriculumCard?.map((module) => (
                                        <div key={module._id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                                                    {module.number}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 text-lg">
                                                        {module.title}
                                                    </h3>
                                                    <div className="mt-3">
                                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {module.topics?.map((topic, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                                                >
                                                                    {topic}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Lessons Tab */}
                        {activeTab === 'lessons' && (
                            <div className="bg-white rounded-xl shadow-sm border">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                        <PlayCircle className="w-6 h-6 mr-2 text-green-500" />
                                        Course Lessons
                                    </h2>
                                    <p className="text-gray-600 mt-2">
                                        {course?.length || 0} video lessons • {totalLength}
                                    </p>
                                </div>
                                <div className="divide-y">
                                    {course?.map((part) => (
                                        <div key={part._id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                                                    {part.part}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {part.lessons?.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {part.lessons?.description}
                                                    </p>
                                                    {part.lessons?.keyNotes && (
                                                        <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                                                            <p className="text-sm text-yellow-800">
                                                                <strong>Key Notes:</strong> {part.lessons.keyNotes}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                                                        <span className="flex items-center">
                                                            <PlayCircle className="w-4 h-4 mr-1" />
                                                            Video: {part.lessons?.videoId ? 'Available' : 'Not set'}
                                                        </span>
                                                        {part.lessons?.videoId && (
                                                            <a 
                                                                href={`https://www.youtube.com/watch?v=${part.lessons.videoId}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800"
                                                            >
                                                                Watch Preview
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quiz Tab */}
                        {activeTab === 'quiz' && (
                            <div className="space-y-8">
                                {/* Quiz Overview */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <FileText className="w-6 h-6 mr-2 text-purple-500" />
                                        Course Quiz
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">
                                                {quizQuestions?.length || 0}
                                            </div>
                                            <p className="text-purple-700 text-sm">Total Questions</p>
                                        </div>
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {Math.ceil((quizQuestions?.length || 0) * 0.6)}
                                            </div>
                                            <p className="text-blue-700 text-sm">Passing Score</p>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">
                                                60%
                                            </div>
                                            <p className="text-green-700 text-sm">Pass Percentage</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quiz Questions */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Questions</h3>
                                    <div className="space-y-6">
                                        {quizQuestions?.map((question, index) => (
                                            <div key={question._id} className="border rounded-lg p-4">
                                                <div className="flex items-start space-x-3 mb-3">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                                                        {index + 1}
                                                    </span>
                                                    <h4 className="font-medium text-gray-900">{question.question}</h4>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-9">
                                                    {question.options?.map((option, optIndex) => (
                                                        <div 
                                                            key={optIndex}
                                                            className={`p-2 rounded border ${
                                                                option === question.correctAnswer
                                                                    ? 'bg-green-50 border-green-200 text-green-800'
                                                                    : 'bg-gray-50 border-gray-200 text-gray-700'
                                                            }`}
                                                        >
                                                            {option}
                                                            {option === question.correctAnswer && (
                                                                <span className="ml-2 text-green-600 text-sm">✓ Correct</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Stats Tab */}
                        {activeTab === 'stats' && (
                            <div className="space-y-8">
                                {/* Course Statistics */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
                                        Course Statistics
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {enrollment?.toLocaleString()}
                                            </div>
                                            <p className="text-blue-700 text-sm">Total Enrollment</p>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">
                                                {course?.length || 0}
                                            </div>
                                            <p className="text-green-700 text-sm">Total Lessons</p>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">
                                                {quizQuestions?.length || 0}
                                            </div>
                                            <p className="text-purple-700 text-sm">Quiz Questions</p>
                                        </div>
                                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                                            <div className="text-2xl font-bold text-orange-600">
                                                ₹{(enrollment * price)?.toLocaleString()}
                                            </div>
                                            <p className="text-orange-700 text-sm">Total Revenue</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Metadata */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Metadata</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Course ID</span>
                                                <span className="font-mono text-sm text-gray-900">{id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Status</span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    published 
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Category</span>
                                                <span className="font-medium">{section}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Created</span>
                                                <span className="text-sm text-gray-900">{formatDate(createdAt)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Last Updated</span>
                                                <span className="text-sm text-gray-900">{formatDate(updatedAt)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Instructor</span>
                                                <span className="font-medium">{createdBy}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                                    Edit Course
                                </button>
                                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                    View Analytics
                                </button>
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                    Manage Students
                                </button>
                            </div>
                        </div>

                        {/* Course Summary */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Course Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Price</span>
                                    <span className="text-lg font-bold text-gray-900">₹{price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Enrollment</span>
                                    <span className="font-medium">{enrollment?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-medium">{totalLength}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Lessons</span>
                                    <span className="font-medium">{course?.length || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Quiz Questions</span>
                                    <span className="font-medium">{quizQuestions?.length || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Instructor Card */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Instructor</h3>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{createdBy}</div>
                                    <div className="text-sm text-gray-600">{titleOfCreator}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetailed;