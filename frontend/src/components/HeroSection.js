import React from 'react';
import '../styles/hero.scss';

const HeroSection = ({ title, subtitle, imagePath, fullWidth = false }) => {
  return (
    <div 
      className={`hero-section ${fullWidth ? 'full-width' : ''}`}
      style={{ backgroundImage: `url(${imagePath})` }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSection;