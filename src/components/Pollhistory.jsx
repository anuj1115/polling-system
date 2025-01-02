import React from "react";
import Question from "./Question";

const PollHistory = () => {
  const questions = [
    {
        id:1,
      question: "What is your favorite color?",
      options: ["Red", "Blue", "Green", "Yellow"],
      timeLimit: 60,
      isNewQuestion: false,
    },
    {
      id:2,
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
      timeLimit: 60,
      isNewQuestion: true,
    },
  ];

  return (
    <div className="body-poll">
        <div className="poll-history-container">
        <div className="poll-history-header">
            <label className="poll-history-label">
                View <span>Poll History</span>
            </label>
        </div>
        {questions.map((q) => (
            <Question key={q.id} state={q} isPollHistory={true}/>
        ))}
        </div>
    </div>
  );
};

export default PollHistory;