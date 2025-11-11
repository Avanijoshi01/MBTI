import React, { useState } from 'react';
import Landing from './components/Landing';
import AdaptiveQuiz from './components/AdaptiveQuiz';

function App() {
  const [mode, setMode] = useState(null);

  if (!mode) return <Landing onSelect={setMode} />;
  if (mode === 'adaptive') return <AdaptiveQuiz />;

  return <div className="p-8 text-center">Typing-based mode coming soon!</div>;
}

export default App;