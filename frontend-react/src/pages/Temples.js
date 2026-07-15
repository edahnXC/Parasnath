import React, { useState, useEffect } from 'react';
import { useAllAnimations } from '../hooks/useAnimations';
import TempleDetails from '../components/TempleDetails';
import TempleCard from '../components/TempleCard';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../styles/temples.scss';

const mockTemples = [
  {
    _id: '1',
    name: 'Shikharji Temple',
    location: 'Parasnath Hill, Giridih, Jharkhand',
    description: 'Shikharji is one of the most sacred pilgrimage sites for Jains, believed to be the place where 20 of the 24 Jain Tirthankaras attained moksha. The main temple complex features beautiful marble carvings and offers panoramic views of the surrounding landscape.',
    imagePath: '/images/1st temple.png',
    significance: 'Considered the most important Jain pilgrimage site after Sammed Shikharji. The temples mark the spots where Tirthankaras achieved enlightenment.',
    architecture: 'Traditional Jain temple architecture with marble carvings, domes, and intricate designs.',
    bestTimeToVisit: 'October to March',
    facilities: 'Accommodation, food, guided tours',
    shortDescription: 'The most sacred Jain pilgrimage site with 20 Tirthankaras attaining moksha here',
    tags: ['main', 'sacred', 'viewpoint']
  },
  {
    _id: '2',
    name: 'Bhomia Baba Temple',
    location: 'Near Shikharji peak, Parasnath Hill',
    description: 'This ancient temple is dedicated to Bhomia Baba, a revered figure in Jainism. The temple is known for its peaceful atmosphere and unique stone carvings that depict various Jain legends.',
    imagePath: '/images/2nd temple.png',
    significance: 'Important stop on the Parasnath pilgrimage route, known for its spiritual energy.',
    architecture: 'Stone construction with traditional carvings, smaller in size compared to main temples.',
    bestTimeToVisit: 'Year-round, but especially during Jain festivals',
    facilities: 'Basic amenities',
    shortDescription: 'Ancient temple dedicated to Bhomia Baba with unique stone carvings',
    tags: ['ancient', 'peaceful', 'carvings']
  },
  {
    _id: '3',
    name: 'Gandharva Nala Temple',
    location: 'Western slope of Parasnath Hill',
    description: 'This picturesque temple is situated near a natural spring and is surrounded by lush greenery. It features beautiful frescoes depicting scenes from Jain scriptures.',
    imagePath: '/images/3rd temple.png',
    significance: 'Known for its natural beauty and the sacred spring whose waters are considered holy.',
    architecture: 'Combination of marble and stone with detailed fresco work.',
    bestTimeToVisit: 'Monsoon and winter seasons',
    facilities: 'Rest areas, drinking water',
    shortDescription: 'Picturesque temple near a natural spring with beautiful frescoes',
    tags: ['nature', 'spring', 'frescoes']
  }
];

const Temples = () => {
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTemple, setSelectedTemple] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    
    useAllAnimations();
  
    useEffect(() => {
      const fetchTemples = async () => {
        try {
          // Simulate API call with delay
          await new Promise(resolve => setTimeout(resolve, 800));
          setTemples(mockTemples);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching temples:', err);
          setError('Failed to load temple data. Please try again later.');
          setLoading(false);
        }
      };
  
      fetchTemples();
    }, []);

    const filteredTemples = temples.filter(temple => {
      const matchesSearch = temple.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          temple.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          temple.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || 
                           (temple.tags && temple.tags.includes(activeFilter));
      
      return matchesSearch && matchesFilter;
    });

    const uniqueTags = ['all', ...new Set(temples.flatMap(temple => temple.tags || []))];
  
    const handleLearnMore = (temple) => {
      setSelectedTemple(temple);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    const handleCloseDetails = () => {
      setSelectedTemple(null);
    };

    const clearSearch = () => {
      setSearchTerm('');
    };
  
    return (
      <div className="temples-page">
        <header className="temples-header reveal">
          <h1>Jain Temples of Parasnath</h1>
          <p className="subtitle">Sacred pilgrimage sites on Parasnath Hill</p>
          
          {/* Search and Filter Section */}
          <div className="search-filter-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search temples..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={clearSearch}>
                  <FaTimes />
                </button>
              )}
            </div>
            
            <div className="filter-tags">
              {uniqueTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-btn ${activeFilter === tag ? 'active' : ''}`}
                  onClick={() => setActiveFilter(tag)}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </header>
        
        {selectedTemple ? (
          <TempleDetails 
            temple={selectedTemple} 
            onClose={handleCloseDetails}
          />
        ) : (
          <>
            {loading ? (
              <div className="loading-spinner reveal">
                <div className="spinner"></div>
                <p>Loading temples...</p>
              </div>
            ) : error ? (
              <div className="error-message reveal">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
              </div>
            ) : (
              <div className="temples-container">
                {filteredTemples.length > 0 ? (
                  <>
                    <div className="temples-grid">
                      {filteredTemples.map((temple, index) => (
                        <TempleCard 
                          key={temple._id} 
                          temple={temple} 
                          className="reveal"
                          style={{ transitionDelay: `${index * 0.1}s` }}
                          onLearnMore={() => handleLearnMore(temple)}
                        />
                      ))}
                    </div>
                    <div className="temples-info reveal">
                      <h2>About Parasnath Temples</h2>
                      <p>
                        The temples on Parasnath Hill are among the most sacred sites in Jainism. 
                        The hill is named after Parshvanatha, the 23rd Tirthankara, and is believed 
                        to be the place where 20 of the 24 Tirthankaras attained moksha (liberation).
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="no-results reveal">
                    <h3>No temples found matching your search</h3>
                    <button 
                      className="reset-filters"
                      onClick={() => {
                        setSearchTerm('');
                        setActiveFilter('all');
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  };
  
  export default Temples;