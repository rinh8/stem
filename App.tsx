
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, Stem } from './types';
import { fetchStemDescriptions } from './services/geminiService';
import FileUpload from './components/FileUpload';
import ProcessingView from './components/ProcessingView';
import StemMixer from './components/StemMixer';
import { ErrorIcon } from './components/icons/StatusIcons';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [stems, setStems] = useState<Stem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    const audioTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/ogg'];
    if (audioTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setAppState('processing');
      setError(null);
    } else {
      setError('Invalid file type. Please upload an MP3, WAV, FLAC, or OGG file.');
      setAppState('error');
    }
  };

  const processFile = useCallback(async () => {
    if (!file) return;

    try {
      const stemDescriptions = await fetchStemDescriptions(file.name);
      const initialStems: Stem[] = stemDescriptions.map(desc => ({
        ...desc,
        volume: 80,
        pan: 0,
        isMuted: false,
        isSolo: false,
      }));
      setStems(initialStems);
      // Short delay to allow final progress bar animation
      setTimeout(() => setAppState('results'), 500);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during processing.');
      setAppState('error');
    }
  }, [file]);

  useEffect(() => {
    if (appState === 'processing') {
      processFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  const resetApp = () => {
    setFile(null);
    setStems([]);
    setError(null);
    setAppState('idle');
  };

  const renderContent = () => {
    switch (appState) {
      case 'processing':
        return <ProcessingView fileName={file?.name || 'your file'} />;
      case 'results':
        return <StemMixer stems={stems} setStems={setStems} onReset={resetApp} />;
      case 'error':
        return (
          <div className="text-center text-red-400 p-8 bg-gray-800/50 rounded-lg shadow-xl flex flex-col items-center gap-4">
            <ErrorIcon />
            <h2 className="text-2xl font-bold">Processing Failed</h2>
            <p className="max-w-md">{error}</p>
            <button
              onClick={resetApp}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      case 'idle':
      default:
        return <FileUpload onFileSelect={handleFileSelect} />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            AI Audio Stem Separator
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Upload your track and let our AI isolate the stems for you.
          </p>
        </header>
        <main className="w-full flex items-center justify-center">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
