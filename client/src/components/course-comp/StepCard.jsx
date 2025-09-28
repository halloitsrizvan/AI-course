import React from 'react'

function StepCard({ step }) {
    const IconComponent = step.icon;
    return (
        <div className={`p-6 rounded-2xl shadow-lg transform hover:scale-[1.03] transition duration-300 ${step.color} text-white`}>
            <div className='flex items-center mb-3'>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/30 mr-3 text-white font-bold text-lg p-2`}>
                    <IconComponent/>
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
            </div>
            <p className="text-sm opacity-90 leading-snug">{step.description}</p>
        </div>
    );
}

export default StepCard