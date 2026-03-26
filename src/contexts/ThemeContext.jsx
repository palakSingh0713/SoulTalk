import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const CHAT_THEMES = {
  default: {
    name: 'Purple Gradient',
    userBubble: 'linear-gradient(135deg, #9333ea, #ec4899)',
    botBubble: 'rgba(255, 255, 255, 0.08)',
    botBorder: '1px solid rgba(255, 255, 255, 0.1)',
  },
  blue: {
    name: 'Ocean Blue',
    userBubble: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
    botBubble: 'rgba(59, 130, 246, 0.1)',
    botBorder: '1px solid rgba(59, 130, 246, 0.3)',
  },
  green: {
    name: 'Forest Green',
    userBubble: 'linear-gradient(135deg, #10b981, #059669)',
    botBubble: 'rgba(16, 185, 129, 0.1)',
    botBorder: '1px solid rgba(16, 185, 129, 0.3)',
  },
  orange: {
    name: 'Sunset Orange',
    userBubble: 'linear-gradient(135deg, #f97316, #ea580c)',
    botBubble: 'rgba(249, 115, 22, 0.1)',
    botBorder: '1px solid rgba(249, 115, 22, 0.3)',
  },
  pink: {
    name: 'Bubblegum Pink',
    userBubble: 'linear-gradient(135deg, #ec4899, #f472b6)',
    botBubble: 'rgba(236, 72, 153, 0.1)',
    botBorder: '1px solid rgba(236, 72, 153, 0.3)',
  },
  dark: {
    name: 'Dark Mode',
    userBubble: 'linear-gradient(135deg, #1f2937, #374151)',
    botBubble: 'rgba(255, 255, 255, 0.05)',
    botBorder: '1px solid rgba(255, 255, 255, 0.1)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [chatTheme, setChatTheme] = useState('default');
  const [appTheme, setAppTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('chat_theme');
    if (saved && CHAT_THEMES[saved]) {
      setChatTheme(saved);
    }
  }, []);

  const updateChatTheme = (themeId) => {
    if (CHAT_THEMES[themeId]) {
      setChatTheme(themeId);
      localStorage.setItem('chat_theme', themeId);
    }
  };

  const value = {
    chatTheme,
    chatThemeStyles: CHAT_THEMES[chatTheme],
    availableThemes: CHAT_THEMES,
    updateChatTheme,
    appTheme,
    setAppTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};