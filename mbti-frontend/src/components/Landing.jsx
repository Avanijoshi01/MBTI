import React from 'react';

export default function Landing({ onSelect }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            MBTI Personality
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
              Predictor
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2 font-light">
            Discover your true personality type
          </p>
          <p className="text-lg text-white/80 font-light">
            Powered by advanced machine learning
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="glass p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 card-hover">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="text-xl font-semibold text-white mb-2">Adaptive Quiz</h3>
            <p className="text-white/80 text-sm">
              Answer questions tailored to you. Our adaptive algorithm learns as you respond.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 card-hover">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Detailed Analysis</h3>
            <p className="text-white/80 text-sm">
              Get comprehensive insights into your personality traits and evolution over time.
            </p>
          </div>
        </div>

        {/* Mode selection buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="group relative px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 min-w-[280px]"
            onClick={() => onSelect('adaptive')}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-2xl">🧠</span>
              <span>Adaptive MCQ Test</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 min-w-[280px]"
            onClick={() => onSelect('typing')}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-2xl">✍️</span>
              <span>Typing-based Test</span>
              <span className="text-sm opacity-70">(Coming Soon)</span>
            </span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-white/70 text-sm">
          <p>Based on the Myers-Briggs Type Indicator (MBTI)</p>
        </div>
      </div>
    </div>
  );
}
