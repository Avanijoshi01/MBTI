import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import Result from './Result';

export default function AdaptiveQuiz() {
  const [q, setQ] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/questions/start').then(r=>r.json()).then(d=>setQ(d.question));
  }, []);

  const handleAnswer = (choice) => {
    const { key, opt } = choice;
    // opt contains traits and next
    setAnswers(prev => [...prev, { qId: q.id, optionKey: key, traits: opt.traits || {} }]);
    if (opt.next && opt.next !== 'end') {
      fetch(`/questions/${opt.next}`).then(r=>r.json()).then(d=>setQ(d.question));
    } else {
      setFinished(true);
      submitAnswers([...answers, { qId: q.id, optionKey: key, traits: opt.traits || {} }]);
    }
  };

  const submitAnswers = async (finalAnswers) => {
    const body = { userId: 'demo_user', answers: finalAnswers };
    const res = await fetch('/answers/submit', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)
    });
    const data = await res.json();
    setResult(data);
  };

  if (finished) return <Result result={result} />;

  return (
    <div className="p-6">
      <QuestionCard question={q} onAnswer={handleAnswer} />
    </div>
  );
}