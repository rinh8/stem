
export type AppState = 'idle' | 'processing' | 'results' | 'error';

export interface Stem {
  name: string;
  description: string;
  volume: number; // 0-100
  pan: number; // -100 (left) to 100 (right)
  isMuted: boolean;
  isSolo: boolean;
}
