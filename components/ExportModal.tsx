
import React, { useState } from 'react';
import { SpinnerIcon, DownloadIcon, CloseIcon } from './icons/StatusIcons';

type ExportFormat = 'wav' | 'mp3';
type ExportState = 'options' | 'exporting' | 'done';

interface ExportModalProps {
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ onClose }) => {
  const [format, setFormat] = useState<ExportFormat>('wav');
  const [exportState, setExportState] = useState<ExportState>('options');

  const handleExport = () => {
    setExportState('exporting');
    setTimeout(() => {
      setExportState('done');
    }, 2500); // Simulate export time
  };

  const handleDownload = () => {
    // Simulate file download
    const content = `This is a simulated ZIP file containing your separated audio stems in ${format.toUpperCase()} format.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stems_export.${format}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  const renderContent = () => {
    switch (exportState) {
      case 'exporting':
        return (
          <div className="text-center flex flex-col items-center justify-center h-48">
            <SpinnerIcon />
            <p className="mt-4 text-lg text-gray-300">Exporting your stems...</p>
          </div>
        );
      case 'done':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Export Ready!</h3>
            <p className="text-gray-400 mb-6">Your separated stems have been packaged.</p>
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
            >
              <DownloadIcon />
              Download ZIP
            </button>
          </div>
        );
      case 'options':
      default:
        return (
          <>
            <div>
              <label className="text-sm font-medium text-gray-400">Select Format</label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormat('wav')}
                  className={`p-4 rounded-lg border-2 transition-colors text-left ${
                    format === 'wav' ? 'border-blue-500 bg-blue-500/20' : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <p className="font-bold text-white">WAV</p>
                  <p className="text-xs text-gray-400">High Quality</p>
                </button>
                <button
                  onClick={() => setFormat('mp3')}
                  className={`p-4 rounded-lg border-2 transition-colors text-left ${
                    format === 'mp3' ? 'border-blue-500 bg-blue-500/20' : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <p className="font-bold text-white">MP3</p>
                  <p className="text-xs text-gray-400">Compressed</p>
                </button>
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={handleExport}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
              >
                Start Export
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
          title="Close"
        >
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Export Stems</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default ExportModal;
