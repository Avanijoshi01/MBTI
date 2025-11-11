import React from 'react';

export default function EvolutionChart({ history }) {
  if (!history || history.length === 0)
    return <p className="text-gray-500">No history yet — retake to see evolution.</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Personality Evolution</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i} className="py-2 border-b">
            <strong>{new Date(h.date).toLocaleDateString()}</strong>: {h.type}
          </li>
        ))}
      </ul>
    </div>
  );
}