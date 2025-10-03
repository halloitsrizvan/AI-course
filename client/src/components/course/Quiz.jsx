import React from 'react'

function Quiz({ question, index, selectedAnswer, handleAnswerChange, isSubmitted }) {
   
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
}

export default Quiz