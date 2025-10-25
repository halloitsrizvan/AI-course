import React, { useState, useEffect } from 'react'
import Quiz from '../components/course/Quiz';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Quizpage({ quizQuestions = [] }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(Date.now());
  const { id } = useParams(); // Get courseId from URL params
  const courseId = id; // Use the id from URL as courseId

  // Start timer when component mounts
  useEffect(() => {
    setQuizStartTime(Date.now());
  }, []);

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
  const handleSubmit = async () => {
    if (isSubmitted || quizQuestions.length === 0) return;

    let correctCount = 0;
    const answers = [];

    quizQuestions.forEach(q => {
      const isCorrect = userAnswers[q._id] === q.correctAnswer;
      if (isCorrect) {
        correctCount++;
      }
      
      answers.push({
        questionId: q._id,
        question: q.question,
        userAnswer: userAnswers[q._id] || 'Not answered',
        correctAnswer: q.correctAnswer,
        isCorrect: isCorrect
      });
    });

    const score = correctCount;
    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    setScore(score);
    setIsSubmitted(true);

    // Save results to database
    try {
      await axios.post(`http://localhost:4000/course-users/${courseId}/quiz-results`, {
        score,
        totalQuestions,
        answers,
        timeSpent: Math.floor((Date.now() - quizStartTime) / 1000) // Calculate time spent
      });
      console.log('Quiz results saved successfully');
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };
  
  // Check if all questions have been answered
  const allAnswered = Object.keys(userAnswers).length === quizQuestions.length;
  const totalQuestions = quizQuestions.length;
  const passPercentage = 0.6; // 60% required to pass

  if (quizQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl text-gray-600">No quiz questions available for this course.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 font-sans antialiased ">
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col overflow-y-auto p-6 sm:p-10">
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10">
          Final Course Assessment
        </h1>

        {/* Quiz Questions List */}
        <div className="space-y-6">
          {quizQuestions.map((question, index) => (
            <Quiz
              key={question._id}
              question={question}
              index={index}
              selectedAnswer={userAnswers[question._id]}
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
                <span className="ml-2 text-lg">({Math.round((score / totalQuestions) * 100)}%)</span>
              </p>
              <button
                onClick={() => {
                  if (score / totalQuestions < passPercentage) {
                    setIsSubmitted(false);
                    setUserAnswers({}); // Reset quiz state
                    setScore(0);
                    setQuizStartTime(Date.now()); // Reset timer
                  } else {
                    alert('🎉 Congratulations! Certificate generated successfully!');
                    // You can navigate to certificate page here
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
              <div>
                <p className="text-lg text-gray-600">
                  Questions Answered: {Object.keys(userAnswers).length} / {totalQuestions}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Time spent: {Math.floor((Date.now() - quizStartTime) / 1000)} seconds
                </p>
              </div>
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

export default Quizpage;