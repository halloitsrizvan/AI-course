import React from 'react'
import { GraduationCap, ShieldCheck, MessageSquare, Rocket } from 'lucide-react';

const FeatureItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2">
    <div className="text-xl text-yellow-300">
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-sm font-medium text-gray-300">
      {text}
    </span>
  </div>
);

function FirstContent() {

      const manImageUrl = "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp";
      const vrHeadsetlUrl = "https://frontends.udemycdn.com/staticx/udemy/images/ai-career-banner/ai-career@1x.webp";

      const features = [
    { icon: GraduationCap, text: 'Learn AI and more' },
    { icon: ShieldCheck, text: 'Prep for a certification' },
    { icon: MessageSquare, text: 'Practice with AI coaching' },
    { icon: Rocket, text: 'Advance your career' },
  ];

   const handleLearnMoreClick = () => {
    const section = document.getElementById("contents-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 " style={{marginTop: '-8rem'}}>
      <div
        className="
          max-w-7xl w-full
          bg-gray-900 text-white
          rounded-3xl shadow-2xl overflow-hidden
          lg:flex lg:h-[450px]
        "
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* === LEFT SECTION: CONTENT === */}
        <div className="p-8 lg:p-14 lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Reimagine your <span className="text-indigo-400">career</span> in the AI era
          </h1>
          <p className="text-gray-400 mb-8 max-w-md">
            Future-proof your skills with Personal Plan. Get access to a variety of fresh content from real-world experts.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
            {features.map((feature, index) => (
              <FeatureItem key={index} icon={feature.icon} text={feature.text} />
            ))}
          </div>

          {/* Button and Price */}
          <button
          onClick={()=>handleLearnMoreClick ()}
            className="
              w-fit px-8 py-3
              bg-white text-gray-900
              font-bold rounded-xl
              hover:bg-gray-200 transition-colors
              shadow-lg
            "
          >
            Learn more
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Starting at <span className="font-semibold text-gray-400">₹500/month</span>
          </p>
        </div>

        {/* === RIGHT SECTION: VISUALS === */}
        <div className="hidden md:block relative lg:w-1/2 min-h-[300px] lg:min-h-full">

          {/* Abstract Blue/Purple Wave Element (Layer 1) */}
          <div
            className="absolute top-0 right-0 h-full w-full lg:w-[130%] rounded-l-[50px] lg:rounded-l-none"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)', // Adjusted gradient
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)', // Simple abstract shape
              opacity: 0.7,
            }}
          >
          </div>
          
          {/* Circular Purple Swirl (To mimic the design's abstract shape) */}
          <div className="absolute top-1/4 left-1/4 w-3/4 h-3/4 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500 opacity-30 blur-3xl z-0"></div>


          {/* The Person Image (Layer 2) */}
          <div className="absolute inset-0 z-10 ">
            <img
              src="/images/baman.png"
              alt="Professional using tech"
              className="absolute right-0 bottom-0 w-[100%] h-auto object-cover rounded-xl  hidden md:block"
              style={{ minHeight: '100%', maxHeight: '100%', objectPosition: 'center 10%' }}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x600/3b82f6/ffffff?text=User" }}
            />
          </div>

    

        </div>
      </div>
    </div>
  )
}

export default FirstContent