import React, { useEffect, useState } from 'react';
import EvolutionChart from './EvolutionChart';

export default function Result({ result }) {
  const [history, setHistory] = useState(null);
  useEffect(()=> {
    fetch('/answers/history/demo_user').then(r=>r.json()).then(d=>setHistory(d.history));
  }, []);
  if (!result) return <div>Loading...</div>;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-indigo-50 p-6 rounded">
        <h2 className="text-3xl">{result.prediction}</h2>
        <p className="mt-2">Scores: {JSON.stringify(result.scores)}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Personality Evolution</h3>
        <EvolutionChart history={history || []}/>
      </div>
    </div>
  );
}