import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');

  const handleAsk = async () => {
    try {
      const response = await fetch('/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error('Error asking the question');
      }

      const data = await response.json();
      setResult(data.answer);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Ask Google Generative AI</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question..."
      />
      <button onClick={handleAsk}>Ask</button>
      <div className="result">{result}</div>
    </div>
  );
}

export default App;
