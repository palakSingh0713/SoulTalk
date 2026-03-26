import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const handleChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  return (
    <div style={{
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
      }}>
        <Globe size={20} />
        <h4 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>Language</h4>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: i18n.language === lang.code
                ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                : 'rgba(255,255,255,0.05)',
              border: i18n.language === lang.code
                ? 'none'
                : '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '20px' }}>{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;