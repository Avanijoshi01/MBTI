import React from 'react';

export default function EvolutionChart({ history, loading }) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your history...</p>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">📊</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Personality Evolution</h3>
        <p className="text-gray-600 mb-4">Take the quiz multiple times to see how your personality evolves!</p>
        <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-lg">
          This is your first result. Retake the quiz to track changes over time.
        </div>
      </div>
    );
  }

  // Group by date and get the most recent type for each date
  const historyByDate = history.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!acc[date] || new Date(item.date) > new Date(acc[date].date)) {
      acc[date] = item;
    }
    return acc;
  }, {});

  const sortedHistory = Object.values(historyByDate).sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const typeColors = {
    'INTJ': 'bg-blue-100 text-blue-800 border-blue-300',
    'INTP': 'bg-purple-100 text-purple-800 border-purple-300',
    'ENTJ': 'bg-red-100 text-red-800 border-red-300',
    'ENTP': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'INFJ': 'bg-green-100 text-green-800 border-green-300',
    'INFP': 'bg-pink-100 text-pink-800 border-pink-300',
    'ENFJ': 'bg-indigo-100 text-indigo-800 border-indigo-300',
    'ENFP': 'bg-cyan-100 text-cyan-800 border-cyan-300',
    'ISTJ': 'bg-gray-100 text-gray-800 border-gray-300',
    'ISFJ': 'bg-blue-100 text-blue-800 border-blue-300',
    'ESTJ': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'ESFJ': 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300',
    'ISTP': 'bg-orange-100 text-orange-800 border-orange-300',
    'ISFP': 'bg-rose-100 text-rose-800 border-rose-300',
    'ESTP': 'bg-amber-100 text-amber-800 border-amber-300',
    'ESFP': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>📈</span>
        <span>Your Personality Evolution</span>
      </h3>
      
      <div className="space-y-4">
        {sortedHistory.map((item, index) => {
          const date = new Date(item.date);
          const dateStr = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          const timeStr = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          const typeColor = typeColors[item.type] || 'bg-gray-100 text-gray-800 border-gray-300';
          
          return (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md"
            >
              {/* Timeline indicator */}
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${typeColor} border-2 flex items-center justify-center font-bold text-lg`}>
                  {item.type}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800 text-lg">{item.type}</span>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Latest
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {dateStr} at {timeStr}
                </div>
              </div>
              
              {/* Arrow */}
              {index < sortedHistory.length - 1 && (
                <div className="flex-shrink-0 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {sortedHistory.length > 1 && (
        <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-800">
            <strong>💡 Insight:</strong> You've taken the quiz {sortedHistory.length} time{sortedHistory.length > 1 ? 's' : ''}. 
            Your personality type can evolve as you grow and gain new experiences!
          </p>
        </div>
      )}
    </div>
  );
}
