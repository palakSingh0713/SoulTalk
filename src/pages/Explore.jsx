const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from 'react';
import { Search, Plus, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import { useFavorites } from '../hooks/useFavorites';
import CharacterGrid from '../components/characters/CharacterGrid';
import { CHARACTERS } from '../utils/constants';

const Explore = () => {

  const navigate = useNavigate();
  const { selectCharacter } = useChat();
  const { favorites } = useFavorites();

  const [searchQuery, setSearchQuery] = useState('');
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const personalities = ['all', 'empathetic', 'nurturing', 'motivating', 'wise'];

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    const customCharacters = JSON.parse(localStorage.getItem('custom_characters') || '[]');
    const publicCustomCharacters = customCharacters.filter(char => char.isPublic);
    const merged = [...CHARACTERS, ...publicCustomCharacters];
    setAllCharacters(merged);
    setFilteredCharacters(merged);

    const response = await fetch(`${API_URL}/get_private_characters.php`, {
      credentials: 'include'
    });
    const data = await response.json();

    if (data.success && data.characters?.length > 0) {
      const existingIds = merged.map(c => c.id);
      const newFromDB = data.characters.filter(c => !existingIds.includes(c.id));
      const finalMerged = [...merged, ...newFromDB];
      setAllCharacters(finalMerged);
      setFilteredCharacters(finalMerged);
    }
  } catch (error) {
    console.error('Failed to fetch DB characters:', error);
  }
};

useEffect(() => {
  let filtered = allCharacters;

  if (showOnlyFavorites) {
    filtered = filtered.filter(char => favorites.includes(char.id));
  }

  if (searchQuery) {
    filtered = filtered.filter(char =>
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedFilter !== 'all') {
    filtered = filtered.filter(char => char.personality === selectedFilter);
  }

  setFilteredCharacters(filtered);

}, [searchQuery, selectedFilter, allCharacters, showOnlyFavorites, favorites]);

const handleSelectCharacter = (character) => {
  selectCharacter(character, 'Explore', false);
  navigate('/chat');
};

return (
  <div className="page-with-navbar" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

    {/*  Background Orbs  */}
    <div style={{
      position: 'fixed',
      top: '15%',
      right: '5%',
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15), transparent 70%)',
      filter: 'blur(80px)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 0
    }} />
    <div style={{
      position: 'fixed',
      bottom: '10%',
      left: '5%',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12), transparent 70%)',
      filter: 'blur(80px)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 0
    }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', padding: '60px 0 40px' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'rgba(147, 51, 234, 0.1)',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            borderRadius: '50px',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#c084fc',
            fontWeight: '600'
          }}
        >
          <Sparkles size={16} />
          <span>{allCharacters.length} Characters Available</span>
        </motion.div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          marginBottom: '16px',
          lineHeight: 1.1
        }}>
          Explore{' '}
          <span style={{
            background: 'linear-gradient(135deg, #9333ea, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Characters
          </span>
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.65)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          Choose your perfect AI companion for meaningful conversations
        </p>
      </motion.div>

      {/*  Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ marginBottom: '40px' }}
      >
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          maxWidth: '600px',
          margin: '0 auto 24px',
        }}>
          <Search size={20} style={{
            position: 'absolute',
            left: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255,255,255,0.4)',
            pointerEvents: 'none'
          }} />
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 16px 16px 52px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'white',
              fontSize: '16px',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
              e.target.style.background = 'rgba(255, 255, 255, 0.09)';
              e.target.style.boxShadow = '0 0 0 4px rgba(147, 51, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.target.style.background = 'rgba(255, 255, 255, 0.06)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {personalities.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(filter)}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                background: selectedFilter === filter
                  ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                  : 'rgba(255, 255, 255, 0.07)',
                color: 'white',
                boxShadow: selectedFilter === filter
                  ? '0 4px 20px rgba(147, 51, 234, 0.4)'
                  : 'none',
                textTransform: 'capitalize'
              }}
            >
              {filter}
            </motion.button>
          ))}

          {/* Favorites Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            style={{
              padding: '10px 20px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: showOnlyFavorites
                ? 'linear-gradient(135deg, #f59e0b, #f97316)'
                : 'rgba(255, 255, 255, 0.07)',
              color: 'white',
              boxShadow: showOnlyFavorites
                ? '0 4px 20px rgba(245, 158, 11, 0.4)'
                : 'none',
            }}
          >
            <Star size={14} fill={showOnlyFavorites ? 'white' : 'transparent'} />
            Favorites
          </motion.button>

          {/* Create Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-character')}
            style={{
              padding: '10px 24px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '700',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              marginLeft: 'auto'
            }}
          >
            <Plus size={16} />
            Create
          </motion.button>
        </div>
      </motion.div>

      {/* Characters Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {filteredCharacters.length > 0 ? (
          <CharacterGrid
            characters={filteredCharacters}
            onSelectCharacter={handleSelectCharacter}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>
              No characters found
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
              Try adjusting your search or filters
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
                setShowOnlyFavorites(false);
              }}
              style={{
                padding: '12px 28px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                border: 'none',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'inherit',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </motion.button>
          </div>
        )}
      </motion.div>

    </div>
  </div>
);
};

export default Explore;