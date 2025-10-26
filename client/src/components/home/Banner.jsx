import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '../../Icons';

const SLIDES = [
  {
    title: "Meet your new AI conversation coach",
    description: "Role Play is the interactive way to practice your business and communication skills.",
    buttonText: "Find courses with Role Play",
    image: "images/banner1.png",
  },
  {
    title: "Ready to accelerate your career?",
    description: "Explore hundreds of top-rated courses and gain in-demand skills tailored for modern industry needs.",
    buttonText: "Browse All Courses",
    image: "images/banner11.png",
  },
  {
    title: "Expand your AI-powered journey",
    description: "Learn, practice, and master cutting-edge technologies with guidance from experts.",
    buttonText: "Join Now",
    image: "https://placehold.co/400x450/10b981/ffffff?text=Career+Pathways+Mockups",
  },
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // 🕒 Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [totalSlides]);

  return (
    <div
      className="relative max-w-7xl mx-auto p-4 md:p-8 rounded-xl overflow-hidden"
      style={{ backgroundColor: "#DCF8FA" }}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full grid md:grid-cols-2 gap-8 items-center p-4"
          >
            {/* Text Section */}
            <div className="space-y-6 order-2 md:order-1 max-w-md mx-auto md:mx-0 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900">{slide.title}</h2>
              <p className="text-gray-600 text-lg">{slide.description}</p>
              <button className="bg-purple-700 text-white px-6 py-3 font-bold rounded-lg shadow-lg hover:bg-purple-800 transition duration-200">
                {slide.buttonText}
              </button>
            </div>

            {/* Image Section */}
            <div className="hidden md:flex justify-center order-1 md:order-2">
              <img
                src={slide.image}
                alt={`${slide.title} mockup`}
                className="w-full max-w-sm h-auto object-contain rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x450/4f46e5/ffffff?text=Image+Placeholder";
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg opacity-80 hover:opacity-100 transition duration-150 z-20 border border-gray-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg opacity-80 hover:opacity-100 transition duration-150 z-20 border border-gray-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-purple-700 w-6' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
