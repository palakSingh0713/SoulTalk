export const extractMemoryFromConversation = (messages) => {
  if (!messages || messages.length === 0) {
    return null;
  }

  const userMessages = messages.filter(m => m.sender === 'user').map(m => m.text);
  const botMessages = messages.filter(m => m.sender === 'bot').map(m => m.text);

  // Extract key topics (simple keyword extraction)
  const keyTopics = extractKeywords(userMessages.join(' '));

  // Detect emotional tone
  const emotionalTone = detectEmotionalTone(userMessages);

  // Extract user preferences
  const userPreferences = extractPreferences(userMessages);

  // Create summary
  const summary = createSummary(messages);

  return {
    summary,
    keyTopics,
    userPreferences,
    emotionalTone,
    messageCount: messages.length,
    lastInteraction: messages[messages.length - 1]?.timestamp
  };
};

const extractKeywords = (text) => {
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who',
    'when', 'where', 'why', 'how', 'is', 'am', 'are', 'was', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'can', 'my', 'your', 'his',
    'her', 'its', 'our', 'their', 'me', 'him', 'them', 'this', 'that',
    'these', 'those', 'just', 'like', 'so', 'yeah', 'yes', 'no', 'not'
  ]);

  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word));

  const wordFreq = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
};

const detectEmotionalTone = (messages) => {
  const text = messages.join(' ').toLowerCase();
  
  const emotions = {
    happy: /happy|joy|excited|great|wonderful|love|amazing|fantastic|good|nice/,
    sad: /sad|depressed|down|unhappy|terrible|awful|bad|worst|cry|hurt/,
    anxious: /anxious|worried|nervous|scared|afraid|stress|overwhelm/,
    angry: /angry|mad|furious|annoyed|frustrated|hate/,
    neutral: /.*/
  };

  for (const [emotion, pattern] of Object.entries(emotions)) {
    if (pattern.test(text) && emotion !== 'neutral') {
      return emotion;
    }
  }

  return 'neutral';
};

const extractPreferences = (messages) => {
  const text = messages.join(' ').toLowerCase();
  const preferences = {};

  // Extract "I like/love/enjoy" patterns
  const likePattern = /i (like|love|enjoy|prefer|want) ([^.!?]+)/g;
  const matches = [...text.matchAll(likePattern)];
  
  if (matches.length > 0) {
    preferences.likes = matches.map(m => m[2].trim()).slice(0, 5);
  }

  // Extract "I don't like/hate" patterns
  const dislikePattern = /i (don't like|hate|dislike|can't stand) ([^.!?]+)/g;
  const dislikes = [...text.matchAll(dislikePattern)];
  
  if (dislikes.length > 0) {
    preferences.dislikes = dislikes.map(m => m[2].trim()).slice(0, 5);
  }

  return preferences;
};

const createSummary = (messages) => {
  if (messages.length === 0) return '';
  
  const recentMessages = messages.slice(-10);
  const topics = extractKeywords(
    recentMessages.map(m => m.text).join(' ')
  );

  return `Recent conversation about: ${topics.slice(0, 3).join(', ')}. ${messages.length} total messages exchanged.`;
};

export const buildMemoryPrompt = (memory) => {
  if (!memory) return '';

  const parts = [];

  if (memory.summary) {
    parts.push(`Previous conversation summary: ${memory.summary}`);
  }

  if (memory.keyTopics && memory.keyTopics.length > 0) {
    parts.push(`Topics discussed: ${memory.keyTopics.join(', ')}`);
  }

  if (memory.userPreferences) {
    if (memory.userPreferences.likes?.length > 0) {
      parts.push(`User likes: ${memory.userPreferences.likes.join(', ')}`);
    }
    if (memory.userPreferences.dislikes?.length > 0) {
      parts.push(`User dislikes: ${memory.userPreferences.dislikes.join(', ')}`);
    }
  }

  if (memory.emotionalTone && memory.emotionalTone !== 'neutral') {
    parts.push(`User's emotional state was: ${memory.emotionalTone}`);
  }

  if (parts.length === 0) return '';

  return `\n\n[CONVERSATION MEMORY]\n${parts.join('\n')}\nRemember this context when responding.\n`;
};