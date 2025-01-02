import React, { useState, useEffect } from "react";
import "../index.css"; // Ensure you include the CSS
import questions from "../data/Questions"; // Import static questions data
import timer from "../assets/timer-icon.png"; // Import the timer icon

const Question = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds
  const [showPercentage, setShowPercentage] = useState(false);

  // Access the current question based on the current index
  const questionData = questions[currentQuestionIndex];

  // Mock data: Percentage of students who selected each option
  const mockPercentages = questions.map((q) =>
    q.options.map(() => Math.floor(Math.random() * 100)) // Random percentages for each option
  );

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft > 0 && !showPercentage) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount or timeLeft update
    }
  }, [timeLeft, showPercentage]);

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Set the selected option
  };

  const handleSubmit = () => {
    setShowPercentage(true); // Show the percentage of students who selected each answer
  };

  return (
    <>
      <div className="question-wrapper">
        <div className="question-header">
          <span className="question-count">
            Question {currentQuestionIndex + 1}
          </span>
          <div className="timer">
            <span role="img" aria-label="timer">
              <img src={timer} alt="timer icon" />
            </span>{" "}
            {`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
          </div>
        </div>
        <div className="question-container">
          <div className="question-title">
            <h2>{questionData.title}</h2>
          </div>
          <div className="options">
            {questionData.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={showPercentage} // Disable options if percentages are shown
                style={{
                  background: showPercentage
                    ? selectedOption === option
                      ? `linear-gradient(to right, #7765DA ${
                          mockPercentages[currentQuestionIndex][index]
                        }%, #e0e0e0 0%)`
                      : "#e0e0e0"
                    : "#ffffff",
                }}
              >
                <span
                  className={`option-number ${
                    selectedOption === option ? "selected" : ""
                  }`}
                >
                  {index + 1}
                </span>
                {option}
                {showPercentage && selectedOption === option && (
                  <span className="percentage-text">
                    {mockPercentages[currentQuestionIndex][index]}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        {!showPercentage && (
          <div className="submit-button-container">
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
      {showPercentage && (
        <p className="teacher-message">
          Wait for the teacher to ask for a new question...
        </p>
      )}
    </>
  );
};

export default Question;
