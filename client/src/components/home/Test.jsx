import React, { useState } from 'react';
import { CheckCircle, Lock, Menu } from 'lucide-react';

// --- MOCK DATA ---

const course = {
  title: 'Full Stack Web Accelerator',
  progress: 75,
};

// Mock structure for the course parts/navigation
const navItems = [
  { id: 'intro', title: 'Introduction', completed: true, type: 'lesson' },
  { id: 'part1', title: 'Part 01', completed: true, type: 'lesson' },
  { id: 'part2', title: 'Part 02', completed: true, type: 'lesson' },
  { id: 'part3', title: 'Part 03', completed: true, type: 'lesson' },
  { id: 'quiz', title: 'Quiz', completed: false, type: 'quiz' },
  { id: 'cert', title: 'Certificate', completed: false, type: 'locked' },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the full form of JSON?',
    options: [
      'Java Script On Note',
      'Java Script Object Notation',
      'Java Script On Notation',
      'Java Script Off Note',
    ],
    correctAnswer: 'Java Script Object Notation', // Mocked correct answer
  },
  {
    id: 2,
    question: 'Which company developed React JS?',
    options: [
      'Google',
      'Amazon',
      'Meta (Facebook)',
      'Microsoft',
    ],
    correctAnswer: 'Meta (Facebook)',
  },
  {
    id: 3,
    question: 'What command is used to start a React development server?',
    options: [
      'npm build',
      'npm start',
      'npm create-app',
      'npm deploy',
    ],
    correctAnswer: 'npm start',
  },
];

// --- COMPONENTS ---

// 1. Sidebar Component (Reused from Course Page)
const QuizSidebar = ({ course, navItems, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-full bg-purple-700 text-white shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div 
        className={`w-full lg:w-80 flex-shrink-0 bg-black text-white p-4 overflow-y-auto z-10 
          lg:fixed lg:top-0 lg:left-0 lg:h-screen shadow-xl transform transition-transform duration-300
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed h-full`}
      >
        <div className="mb-8 pt-10 lg:pt-0">
          <h1 className="text-xl font-bold text-gray-100">BROTOTYPE</h1>
          <p className="text-xs text-purple-400 mb-4">BROTHER YOU NEVER HAD</p>
          <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-700 rounded-full mb-2">
            <div 
              className="h-full bg-purple-500 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400">{course.progress}% Complete</p>
        </div>

        {/* Navigation List */}
        <nav>
          {navItems.map((item) => {
            const isCurrent = item.id === currentView;
            
            return (
              <div
                key={item.id}
                // Mock click handler: in a real app, this would change the view
                className={`flex items-center p-3 my-1 rounded-lg transition duration-200 
                  ${isCurrent 
                    ? 'bg-purple-700 text-white font-semibold shadow-lg' 
                    : item.type === 'locked' 
                      ? 'text-gray-500 cursor-not-allowed' 
                      : 'hover:bg-gray-800 text-gray-300 cursor-pointer'
                  }`}
              >
                <span className="text-sm flex-grow">
                  {item.title}
                </span>
                {item.type === 'lesson' && item.completed && (
                  <CheckCircle className="w-5 h-5 text-green-400 ml-3" />
                )}
                {(item.type === 'quiz' || item.type === 'locked') && !item.completed && (
                  <Lock className="w-4 h-4 text-gray-500 ml-3" />
                )}
              </div>
            );
          })}
        </nav>
      </div>
      {/* Overlay to close menu on mobile */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-5 transition-opacity lg:hidden" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

// 2. Quiz Question Component
const QuizQuestion = ({ question, index, selectedAnswer, handleAnswerChange, isSubmitted }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Q {index + 1}: {question.question}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedAnswer === option;
          // Mock coloring for feedback (for demo purposes)
          const feedbackClass = isSubmitted 
            ? option === question.correctAnswer 
              ? 'border-green-500 ring-2 ring-green-500 text-green-700 font-bold bg-green-50' 
              : isSelected 
                ? 'border-red-500 ring-2 ring-red-500 text-red-700 bg-red-50'
                : 'border-gray-200 hover:bg-gray-50'
            : isSelected 
              ? 'border-purple-600 ring-2 ring-purple-600 bg-purple-50 text-purple-700 font-semibold'
              : 'border-gray-200 hover:bg-gray-50';

          return (
            <label
              key={optionIndex}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition duration-150 ${feedbackClass}`}
              htmlFor={`q${question.id}-option${optionIndex}`}
            >
              <input
                type="radio"
                id={`q${question.id}-option${optionIndex}`}
                name={`question-${question.id}`}
                value={option}
                checked={isSelected}
                onChange={() => handleAnswerChange(question.id, option)}
                className="hidden" // Hide the default radio button
                disabled={isSubmitted}
              />
              <span className={`w-5 h-5 border-2 rounded-full mr-3 flex-shrink-0 flex items-center justify-center transition duration-150
                ${isSelected && !isSubmitted ? 'border-purple-700 bg-purple-700' : 'border-gray-400'}
                ${isSubmitted && option === question.correctAnswer ? 'border-green-500 bg-green-500' : ''}
                ${isSubmitted && isSelected && option !== question.correctAnswer ? 'border-red-500 bg-red-500' : ''}
              `}>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </span>
              <span className="text-base text-gray-800">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// Main Quiz Page Component
function QuizPage() {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Updates the answer for a specific question
  const handleAnswerChange = (questionId, answer) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: answer,
      }));
    }
  };

  // Calculates and submits the score
  const handleSubmit = () => {
    if (isSubmitted) return; // Prevent double submission

    let correctCount = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setIsSubmitted(true);
  };
  
  // Check if all questions have been answered
  const allAnswered = Object.keys(userAnswers).length === quizQuestions.length;
  const totalQuestions = quizQuestions.length;
  const passPercentage = 0.6; // 60% required to pass

  return (
    // Added 'lg:ml-80' margin to the main content to account for the fixed sidebar width (w-80)
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 font-sans antialiased">
      
      {/* Sidebar */}
      <QuizSidebar course={course} navItems={navItems} currentView="quiz" />

      {/* Main Content Area - Pushed over by the fixed sidebar */}
      <main className="flex-grow flex flex-col overflow-y-auto lg:ml-80 p-6 sm:p-10">
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10">
          Final Course Assessment
        </h1>

        {/* Quiz Questions List */}
        <div className="space-y-6">
          {quizQuestions.map((question, index) => (
            <QuizQuestion
              key={question.id}
              question={question}
              index={index}
              selectedAnswer={userAnswers[question.id]}
              handleAnswerChange={handleAnswerChange}
              isSubmitted={isSubmitted}
            />
          ))}
        </div>

        {/* Submission and Results Footer */}
        <div className="mt-10 p-6 bg-white rounded-xl shadow-2xl sticky bottom-0 border-t border-gray-100">
          {isSubmitted ? (
            // Results Display
            <div className="text-center">
              <h3 className={`text-3xl font-bold ${score / totalQuestions >= passPercentage ? 'text-green-600' : 'text-red-600'} mb-2`}>
                {score / totalQuestions >= passPercentage ? 'Congratulations! You Passed!' : 'Quiz Failed. Try Again!'}
              </h3>
              <p className="text-xl text-gray-700 mb-4">
                Your Score: <span className="font-extrabold">{score}/{totalQuestions}</span>
              </p>
              <button
                onClick={() => {
                  if (score / totalQuestions < passPercentage) {
                    setIsSubmitted(false);
                    setUserAnswers({}); // Reset quiz state
                    setScore(0);
                  } else {
                    alert('Moving to certificate section!');
                    // Mock navigation to certificate page
                  }
                }}
                className={`px-8 py-3 font-bold rounded-xl text-white transition duration-200 shadow-lg text-lg ${score / totalQuestions >= passPercentage ? 'bg-purple-700 hover:bg-purple-800' : 'bg-red-500 hover:bg-red-600'}`}
              >
                {score / totalQuestions >= passPercentage ? 'View Certificate' : 'Retake Quiz'}
              </button>
            </div>
          ) : (
            // Submission Button
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-600">
                Questions Answered: {Object.keys(userAnswers).length} / {totalQuestions}
              </p>
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`px-8 py-4 font-bold rounded-xl text-white transition duration-200 shadow-lg text-xl ${
                  allAnswered ? 'bg-purple-700 hover:bg-purple-800' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Answers
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Since this is a new page, we export it as App
const App = () => <QuizPage />;
export default App;
