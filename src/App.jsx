import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import star from "./assets/Vector.png";

const App = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "teacher") {
      navigate("/teacher");
    } else if (selectedRole === "student") {
      navigate("/student");
    } else {
      alert("Please select a role to continue.");
    }
  };

  return (
    <div className="container">
      <header>
        <button className="badge">
          <img src={star} alt="star" className="icon" />
          Intervue Poll
        </button>
      </header>
      <main>
        <h1 className="heading">
          Welcome to the <span className="highlight">Live Polling System</span>
        </h1>
        <p>
          Please select the role that best describes you to begin using the live
          polling system
        </p>
        <div className="role-cards">
          <div
            className={`role-card ${
              selectedRole === "student" ? "selected" : ""
            }`}
            onClick={() => handleSelection("student")}
          >
            <h2>I’m a Student</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
          </div>
          <div
            className={`role-card ${
              selectedRole === "teacher" ? "selected" : ""
            }`}
            onClick={() => handleSelection("teacher")}
          >
            <h2>I’m a Teacher</h2>
            <p>Submit answers and view live poll results in real-time.</p>
          </div>
        </div>
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </main>
    </div>
  );
};

export default App;