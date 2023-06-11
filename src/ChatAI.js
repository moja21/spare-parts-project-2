import React, { useState } from 'react';
import './ChatAI.css';

const MAX_CONVERSATION_LENGTH = 10; // Maximum number of messages to retain in the conversation history

const ChatAI = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mergedMessage = [
        ...conversation
          .filter((item) => item.role === 'AI Assistance')
          .slice(-5)
          .map((item) => item.content),
        `User: ${message}`,
      ].join('\n');

      const response = await fetch('https://chatai-499-api.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: mergedMessage }),
      });

      const data = await response.json();

      // Update the conversation with the new response
      setConversation((prevConversation) => {
        const updatedConversation = [
          ...prevConversation,
          { role: 'User', content: message },
          { role: 'AI Assistance', content: data.message },
        ];

        // Limit the conversation history to the maximum length
        return updatedConversation.slice(-MAX_CONVERSATION_LENGTH);
      });

      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">AI Car Maintenance Assistant</h1>
      </div>
      <div className="conversation">
        {conversation.map((item, index) => (
          <p
            key={index}
            className={`message ${item.role === 'AI Assistance' ? 'ai-assistance' : 'user-message'}`}
          >
            {item.role === 'AI Assistance' ? 'AI Assistance' : 'User'}: {item.content}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            className="input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
          />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatAI;