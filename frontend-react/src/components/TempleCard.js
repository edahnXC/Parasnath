import React from 'react';
import { motion } from 'framer-motion';
import '../styles/templeCard.scss';

const TempleCard = ({ temple, isHovered, onLearnMore }) => {
  return (
    <motion.div 
      className="temple-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="temple-image"
        style={{ backgroundImage: `url(${temple.imagePath})` }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      />
      <div className="temple-info">
        <h3>{temple.name}</h3>
        <p className="location">{temple.location}</p>
        <p className="description">{temple.shortDescription}</p>
        <motion.button
          className="learn-more"
          onClick={() => onLearnMore(temple)}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: '#5a7b3a'
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: isHovered ? '#5a7b3a' : '#4a6b2a'
          }}
          transition={{ duration: 0.2 }}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TempleCard;