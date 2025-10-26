import React from 'react'

function SuccessPopup() {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations! 🎉</h3>
            <p className="text-gray-600 mb-6">
                You have successfully enrolled in <strong>{course.title}</strong>
            </p>
            <button
                onClick={() => {
                    setShowSuccessPopup(false);
                    navigate('/my-courses');
                }}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
                Go to My Courses
            </button>
        </div>
    </div>
  )
}

export default SuccessPopup
