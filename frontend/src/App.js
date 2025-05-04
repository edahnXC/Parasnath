import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Temples from './pages/Temples';
import Trekking from './pages/Trekking';
import FloraFauna from './pages/FloraFauna';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import { useAllAnimations } from './hooks/useAnimations';
import './styles/main.scss';

function App() {
  // Initialize all animations
  useAllAnimations();

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/temples" element={<Temples />} />
            <Route path="/trekking" element={<Trekking />} />
            <Route path="/flora-fauna" element={<FloraFauna />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;