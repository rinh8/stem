# CLAUDE.md - AI Audio Stem Separator

This document provides guidance for AI assistants working with this codebase.

## Project Overview

**AI Audio Stem Separator** is a React/TypeScript web application that separates audio files into individual stems (vocals, drums, bass, instruments, ambience) using AI. It features a virtual mixing console for controlling and exporting the separated tracks.

## Tech Stack

- **Framework:** React 19.2.4 with TypeScript 5.8.2
- **Build Tool:** Vite 6.2.0
- **Styling:** Tailwind CSS (CDN)
- **AI Integration:** Google Gemini API (`@google/genai`)
- **Module System:** ES Modules

## Project Structure

```
/home/user/stem/
├── App.tsx                    # Main application component
├── index.tsx                  # React DOM entry point
├── types.ts                   # TypeScript type definitions
├── index.html                 # HTML template with Tailwind CDN
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── components/
│   ├── FileUpload.tsx         # Drag-and-drop audio file upload
│   ├── StemTrack.tsx          # Individual stem track controls
│   ├── StemMixer.tsx          # Main mixing console grid
│   ├── ProcessingView.tsx     # Processing progress display
│   ├── ExportModal.tsx        # Export dialog modal
│   └── icons/
│       └── StatusIcons.tsx    # Reusable SVG icons
└── services/
    └── geminiService.ts       # Google Gemini API integration
```

## Common Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run preview      # Preview production build
```

## Environment Setup

Set `GEMINI_API_KEY` in `.env.local` file with your Google Gemini API key.

## Key Types (types.ts)

```typescript
type AppState = 'idle' | 'processing' | 'results' | 'error';

interface Stem {
  name: string;        // e.g., "Vocals", "Drums"
  description: string; // AI-generated description
  volume: number;      // 0-100
  pan: number;         // -100 (left) to 100 (right)
  isMuted: boolean;
  isSolo: boolean;
}
```

## Component Patterns

### Component Structure
- Functional components with TypeScript (`.tsx`)
- Props interfaces defined at top of each file
- Use `React.FC<Props>` type annotation

### State Management
- Local state via `useState` hooks
- Props-based callbacks for parent communication
- No global state library (pure React)

### Performance Optimizations
- `useCallback` for event handlers
- `useMemo` for derived state calculations
- `useRef` for DOM references

## Code Conventions

### Naming
- **Components:** PascalCase (`StemTrack.tsx`)
- **Variables/Functions:** camelCase
- **Event Handlers:** `handle*` or `on*` prefix (`handleDragEnter`, `onFileSelect`)
- **Boolean Props:** `is*` prefix (`isMuted`, `isSolo`, `isAnySolo`)

### Styling
- Use Tailwind CSS utility classes (primary)
- Custom animations defined in `index.html` `<style>` block
- Dark theme with grays (`bg-gray-800`, `bg-gray-900`)

### Component Communication
- Pass callbacks as props: `onFileSelect`, `onUpdate`, `onReset`
- Lift state up to parent when shared between siblings
- Use partial updates: `onUpdate: (newProps: Partial<Stem>) => void`

## Application Flow

1. **Idle State:** FileUpload component shown
2. **Processing State:** ProcessingView with animated progress
3. **Results State:** StemMixer displays 5 stems in grid
4. **Export:** ExportModal for WAV/MP3 export

## Default Stems

The app creates 5 stems upon processing:
- Vocals
- Drums
- Bass
- Instruments
- Other/Ambience

## File Support

Accepted audio formats: MP3, WAV, FLAC, OGG

## Testing

No testing framework is currently configured. When adding tests, consider using Vitest (pairs well with Vite).

## Path Aliases

TypeScript path alias configured: `@/*` resolves to project root.

## Important Notes

- The dev server runs on `0.0.0.0:3000` for network accessibility
- Tailwind CSS is loaded via CDN (no local config)
- React/React-DOM imported via esm.sh CDN in index.html import map
- Custom CSS animations: `fade-in`, `waveform-playing` (pulse effect)
- Vertical range sliders have custom styling for consistent cross-browser appearance
