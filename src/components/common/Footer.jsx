import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ onFeedbackClick }) => {

  const currentYear = new Date().getFullYear();

  const footerSections = [
  {
    title: 'About SoulTalk',
    links: [
      { label: 'What is SoulTalk?', to: '/about' }, 
      { label: 'How it works', to: '/about' },      
      { label: 'Our Mission', to: '/about' },      
      { label: 'Meet the Team', to: '/about' },     
    ]
  },
  {
    title: 'Features',
    links: [
      { label: 'AI Characters', to: '/explore' },
      { label: 'Chat History', to: '/history' },
      { label: 'Voice Mode', href: '#' },
      { label: 'Create Character', to: '/create-character' },
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'Share Feedback', action: 'feedback' },
      { label: 'Report an Issue', action: 'feedback' },
      { label: 'Suggest a Character', action: 'feedback' },
      { label: 'Rate Us', action: 'feedback' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Disclaimer', href: '#' },
    ]
  }
];

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.55)',
    textDecoration: 'none',
    fontSize: '13px',
    lineHeight: '2',
    display: 'block',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    textAlign: 'left',
    fontFamily: 'inherit',
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0a0a1a 0%, #050510 100%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      marginTop: 'auto',
    }}>

      {/* Top gradient line */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #9333ea, #ec4899, transparent)',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px 32px',
      }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(200px, 1.5fr) repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '40px',
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}>
                💜
              </div>

              <span style={{
                fontSize: '1.25rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                SoulTalk
              </span>
            </div>

            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: '1.7',
              marginBottom: '20px',
              maxWidth: '220px',
            }}>
              Your AI companion for meaningful conversations. Connect with unique personalities anytime.
            </p>

            <button
              onClick={onFeedbackClick}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                border: 'none',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              💬 Share Feedback
            </button>
          </div>

          {/* Sections */}
          {footerSections.map(section => (
            <div key={section.title}>

              <h4 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
              }}>
                {section.title}
              </h4>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>

                {section.links.map(link => (
                  <li key={link.label}>

                    {link.to ? (

                      <Link to={link.to} style={linkStyle}>
                        {link.label}
                      </Link>

                    ) : link.action === 'feedback' ? (

                      <button onClick={onFeedbackClick} style={linkStyle}>
                        {link.label}
                      </button>

                    ) : (

                      <a href={link.href} style={linkStyle}>
                        {link.label}
                      </a>

                    )}

                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          marginBottom: '24px',
        }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>

          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            © {currentYear} SoulTalk. Made with
            <Heart size={14} fill="#ec4899" stroke="none" />
            by Palak Singh. All rights reserved.
          </p>

          <div style={{ display: 'flex', gap: '20px' }}>

            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                }}
              >
                {item}
              </a>
            ))}

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;