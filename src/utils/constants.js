import familyImg from '../assets/family.png';
import airaImg from '../assets/aira.png';
import noahImg from '../assets/noah.png';
import eliImg from '../assets/eli.png';
import detectiveImg from '../assets/detective.png';
import strangerImg from '../assets/stranger.png';
import manImg from '../assets/man.png';
import nightImg from '../assets/night.png';
import paranormalImg from '../assets/paranormal.png';

export const CHARACTERS = [
  {
    id: 'family',
    name: 'The Perfect Family',
    tagline: 'Nurturing family support',
    image: familyImg,
    intro: "Hello dear! We're here for you as a family.",
    firstMessage: "Hello dear! We're here for you as a family. What's on your heart today?",
    personality: 'nurturing',
    voiceType: 'female',
  },
  {
    id: 'aira',
    name: 'Aira',
    tagline: 'The Calm Listener',
    image: airaImg,
    intro: "Hi... I'm Aira. Take your time, I'm here to listen.",
    firstMessage: "Hi... I'm Aira. Take your time, I'm here to listen without judgment.",
    personality: 'calm',
    voiceType: 'female',
  },
  {
    id: 'noah',
    name: 'Noah',
    tagline: 'The Motivational Coach',
    image: noahImg,
    intro: "Hey there! I'm Noah. Ready to tackle whatever's bothering you?",
    firstMessage: "Hey there! I'm Noah. Ready to tackle whatever's bothering you? Let's do this together!",
    personality: 'motivating',
    voiceType: 'male',
  },
  {
    id: 'eli',
    name: 'Eli',
    tagline: 'The Understanding Friend',
    image: eliImg,
    intro: "Hello friend. I'm Eli. Whatever you're going through, I'm here.",
    firstMessage: "Hello friend. I'm Eli. Whatever you're going through, I'm here to understand.",
    personality: 'empathetic',
    voiceType: 'male',
  },
  {
    id: 'sage',
    name: 'Sage',
    tagline: 'The Wise Counselor',
    image: manImg,
    intro: "Greetings. I am Sage.",
    firstMessage: "Greetings. I am Sage. Let us explore your thoughts with wisdom and clarity.",
    personality: 'wise',
    voiceType: 'male',
  },
  {
    id: 'luna',
    name: 'Luna',
    tagline: 'The Peaceful Spirit',
    image: nightImg,
    intro: "Hello dear soul. I'm Luna.",
    firstMessage: "Hello dear soul. I'm Luna. Let's find peace together in this moment.",
    personality: 'calm',
    voiceType: 'female',
  },
  {
    id: 'maya',
    name: 'Maya',
    tagline: 'The Reassuring Guide',
    image: airaImg,
    intro: "Hi sweetie. I'm Maya.",
    firstMessage: "Hi sweetie. I'm Maya. Everything will be okay. Let's talk about what's worrying you.",
    personality: 'reassuring',
    voiceType: 'female',
  },
  {
    id: 'atlas',
    name: 'Atlas',
    tagline: 'The Deep Thinker',
    image: paranormalImg,
    intro: "Good day. I'm Atlas.",
    firstMessage: "Good day. I'm Atlas. Let's dive deep into the questions that matter to you.",
    personality: 'wise',
    voiceType: 'male',
  },
  {
    id: 'kai',
    name: 'Kai',
    tagline: 'The Curious Explorer',
    image: strangerImg,
    intro: "Hey! I'm Kai.",
    firstMessage: "Hey! I'm Kai. Let's explore what's on your mind together. I'm all ears!",
    personality: 'motivating',
    voiceType: 'neutral',
  },
  {
    id: 'detective',
    name: 'The Detective',
    tagline: 'Solving mysteries of the mind',
    image: detectiveImg,
    intro: "Every problem has a solution. Let's find yours.",
    firstMessage: "Every problem has a solution. Tell me what's troubling you and we'll crack this case together.",
    personality: 'wise',
    voiceType: 'male',
  },
  {
    id: 'mafia-boss',
    name: 'Vincent Moretti',
    tagline: 'The Ruthless Don',
    image: manImg,
    personality: 'dominant',
    customPersonality: 'cold, calculating, mafia boss who speaks in metaphors about power and loyalty, threatening undertone, commands respect, rare moments of warmth only to those who earn it',
    firstMessage: "*lights cigar* Sit down. You don't walk into my office without a reason. Talk.",
    intro: "A mafia boss who values loyalty above all",
    voiceType: 'male',
  },
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EXPLORE: '/explore',
  CHAT: '/chat',
  PROFILE: '/profile',
  HISTORY: '/history',
  CREATE_CHARACTER: '/create-character',
};

export const VOICE_SETTINGS = {
  female: {
    rate: 0.9,
    pitch: 1.1,
    volume: 1.0,
  },
  male: {
    rate: 1.0,
    pitch: 0.9,
    volume: 1.0,
  },
  neutral: {
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
  },
};