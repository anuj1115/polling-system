import React, { useState } from 'react';
import '../index.css';

const PollComponent = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { id: 1, text: '', isCorrect: true },
    { id: 2, text: '', isCorrect: false }
  ]);
  const [timeLimit, setTimeLimit] = useState(60);

  const handleAddOption = () => {
    const newOption = {
      id: options.length + 1,
      text: '',
      isCorrect: false
    };
    setOptions([...options, newOption]);
  };

  const handleOptionChange = (id, value) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text: value } : option
    ));
  };

  const handleCorrectChange = (id) => {
    setOptions(options.map(option => 
      ({ ...option, isCorrect: option.id === id })
    ));
  };

  return (
    <div className="poll-container">
      <div className="poll-header">
        <div className="poll-tag">
          Intervue Poll
        </div>
      </div>

      <h1 className="poll-title">Let's Get Started</h1>
      <p className="poll-description">
        you'll have the ability to create and manage polls, ask questions, and monitor
        your students' responses in real-time.
      </p>

      <div className="question-container">
        <label className="question-label">
          Enter your question
        </label>
        <div className="textarea-wrapper">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="question-input"
            placeholder="Type your question here..."
          />
          <div className="character-count">
            {question.length}/100
          </div>
        </div>
      </div>

      <div className="options-header">
        <div className="options-title">Edit Options</div>
        <button className="time-selector">
          {timeLimit} seconds 
        </button>
      </div>

      <div className="options-list">
        {options.map((option) => (
          <div key={option.id} className="option-item">
            <div className="option-number">
              {option.id}
            </div>
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              className="option-input"
              placeholder="Enter option text"
            />
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  checked={option.isCorrect}
                  onChange={() => handleCorrectChange(option.id)}
                  className="radio-input"
                />
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  checked={!option.isCorrect}
                  onChange={() => handleCorrectChange(option.id)}
                  className="radio-input"
                />
                No
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddOption}
        className="add-option-button"
      >
        + Add More option
      </button>

      <button className="submit-button">
        Ask Question
      </button>
    </div>
  );
};

export default PollComponent;