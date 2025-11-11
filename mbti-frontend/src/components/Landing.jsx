import React from 'react';

export default function Landing({ onSelect }) {
  return (
    <div className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">MBTI Personality Predictor</h1>
      <p className="text-lg mb-8 text-gray-600">
        Choose your preferred test mode to begin.
      </p>
      <div className="flex justify-center gap-6">
        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          onClick={() => onSelect('adaptive')}
        >
          🧠 Adaptive MCQ Test
        </button>
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={() => onSelect('typing')}
        >
          ✍️ Typing-based Test
        </button>
      </div>
    </div>
  );
}