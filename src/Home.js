import React from 'react';
import ChatAI from './ChatAI';

const Home = () => {
  return (
    
    <div className="Home">
      <h2>Welcome To our shop</h2>
      <br></br>
      <p className="home-description">Here you can buy or sell spare parts</p>
      <br></br>
      <br></br>
      <p className="ai-assistant-description">You can try our AI assistant here. It will help you understand what you need and what price you can get it.</p>
      <ChatAI />
      <div className="banner"></div>
    </div>
    
  );
};

export default Home;
