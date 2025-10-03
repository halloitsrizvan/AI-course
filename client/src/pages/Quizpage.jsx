import React,{useState} from 'react'
import Quiz from '../components/course/Quiz';

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
function Quizpage() {
    
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 font-sans antialiased ">
      
      {/* Sidebar */}
      {/* <QuizSidebar course={course} navItems={navItems} currentView="quiz" /> */}

      {/* Main Content Area - Pushed over by the fixed sidebar */}
      <main className="flex-grow flex flex-col overflow-y-auto  p-6 sm:p-10">
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10">
          Final Course Assessment
        </h1>

        {/* Quiz Questions List */}
        <div className="space-y-6">
          {quizQuestions.map((question, index) => (
            <Quiz
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
  )
}

export default Quizpage