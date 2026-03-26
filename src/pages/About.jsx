import { useState } from 'react';
import { 
  MessageCircle, Users, Heart, Shield, Mic, History, 
  Sparkles, ChevronDown, Settings, UserPlus, Search,
  Plus, Star, Volume2, Trash2, Eye
} from 'lucide-react';

const About = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const features = [
    {
      icon: <Users size={32} />,
      title: 'Unique AI Characters',
      description: 'Chat with diverse AI personalities - from empathetic friends to mafia bosses, each with unique traits.'
    },
    {
      icon: <Mic size={32} />,
      title: 'Voice Mode',
      description: 'AI characters speak back to you with natural voices. Toggle voice on/off anytime during conversation.'
    },
    {
      icon: <History size={32} />,
      title: 'Chat History',
      description: 'All your conversations are saved. Resume any chat exactly where you left off.'
    },
    {
      icon: <Plus size={32} />,
      title: 'Create Custom Characters',
      description: 'Build your own AI companions with custom personalities, traits, and first messages.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Private & Secure',
      description: 'Your conversations are private. Create private characters visible only to you.'
    },
    {
      icon: <Sparkles size={32} />,
      title: 'Advanced AI',
      description: 'Powered by state-of-the-art LLM technology for natural, engaging conversations.'
    }
  ];

  const howToSteps = [
    {
      step: 1,
      title: 'Sign Up / Login',
      description: 'Create a free account or sign in to access all features.',
      icon: <UserPlus size={24} />
    },
    {
      step: 2,
      title: 'Explore Characters',
      description: 'Browse available AI companions in the Explore page. Each has a unique personality.',
      icon: <Search size={24} />
    },
    {
      step: 3,
      title: 'Start Chatting',
      description: 'Click on a character to start a conversation. They\'ll greet you with their signature style.',
      icon: <MessageCircle size={24} />
    },
    {
      step: 4,
      title: 'Use Features',
      description: 'Enable voice mode, view chat history, or create your own custom character.',
      icon: <Sparkles size={24} />
    }
  ];

  const whereIsWhat = [
    {
      icon: <Users size={20} />,
      location: 'Explore Page',
      description: 'Browse and select AI characters',
      path: 'Click "Explore" in the navbar'
    },
    {
      icon: <MessageCircle size={20} />,
      location: 'Chat Page',
      description: 'Active conversation with your selected character',
      path: 'Select a character from Explore'
    },
    {
      icon: <History size={20} />,
      location: 'History Page',
      description: 'View all past conversations and continue them',
      path: 'Click "History" in the navbar'
    },
    {
      icon: <Settings size={20} />,
      location: 'Settings',
      description: 'Customize notifications, voice, theme, and privacy',
      path: 'Click your profile → Settings'
    },
    {
      icon: <UserPlus size={20} />,
      location: 'Profile Page',
      description: 'View your stats and private characters',
      path: 'Click your avatar in the top-right'
    },
    {
      icon: <Plus size={20} />,
      location: 'Create Character',
      description: 'Build your own custom AI companion',
      path: 'Explore page → "Create" button'
    },
    {
      icon: <Volume2 size={20} />,
      location: 'Voice Toggle',
      description: 'Enable/disable AI voice responses',
      path: 'Purple volume icon in chat input'
    },
    {
      icon: <Star size={20} />,
      location: 'Regenerate',
      description: 'Get a different AI response',
      path: 'Click "Regenerate" button under AI messages'
    },
    {
      icon: <Trash2 size={20} />,
      location: 'Delete Conversations',
      description: 'Remove chat history',
      path: 'History page → Click trash icon'
    },
    {
      icon: <Eye size={20} />,
      location: 'Continue Conversation',
      description: 'Resume a past chat',
      path: 'History page → Click eye icon'
    }
  ];

  const collapsibleSections = [
    {
      id: 'privacy',
      title: '🔒 Privacy & Data',
      content: (
        <div>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            <strong>Your Privacy Matters:</strong>
          </p>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
            <li>All conversations are encrypted and stored securely</li>
            <li>Your data is never shared with third parties</li>
            <li>Private characters are visible only to you</li>
            <li>You can delete your chat history anytime</li>
            <li>We don't sell or analyze your conversations</li>
          </ul>
        </div>
      )
    },
    {
      id: 'voice',
      title: '🎤 How Voice Mode Works',
      content: (
        <div>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            SoulTalk uses text-to-speech technology to bring characters to life:
          </p>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
            <li><strong>Enable Voice:</strong> Click the purple volume icon in the chat input</li>
            <li><strong>Character Voices:</strong> Each character has a gender-appropriate voice</li>
            <li><strong>Auto-Play:</strong> AI responses are spoken automatically when enabled</li>
            <li><strong>Browser-Based:</strong> Uses your device's built-in speech synthesis</li>
            <li><strong>Tip:</strong> For best results, use Chrome or Edge browser</li>
          </ul>
        </div>
      )
    },
    {
      id: 'custom',
      title: '✨ Creating Custom Characters',
      content: (
        <div>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            Build your perfect AI companion in 5 simple steps:
          </p>
          <ol style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
            <li><strong>Name & Tagline:</strong> Give your character identity</li>
            <li><strong>Personality:</strong> Choose from empathetic, motivating, wise, calm, nurturing</li>
            <li><strong>Custom Traits:</strong> Add unique personality details (optional but recommended)</li>
            <li><strong>First Message:</strong> How they'll greet users</li>
            <li><strong>Visibility:</strong> Public (anyone can chat) or Private (only you)</li>
          </ol>
          <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
            💡 Tip: The more detailed your custom traits, the more unique your character will be!
          </p>
        </div>
      )
    },
    {
      id: 'limits',
      title: '⚡ Usage & Limits',
      content: (
        <div>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
            <li><strong>Free Plan:</strong> Unlimited conversations with all characters</li>
            <li><strong>Message Length:</strong> No character limit per message</li>
            <li><strong>Custom Characters:</strong> Create as many as you want</li>
            <li><strong>Chat History:</strong> Unlimited storage for all conversations</li>
            <li><strong>Fair Use:</strong> We ask users to be respectful and use the service responsibly</li>
          </ul>
        </div>
      )
    },
    {
      id: 'tech',
      title: '🤖 Technology Behind SoulTalk',
      content: (
        <div>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            SoulTalk is powered by cutting-edge AI technology:
          </p>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
            <li><strong>LLM Model:</strong> Llama 3.1 8B (via Groq API)</li>
            <li><strong>Voice:</strong> Web Speech API (browser-native)</li>
            <li><strong>Frontend:</strong> React + Vite for fast, responsive UI</li>
            <li><strong>Backend:</strong> PHP + MySQL for data persistence</li>
            <li><strong>Personality Engine:</strong> Custom prompt engineering for unique character behaviors</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="page-with-navbar">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            What is <span className="text-gradient">SoulTalk</span>?
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'rgba(255,255,255,0.7)', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: 1.6 
          }}>
            SoulTalk is an AI-powered platform where you can have meaningful conversations with unique 
            AI personalities. Each character has their own traits, speaking style, and emotional depth.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '32px', 
            textAlign: 'center',
            fontWeight: '700'
          }}>
            ✨ Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
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
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: 'white'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '8px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '32px', 
            textAlign: 'center',
            fontWeight: '700'
          }}>
            🚀 How to Use SoulTalk
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {howToSteps.map((step) => (
              <div
                key={step.step}
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '24px',
                  marginBottom: '16px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '18px'
                }}>
                  {step.step}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {step.icon}
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Where is What */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '32px', 
            textAlign: 'center',
            fontWeight: '700'
          }}>
            📍 Where is What?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {whereIsWhat.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0 }}>
                    {item.location}
                  </h4>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', lineHeight: 1.5 }}>
                  {item.description}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                  → {item.path}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Collapsible Sections */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '32px', 
            textAlign: 'center',
            fontWeight: '700'
          }}>
            📚 Learn More
          </h2>
          {collapsibleSections.map((section) => (
            <div
              key={section.id}
              style={{
                marginBottom: '16px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span>{section.title}</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform: openSection === section.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: openSection === section.id ? '1000px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}
              >
                <div style={{
                  padding: '0 24px 24px',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.6
                }}>
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;