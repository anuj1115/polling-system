import React, { useState, useEffect } from 'react';
import star from '../assets/Vector.png';
import Question from './Question';
import { useNavigate } from 'react-router-dom';
import questions from '../data/Questions'; // Import the static questions data
import ChatBox from '../components/Chatbot'; // Import the ChatBox component

function Register() {
  const [showLoader, setShowLoader] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [questionsState, setQuestionsState] = useState([]);
  const [userName, setUserName] = useState(''); // State to capture user name
  const navigate = useNavigate();

  useEffect(() => {
    // Load questions into state
    setQuestionsState(questions);
  }, []);

  const handleContinue = () => {
    if (questionsState.length > 0) {
      const randomQuestion = questionsState[Math.floor(Math.random() * questionsState.length)];
      navigate(`/question/${randomQuestion.id}`);
    } else {
      alert("No questions available.");
    }
  };

  const handleLoader = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setShowContent(true);
    }, 2000); // Show loader for 2 seconds
  };

  return (
    <div className="container">
      {showLoader ? (
        <div className="loader-container">
          <button className="badge">
            <img src={star} alt="star" className="icon" />
            Intervue Poll
          </button>
          <div className="loader">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="instruction">Wait for the teacher to ask questions..</p>
          </div>
        </div>
      ) : showContent ? (
        <div className="content-container">
          <Question />
        </div>
      ) : (
        <>
        <div className='register-main'>
          <button className="badge">
            <img src={star} alt="star" className="icon" />
            Intervue Poll
          </button>

          <main className="register-main">
            <h1>
              Let’s <span className="highlight">Get Started</span>
            </h1>
            <p>
              If you’re a student, you’ll be able to{' '}
              <span className="highlight">submit your answers</span>, participate in live polls,
              and see how your responses compare with your classmates.
            </p>

            <div className="input-container">
              <label htmlFor="name">Enter your Name</label>
              <input
                type="text"
                id="name"
                placeholder="Rahul Bajaj"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <button className="continue-button-rg" onClick={handleLoader}>
              Continue
            </button>
          </main>
        </div>
        </>
      )}
      {/* Render ChatBox component */}
      <ChatBox userName={userName} />
    </div>
  );
}

export default Register;
