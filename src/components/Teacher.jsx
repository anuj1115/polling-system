import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import '../index.css';
import star from '../assets/Vector.png';
import Question from './Question';

const Teacher = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { id: 1, text: '', isCorrect: true },
    { id: 2, text: '', isCorrect: false }
  ]);
  const [timeLimit, setTimeLimit] = useState('60');
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60); // Default timer starts at 60 seconds
  const [selectedTime, setSelectedTime] = useState(60);



  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount or timeLeft update
    }
  }, [timeLeft]);

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

  const handleSubmit = () => {
    navigate('/teacher/question', { state: { question, options, timeLimit: selectedTime , isNewQuestion: true } }); // Navigate to the new URL with state
  };

  return (
    <div className="container-teacher">
      <div className="pollBadge">
        <div className="badge">
          <img src={star} alt="star" className="icon" />
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
          <button className="submitButton" onClick={handleSubmit}>Ask Question</button>
        </div>
      </div>
    </div>
  );
};

export default Teacher;