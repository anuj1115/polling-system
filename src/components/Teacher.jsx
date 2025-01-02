import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import '../index.css';

const TeacherPollComponent = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { id: 1, text: '', isCorrect: true },
    { id: 2, text: '', isCorrect: false }
  ]);
  const [timeLimit, setTimeLimit] = useState('60');

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, {
        id: options.length + 1,
        text: '',
        isCorrect: false
      }]);
    }
  };

  const handleOptionChange = (id, text) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text } : option
    ));
  };

  const handleCorrectChange = (id, isCorrect) => {
    setOptions(options.map(option => 
      ({ ...option, isCorrect: option.id === id && isCorrect })
    ));
  };

  return (
    <div className="container-teacher">
      <div className="pollBadge">
        <div className="badge">
          Intervue Poll
        </div>
      </div>

      <div className="header">
        <h1 className="title">Let's <span>Get Started</span></h1>
        <p className="subtitle">
          You'll have the ability to create and manage polls, ask questions, and monitor
          your students' responses in real-time.
        </p>
      </div>

      <div className="questionSection">
        <div className="questionHeader">
          <span className="label">Enter your question</span>
          <div className="timer">
            <Clock size={16} className="arrow" />
            <select 
              className="timerDropdown"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            >
              <option value="30">30 seconds</option>
              <option value="60">60 seconds</option>
              <option value="90">90 seconds</option>
            </select>
          </div>
        </div>

        <div className="inputContainer">
          <textarea
            className="input"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={100}
          />
          <div className="counter">{question.length}/100</div>
        </div>
      </div>

      <div className="grid">
        <div className='section'>
          <h3 className="sectionTitle">Edit Options</h3>
          <h3 className="sectionTitle">Is it Correct ?</h3>
        </div>
        <div className="optionsSection">
          {options.map((option) => (
            <div key={option.id} className="optionItem">
              <div className="optionNumber">{option.id}</div>
              <input
                type="text"
                className="optionInput"
                placeholder="Type your option"
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
              />
              <div className="correctAnswerGroup">
                <label className="radioOption">
                  <input
                    type="radio"
                    name={`correct-${option.id}`}
                    checked={option.isCorrect}
                    onChange={() => handleCorrectChange(option.id, true)}
                  />
                  Yes
                </label>
                <label className="radioOption">
                  <input
                    type="radio"
                    name={`correct-${option.id}`}
                    checked={!option.isCorrect}
                    onChange={() => handleCorrectChange(option.id, false)}
                  />
                  No
                </label>
              </div>
            </div>
          ))}
          <button onClick={handleAddOption} className="addButton">
            + Add More option
          </button>
        </div>

        <div className="footer">
          <button className="submitButton">
            Ask Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherPollComponent;
