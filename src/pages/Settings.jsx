import { useState } from 'react';
import { Save, Bell, Lock, Palette, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme'; 
import LanguageSelector from '../components/common/LanguageSelector';
const Settings = () => {

 
  const { chatTheme, availableThemes, updateChatTheme } = useTheme();

  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    voiceEnabled: true,
    theme: 'dark',
    language: 'en',
    privacy: 'public'
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="page-with-navbar">
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
            <span className="text-gradient">Settings</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Customize your experience
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '60px' }}>

          {/* Notifications */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Bell size={20} style={{ color: '#a855f7' }} />
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Notifications</h3>
            </div>

            {[
              ['notifications', 'Enable notifications'],
              ['soundEffects', 'Sound effects'],
              ['voiceEnabled', 'Voice responses']
            ].map(([key, label]) => (
              <label key={key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                cursor: 'pointer'
              }}>
                <span>{label}</span>
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={(e) => handleChange(key, e.target.checked)}
                />
              </label>
            ))}
          </div>

          {/* Appearance */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Palette size={20} style={{ color: '#a855f7' }} />
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Appearance</h3>
            </div>

            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white'
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* ✅ CHAT THEME SECTION (ADDED SAME AS BEFORE) */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Palette size={20} />
              Chat Theme
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '12px'
            }}>
              {Object.entries(availableThemes).map(([id, theme]) => (
                <button
                  key={id}
                  onClick={() => updateChatTheme(id)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: chatTheme === id
                      ? 'rgba(147,51,234,0.2)'
                      : 'rgba(255,255,255,0.05)',
                    border: chatTheme === id
                      ? '2px solid #9333ea'
                      : '2px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    background: theme.userBubble,
                    marginBottom: '8px'
                  }} />
                  <div style={{
                    fontSize: '13px',
                    fontWeight: chatTheme === id ? '700' : '500',
                    color: 'white'
                  }}>
                    {theme.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Lock size={20} style={{ color: '#a855f7' }} />
              <h3>Privacy</h3>
            </div>

            <select
              value={settings.privacy}
              onChange={(e) => handleChange('privacy', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(30, 20, 60, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '15px',
                fontFamily: 'inherit'
              }}
            >
              <option value="public" style={{ background: '#1e143c', color: 'white' }}>Public</option>
              <option value="private" style={{ background: '#1e143c', color: 'white' }}>Private</option>
            </select>
          </div>

          {/* Language */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Globe size={20} style={{ color: '#a855f7' }} />
              <h3>Language</h3>
            </div>

            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(30, 20, 60, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '15px',
                fontFamily: 'inherit'
              }}
            >
              <option value="en" style={{ background: '#1e143c', color: 'white' }}>English</option>
              <option value="es" style={{ background: '#1e143c', color: 'white' }}>Español</option>
              <option value="fr" style={{ background: '#1e143c', color: 'white' }}>Français</option>
              <option value="de" style={{ background: '#1e143c', color: 'white' }}>Deutsch</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={20} />
            Save Settings
          </button>

        </div>
      </div>
    </div>
  );
};

export default Settings;