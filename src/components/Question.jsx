import React, { useState, useEffect } from "react";
import "../index.css";
import questions from "../data/Questions";
import timer from "../assets/timer-icon.png";
import { useLocation , useNavigate} from "react-router-dom";
import { Eye } from "lucide-react";

const Question = (isPollHistory) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showPercentage, setShowPercentage] = useState(false);
  const location = useLocation();
  const { state } = location;
  const { question, options, timeLimit, isNewQuestion } = state || {};

  const handleAskNewQuestion = () => {
    navigate('/teacher');
  };

  const questionData = questions[currentQuestionIndex];

  const isStudentQuestionRoute = location.pathname.startsWith('/question');

  const mockPercentages = questions.map(
    (q) => q.options.map(() => Math.floor(Math.random() * 100))
  );

  useEffect(() => {
    if (timeLeft > 0 && !showPercentage) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showPercentage]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    setShowPercentage(true);
  };

  const handleViewPollHistory = () => {
    navigate('/teacher/pollhistory');
  };

  return (
    <div className="body-wrapper">
      <div className="poll-history">
        {isNewQuestion &&(
          <button className="poll-button" onClick={handleViewPollHistory}>
           <Eye className="eye-icon" />
           <span>view poll history</span>
          </button>
        )}
      </div>
      <div className="main-question-container">
        <div className="question-header">
          <span className="question-count">
            Question {currentQuestionIndex + 1}
          </span>
          {!isPollHistory || isStudentQuestionRoute && <div className="timer">
            <span role="img" aria-label="timer">
              <img src={timer} alt="timer icon" />
            </span>{" "}
            {`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
          </div>}
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
                disabled={showPercentage}
                style={{
                  background: showPercentage
                    ? selectedOption === option
                      ? `linear-gradient(to right, #7765DA ${mockPercentages[currentQuestionIndex][index]}%, #e0e0e0 0%)`
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
        
        {!showPercentage && isStudentQuestionRoute && (
          <div className="submit-button-container">
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
        {!showPercentage && isPollHistory && isNewQuestion && (
          <div className="submit-button-container">
            <button className="new-button" onClick={handleAskNewQuestion}>
              + Ask a new question
            </button>
          </div>
        )}
      </div>
      {showPercentage && (
        <div className="percentage-display">
          Wait for the teacher to ask a new question..
        </div>
      )}
    </div>
  );
};

export default Question;
