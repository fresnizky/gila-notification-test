import React, { useEffect, useState } from "react";

const NotificationForm = () => {
  const handleSendNotification = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const jsonData = JSON.stringify(
      Object.fromEntries([...formData.entries()])
    );

    await fetch("http://localhost:8000/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
  };

  return (
    <form onSubmit={handleSendNotification}>
      <select name="category">
        <option value="Sports">Sports</option>
        <option value="Finance">Finance</option>
        <option value="Movies">Movies</option>
      </select>
      <textarea name="message" required />
      <button type="submit">Send Notification</button>
    </form>
  );
};

const LogDisplay = ({ logs }) => {
  return (
    <ul>
      {logs.toReversed().map((log, index) => (
        <li key={index}>{log}</li>
      ))}
    </ul>
  );
};

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch("http://localhost:8000/api/log");
      const data = (await response.text())
        .split("\n")
        .filter((line) => line.length > 0 && line[0] === "{");
      setLogs(data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="App">
      <NotificationForm />
      <LogDisplay logs={logs} />
    </div>
  );
}

export default App;
