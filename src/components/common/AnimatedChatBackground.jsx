import { useEffect, useRef } from 'react';

const AnimatedChatBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Sample chat messages
    const messages = [
      "How are you today? 😊",
      "I'm feeling great!",
      "Tell me about your day",
      "AI companions are amazing",
      "Let's chat! 💬",
      "You're doing great! 💪",
      "I'm here for you",
      "That's interesting! ✨",
      "Tell me more",
      "I understand how you feel",
      "You've got this! 🌟",
      "Let's explore together",
      "What's on your mind?",
      "I'm listening... 👂",
      "That sounds wonderful!",
      "Keep going! 🚀",
      "You're not alone",
      "I care about you 💜",
      "Amazing progress!",
      "How can I help?",
    ];

    class ChatBubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = messages[Math.floor(Math.random() * messages.length)];
        this.speed = 0.3 + Math.random() * 0.5;
        this.opacity = 0.15 + Math.random() * 0.25;
        this.size = 14 + Math.random() * 8;
        this.isUser = Math.random() > 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.drift = Math.random() * 0.02 - 0.01;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        // Measure text
        ctx.font = `${this.size}px "Inter", sans-serif`;
        const textWidth = ctx.measureText(this.text).width;
        const padding = 16;
        const bubbleWidth = textWidth + padding * 2;
        const bubbleHeight = this.size + padding * 1.5;

        // Draw bubble
        ctx.beginPath();
        
        // Gradient background
        const gradient = ctx.createLinearGradient(
          this.x, 
          this.y, 
          this.x + bubbleWidth, 
          this.y + bubbleHeight
        );
        
        if (this.isUser) {
          gradient.addColorStop(0, 'rgba(147, 51, 234, 0.6)'); // Purple
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.6)'); // Pink
        } else {
          gradient.addColorStop(0, 'rgba(30, 27, 75, 0.8)');
          gradient.addColorStop(1, 'rgba(49, 46, 129, 0.8)');
        }

        ctx.fillStyle = gradient;
        
        // Rounded rectangle
        const radius = 16;
        ctx.moveTo(this.x + radius, this.y);
        ctx.lineTo(this.x + bubbleWidth - radius, this.y);
        ctx.quadraticCurveTo(this.x + bubbleWidth, this.y, this.x + bubbleWidth, this.y + radius);
        ctx.lineTo(this.x + bubbleWidth, this.y + bubbleHeight - radius);
        ctx.quadraticCurveTo(this.x + bubbleWidth, this.y + bubbleHeight, this.x + bubbleWidth - radius, this.y + bubbleHeight);
        ctx.lineTo(this.x + radius, this.y + bubbleHeight);
        ctx.quadraticCurveTo(this.x, this.y + bubbleHeight, this.x, this.y + bubbleHeight - radius);
        ctx.lineTo(this.x, this.y + radius);
        ctx.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
        ctx.closePath();
        ctx.fill();

        // Draw text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x + padding, this.y + bubbleHeight / 2);

        ctx.restore();
      }

      update() {
        // Floating animation
        this.angle += this.drift;
        this.y -= this.speed;
        this.x += Math.sin(this.angle) * 0.5;

        // Reset when off screen
        if (this.y < -100) {
          this.y = canvas.height + 100;
          this.x = Math.random() * canvas.width;
          this.text = messages[Math.floor(Math.random() * messages.length)];
        }

        // Wrap horizontally
        if (this.x < -200) this.x = canvas.width + 200;
        if (this.x > canvas.width + 200) this.x = -200;
      }
    }

    // Create bubbles
    const bubbles = [];
    const bubbleCount = Math.floor((canvas.width * canvas.height) / 30000);
    
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new ChatBubble());
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default AnimatedChatBackground;