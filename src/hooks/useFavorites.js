const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await fetch(`${API_URL}/favorites.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ user_email: user?.email, action: 'get' })
});
      const data = await response.json();
      if (data.success) {
        setFavorites(data.favorites || []);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (characterId) => {
    return favorites.includes(characterId);
  };

  const toggleFavorite = async (characterId) => {
    const wasFavorite = isFavorite(characterId);

    // Optimistic update
    if (wasFavorite) {
      setFavorites(prev => prev.filter(id => id !== characterId));
    } else {
      setFavorites(prev => [...prev, characterId]);
    }

    try {
      const response = await fetch(`${API_URL}/favorites.php`, {
        method: wasFavorite ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ character_id: characterId })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(wasFavorite ? 'Removed from favorites' : 'Added to favorites');
      } else {
        // Revert on error
        if (wasFavorite) {
          setFavorites(prev => [...prev, characterId]);
        } else {
          setFavorites(prev => prev.filter(id => id !== characterId));
        }
        toast.error('Failed to update favorites');
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
      // Revert on error
      if (wasFavorite) {
        setFavorites(prev => [...prev, characterId]);
      } else {
        setFavorites(prev => prev.filter(id => id !== characterId));
      }
      toast.error('Failed to update favorites');
    }
  };

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
  };
};