import { useState, useCallback, useEffect } from 'react';
import voiceService from '../services/voiceService';
import toast from 'react-hot-toast';

export const useVoice = (personality = 'empathetic') => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const supported = voiceService.isRecognitionSupported() && 
                     voiceService.isSynthesisSupported();
    setIsSupported(supported);
    
    if (!supported) {
      console.warn('Voice features not fully supported in this browser');
    }
  }, []);

  const startListening = useCallback((onResult) => {
    if (!isSupported) {
      toast.error('Voice input not supported in this browser');
      return;
    }

    setIsListening(true);
    
    voiceService.startListening(
      (transcript) => {
        setIsListening(false);
        onResult?.(transcript);
      },
      (error) => {
        setIsListening(false);
        toast.error('Could not recognize speech. Please try again.');
        console.error('Recognition error:', error);
      }
    );
  }, [isSupported]);

  const stopListening = useCallback(() => {
    voiceService.stopListening();
    setIsListening(false);
  }, []);

  const speak = useCallback((text, onEnd) => {
    if (!isSupported) {
      return;
    }

    setIsSpeaking(true);
    
    voiceService.speak(text, personality, () => {
      setIsSpeaking(false);
      onEnd?.();
    });
  }, [personality, isSupported]);

  const stopSpeaking = useCallback(() => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  }, []);

  return {
    isListening,
    isSpeaking,
    isSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
};