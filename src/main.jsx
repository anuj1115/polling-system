import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Register from './components/Register';
import Question from './components/Question';
import Teacher from './components/Teacher';
import Leave from './components/Leave';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/student" element={<Register />} />
      <Route path="/teacher" element={<Teacher />} /> {/* Add route for Teacher component */}
      <Route path="/question/:id" element={<Question />} />
      <Route path="/polling/end" element={<Leave/>} />
    </Routes>
  </Router>
);
