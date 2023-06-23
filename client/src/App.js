import React from "react";

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

function App() {
  return (
    <div className="App">
      <NotificationForm />
    </div>
  );
}

export default App;
