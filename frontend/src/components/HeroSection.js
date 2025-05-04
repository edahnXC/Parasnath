import React from 'react';
import '../styles/hero.scss';

const HeroSection = ({ title, subtitle, imagePath }) => {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${imagePath})` }}>
      <div className="hero-overlay">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSection;