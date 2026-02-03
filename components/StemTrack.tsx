
import React from 'react';
import { Stem } from '../types';
import { MuteIcon, SoloIcon, PlayIcon, PauseIcon } from './icons/StatusIcons';

interface StemTrackProps {
  stem: Stem;
  isAnySolo: boolean;
  isPlaying: boolean;
  onUpdate: (newProps: Partial<Stem>) => void;
  onPlayToggle: () => void;
}

const StemTrack: React.FC<StemTrackProps> = ({ stem, isAnySolo, isPlaying, onUpdate, onPlayToggle }) => {
  const isEffectivelyMuted = stem.isMuted || (isAnySolo && !stem.isSolo);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ volume: Number(e.target.value) });
  };
  
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ pan: Number(e.target.value) });
  };

  const toggleMute = () => onUpdate({ isMuted: !stem.isMuted });
  const toggleSolo = () => onUpdate({ isSolo: !stem.isSolo });

  return (
    <div className={`flex flex-col bg-gray-800 rounded-lg p-3 transition-opacity ${isEffectivelyMuted && !isPlaying ? 'opacity-50' : 'opacity-100'}`}>
        <div className="text-center font-bold text-white py-2 bg-gray-900/50 rounded-t-md truncate px-1">{stem.name}</div>
        
        <div className="flex-grow flex items-center justify-around bg-gray-700 p-2 my-2 rounded-md">
            {/* Fake Waveform */}
            <div className={`w-full h-24 bg-gray-900 rounded-md flex items-center justify-center p-2 overflow-hidden transition-shadow ${isPlaying ? 'waveform-playing' : ''}`}>
                <p className="text-xs text-gray-400 text-center leading-tight">{stem.description}</p>
            </div>
        </div>

        {/* Pan Control */}
        <div className="flex flex-col items-center my-2">
            <span className="text-xs text-gray-400 mb-1">PAN</span>
            <input
                type="range"
                min="-100"
                max="100"
                value={stem.pan}
                onChange={handlePanChange}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs font-mono mt-1 w-8 text-center">{stem.pan === 0 ? 'C' : (stem.pan < 0 ? `${-stem.pan}L` : `${stem.pan}R`)}</span>
        </div>

        {/* Volume Fader */}
        <div className="flex items-center justify-center space-x-2">
            <div className="h-40 w-12 flex items-center justify-center">
                 <input
                    type="range"
                    min="0"
                    max="100"
                    value={stem.volume}
                    onChange={handleVolumeChange}
                    className="slider-vertical h-36 w-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>
        <div className="text-center text-sm font-mono">{stem.volume}</div>

        {/* Mute/Solo/Play Buttons */}
        <div className="flex justify-around mt-2 pt-2 border-t border-gray-700">
            <button
                onClick={toggleMute}
                className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-colors ${
                    stem.isMuted ? 'bg-red-500 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                }`}
                title="Mute"
            >
                <MuteIcon />
            </button>
            <button
                onClick={toggleSolo}
                className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-colors ${
                    stem.isSolo ? 'bg-yellow-500 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                }`}
                title="Solo"
            >
                <SoloIcon />
            </button>
            <button
                onClick={onPlayToggle}
                className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-colors ${
                    isPlaying ? 'bg-blue-500 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                }`}
                title={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
        </div>
    </div>
  );
};

export default StemTrack;
