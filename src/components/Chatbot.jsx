import React, { useState } from 'react';
import '../index.css';
import messagingIcon from '../assets/Frame 427320143.png'; // Import the messaging icon

function ChatComponent() {
  const [selectedTab, setSelectedTab] = useState('chat');
  const [messages, setMessages] = useState([
    { sender: 'User 1', text: 'Hey There, how can I help?', self: false },
    { sender: 'User 2', text: 'Nothing bro..just chill!!!', self: true },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false); // State to control visibility
  const participants = ['User 1', 'User 2'];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'You', text: newMessage, self: true }]);
      setNewMessage('');
    }
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div>
      <img
        src={messagingIcon}
        alt="Messaging Icon"
        className="messaging-icon"
        onClick={toggleChatVisibility}
      />
      {isChatVisible && (
        <div className="chatbot-container">
          <div className="chat-component">
            <div className="chat-tabs">
              <button
                className={`tab ${selectedTab === 'chat' ? 'active' : ''}`}
                onClick={() => setSelectedTab('chat')}
              >
                Chat
              </button>
              <button
                className={`tab ${selectedTab === 'participants' ? 'active' : ''}`}
                onClick={() => setSelectedTab('participants')}
              >
                Participants
              </button>
            </div>

            <div className="chat-body">
              {selectedTab === 'chat' ? (
                <div className="messages">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.self ? 'self' : 'other'}`}
                    >
                      <span className="sender">{message.sender}</span>
                      <div className="text">{message.text}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="participants">
                  <ul>
                    {participants.map((participant, index) => (
                      <li key={index}>{participant}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {selectedTab === 'chat' && (
              <div className="chat-footer">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;