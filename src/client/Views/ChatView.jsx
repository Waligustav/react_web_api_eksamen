import React, { useEffect, useState } from "react";

export function ChatView({ chatPreview, username, onSendMessage }) {
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = new useState();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      const { message, id, username } = JSON.parse(event.data);
      setChatLog((chatLog) => {
        return [...chatLog, { message, id, username }];
      });
    };
    ws.onopen = (event) => {
      ws.send(
        JSON.stringify({
          type: "login",
          username,
        })
      );
    };
    setWs(ws);
  }, []);

  function handleSubmitMessage(e) {
    e.preventDefault();
    if (ws.readyState !== 0) {
      ws.send(
        JSON.stringify({
          type: "message",
          message: message,
        })
      );
    }
    setMessage("");
  }

  const actualChat = chatLog.length ? chatLog : chatPreview;
  return (
    <main className="chatContainer">
      <header>
        <h1>Welcome to the chat</h1>
        <h3>Type something and hit "send"</h3>
      </header>
      <main className="chatLog">
        {actualChat?.map(({ message, id, username }) => (
          <div className="message" key={id}>
            <strong>{username}: </strong>
            {message}
          </div>
        ))}
      </main>
      <footer>
        <form onSubmit={handleSubmitMessage}>
          <input
            type="text"
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </footer>
    </main>
  );
}
