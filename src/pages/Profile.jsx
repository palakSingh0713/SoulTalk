import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Edit2, Save, X, LogOut, 
  Camera, Shield, MessageCircle, Heart, Zap, Trash2, Sparkles
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import toast from 'react-hot-toast';
import CharacterCard from '../components/characters/CharacterCard';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const { selectCharacter } = useChat();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const [privateCharacters, setPrivateCharacters] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [stats, setStats] = useState([
    { label: 'Conversations', value: '...', icon: MessageCircle, color: '#9333ea' },
    { label: 'Messages Sent', value: '...', icon: Heart, color: '#ec4899' },
    { label: 'Characters Met', value: '...', icon: Zap, color: '#06b6d4' },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/get_stats.php`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
          setStats([
            { label: 'Conversations', value: data.conversations, icon: MessageCircle, color: '#9333ea' },
            { label: 'Messages Sent', value: data.messages, icon: Heart, color: '#ec4899' },
            { label: 'Characters Met', value: data.characters, icon: Zap, color: '#06b6d4' },
          ]);
        }
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    loadPrivateCharacters();
  }, []);

  const loadPrivateCharacters = () => {
    const privateChars = JSON.parse(localStorage.getItem('private_characters') || '[]');
    setPrivateCharacters(privateChars);
  };

  const handleSelectPrivateCharacter = (character) => {
    selectCharacter(character);
    navigate('/chat');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image size should be less than 5MB'); return; }
    const reader = new FileReader();
    reader.onloadend = () => { setImagePreview(reader.result); setProfileImage(file); };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null); setProfileImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteCharacter = async (characterId, e) => {
    e.stopPropagation();
    if (!confirm('Delete this character?')) return;
    setDeletingId(characterId);
    try {
      const response = await fetch(`${API_URL}/delete_character.php`, {
        method: 'DELETE', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character_id: characterId })
      });
      const data = await response.json();
      if (data.success) {
        const customChars = JSON.parse(localStorage.getItem('custom_characters') || '[]');
        localStorage.setItem('custom_characters', JSON.stringify(customChars.filter(c => c.id !== characterId)));
        const privateChars = JSON.parse(localStorage.getItem('private_characters') || '[]');
        localStorage.setItem('private_characters', JSON.stringify(privateChars.filter(c => c.id !== characterId)));
        toast.success('Character deleted');
        loadPrivateCharacters();
      } else { toast.error(data.error || 'Failed to delete'); }
    } catch (error) { toast.error('Failed to delete character'); }
    finally { setDeletingId(null); }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) { toast.error('Name cannot be empty'); return; }
    updateUser({ ...formData, profileImage: imagePreview });
    setIsEditing(false);
    toast.success('Profile updated! 💜');
  };

  const handleCancel = () => {
    setFormData({ name: user?.name || '', email: user?.email || '' });
    setImagePreview(user?.profileImage || null);
    setProfileImage(user?.profileImage || null);
    setIsEditing(false);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const getUserInitials = () => {
    if (!user?.name) return '?';
    const names = user.name.split(' ');
    return names.length >= 2
      ? (names[0][0] + names[1][0]).toUpperCase()
      : user.name.substring(0, 2).toUpperCase();
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box'
  };``

  return (
    <div className="page-with-navbar" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

      {/*  Background Orbs */}
      <div style={{
        position: 'fixed', top: '10%', right: '5%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15), transparent 70%)',
        filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '10%', left: '5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12), transparent 70%)',
        filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>

        {/*  Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', padding: '60px 0 40px' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 20px',
              background: 'rgba(147, 51, 234, 0.1)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              borderRadius: '50px', marginBottom: '24px',
              fontSize: '14px', color: '#c084fc', fontWeight: '600'
            }}
          >
            <Sparkles size={16} />
            <span>Your Account</span>
          </motion.div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800', marginBottom: '16px', lineHeight: 1.1
          }}>
            Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #9333ea, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              Profile
            </span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.65)' }}>
            Manage your account and preferences
          </p>
        </motion.div>

        {/*  Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            padding: '40px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Top gradient line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.8), rgba(236,72,153,0.8), transparent)'
          }} />

          {/* Avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <div className="avatar avatar-xl">
                {imagePreview ? <img src={imagePreview} alt={user?.name} /> : <span>{getUserInitials()}</span>}
              </div>
              {isEditing && (
                <div style={{ position: 'absolute', bottom: '0', right: '0', display: 'flex', gap: '8px' }}>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  <button onClick={() => fileInputRef.current?.click()} style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                    border: '3px solid #0f172a', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer', color: 'white'
                  }}><Camera size={16} /></button>
                  {imagePreview && (
                    <button onClick={handleRemoveImage} style={{
                      width: '36px', height: '36px', borderRadius: '50%', background: '#ff6b6b',
                      border: '3px solid #0f172a', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', cursor: 'pointer', color: 'white'
                    }}><Trash2 size={16} /></button>
                  )}
                </div>
              )}
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>{user?.name}</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{user?.email}</p>
          </div>

          {/* Form */}
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>
                Full Name
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                disabled={!isEditing} style={{ ...inputStyle, cursor: isEditing ? 'text' : 'default' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>
                Email Address
              </label>
              <input type="email" name="email" value={formData.email} disabled
                style={{ ...inputStyle, color: 'rgba(255,255,255,0.4)', cursor: 'not-allowed' }} />
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={12} /> Email cannot be changed
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {isEditing ? (
                <>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleSave} style={{
                      flex: 1, padding: '14px', borderRadius: '12px', border: 'none',
                      background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                      color: 'white', fontSize: '15px', fontWeight: '700',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}>
                    <Save size={16} /> Save Changes
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleCancel} style={{
                      flex: 1, padding: '14px', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '15px', fontWeight: '600',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}>
                    <X size={16} /> Cancel
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(true)} style={{
                      flex: 1, padding: '14px', borderRadius: '12px', border: 'none',
                      background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                      color: 'white', fontSize: '15px', fontWeight: '700',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}>
                    <Edit2 size={16} /> Edit Profile
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleLogout} style={{
                      flex: 1, padding: '14px', borderRadius: '12px',
                      background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)',
                      color: '#ff6b6b', fontSize: '15px', fontWeight: '600',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}>
                    <LogOut size={16} /> Logout
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/*  Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px', marginBottom: '40px'
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                padding: '28px 24px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`
              }} />
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: `${stat.color}20`,
                border: `1px solid ${stat.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <div style={{
                fontSize: '2.5rem', fontWeight: '800', marginBottom: '4px',
                background: `linear-gradient(135deg, ${stat.color}, white)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontWeight: '500' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/*  Private Characters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ marginBottom: '60px' }}
        >
          <h2 style={{
            fontSize: '1.75rem', fontWeight: '800', marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            My Private Characters
            <span style={{ fontSize: '1.5rem' }}>🔒</span>
          </h2>

          {privateCharacters.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px'
            }}>
              {privateCharacters.map((char, index) => (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ position: 'relative' }}
                >
                  <CharacterCard character={char} onClick={() => handleSelectPrivateCharacter(char)} />
                  <button
                    onClick={(e) => handleDeleteCharacter(char.id, e)}
                    disabled={deletingId === char.id}
                    style={{
                      position: 'absolute', top: '8px', right: '8px',
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'rgba(239,68,68,0.9)', border: 'none',
                      color: 'white', cursor: deletingId === char.id ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: deletingId === char.id ? 0.5 : 1, zIndex: 10
                    }}
                  ><Trash2 size={14} /></button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{
              padding: '60px 40px', textAlign: 'center',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.15)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontSize: '16px' }}>
                No private characters yet
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/create-character')}
                style={{
                  padding: '12px 28px', borderRadius: '12px', border: 'none',
                  background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                  color: 'white', fontSize: '15px', fontWeight: '600',
                  fontFamily: 'inherit', cursor: 'pointer'
                }}
              >
                Create Private Character
              </motion.button>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;