import React, { useState, useEffect } from "react";
import "../index.css"; // Ensure you include the CSS
import questions from "../data/Questions"; // Import static questions data
import timer from "../assets/timer-icon.png"; // Import the timer icon

const Question = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds
  const [showPercentage, setShowPercentage] = useState(false);
<<<<<<< HEAD
=======

  // Mock data: Percentage of students who selected each option
  const mockPercentages = questions.map((q) =>
    q.options.map(() => Math.floor(Math.random() * 100)) // Random percentages for each option
  );
>>>>>>> 273ebeb4588471d7f4d682b16b6eb76be20bca3f

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

<<<<<<< HEAD
  const handleSubmit = () => {
    setShowPercentage(true); // Show the percentage of students who selected each answer
=======
  const handleNextQuestion = () => {
    // Reset timer and move to the next question
    setTimeLeft(60); // Reset timer to 60 seconds
    setSelectedOption(null); // Reset selected option
    setShowPercentage(false); // Hide percentages for the next question
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
>>>>>>> 273ebeb4588471d7f4d682b16b6eb76be20bca3f
  };

  const handleSubmit = () => {
    setShowPercentage(true); // Show the percentage of students who selected each answer
  };

  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> 273ebeb4588471d7f4d682b16b6eb76be20bca3f
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
<<<<<<< HEAD
        {!showPercentage && (
          <div className="submit-button-container">
            <button className="submit-button" onClick={handleSubmit}>
              Submit
=======
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
                  ? `linear-gradient(to right, #7765DA ${
                      mockPercentages[currentQuestionIndex][index]
                    }%, #e0e0e0 0%)`
                  : "#ffffff",
              }}
              
            >
              <span className="option-text">{option}</span>
              {showPercentage && (
                <span className="percentage-text">
                  {mockPercentages[currentQuestionIndex][index]}%
                </span>
              )}
>>>>>>> 273ebeb4588471d7f4d682b16b6eb76be20bca3f
            </button>
          </div>
        )}
      </div>
<<<<<<< HEAD
      {showPercentage && (
        <p className="teacher-message">
          Wait for the teacher to ask for a new question...
        </p>
      )}
    </>
=======
      <div className="submit-button-container">
        {showPercentage ? (
          <button className="next-button" onClick={handleNextQuestion}>
            Next
          </button>
        ) : (
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
>>>>>>> 273ebeb4588471d7f4d682b16b6eb76be20bca3f
  );
};

export default Question;
