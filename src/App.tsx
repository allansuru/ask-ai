import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import './App.css';

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
   
      const data = await response.json();
  
      setResult(data.answer);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error occurred');
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Ask the AI</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-24 p-2 mb-4 border rounded"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ask
          </button>
        </form>
        {loading ? (
          <div className="mt-6 flex justify-center">
            <ClipLoader color="#007BFF" />
          </div>
        ) : (
          <div className="mt-6 p-4 bg-gray-200 rounded">
            <h2 className="text-xl font-semibold mb-2">Result:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};



export default App;
