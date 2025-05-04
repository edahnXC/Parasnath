import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Parasnath</h3>
          <p>Parasnath Hill is the highest mountain in Jharkhand and an important Jain pilgrimage site.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/temples">Temples</Link></li>
            <li><Link to="/trekking">Trekking</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Email: info@parasnath.com</p>
          <p>Phone: +91 XXXXXXXXXX</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Parasnath Tourism. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;