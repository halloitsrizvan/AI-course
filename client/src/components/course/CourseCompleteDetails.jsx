import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { 
    Calendar, 
    Clock, 
    Users, 
    Award, 
    BookOpen, 
    CheckCircle, 
    PlayCircle, 
    Lock,
    BarChart3,
    Target,
    FileText,
    Star,
    Trophy,
    User
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
        createdBy,
        totalLength,
        section,
        whatYoullLearn,
        skillsThatMatter,
        curriculumCard,
        course,
        quizResults,
        certificate,
        progress,
        userName,
        userEmail,
        status,
        couponCode,
        createdAt,
        updatedAt
    } = courseDetails;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'certified': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            case 'in progress': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPartStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'unlocked': return <PlayCircle className="w-5 h-5 text-blue-500" />;
            default: return <Lock className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                    {status?.toUpperCase() || 'NOT STARTED'}
                                </span>
                                <span className="flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    {userName}
                                </span>
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Enrolled: {formatDate(createdAt)}
                                </span>
                                {couponCode && (
                                    <span className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs">
                                        Coupon: {couponCode}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">₹{price}</p>
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
                        {['overview', 'progress', 'curriculum', 'quiz', 'certificate'].map((tab) => (
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
                                {/* Course Description */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Course Description</h2>
                                    <p className="text-gray-700 leading-relaxed">{description}</p>
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

                        {/* Progress Tab */}
                        {activeTab === 'progress' && (
                            <div className="space-y-8">
                                {/* Progress Overview */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-indigo-600">
                                                {progress?.completionPercentage || 0}%
                                            </div>
                                            <p className="text-gray-600 text-sm">Completion</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600">
                                                {progress?.completedParts || 0}/{progress?.totalParts || 0}
                                            </div>
                                            <p className="text-gray-600 text-sm">Parts Completed</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-600">
                                                {quizResults?.totalAttempts || 0}
                                            </div>
                                            <p className="text-gray-600 text-sm">Quiz Attempts</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${progress?.completionPercentage || 0}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-3 border-b">
                                            <div className="flex items-center space-x-3">
                                                <Calendar className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-700">Course Started</span>
                                            </div>
                                            <span className="text-gray-500 text-sm">
                                                {progress?.startedAt ? formatDate(progress.startedAt) : 'N/A'}
                                            </span>
                                        </div>
                                        {progress?.completedAt && (
                                            <div className="flex items-center justify-between py-3 border-b">
                                                <div className="flex items-center space-x-3">
                                                    <Award className="w-5 h-5 text-green-500" />
                                                    <span className="text-gray-700">Course Completed</span>
                                                </div>
                                                <span className="text-gray-500 text-sm">
                                                    {formatDate(progress.completedAt)}
                                                </span>
                                            </div>
                                        )}
                                        {quizResults?.lastAttempt && (
                                            <div className="flex items-center justify-between py-3 border-b">
                                                <div className="flex items-center space-x-3">
                                                    <FileText className="w-5 h-5 text-blue-500" />
                                                    <span className="text-gray-700">Last Quiz Attempt</span>
                                                </div>
                                                <span className="text-gray-500 text-sm">
                                                    {formatDate(quizResults.lastAttempt)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Curriculum Tab */}
                        {activeTab === 'curriculum' && (
                            <div className="bg-white rounded-xl shadow-sm border">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-bold text-gray-900">Course Curriculum</h2>
                                    <p className="text-gray-600 mt-2">{course?.length || 0} parts • {totalLength}</p>
                                </div>
                                <div className="divide-y">
                                    {course?.map((part) => (
                                        <div key={part._id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start space-x-4">
                                                {getPartStatusIcon(part.status)}
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">
                                                        Part {part.part}: {part.lessons?.title}
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
                                                </div>
                                                <div className="text-right">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        part.status === 'completed' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : part.status === 'unlocked'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {part.status || 'locked'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quiz Tab */}
                        {activeTab === 'quiz' && quizResults && (
                            <div className="space-y-8">
                                {/* Quiz Overview */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Quiz Performance</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {quizResults.totalAttempts}
                                            </div>
                                            <p className="text-blue-700 text-sm">Total Attempts</p>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">
                                                {quizResults.passedAttempts}
                                            </div>
                                            <p className="text-green-700 text-sm">Passed Attempts</p>
                                        </div>
                                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                            <div className="text-2xl font-bold text-yellow-600">
                                                {quizResults.bestScore}/{quizResults.attempts?.[0]?.totalQuestions || 5}
                                            </div>
                                            <p className="text-yellow-700 text-sm">Best Score</p>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">
                                                {quizResults.bestPercentage}%
                                            </div>
                                            <p className="text-purple-700 text-sm">Best Percentage</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Attempt History */}
                                <div className="bg-white rounded-xl shadow-sm border p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Attempt History</h2>
                                    <div className="space-y-4">
                                        {quizResults.attempts?.map((attempt) => (
                                            <div key={attempt._id} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <span className="font-semibold text-gray-900">
                                                            Attempt #{attempt.attemptNumber}
                                                        </span>
                                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                                            attempt.passed 
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {attempt.passed ? 'PASSED' : 'FAILED'}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-gray-900">
                                                            {attempt.score}/{attempt.totalQuestions}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {attempt.percentage}%
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Completed: {formatDate(attempt.completedAt)} • 
                                                    Time: {attempt.timeSpent}s
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Certificate Tab */}
                        {activeTab === 'certificate' && certificate && (
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                                    Certificate
                                </h2>
                                
                                {certificate.issued ? (
                                    <div className="text-center py-8">
                                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Award className="w-12 h-12 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Certificate Awarded!</h3>
                                        <p className="text-gray-600 mb-6">
                                            Congratulations! You have successfully completed the course and earned your certificate.
                                        </p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600">Certificate ID</div>
                                                <div className="font-mono text-lg font-bold text-gray-900">
                                                    {certificate.certificateId}
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600">Final Score</div>
                                                <div className="text-2xl font-bold text-green-600">
                                                    {certificate.finalScore}%
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600">Issued Date</div>
                                                <div className="font-semibold text-gray-900">
                                                    {formatDate(certificate.issuedAt)}
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600">Completion Date</div>
                                                <div className="font-semibold text-gray-900">
                                                    {formatDate(certificate.completionDate)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Certificate Yet</h3>
                                        <p className="text-gray-500">
                                            Complete all course requirements and pass the final quiz to earn your certificate.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Course Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Course Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Instructor</span>
                                    <span className="font-medium">{createdBy}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-medium flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {totalLength}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Enrollment</span>
                                    <span className="font-medium flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {enrollment?.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Category</span>
                                    <span className="font-medium">{section}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Exercises</span>
                                    <span className="font-medium">{exercises}</span>
                                </div>
                            </div>
                        </div>

                        {/* User Progress Card */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Your Progress</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Course Progress</span>
                                    <span className="font-bold text-indigo-600">
                                        {progress?.completionPercentage || 0}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${progress?.completionPercentage || 0}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{progress?.completedParts || 0} parts completed</span>
                                    <span>{progress?.totalParts || 0} total</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                        {status}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Last Activity</span>
                                    <span className="text-sm">
                                        {progress?.lastActivity ? formatDate(progress.lastActivity) : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Quiz Attempts</span>
                                    <span className="font-medium">{quizResults?.totalAttempts || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Best Score</span>
                                    <span className="font-medium">{quizResults?.bestPercentage || 0}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCom;