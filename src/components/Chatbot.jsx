import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import messagingIcon from '../assets/Frame 427320143.png';

function ChatComponent() {
  const [selectedTab, setSelectedTab] = useState('chat');
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'User 1', text: 'Hey There, how can I help?', self: false },
    { sender: 'User 2', text: 'Nothing bro..just chill!!!', self: true },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [participants, setParticipants] = useState(['User 1', 'User 2']);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'You', text: newMessage, self: true }]);
      setNewMessage('');
    }
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleKickOut = (participant) => {
    setParticipants(participants.filter(p => p !== participant));
    navigate('/polling/end')
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
                  <div className="participant-labels">
                    <span className="participant-name-label">Name</span>
                    <span className="participant-action-label">Action</span>
                  </div>
                  <ul>
                    {participants.map((participant, index) => (
                      <li key={index} className="participant-item">
                        {participant}
                        <button
                          className="kick-out-button"
                          onClick={() => handleKickOut(participant)}
                        >
                          Kick Out
                        </button>
                      </li>
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
