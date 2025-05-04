import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import '../styles/gallery.scss';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
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

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="gallery-page">
      <HeroSection 
        title="Gallery" 
        subtitle="Visual journey of Parasnath"
        imagePath="/images/mountain.jpeg"
      />
      
      <div className="gallery-controls">
        <button onClick={() => setActiveCategory('all')} className={activeCategory === 'all' ? 'active' : ''}>
          All
        </button>
        <button onClick={() => setActiveCategory('temples')} className={activeCategory === 'temples' ? 'active' : ''}>
          Temples
        </button>
        <button onClick={() => setActiveCategory('mountain')} className={activeCategory === 'mountain' ? 'active' : ''}>
          Mountain
        </button>
        <button onClick={() => setActiveCategory('waterfall')} className={activeCategory === 'waterfall' ? 'active' : ''}>
          Waterfall
        </button>
        <button onClick={() => setActiveCategory('videos')} className={activeCategory === 'videos' ? 'active' : ''}>
          Videos
        </button>
      </div>

      <div className="gallery-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="gallery-item">
            {item.type === 'video' ? (
              <video controls>
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={item.src} alt={item.alt} />
            )}
            <div className="caption">{item.alt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;