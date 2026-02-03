
import React, { useState, useEffect } from 'react';

interface ProcessingViewProps {
  fileName: string;
}

const messages = [
  "Initializing separation engine...",
  "Analyzing audio waveform...",
  "Applying deep learning model...",
  "Isolating harmonic and percussive elements...",
  "Extracting vocal frequencies...",
  "Reconstructing individual stems...",
  "Finalizing outputs..."
];

const ProcessingView: React.FC<ProcessingViewProps> = ({ fileName }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 80); // Fakes an ~8 second process

    const messageInterval = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % messages.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl bg-gray-800/50 p-8 rounded-lg shadow-xl text-center">
      <h2 className="text-2xl font-bold text-white">Processing...</h2>
      <p className="text-gray-400 mt-2 truncate">{fileName}</p>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-8">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-blue-300 mt-4 h-6">{messages[messageIndex]}</p>
    </div>
  );
};

export default ProcessingView;
