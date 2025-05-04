import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Parasnath</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/temples">Temples</Link></li>
          <li><Link to="/trekking">Trekking</Link></li>
          <li><Link to="/flora-fauna">Flora & Fauna</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;