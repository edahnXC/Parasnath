import React from 'react';
import HeroSection from '../components/HeroSection';
import InfoCards from '../components/InfoCards';
import MapPreview from '../components/MapPreview';
import { useAllAnimations } from '../hooks/useAnimations';
import '../styles/home.scss';

const Home = () => {
  useAllAnimations();

  return (
    <div className="home-page">
      <HeroSection 
        title="Welcome to Parasnath" 
        subtitle="The Sacred Jain Pilgrimage Site"
        imagePath="/images/mountain.jpeg"
      />
      
      <section className="intro-section reveal">
        <h2>About Parasnath Hill</h2>
        <p>
          Parasnath Hill, located in Giridih district of Jharkhand, India, is the highest mountain 
          in the state. It is an important Jain pilgrimage site with several temples atop the hill. 
          The hill is named after the 23rd Tirthankara, Parshvanatha.
        </p>
        <div className="image-grid">
          <img src="/images/temple 1.jpeg" alt="Temple 1" loading="lazy" className="reveal" />
          <img src="/images/temple 2.jpeg" alt="Temple 2" loading="lazy" className="reveal" />
          <img src="/images/ursi fall.jpeg" alt="Ursi Waterfall" loading="lazy" className="reveal" />
        </div>
      </section>

      <InfoCards className="reveal" />
      <MapPreview className="reveal" />
      
      <section className="video-section reveal">
        <h2>Experience Parasnath</h2>
        <div className="video-container">
          <video controls poster="/images/temple front.jpeg" className="reveal">
            <source src="/videos/view.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video controls poster="/images/temple below.jpeg" className="reveal">
            <source src="/videos/sunrise.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

export default Home;