import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';

const Header = () => {
  const scriptRef = useRef(null);

  useEffect(() => {
    // Only load the Google Translate script if it hasn't been added yet
    if (!window.google || !window.google.translate) {
      const script = document.createElement('script');
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      scriptRef.current = script; // Store reference to the script

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,es,fr,de,it,ja,ko,zh-CN,ru,ar,pt,gu,mr', // Added Gujarati and Marathi
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false, // Prevent auto-display
        }, 'google_translate_element');
      };
    }

    // Cleanup: Remove the script when the component unmounts
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null; // Clear the reference
      }
    };
  }, []); // Empty dependency array to run once when the component mounts

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

      {/* Google Translate Widget */}
      <div id="google_translate_element" className="google-translate-widget"></div>
    </header>
  );
};

export default Header;
