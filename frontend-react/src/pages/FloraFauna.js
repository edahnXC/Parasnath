import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { FaTree, FaPaw, FaMountain, FaWater } from 'react-icons/fa';
import '../styles/floraFauna.scss';
import { useAllAnimations } from '../hooks/useAnimations';

const FloraFauna = () => {
  useAllAnimations();

  useEffect(() => {
    // Enhanced hover effects with animation
    const faunaItems = document.querySelectorAll('.fauna-category li');
    
    const handleMouseEnter = (e) => {
      const item = e.target;
      item.classList.add('hover-effect');
      item.style.transform = 'translateX(10px) translateZ(10px)';
      item.style.color = '#4a6b2a';
      item.style.fontWeight = 'bold';
      
      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      item.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };
    
    const handleMouseLeave = (e) => {
      const item = e.target;
      item.classList.remove('hover-effect');
      item.style.transform = '';
      item.style.color = '';
      item.style.fontWeight = '';
    };

    faunaItems.forEach(item => {
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      faunaItems.forEach(item => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="flora-fauna-page" style={{ width: '100%', maxWidth: '100%', padding: 0 }}>
  <HeroSection 
    title="Parasnath Wildlife Sanctuary" 
    subtitle="Biodiversity Hotspot of Jharkhand"
    imagePath="/images/mountain.jpeg"
    fullWidth={true}  // Add this prop
  />
      
      <section className="intro-section reveal">
        <h2 className="title-animate"><FaMountain className="icon pulse" /> Sanctuary Overview</h2>
        <p className="text-reveal">
          The Parasnath Wildlife Sanctuary, located in the Giridih district of Jharkhand, covers 49.33 square kilometers 
          of diverse ecosystems. Established as an Eco Sensitive Zone in 2019, it protects tropical dry and moist deciduous 
          forests along with their rich wildlife.
        </p>
      </section>

      <section className="flora-section">
        <div className="section-header reveal">
          <FaTree className="icon pulse" />
          <h2>Flora Diversity</h2>
        </div>
        
        <div className="content-box reveal">
          <div className="text-content">
            <h3>Dominant Tree Species</h3>
            <ul>
              <li><strong>Sal (Shorea robusta):</strong> The primary tree species forming dense forests</li>
              <li><strong>Bamboo (Bambusoideae):</strong> Thrives in the sanctuary's undergrowth</li>
              <li><strong>Shisham (Dalbergia sissoo):</strong> Found along water sources</li>
              <li><strong>Other species:</strong> Mahua, Pipal, and various medicinal plants</li>
            </ul>
            <p>
              These forests create a multi-layered ecosystem supporting diverse life forms from forest floor to canopy.
            </p>
          </div>
          <div className="image-content">
            <img src="/images/temple below.jpeg" alt="Forest view near temple" className="hover-zoom" />
          </div>
        </div>
      </section>

      <section className="fauna-section">
        <div className="section-header reveal">
          <FaPaw className="icon pulse" />
          <h2>Fauna Diversity</h2>
        </div>
        
        <div className="content-box reversed reveal">
          <div className="image-content">
            <img src="/images/mountain.jpeg" alt="Wildlife habitat" className="hover-zoom" />
          </div>
          <div className="text-content">
            <h3>Mammals of Parasnath</h3>
            <div className="fauna-grid">
              <div className="fauna-category">
                <h4>Predators</h4>
                <ul>
                  <li>Leopard</li>
                  <li>Sloth Bear</li>
                  <li>Jungle Cat</li>
                  <li>Hyena</li>
                </ul>
              </div>
              <div className="fauna-category">
                <h4>Herbivores</h4>
                <ul>
                  <li>Sambhar</li>
                  <li>Nilgai</li>
                  <li>Barking Deer</li>
                  <li>Wild Boar</li>
                </ul>
              </div>
              <div className="fauna-category">
                <h4>Others</h4>
                <ul>
                  <li>Langur</li>
                  <li>Rhesus Monkey</li>
                  <li>Mongoose</li>
                  <li>Porcupine</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="conservation-section">
        <div className="section-header reveal">
          <FaWater className="icon pulse" />
          <h2>Water Sources & Conservation</h2>
        </div>
        
        <div className="content-box reveal">
          <div className="text-content">
            <h3>Ursi Falls Ecosystem</h3>
            <p>
              The Ursi Waterfall and other perennial streams create vital microhabitats supporting:
            </p>
            <ul>
              <li>Riparian vegetation along water courses</li>
              <li>Aquatic and semi-aquatic species</li>
              <li>Critical watering holes for wildlife</li>
            </ul>
            <p>
              The 2019 ESZ notification prohibits mining and regulates construction within 500 meters of the sanctuary boundary.
            </p>
          </div>
          <div className="image-content">
            <img src="/images/ursi fall.jpeg" alt="Ursi Waterfall" className="hover-zoom" />
          </div>
        </div>
      </section>

      <section className="visit-info reveal">
        <h2>Visiting Information</h2>
        <div className="info-box">
          <p>
            <strong>Best Time to Visit:</strong> November to February for wildlife sightings<br />
            <strong>Entry Points:</strong> Madhuban and Isri<br />
            <strong>Activities:</strong> Nature trails, bird watching, temple visits<br />
            <strong>Note:</strong> Overnight stays not permitted in sanctuary
          </p>
        </div>
      </section>
    </div>
  );
};

export default FloraFauna;