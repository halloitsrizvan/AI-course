import React, { useState } from 'react';

function Certificate({ onClose }) {
  const [name, setName] = useState('');
  const [certificateUrl, setCertificateUrl] = useState(null);

  const handleGenerate = () => {
    // Create a canvas to overlay the name onto certificate
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'images/banner1.png'; // Place your certificate template in public folder

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Add name text in center
      ctx.font = '48px serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(name, canvas.width / 2, canvas.height / 2);

      const dataUrl = canvas.toDataURL('images/banner1.png');
      setCertificateUrl(dataUrl);
    };
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = 'certificate.png';
    link.click();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Generate Your Certificate</h2>
      {!certificateUrl ? (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          <button
            onClick={handleGenerate}
            disabled={!name}
            className="bg-purple-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            Generate Certificate
          </button>
        </>
      ) : (
        <div className="text-center">
          <img src={certificateUrl} alt="Generated Certificate" className="w-full rounded mb-4" />
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-6 py-2 rounded mr-2"
          >
            Download
          </button>
          <button
            onClick={() => setCertificateUrl(null)}
            className="bg-gray-600 text-white px-6 py-2 rounded"
          >
            Regenerate
          </button>
        </div>
      )}
      <button onClick={onClose} className="mt-4 text-sm text-gray-500 underline">
        Close
      </button>
    </div>
  );
}

export default Certificate;
