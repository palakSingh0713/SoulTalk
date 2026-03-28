const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect } from 'react';
import { Download, Heart, Users, TrendingUp, Clock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import toast from 'react-hot-toast';

const Marketplace = () => {
  const navigate = useNavigate();
  const { selectCharacter } = useChat();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedCharacters, setLikedCharacters] = useState(new Set());

  useEffect(() => {
    loadCharacters();
  }, [sortBy]);

  const loadCharacters = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/marketplace.php?sort=${sortBy}`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setCharacters(data.characters || []);
        //  Set initial liked characters from backend
        if (data.likedCharacterIds) {
          setLikedCharacters(new Set(data.likedCharacterIds));
        }
      }
    } catch (error) {
      console.error('Failed to load marketplace:', error);
      toast.error('Failed to load characters');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (characterId, e) => {
    e.stopPropagation();
    
    const wasLiked = likedCharacters.has(characterId);
    
    // Optimistic update
    if (wasLiked) {
      setLikedCharacters(prev => {
        const next = new Set(prev);
        next.delete(characterId);
        return next;
      });
      setCharacters(prev => prev.map(char => 
        char.id === characterId ? { ...char, likes: char.likes - 1 } : char
      ));
    } else {
      setLikedCharacters(prev => new Set(prev).add(characterId));
      setCharacters(prev => prev.map(char => 
        char.id === characterId ? { ...char, likes: char.likes + 1 } : char
      ));
    }

    try {
      const response = await fetch(`${API_URL}/marketplace.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'like', character_id: characterId })
      });

      const data = await response.json();
      if (!data.success) {
        // Revert on error
        if (wasLiked) {
          setLikedCharacters(prev => new Set(prev).add(characterId));
        } else {
          setLikedCharacters(prev => {
            const next = new Set(prev);
            next.delete(characterId);
            return next;
          });
        }
        loadCharacters();
      }
    } catch (error) {
      console.error('Like error:', error);
      loadCharacters();
    }
  };

  const handleDownload = async (character, e) => {
    e.stopPropagation();

    try {
      const response = await fetch(`${API_URL}/marketplace.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'download', character_id: character.id })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Character added to your collection! 🎉');
        setCharacters(prev => prev.map(char => 
          char.id === character.id ? { ...char, downloads: char.downloads + 1 } : char
        ));
      } else {
        toast.error(data.error || 'Failed to download character');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download character');
    }
  };

  const handleTryCharacter = (character) => {
    selectCharacter(character, 'Marketplace', false);
    navigate('/chat');
  };

  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    char.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    char.personality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-with-navbar">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
            Character <span className="text-gradient">Marketplace</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)' }}>
            Discover and download characters created by the community
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.4)'
            }} />
            <input
              type="text"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '48px',
                padding: '0 16px 0 48px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '15px'
              }}
            />
          </div>

          {/* Sort buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'recent', label: 'Recent', icon: <Clock size={16} /> },
              { id: 'popular', label: 'Popular', icon: <TrendingUp size={16} /> },
              { id: 'liked', label: 'Most Liked', icon: <Heart size={16} /> }
            ].map(sort => (
              <button
                key={sort.id}
                onClick={() => setSortBy(sort.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '20px',
                  background: sortBy === sort.id
                    ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                    : 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {sort.icon}
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        {/* Characters Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              margin: '0 auto',
              border: '4px solid rgba(147, 51, 234, 0.2)',
              borderTop: '4px solid #9333ea',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
          </div>
        ) : filteredCharacters.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Users size={64} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>No characters found</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>
              {searchQuery ? 'Try a different search' : 'Be the first to share a character!'}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {filteredCharacters.map(character => (
              <div
                key={character.id}
                onClick={() => handleTryCharacter(character)}
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '16px',
                  background: character.image 
                    ? `url(${character.image})` 
                    : 'linear-gradient(135deg, #9333ea, #ec4899)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '16px',
                  boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
                }}>
                  {!character.image && character.name.substring(0, 2).toUpperCase()}
                </div>

                {/* Name & Tagline */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
                  {character.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                  {character.tagline}
                </p>

                {/* Personality badge */}
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    background: 'rgba(147, 51, 234, 0.2)',
                    color: '#a855f7',
                    fontWeight: '600'
                  }}>
                    {character.personality}
                  </span>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '16px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.6)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={14} />
                    {character.likes}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Download size={14} />
                    {character.downloads}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} />
                    {character.timesUsed}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={(e) => handleLike(character.id, e)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      background: likedCharacters.has(character.id)
                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                        : 'rgba(255,255,255,0.1)',
                      border: 'none',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Heart size={16} fill={likedCharacters.has(character.id) ? 'white' : 'transparent'} />
                    Like
                  </button>
                  <button
                    onClick={(e) => handleDownload(character, e)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                      border: 'none',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={16} />
                    Add
                  </button>
                </div>

                {/* Creator */}
                <p style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '12px'
                }}>
                  by {character.creator}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Marketplace;