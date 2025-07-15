import React, { useState, useEffect } from 'react';
import CodePanel from './components/CodePanel';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [suggestedCode, setSuggestedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    setSuggestedCode('');

    const formData = new FormData();
    formData.append('code', inputCode);
    formData.append('language', language);

    try {
      const response = await fetch('http://127.0.0.1:8000/review', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        setSuggestedCode((prevCode) => prevCode + chunk);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to get suggestion. Is the backend running? \nError: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center font-sans p-4 sm:p-8 bg-subtle-gradient">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white tracking-tight">Code AI</h1>
        <p className="text-lg text-gray-300/80 mt-1">Your AI Coding Partner.</p>
      </header>

      <div className="w-full max-w-6xl mx-auto h-[65vh] grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Panel: User Input */}
        <CodePanel title="Your Code">
          <div className="w-full h-full p-2 bg-black/10">
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full h-full bg-transparent text-editor-text font-code resize-none focus:outline-none p-2 leading-relaxed"
              placeholder="Enter your code here..."
            />
          </div>
        </CodePanel>

        {/* Right Panel: AI Suggestions */}
        <CodePanel title="AI Suggestions">
          <div className="w-full h-full p-2 bg-black/10">
            {isLoading && !suggestedCode ? (
              <div className="flex items-center justify-center h-full text-gray-400">Analyzing...</div>
            ) : error ? (
                <pre className="text-red-400 whitespace-pre-wrap p-4 font-code">{error}</pre>
            ) : suggestedCode ? (
                <pre className="text-editor-text whitespace-pre-wrap p-2 font-code">
                  <code>{suggestedCode}</code>
                  {isLoading && <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-1"></span>}
                </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">Suggestions will appear here.</div>
            )}
          </div>
        </CodePanel>
      </div>

      {/* Controls Section with updated button styles */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-black/20 text-white border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-hover transition-colors duration-200 hover:border-accent"
        >
          <option className="bg-gray-800" value="python">Python</option>
          <option className="bg-gray-800" value="javascript">JavaScript</option>
          <option className="bg-gray-800" value="java">Java</option>
          <option className="bg-gray-800" value="c++">C++</option>
        </select>
        
        <button
          onClick={handleSubmit}
          disabled={isLoading || !inputCode}
          className="w-full sm:w-auto bg-accent text-white font-bold py-2 px-6 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 ease-in-out hover:scale-105 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
        >
          {isLoading ? 'Generating...' : 'Generate Suggestion'}
        </button>
      </div>
    </div>
  );
}

export default App;

