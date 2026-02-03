
import React, { useCallback, useMemo, useState } from 'react';
import { Stem } from '../types';
import StemTrack from './StemTrack';
import ExportModal from './ExportModal';

interface StemMixerProps {
  stems: Stem[];
  setStems: React.Dispatch<React.SetStateAction<Stem[]>>;
  onReset: () => void;
}

const StemMixer: React.FC<StemMixerProps> = ({ stems, setStems, onReset }) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [playingStemIndex, setPlayingStemIndex] = useState<number | null>(null);
  const isAnySolo = useMemo(() => stems.some(s => s.isSolo), [stems]);

  const updateStem = useCallback((index: number, newProps: Partial<Stem>) => {
    setStems(prevStems => {
      const newStems = [...prevStems];
      newStems[index] = { ...newStems[index], ...newProps };

      // Handle solo logic
      if (newProps.isSolo === true) { // If a track is being soloed
        return newStems.map((stem, i) => ({
          ...stem,
          isSolo: i === index,
        }));
      }
      
      return newStems;
    });
  }, [setStems]);

  const handlePlayToggle = (index: number) => {
    if (playingStemIndex === index) {
      setPlayingStemIndex(null); // Stop playback
    } else {
      setPlayingStemIndex(index); // Start playback of new stem
    }
  };


  return (
    <>
      <div className="w-full bg-gray-800/50 p-4 sm:p-6 rounded-lg shadow-xl animate-fade-in">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <h2 className="text-2xl font-bold text-white">Mixing Console</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Export Stems
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Process Another File
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {stems.map((stem, index) => (
            <StemTrack
              key={stem.name}
              stem={stem}
              isAnySolo={isAnySolo}
              isPlaying={playingStemIndex === index}
              onPlayToggle={() => handlePlayToggle(index)}
              onUpdate={(newProps) => updateStem(index, newProps)}
            />
          ))}
        </div>
      </div>
      {isExportModalOpen && <ExportModal onClose={() => setIsExportModalOpen(false)} />}
    </>
  );
};

export default StemMixer;
