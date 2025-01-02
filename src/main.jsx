import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Register from './components/Register';
import Question from './components/Question';
import Teacher from './components/Teacher';
import Leave from './components/Leave';
import Layout from './components/Layout';
import PollHistory from './components/Pollhistory';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/student" element={<Register />} />
        <Route path="/question" element={<Question />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/polling/end" element={<Leave/>} />
        <Route path="/teacher/question" element={<Question />} />
        <Route path="/teacher/pollhistory" element={<PollHistory />} />
      </Routes>
    </Layout>
  </Router>
);
