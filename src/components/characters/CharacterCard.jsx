import { useState } from 'react';
import { MessageCircle, Sparkles, Zap, Heart, Star } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites'; 

const CharacterCard = ({ character, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  //  Favorites Hook
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(character.id);
  };

  const getCharacterInitials = () => {
    if (!character.name) return '?';
    const words = character.name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return character.name.substring(0, 2).toUpperCase();
  };

  const getCharacterEmoji = () => {
    const emojiMap = {
      empathetic: '💙',
      nurturing: '🌱',
      motivating: '💪',
      understanding: '🤝',
      wise: '🦉',
      calm: '🌊',
      reassuring: '💕',
      philosophical: '🤔',
      investigative: '🔍',
    };
    return emojiMap[character.personality] || '💜';
  };

  return (
    <div className="character-card" onClick={() => onClick(character)}>

      {/*  Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: favorite
            ? 'linear-gradient(135deg, #f59e0b, #f97316)'
            : 'rgba(255,255,255,0.1)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          zIndex: 20
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Star
          size={18}
          fill={favorite ? 'white' : 'transparent'}
          stroke={favorite ? 'white' : 'rgba(255,255,255,0.5)'}
        />
      </button>

      {/* IMAGE SECTION */}
      <div className="character-card-image-container">
        {character.image && !imageError ? (
          <img
            src={character.image}
            alt={character.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`character-card-image ${imageLoaded ? 'loaded' : ''}`}
          />
        ) : (
          <div
            className="character-card-fallback"
            style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)' }}
          >
            <span className="character-card-fallback-emoji">
              {getCharacterEmoji()}
            </span>
            <span className="character-card-fallback-initials">
              {getCharacterInitials()}
            </span>
          </div>
        )}

        <div className="character-card-overlay" />

        <div className="character-card-hover-overlay">
          <div
            className="character-card-action-circle"
            style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)' }}
          >
            <MessageCircle size={28} />
          </div>
        </div>

        <div className="character-card-status-badge">
          <div className="character-card-status-indicator" />
          <span>Online</span>
        </div>

<div
  className="character-card-personality-badge"
  style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)' }}
>
  {character.personality?.length > 10 
    ? character.personality.substring(0, 10) + '...' 
    : character.personality}
</div>
      </div>

      {/* CONTENT */}
      <div className="character-card-content">
        <div className="character-card-header">
          <h3 className="character-card-name">
            {character.name}
          </h3>
          <p className="character-card-tagline">
            {character.tagline}
          </p>
        </div>

        <div className="character-card-features">
          <div className="character-card-feature">
            <Sparkles size={14} />
            <span>Voice Ready</span>
          </div>
          <div className="character-card-feature">
            <Zap size={14} />
            <span>Instant</span>
          </div>
          <div className="character-card-feature">
            <Heart size={14} />
            <span>Empathetic</span>
          </div>
        </div>

        <button className="btn btn-primary character-card-button">
          <MessageCircle size={16} />
          <span>Start Chat</span>
        </button>
      </div>

      <div
        className="character-card-glow"
        style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)' }}
      />
    </div>
  );
};

export default CharacterCard;