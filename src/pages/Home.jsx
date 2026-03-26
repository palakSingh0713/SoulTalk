import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import FeedbackForm from '../components/common/FeedbackForm';
import Footer from '../components/common/Footer';
import { useTranslation } from 'react-i18next';
import { 
  MessageSquare, 
  Brain, 
  Heart, 
  Sparkles, 
  Shield, 
  Zap,
  Users,
  TrendingUp,
  ArrowRight,
  Check,
  Star
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showFeedback, setShowFeedback] = useState(false);
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Conversations",
      description: "Advanced natural language processing for human-like interactions",
      color: "#8b5cf6"
    },
    {
      icon: Heart,
      title: "Empathetic Support",
      description: "Emotional intelligence designed to understand and support you",
      color: "#ec4899"
    },
    {
      icon: Users,
      title: "Multiple Personalities",
      description: "Choose from various AI companions tailored to your needs",
      color: "#06b6d4"
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your conversations are encrypted and completely confidential",
      color: "#10b981"
    },
    {
      icon: Sparkles,
      title: "Personalized Experience",
      description: "AI learns and adapts to provide better conversations over time",
      color: "#f59e0b"
    },
    {
      icon: Zap,
      title: "Real-Time Responses",
      description: "Instant replies powered by cutting-edge AI technology",
      color: "#6366f1"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500K+", label: "Conversations" },
    { number: "4.9/5", label: "User Rating" },
    { number: "24/7", label: "Available" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      text: "SoulTalk helped me through tough times. It's like having a supportive friend available 24/7.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Professional",
      text: "The AI is incredibly empathetic. I use it daily for motivation and mental clarity.",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Freelancer",
      text: "Best AI companion I've tried. The conversations feel genuinely meaningful.",
      rating: 5
    }
  ];

  return (
    <div className="page-with-navbar" style={{ background: '#0a0a0a' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)'
      }}>
        {/* Animated Background Grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.3,
          animation: 'gridMove 20s linear infinite'
        }} />

        {/* Gradient Orb */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                background: 'rgba(147, 51, 234, 0.1)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '50px',
                marginBottom: '32px',
                fontSize: '14px',
                color: '#c084fc'
              }}
            >
              <Sparkles size={16} />
              <span>Powered by Advanced AI Technology</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: '800',
                lineHeight: '1.1',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Your AI Companion for<br />
              <span style={{
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Meaningful Conversations
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '700px',
                margin: '0 auto 48px',
                lineHeight: '1.6'
              }}
            >
              Experience empathetic, personalized conversations with AI companions
              designed to understand, support, and inspire you every day.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '80px'
              }}
            >
              {user ? (
                <button
                  onClick={() => navigate('/explore')}
                  style={{
                    padding: '16px 40px',
                    fontSize: '18px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 40px rgba(147, 51, 234, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 32px rgba(147, 51, 234, 0.4)';
                  }}
                >
                  Explore Characters
                  <ArrowRight size={20} />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/register')}
                    style={{
                      padding: '16px 40px',
                      fontSize: '18px',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 40px rgba(147, 51, 234, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 32px rgba(147, 51, 234, 0.4)';
                    }}
                  >
                    Get Started Free
                    <ArrowRight size={20} />
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    style={{
                      padding: '16px 40px',
                      fontSize: '18px',
                      fontWeight: '700',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    Sign In
                  </button>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '32px',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              {stats.map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '8px'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '120px 20px',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: 'rgba(147, 51, 234, 0.1)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '50px',
                marginBottom: '24px',
                fontSize: '14px',
                color: '#c084fc',
                fontWeight: '600'
              }}
            >
              FEATURES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                color: 'white',
                marginBottom: '16px'
              }}
            >
              Everything You Need for
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Meaningful Connections
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: '1.125rem',
                color: 'rgba(255, 255, 255, 0.6)',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Discover why thousands choose SoulTalk as their trusted AI companion
            </motion.p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                style={{
                  padding: '40px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = `${feature.color}40`;
                  e.currentTarget.style.boxShadow = `0 20px 60px ${feature.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: `${feature.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <feature.icon size={28} color={feature.color} />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '12px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: '120px 20px',
        background: '#0a0a0a'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: 'rgba(147, 51, 234, 0.1)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '50px',
                marginBottom: '24px',
                fontSize: '14px',
                color: '#c084fc',
                fontWeight: '600'
              }}
            >
              TESTIMONIALS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                color: 'white',
                marginBottom: '16px'
              }}
            >
              Loved by Thousands
            </motion.h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px'
                }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  "{testimonial.text}"
                </p>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>
                    {testimonial.name}
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '120px 20px',
        background: '#0a0a0a',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: 'rgba(147, 51, 234, 0.1)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '50px',
                marginBottom: '24px',
                fontSize: '14px',
                color: '#c084fc',
                fontWeight: '600'
              }}
            >
              HOW IT WORKS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                color: 'white',
                marginBottom: '16px'
              }}
            >
              Get Started in{' '}
              <span style={{
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                3 Simple Steps
              </span>
            </motion.h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            position: 'relative'
          }}>
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '2rem',
                fontWeight: '800',
                color: 'white',
                boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4)'
              }}>
                1
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '12px'
              }}>
                Create Your Account
              </h3>
              <p style={{
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6'
              }}>
                Sign up in seconds with just your email. No credit card required, completely free to start.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #06b6d4, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '2rem',
                fontWeight: '800',
                color: 'white',
                boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4)'
              }}>
                2
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '12px'
              }}>
                Choose Your Companion
              </h3>
              <p style={{
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6'
              }}>
                Browse our collection of AI personalities and select one that matches your needs and preferences.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '2rem',
                fontWeight: '800',
                color: 'white',
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.4)'
              }}>
                3
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '12px'
              }}>
                Start Chatting
              </h3>
              <p style={{
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6'
              }}>
                Begin meaningful conversations instantly. Your AI companion is ready to listen, support, and engage 24/7.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose SoulTalk Section */}
      <section style={{
        padding: '120px 20px',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a2e 100%)',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {/* Why Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(147, 51, 234, 0.1)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Check size={32} color="#9333ea" strokeWidth={3} />
              </div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '8px'
              }}>
                100% Free to Start
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.5'
              }}>
                No hidden fees, no credit card needed
              </p>
            </motion.div>

            {/* Why Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Check size={32} color="#10b981" strokeWidth={3} />
              </div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '8px'
              }}>
                Private & Secure
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.5'
              }}>
                Your conversations are encrypted and confidential
              </p>
            </motion.div>

            {/* Why Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Check size={32} color="#06b6d4" strokeWidth={3} />
              </div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '8px'
              }}>
                Available 24/7
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.5'
              }}>
                Your AI companion is always ready to chat
              </p>
            </motion.div>

            {/* Why Item 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Check size={32} color="#f59e0b" strokeWidth={3} />
              </div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '8px'
              }}>
                No Installation Required
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.5'
              }}>
                Works directly in your browser instantly
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #1a0a2e 0%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2), transparent 70%)',
          filter: 'blur(100px)',
          borderRadius: '50%'
        }} />

        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: 'white',
              marginBottom: '24px'
            }}
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '48px'
            }}
          >
            Join thousands of users experiencing meaningful AI conversations
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {!user && (
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '18px 48px',
                  fontSize: '18px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 16px 48px rgba(147, 51, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 32px rgba(147, 51, 234, 0.4)';
                }}
              >
                Get Started for Free
                <ArrowRight size={20} />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      <Footer onFeedbackClick={() => setShowFeedback(true)} />
      <FeedbackForm 
        isOpen={showFeedback} 
        onClose={() => setShowFeedback(false)} 
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
      `}</style>
    </div>
  );
};

export default Home;