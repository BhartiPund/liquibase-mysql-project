import React, { useState } from "react";

export default function LiquibaseUI() {
  const [formData, setFormData] = useState({
    host: "",
    port: "3306",
    username: "",
    password: "",
    database: "",
    command: "update"
  });
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await fetch("/run-liquibase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    setOutput(data.output);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Liquibase Command UI</h2>

      <input 
        className="w-full p-2 mb-2 border rounded" 
        placeholder="Host" 
        name="host" 
        value={formData.host} 
        onChange={handleChange} 
      />
      <input 
        className="w-full p-2 mb-2 border rounded" 
        placeholder="Port" 
        name="port" 
        value={formData.port} 
        onChange={handleChange} 
      />
      <input 
        className="w-full p-2 mb-2 border rounded" 
        placeholder="Username" 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
      />
      <input 
        className="w-full p-2 mb-2 border rounded" 
        placeholder="Password" 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
      />
      <input 
        className="w-full p-2 mb-4 border rounded" 
        placeholder="Database Name" 
        name="database" 
        value={formData.database} 
        onChange={handleChange} 
      />

      <select 
        className="w-full p-2 mb-4 border rounded" 
        name="command" 
        value={formData.command} 
        onChange={handleChange}
      >
        <option value="update">Update</option>
        <option value="rollback">Rollback</option>
        <option value="status">Status</option>
      </select>

      <button 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" 
        onClick={handleSubmit}
      >
        Run Command
      </button>

      {output && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <h3 className="font-semibold">Command Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
