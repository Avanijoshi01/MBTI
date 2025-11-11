import React, { useState } from 'react';
import Landing from './components/Landing';
import AdaptiveQuiz from './components/AdaptiveQuiz';
import './App.css';

function App() {
  const [mode, setMode] = useState(null);

  if (!mode) return <Landing onSelect={setMode} />;
  if (mode === 'adaptive') return <AdaptiveQuiz />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
        <p className="text-gray-600 mb-6">
          The typing-based test mode is currently under development.
        </p>
        <button
          onClick={() => setMode(null)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}

export default App;
