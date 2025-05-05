import React, { useState, useEffect } from 'react';
import { useAllAnimations } from '../hooks/useAnimations';
import '../styles/gallery.scss';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  useAllAnimations();
  
  // Images for the hero slideshow
  const heroImages = [
    '/images/temple 1.jpeg',
    '/images/temple 2.jpeg',
    '/images/temple 3.jpeg',
    '/images/temple 4.jpeg',
    '/images/temple front.jpeg',
    '/images/temple below.jpeg',
    '/images/mountain.jpeg'
  ];

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Gallery items
  const galleryItems = [
    { id: 1, category: 'mountain', src: '/images/mountain.jpeg', alt: 'Parasnath Mountain View' },
    { id: 2, category: 'rocks', src: '/images/rocks.jpeg', alt: 'Rock formations' },
    { id: 3, category: 'temples', src: '/images/temple 1.jpeg', alt: 'Temple 1' },
    { id: 4, category: 'temples', src: '/images/temple 2.jpeg', alt: 'Temple 2' },
    { id: 5, category: 'temples', src: '/images/temple 3.jpeg', alt: 'Temple 3' },
    { id: 6, category: 'temples', src: '/images/temple 4.jpeg', alt: 'Temple 4' },
    { id: 7, category: 'temples', src: '/images/temple below.jpeg', alt: 'Temple from below' },
    { id: 8, category: 'temples', src: '/images/temple front.jpeg', alt: 'Temple front view' },
    { id: 9, category: 'waterfall', src: '/images/ursi fall.jpeg', alt: 'Ursi Waterfall' },
    { 
      id: 10, 
      category: 'videos', 
      src: '/images/view.mp4', 
      alt: 'Panoramic view video',
      type: 'video'
    },
    { 
      id: 11, 
      category: 'videos', 
      src: '/images/sunrise.mp4', 
      alt: 'Sunrise time-lapse',
      type: 'video'
    }
  ];

  // Auto-rotate hero images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="gallery-page">
      {/* Custom Hero Section with Slideshow */}
      <div className="gallery-hero">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentHeroImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">Gallery</h1>
              <p className="hero-subtitle">Visual journey of Parasnath</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="gallery-controls reveal">
        <button 
          onClick={() => setActiveCategory('all')} 
          className={activeCategory === 'all' ? 'active pulse-on-hover' : 'pulse-on-hover'}
        >
          All
        </button>
        <button 
          onClick={() => setActiveCategory('temples')} 
          className={activeCategory === 'temples' ? 'active pulse-on-hover' : 'pulse-on-hover'}
        >
          Temples
        </button>
        <button 
          onClick={() => setActiveCategory('mountain')} 
          className={activeCategory === 'mountain' ? 'active pulse-on-hover' : 'pulse-on-hover'}
        >
          Mountain
        </button>
        <button 
          onClick={() => setActiveCategory('waterfall')} 
          className={activeCategory === 'waterfall' ? 'active pulse-on-hover' : 'pulse-on-hover'}
        >
          Waterfall
        </button>
        <button 
          onClick={() => setActiveCategory('videos')} 
          className={activeCategory === 'videos' ? 'active pulse-on-hover' : 'pulse-on-hover'}
        >
          Videos
        </button>
      </div>

      <div className="gallery-grid reveal">
        {filteredItems.map(item => (
          <div key={item.id} className="gallery-item">
            {item.type === 'video' ? (
              <video controls className="media-item">
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={item.src} alt={item.alt} className="media-item" />
            )}
            <div className="caption">{item.alt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;