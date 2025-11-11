import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import Result from './Result';

export default function AdaptiveQuiz() {
  const [q, setQ] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch('/questions/start')
      .then(r => r.json())
      .then(d => {
        setQ(d.question);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching question:', err);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (choice) => {
    const { key, opt } = choice;
    setAnswers(prev => [...prev, { qId: q.id, optionKey: key, traits: opt.traits || {} }]);
    
    if (opt.next && opt.next !== 'end') {
      setQuestionNumber(prev => prev + 1);
      setLoading(true);
      fetch(`/questions/${opt.next}`)
        .then(r => r.json())
        .then(d => {
          setQ(d.question);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching question:', err);
          setLoading(false);
        });
    } else {
      setFinished(true);
      submitAnswers([...answers, { qId: q.id, optionKey: key, traits: opt.traits || {} }]);
    }
  };

  const submitAnswers = async (finalAnswers) => {
    try {
      const body = { userId: 'demo_user', answers: finalAnswers };
      const res = await fetch('/answers/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  if (finished) {
    return <Result result={result} />;
  }

  if (loading && !q) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading your first question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">Question {questionNumber}</span>
            <span className="text-white/80 text-sm">Adaptive Quiz</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5">
            <div 
              className="bg-white h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((questionNumber / 15) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Question card */}
        <div className="animate-slide-up">
          <QuestionCard question={q} onAnswer={handleAnswer} loading={loading} />
        </div>

        {/* Back button */}
        {questionNumber > 1 && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 text-white/80 hover:text-white flex items-center gap-2 transition-colors"
          >
            <span>←</span>
            <span>Start Over</span>
          </button>
        )}
      </div>
    </div>
  );
}
