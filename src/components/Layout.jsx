import React from 'react';
import Chatbot from './Chatbot';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const showChatbot = location.pathname !== '/teacher' && location.pathname !== '/';
  return (
    <div>
      {children}
      {showChatbot && <Chatbot />}
    </div>
  );
};

export default Layout;