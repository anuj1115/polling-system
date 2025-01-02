import React from 'react';
import '../index.css';
import star from '../assets/Vector.png';


const Leave = () => {
  return (
    <div className="kicked-out-container">
        <div className='message-box'>
        <button className="badge">
                      <img src={star} alt="star" className="icon" />
                      Intervue Poll
          </button>
        <h1 className="title">You've been Kicked out!</h1>
        
        <p className="description">
          Looks like the teacher had removed you from the poll system.
          Please Try again sometime.
        </p>
        </div>
    </div>
  );
};

export default Leave;