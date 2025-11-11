import React from 'react';

export default function QuestionCard({ question, onAnswer }) {
  if(!question) return null;
  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="grid gap-3">
        {Object.entries(question.options).map(([key, opt]) => (
          <button key={key}
            className="text-left border p-3 rounded hover:bg-gray-50"
            onClick={() => onAnswer({ key, opt })}>
            <strong>{key}.</strong> {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}