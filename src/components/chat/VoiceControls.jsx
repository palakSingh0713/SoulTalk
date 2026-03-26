import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import voiceService from '../../services/voiceService';

const VoiceControls = () => {
  const [isEnabled, setIsEnabled] = useState(voiceService.isVoiceEnabled());
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const checkSpeaking = setInterval(() => {
      setIsSpeaking(voiceService.isSpeaking());
    }, 500);

    return () => clearInterval(checkSpeaking);
  }, []);

  const handleToggle = () => {
    const enabled = voiceService.toggle();
    setIsEnabled(enabled);
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      title={isEnabled ? 'Voice ON - Click to disable' : 'Voice OFF - Click to enable'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: isEnabled 
          ? 'linear-gradient(135deg, #9333ea, #ec4899)' 
          : 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animation: isSpeaking ? 'pulse 1.5s ease-in-out infinite' : 'none',
        boxShadow: isEnabled 
          ? '0 4px 12px rgba(147, 51, 234, 0.4)' 
          : 'none',
        flexShrink: 0
      }}
      onMouseEnter={(e) => {
        if (!isEnabled) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        }
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        if (!isEnabled) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {isEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
};

export default VoiceControls;