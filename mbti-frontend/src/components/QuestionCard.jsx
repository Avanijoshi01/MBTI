import React from 'react';

export default function QuestionCard({ question, onAnswer, loading }) {
  if (!question) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading question...</p>
      </div>
    );
  }

  const options = Object.entries(question.options || {});
  const optionColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
      {/* Question header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
          {question.text}
        </h2>
      </div>

      {/* Options */}
      <div className="p-6 space-y-4">
        {options.map(([key, opt], index) => {
          const colorClass = optionColors[index % optionColors.length];
          return (
            <button
              key={key}
              onClick={() => !loading && onAnswer({ key, opt })}
              disabled={loading}
              className={`
                w-full text-left p-5 rounded-xl 
                bg-gradient-to-r ${colorClass}
                text-white font-semibold
                transform transition-all duration-300
                hover:scale-105 hover:shadow-xl
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
                relative overflow-hidden
                group
              `}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-lg">{opt.text}</span>
                <svg 
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="px-6 pb-4">
        <p className="text-sm text-gray-500 text-center">
          Select the option that best describes you
        </p>
      </div>
    </div>
  );
}
