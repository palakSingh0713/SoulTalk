class VoiceService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.currentUtterance = null;
    this.isEnabled = false;
    this.voices = [];
    this.selectedVoice = null;

    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
    console.log('Available voices:', this.voices.map(v => v.name));
  }

  getVoiceForCharacter(character) {
    if (!character) return null;

    let voiceType = character.voiceType || 'female';

    const femaleName = /^(palak|aira|luna|maya|victoria|samantha|zira|susan|karen|moira|tessa|female)/i;
    const maleName = /^(noah|eli|sage|atlas|kai|david|mark|george|daniel|male)/i;

    if (femaleName.test(character.name)) {
      voiceType = 'female';
    } else if (maleName.test(character.name)) {
      voiceType = 'male';
    }

    const personality = character.personality || 'calm';

    let voiceConfig = {
      rate: 0.95,
      pitch: 1.0,
      volume: 1.0,
    };

    switch (personality) {
      case 'calm':
        voiceConfig.rate = 0.85;
        voiceConfig.pitch = voiceType === 'female' ? 1.05 : 0.90;
        break;
      case 'wise':
        voiceConfig.rate = 0.80;
        voiceConfig.pitch = voiceType === 'female' ? 1.00 : 0.85;
        break;
      case 'motivating':
        voiceConfig.rate = 1.05;
        voiceConfig.pitch = voiceType === 'female' ? 1.15 : 1.05;
        break;
      case 'nurturing':
        voiceConfig.rate = 0.88;
        voiceConfig.pitch = voiceType === 'female' ? 1.10 : 0.95;
        break;
      case 'empathetic':
        voiceConfig.rate = 0.90;
        voiceConfig.pitch = voiceType === 'female' ? 1.08 : 0.92;
        break;
      case 'reassuring':
        voiceConfig.rate = 0.87;
        voiceConfig.pitch = voiceType === 'female' ? 1.12 : 0.95;
        break;
      default:
        voiceConfig.rate = 0.92;
        voiceConfig.pitch = voiceType === 'female' ? 1.05 : 0.90;
    }

    let voice = null;

    // Prefer Microsoft Edge Neural voices
    if (voiceType === 'female') {
      voice = this.voices.find(v =>
        v.name.includes("Online (Natural)") &&
        v.lang.startsWith('en') &&
        (
          v.name.toLowerCase().includes('aria') ||
          v.name.toLowerCase().includes('jenny') ||
          v.name.toLowerCase().includes('female')
        )
      );
    } else {
      voice = this.voices.find(v =>
        v.name.includes("Online (Natural)") &&
        v.lang.startsWith('en') &&
        (
          v.name.toLowerCase().includes('guy') ||
          v.name.toLowerCase().includes('male')
        )
      );
    }

    if (!voice) {
      voice = this.voices.find(v => v.lang === 'en-US') ||
              this.voices.find(v => v.lang.startsWith('en'));
    }

    if (!voice && this.voices.length > 0) {
      voice = this.voices[0];
    }

    return { voice, config: voiceConfig };
  }

  speak(text, character) {
    if (!this.synth || !this.isEnabled) return;

    this.stop();

    //  Remove roleplay symbols so AI doesn't say them
    const cleanText = text
      .replace(/\*.*?\*/g, '')
      .replace(/\(.*?\)/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);

    const { voice, config } = this.getVoiceForCharacter(character);

    if (voice) {
      utterance.voice = voice;
      console.log('Using voice:', voice.name, 'for character:', character.name);
    }

    let rate = config.rate;
    let pitch = config.pitch;

    const lowerText = cleanText.toLowerCase();
    const personality = character?.personality?.toLowerCase() || "";

    // dominant character tone
    if (personality.includes("mafia") || personality.includes("dominant")) {
      rate = 0.78;
      pitch = 0.85;
    }

    // Emotional reactions
    if (lowerText.includes("whisper") || lowerText.includes("softly")) {
      rate = 0.75;
      pitch -= 0.05;
    }

    if (lowerText.includes("excited") || lowerText.includes("happy")) {
      rate = 1.1;
      pitch += 0.1;
    }

    if (lowerText.includes("serious") || lowerText.includes("calm")) {
      rate = 0.85;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = config.volume;
    utterance.lang = 'en-US';

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stop();
    }
    return this.isEnabled;
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
    this.stop();
  }

  isSpeaking() {
    return this.synth && this.synth.speaking;
  }

  isVoiceEnabled() {
    return this.isEnabled;
  }
}

const voiceService = new VoiceService();
export default voiceService;
