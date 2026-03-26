import { useState, useRef } from 'react';
import { Upload, User, FileText, Sparkles, X, MessageSquare, Lock, Globe, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateCharacter = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    personality: 'empathetic',
    customPersonality: '', // For "Other" option
    firstMessage: '',
    isPublic: true,
    shareInMarketplace: false, // ⭐ NEW: Marketplace sharing
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showCustomPersonality, setShowCustomPersonality] = useState(false);

  const personalities = [
    { value: 'empathetic', label: 'Empathetic', emoji: '💙', description: 'Understanding and compassionate' },
    { value: 'nurturing', label: 'Nurturing', emoji: '🌱', description: 'Caring and supportive' },
    { value: 'motivating', label: 'Motivating', emoji: '💪', description: 'Inspiring and energetic' },
    { value: 'wise', label: 'Wise', emoji: '🦉', description: 'Knowledgeable and insightful' },
    { value: 'calm', label: 'Calm', emoji: '🌊', description: 'Peaceful and soothing' },
    { value: 'reassuring', label: 'Reassuring', emoji: '💕', description: 'Comforting and positive' },
    { value: 'other', label: 'Other', emoji: '✨', description: 'Custom personality type' }, // ⭐ NEW
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePersonalityChange = (value) => {
    setFormData(prev => ({ ...prev, personality: value }));

    // Show custom personality input when "Other" is selected
    if (value === 'other') {
      setShowCustomPersonality(true);
    } else {
      setShowCustomPersonality(false);
      setFormData(prev => ({ ...prev, customPersonality: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 200 * 1024) {
      toast.error('Image size should be less than 200KB');
      return;
    }

    setFormData(prev => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let width = img.width;
        let height = img.height;
        const maxSize = 300;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const compressedImage = canvas.toDataURL('image/jpeg', 0.6);
        setImagePreview(compressedImage);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Character name is required');
      return;
    }

    if (!formData.tagline.trim()) {
      toast.error('Character tagline is required');
      return;
    }

    if (!formData.firstMessage.trim()) {
      toast.error('First message is required');
      return;
    }

    // Validate custom personality if "Other" is selected
    if (formData.personality === 'other' && !formData.customPersonality.trim()) {
      toast.error('Please describe the custom personality');
      return;
    }

    // Determine final personality value
    const finalPersonality = formData.personality === 'other'
      ? formData.customPersonality.trim()
      : formData.personality;

    const newCharacter = {
      id: `custom-${Date.now()}`,
      name: formData.name.trim(),
      tagline: formData.tagline.trim(),
      personality: finalPersonality, 
      firstMessage: formData.firstMessage.trim(),
      isPublic: formData.isPublic,
      shareInMarketplace: formData.shareInMarketplace, 
      image: imagePreview,
      intro: formData.firstMessage.trim(),
      voiceType: 'neutral',
      isCustom: true,
      createdAt: new Date().toISOString(),
    };
    try {
      
      const response = await fetch('http://localhost/soulapp/php/save_character.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newCharacter)
      });
      const data = await response.json();
      console.log('Save response:', data);

      
      const existingCharacters = JSON.parse(localStorage.getItem('custom_characters') || '[]');
      existingCharacters.push(newCharacter);
      localStorage.setItem('custom_characters', JSON.stringify(existingCharacters));

      if (formData.shareInMarketplace) {
        const marketplaceCharacters = JSON.parse(localStorage.getItem('marketplace_characters') || '[]');
        marketplaceCharacters.push(newCharacter);
        localStorage.setItem('marketplace_characters', JSON.stringify(marketplaceCharacters));
      }

      if (!formData.isPublic) {
        const privateChars = JSON.parse(localStorage.getItem('private_characters') || '[]');
        privateChars.push(newCharacter);
        localStorage.setItem('private_characters', JSON.stringify(privateChars));
      }

      const visibilityMessage = formData.shareInMarketplace
        ? '🌍 Shared in marketplace!'
        : formData.isPublic
          ? '🌍 Public character created!'
          : '🔒 Private character created!';

      toast.success(`Character created successfully! ${visibilityMessage}`);
      navigate('/explore');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save character. Please try again.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div className="page-with-navbar">
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: '800',
            marginBottom: '12px'
          }}>
            Create <span className="text-gradient">Custom Character</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Design your own AI companion with unique personality
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>
          <form onSubmit={handleSubmit}>

            {/* Character Name */}
            <div style={{ marginBottom: '28px' }}>
              <label style={labelStyle}>
                <User size={18} />
                Character Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Alex, Sophie, Marcus"
                required
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>

            {/* Character Tagline */}
            <div style={{ marginBottom: '28px' }}>
              <label style={labelStyle}>
                <FileText size={18} />
                Character Tagline *
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="e.g., Your supportive friend, The wise mentor"
                required
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>

            {/* Character Avatar Upload */}
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>
                <Upload size={18} />
                Character Avatar (Optional - Max 200KB)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />

              {imagePreview ? (
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px dashed rgba(255, 255, 255, 0.2)'
                }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(239, 68, 68, 0.9)',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 1)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.9)'}
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px dashed rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                    e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <Upload size={40} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '15px', color: 'white', marginBottom: '4px' }}>
                      Click to upload avatar
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>
                      PNG, JPG - Max 200KB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Personality Type */}
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>
                <Sparkles size={18} />
                Personality Type *
              </label>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '12px'
              }}>
                {personalities.map((personality) => (
                  <button
                    key={personality.value}
                    type="button"
                    onClick={() => handlePersonalityChange(personality.value)}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: formData.personality === personality.value
                        ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid ' + (formData.personality === personality.value
                        ? 'transparent'
                        : 'rgba(255, 255, 255, 0.1)'),
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (formData.personality !== personality.value) {
                        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                        e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (formData.personality !== personality.value) {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                      {personality.emoji}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>
                      {personality.label}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                      {personality.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Personality Input (shown when "Other" is selected) */}
            {showCustomPersonality && (
              <div style={{ marginBottom: '28px' }}>
                <label style={labelStyle}>
                  <Edit3 size={18} />
                  Describe Custom Personality *
                </label>
                <input
                  type="text"
                  name="customPersonality"
                  value={formData.customPersonality}
                  onChange={handleChange}
                  placeholder="e.g., Mysterious, Villain, Mafia Boss, Comedian, Sarcastic"
                  required={formData.personality === 'other'}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
                <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
                  Describe the personality in a few words
                </p>
              </div>
            )}

            {/* First Message */}
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>
                <MessageSquare size={18} />
                First Message *
              </label>
              <textarea
                name="firstMessage"
                value={formData.firstMessage}
                onChange={handleChange}
                placeholder="e.g., Hello! I'm here to listen and support you. How are you feeling today?"
                required
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '100px'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
                This will be the first message your character sends
              </p>
            </div>

            {/* Character Visibility */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                ...labelStyle,
                marginBottom: '16px'
              }}>
                Character Visibility
              </label>

              {/* Share in Marketplace Checkbox  */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '16px',
                  borderRadius: '12px',
                  background: formData.shareInMarketplace
                    ? 'rgba(147, 51, 234, 0.1)'
                    : 'rgba(255,255,255,0.05)',
                  border: '2px solid ' + (formData.shareInMarketplace
                    ? 'rgba(147, 51, 234, 0.5)'
                    : 'rgba(255,255,255,0.1)'),
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={(e) => {
                    if (!formData.shareInMarketplace) {
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!formData.shareInMarketplace) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    name="shareInMarketplace"
                    checked={formData.shareInMarketplace}
                    onChange={handleChange}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#a855f7',
                      marginTop: '2px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '15px' }}>
                      🌍 Share in Marketplace
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                      Allow others to discover and use your character in the marketplace section
                    </div>
                  </div>
                </label>
              </div>

              {/* Public/Private Radio Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Public Option */}
                <label style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: formData.isPublic
                    ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid ' + (formData.isPublic
                    ? 'transparent'
                    : 'rgba(255, 255, 255, 0.1)'),
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={(e) => {
                    if (!formData.isPublic) {
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!formData.isPublic) {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={() => setFormData(prev => ({ ...prev, isPublic: true }))}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <Globe size={20} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600' }}>Public</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      Visible in Explore
                    </div>
                  </div>
                </label>

                {/* Private Option */}
                <label style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: !formData.isPublic
                    ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid ' + (!formData.isPublic
                    ? 'transparent'
                    : 'rgba(255, 255, 255, 0.1)'),
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={(e) => {
                    if (formData.isPublic) {
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.isPublic) {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="isPublic"
                    checked={!formData.isPublic}
                    onChange={() => setFormData(prev => ({ ...prev, isPublic: false }))}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <Lock size={20} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600' }}>Private</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      Only you can see
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                height: '56px',
                fontSize: '16px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '16px'
              }}
            >
              <Sparkles size={20} />
              Create Character
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => navigate('/explore')}
              style={{
                width: '100%',
                height: '56px',
                fontSize: '16px',
                fontWeight: '600',
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Cancel
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacter;