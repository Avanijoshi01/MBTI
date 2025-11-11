import React, { useEffect, useState } from 'react';
import EvolutionChart from './EvolutionChart';

const MBTI_INFO = {
  'INTJ': { name: 'The Architect', color: 'from-blue-600 to-indigo-600', description: 'Imaginative and strategic thinkers' },
  'INTP': { name: 'The Thinker', color: 'from-purple-600 to-pink-600', description: 'Innovative inventors with an unquenchable thirst for knowledge' },
  'ENTJ': { name: 'The Commander', color: 'from-red-600 to-orange-600', description: 'Bold, imaginative and strong-willed leaders' },
  'ENTP': { name: 'The Debater', color: 'from-yellow-600 to-orange-600', description: 'Smart and curious thinkers who cannot resist an intellectual challenge' },
  'INFJ': { name: 'The Advocate', color: 'from-green-600 to-teal-600', description: 'Creative and insightful, inspired and independent' },
  'INFP': { name: 'The Mediator', color: 'from-pink-600 to-rose-600', description: 'Poetic, kind and altruistic people' },
  'ENFJ': { name: 'The Protagonist', color: 'from-purple-600 to-indigo-600', description: 'Charismatic and inspiring leaders' },
  'ENFP': { name: 'The Campaigner', color: 'from-cyan-600 to-blue-600', description: 'Enthusiastic, creative and sociable free spirits' },
  'ISTJ': { name: 'The Logistician', color: 'from-gray-600 to-slate-600', description: 'Practical and fact-minded, reliable' },
  'ISFJ': { name: 'The Protector', color: 'from-blue-600 to-cyan-600', description: 'Very dedicated and warm protectors' },
  'ESTJ': { name: 'The Executive', color: 'from-green-600 to-emerald-600', description: 'Excellent administrators, unsurpassed at managing things' },
  'ESFJ': { name: 'The Consul', color: 'from-pink-600 to-fuchsia-600', description: 'Extraordinarily caring, social and popular people' },
  'ISTP': { name: 'The Virtuoso', color: 'from-orange-600 to-red-600', description: 'Bold and practical experimenters' },
  'ISFP': { name: 'The Adventurer', color: 'from-red-600 to-pink-600', description: 'Flexible and charming artists' },
  'ESTP': { name: 'The Entrepreneur', color: 'from-yellow-600 to-amber-600', description: 'Smart, energetic and perceptive people' },
  'ESFP': { name: 'The Entertainer', color: 'from-yellow-500 to-orange-500', description: 'Spontaneous, energetic and enthusiastic people' },
};

export default function Result({ result }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/answers/history/demo_user')
      .then(r => r.json())
      .then(d => {
        setHistory(d.history || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching history:', err);
        setLoading(false);
      });
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Calculating your personality type...</p>
        </div>
      </div>
    );
  }

  const mbtiType = result.prediction || 'UNKNOWN';
  const mbtiData = MBTI_INFO[mbtiType] || { 
    name: 'Unknown', 
    color: 'from-gray-600 to-slate-600', 
    description: 'Your personality type' 
  };

  // Parse scores if they're a string
  let scores = result.scores;
  if (typeof scores === 'string') {
    try {
      scores = JSON.parse(scores);
    } catch (e) {
      scores = {};
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Result Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
          {/* Header with MBTI type */}
          <div className={`bg-gradient-to-r ${mbtiData.color} p-8 text-center`}>
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">{mbtiType}</h1>
            <h2 className="text-2xl md:text-3xl text-white/90 font-semibold mb-2">{mbtiData.name}</h2>
            <p className="text-white/80 text-lg">{mbtiData.description}</p>
          </div>

          {/* Scores breakdown */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Personality Traits Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(scores || {}).map(([trait, value]) => (
                <div key={trait} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-sm font-semibold text-gray-600 mb-2">{trait}</div>
                  <div className="text-2xl font-bold text-purple-600">{value}</div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.abs(value) * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evolution Chart */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">
          <EvolutionChart history={history || []} loading={loading} />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            🔄 Retake Quiz
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
