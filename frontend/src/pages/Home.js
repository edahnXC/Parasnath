import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import InfoCards from '../components/InfoCards';
import MapPreview from '../components/MapPreview';
import { useAllAnimations } from '../hooks/useAnimations';
import { FaChevronDown, FaQuoteLeft, FaRegLightbulb } from 'react-icons/fa';
import '../styles/home.scss';

const Home = () => {
  useAllAnimations();
  const [activeTab, setActiveTab] = useState('history');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const facts = [
    "Parasnath Hill is the highest mountain in Jharkhand at 1,365 meters",
    "It's home to 20 Jain temples dedicated to different Tirthankaras",
    "The hill is named after the 23rd Tirthankara, Parshvanatha",
    "The annual Parasnath Ropeway project will be India's longest ropeway",
    "The hill is part of the Parasnath Wildlife Sanctuary"
  ];

  return (
    <div className="home-page">
      <HeroSection 
        title="Welcome to Parasnath" 
        subtitle="The Sacred Jain Pilgrimage Site"
        imagePath="/images/mountain.jpeg"
        fullWidth
      />
      
      <button 
        className={`scroll-down ${scrolled ? 'hidden' : ''}`}
        onClick={() => scrollToSection('intro')}
        aria-label="Scroll down"
      >
        <FaChevronDown className="bounce" />
      </button>
      
      <section id="intro" className="intro-section reveal">
        <h2>About Parasnath Hill</h2>
        <p>
          Parasnath Hill, located in Giridih district of Jharkhand, India, is the highest mountain 
          in the state. It is an important Jain pilgrimage site with several temples atop the hill. 
          The hill is named after the 23rd Tirthankara, Parshvanatha.
        </p>
        
        <div className="tabs-container reveal">
          <div className="tabs-header">
            <button 
              className={activeTab === 'history' ? 'active' : ''}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
            <button 
              className={activeTab === 'significance' ? 'active' : ''}
              onClick={() => setActiveTab('significance')}
            >
              Significance
            </button>
            <button 
              className={activeTab === 'geography' ? 'active' : ''}
              onClick={() => setActiveTab('geography')}
            >
              Geography
            </button>
          </div>
          <div className="tabs-content">
            {activeTab === 'history' && (
              <p>
                Parasnath Hill has been a sacred site for Jains for over 2,000 years. 
                The temples were built between the 18th and 19th centuries. 
                The hill gets its name from Lord Parshvanatha, the 23rd Tirthankara.
              </p>
            )}
            {activeTab === 'significance' && (
              <p>
                For Jains, Parasnath Hill is one of the most important pilgrimage sites. 
                It's believed that 20 of the 24 Tirthankaras attained Nirvana here. 
                The hill attracts thousands of pilgrims annually.
              </p>
            )}
            {activeTab === 'geography' && (
              <p>
                At 1,365 meters, it's the highest mountain in Jharkhand. 
                The hill is part of the Parasnath Wildlife Sanctuary, home to diverse flora and fauna. 
                The terrain is rugged with dense forests.
              </p>
            )}
          </div>
        </div>
        
        <div className="image-grid">
          <div 
            className="image-card reveal"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img src="/images/temple 1.jpeg" alt="Temple 1" loading="lazy" />
            {hoveredCard === 1 && (
              <div className="image-overlay">
                <h3>Shri Samosharan Temple</h3>
                <p>The most prominent temple on Parasnath Hill</p>
              </div>
            )}
          </div>
          <div 
            className="image-card reveal"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img src="/images/temple 2.jpeg" alt="Temple 2" loading="lazy" />
            {hoveredCard === 2 && (
              <div className="image-overlay">
                <h3>Bhomiya Ji Temple</h3>
                <p>Known for its beautiful architecture</p>
              </div>
            )}
          </div>
          <div 
            className="image-card reveal"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img src="/images/ursi fall.jpeg" alt="Ursi Waterfall" loading="lazy" />
            {hoveredCard === 3 && (
              <div className="image-overlay">
                <h3>Ursi Waterfall</h3>
                <p>Beautiful waterfall near Parasnath Hill</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="facts-section reveal">
        <div className="facts-container">
          <FaRegLightbulb className="facts-icon" />
          <h2>Did You Know?</h2>
          <div className="facts-carousel">
            {facts.map((fact, index) => (
              <div key={index} className="fact-item">
                <FaQuoteLeft className="quote-icon" />
                <p>{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InfoCards className="reveal" />
      <MapPreview className="reveal" />
      
      <section className="video-section reveal">
        <h2>Experience Parasnath</h2>
        <div className="video-container">
          <div className="video-card">
            <video controls poster="/images/temple front.jpeg" className="reveal">
              <source src="/images/view.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Panoramic view from the hilltop</p>
          </div>
          <div className="video-card">
            <video controls poster="/images/temple below.jpeg" className="reveal">
              <source src="/images/sunrise.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Sunrise at Parasnath</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;