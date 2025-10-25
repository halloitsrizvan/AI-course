import React from 'react'

function VideoPlayer({ currentPart }) {
    const videoUrl = `https://www.youtube.com/embed/${currentPart.lessons.videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="relative w-full aspect-video bg-gray-900">
      {/* YouTube Iframe */}
      <iframe
        className="w-full h-full"
        src={videoUrl}
        title={`YouTube video player: ${currentPart.lessons.title}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      
      {/* Mock 'More Videos' Button */}
      <button className="absolute top-4 left-4 text-xs bg-gray-700 text-white px-3 py-1 rounded-full opacity-90 hover:bg-gray-600 transition">
        MORE VIDEOS
      </button>
    </div>
  )
}

export default VideoPlayer