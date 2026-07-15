import React, { useEffect, useState } from 'react';
import '../styles/hero.scss';

const HeroSection = ({ title, subtitle, imagePath, fullWidth = false, isSlideshow = false, slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (isSlideshow && slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isSlideshow, slides.length]);

  return (
    <div className={`hero-section ${fullWidth ? 'full-width' : ''}`}>
      {isSlideshow ? (
        slides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))
      ) : (
        <div 
          className="hero-slide active"
          style={{ backgroundImage: `url(${imagePath})` }}
        />
      )}
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSection;