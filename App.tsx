import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#111827', color: '#e5e7eb', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ maxWidth: '56rem', width: '100%' }}>
        <header style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px' }}>
            AI Audio Stem Separator
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '18px' }}>
            Upload your track and let our AI isolate the stems for you.
          </p>
        </header>
        
        <div style={{ backgroundColor: '#374151', padding: '32px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ marginBottom: '16px' }}>Audio file upload component is loading...</p>
          <input type="file" accept="audio/*" style={{ padding: '8px', borderRadius: '4px' }} />
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#d1d5db' }}>Supported formats: MP3, WAV, FLAC, OGG</p>
        </div>
      </div>
    </div>
  );
};

export default App;
