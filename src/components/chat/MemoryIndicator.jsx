import { Brain, X } from 'lucide-react';
import { useState } from 'react';

const MemoryIndicator = ({ memory, onClear }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!memory) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      zIndex: 100
    }}>
      <button
        onClick={() => setShowDetails(!showDetails)}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
          animation: 'pulse 2s infinite'
        }}
      >
        <Brain size={24} color="white" />
      </button>

      {showDetails && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          width: '320px',
          background: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '700',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Brain size={20} />
              AI Memory
            </h4>
            <button
              onClick={() => setShowDetails(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Summary */}
          {memory.summary && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '4px'
              }}>
                Summary
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
                {memory.summary}
              </div>
            </div>
          )}

          {/* Key Topics */}
          {memory.keyTopics && memory.keyTopics.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '4px'
              }}>
                Topics Discussed
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {memory.keyTopics.slice(0, 5).map((topic, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      background: 'rgba(139, 92, 246, 0.2)',
                      color: '#a78bfa',
                      fontWeight: '600'
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Emotional Tone */}
          {memory.emotionalTone && memory.emotionalTone !== 'neutral' && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '4px'
              }}>
                Emotional Tone
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.9)',
                textTransform: 'capitalize'
              }}>
                {memory.emotionalTone}
              </div>
            </div>
          )}

          {/* User Preferences */}
          {memory.userPreferences && (
            <>
              {memory.userPreferences.likes?.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '4px'
                  }}>
                    You Like
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
                    {memory.userPreferences.likes.slice(0, 3).join(', ')}
                  </div>
                </div>
              )}
            </>
          )}

          <div style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '12px',
            fontStyle: 'italic'
          }}>
            AI uses this to personalize responses
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default MemoryIndicator;