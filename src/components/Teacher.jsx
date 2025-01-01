import React, { useEffect, useState } from 'react';
import "../index.css";

const Teacher = () => {
  const [options, setOptions] = useState([
    { id: 1, text: 'Rahul Bajaj' },
    { id: 2, text: 'Rahul Bajaj' }
  ]);
  const [question, setQuestion] = useState('');
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

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleTimeChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setSelectedTime(newTime);
    setTimeLeft(newTime);
  };

  return (
    <div className="container-teacher">
      <div className="pollBadge">
        <div className="badge">Intervue Poll</div>
      </div>

      <div className="header">
        <h1 className="title">Let's <span>Get Started</span></h1>
        <p className="subtitle">
          you'll have the ability to create and manage polls, ask questions, and monitor
          your students' responses in real-time.
        </p>
      </div>

      <div className="content">
        <div className="questionSection">
          <div className="questionHeader">
            <label className="label">Enter your question</label>
            <div className="timer" onChange={handleTimeChange}>
          <select value={selectedTime} className="timerDropdown">
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={90}>90 seconds</option>
          </select>
          <span className="arrow">▼</span>
        </div>
          </div>

          <div className="inputContainer">
            <input 
              type="text" 
              value={question}
              onChange={handleQuestionChange}
              placeholder="Rahul Bajaj"
              className="input"
            />
            <div className="counter">{question.length}/100</div>
          </div>
        </div>

        <div className="grid">
          <div className="optionsSection">
            <h3 className="sectionTitle">Edit Options</h3>
            {options.map((option, index) => (
              <div key={option.id} className="optionItem">
                <span className="optionNumber">{index + 1}</span>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index].text = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="optionInput"
                />
              </div>
            ))}
            <button 
              className="addButton"
              onClick={() => setOptions([...options, { id: options.length + 1, text: '' }])}
            >
              + Add More option
            </button>
          </div>

          <div className="correctSection">
            <h3 className="sectionTitle">Is it Correct?</h3>
            <div className="radioGroup">
              {options.map((option, index) => (
                <div key={option.id} className="radioOption">
                  <input 
                    type="radio" 
                    name="correct" 
                    value={option.id.toString()} 
                    id={`option-${option.id}`} 
                    defaultChecked={index === 0}
                  />
                  <label htmlFor={`option-${option.id}`}>
                    {index === 0 ? 'Yes' : 'No'}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer">
          <button className="submitButton">Ask Question</button>
        </div>
      </div>
    </div>
  );
};

export default Teacher;