import React from "react";
import "./HomeHero.css";

const Home = () => (
  <div className="hero-root">
    <div className="hero-content">
      <h1>LexiScan</h1>
      <h2>AI-powered dyslexia marker</h2>
      <p>
        LexiScan uses machine learning to analyze handwriting and highlight areas with potential dyslexia markers.<br />
        Upload a photo and get instant, actionable insights.
      </p>
      <a href="/login" className="hero-launch-btn">Get Started</a>
    </div>
    <div className="hero-bg"></div>
  </div>
);

export default Home;