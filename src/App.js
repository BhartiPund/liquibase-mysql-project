import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRunCommand = async () => {
    setIsLoading(true);
    setOutput('');
    try {
      const response = await axios.post('http://localhost:3000/run-liquibase', { command });
      setOutput(response.data);
    } catch (error) {
      setOutput(error.response ? error.response.data : 'An error occurred while running the command.');
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1>Liquibase UI</h1>
      <input
        type="text"
        placeholder="Enter Liquibase command (e.g., update)"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <button onClick={handleRunCommand} disabled={isLoading}>
        {isLoading ? 'Running...' : 'Run Command'}
      </button>
      <pre className="output">{output}</pre>
    </div>
  );
}

export default App;
