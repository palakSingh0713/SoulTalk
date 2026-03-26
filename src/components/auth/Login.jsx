import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import toast from 'react-hot-toast';
import AnimatedChatBackground from '../common/AnimatedChatBackground';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://soultalk-api.ct.ws/soulapp/php/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        login({ email: formData.email, name: data.user?.name || 'User' });
        toast.success('Welcome back! 💜');
        navigate('/explore');
      } else {
        toast.error(data.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px 40px 20px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* ⭐ ANIMATED CHAT BACKGROUND */}
      <AnimatedChatBackground />

      {/* Gradient Orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 6s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '460px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4)'
              }}
            >
              💜
            </motion.div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #9333ea, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              letterSpacing: '-0.5px'
            }}>
              SoulTalk
            </h1>
          </div>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            fontWeight: '500'
          }}>
            Welcome back! Sign in to continue
          </p>
        </motion.div>

        {/* Enhanced Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '28px',
            padding: '48px',
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle gradient overlay on card */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8), transparent)'
          }} />

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  pointerEvents: 'none'
                }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  style={{
                    width: '100%',
                    height: '56px',
                    padding: '0 16px 0 50px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '2px solid rgba(255, 255, 255, 0.12)',
                    color: 'white',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(168, 85, 247, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  pointerEvents: 'none'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%',
                    height: '56px',
                    padding: '0 50px 0 50px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '2px solid rgba(255, 255, 255, 0.12)',
                    color: 'white',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(168, 85, 247, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#a855f7'
                  }}
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                style={{
                  fontSize: '14px',
                  color: '#a855f7',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ec4899'}
                onMouseLeave={(e) => e.target.style.color = '#a855f7'}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button with Gradient */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '56px',
                fontSize: '16px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                border: 'none',
                borderRadius: '14px',
                color: 'white',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 8px 24px rgba(147, 51, 234, 0.4)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>
                {isLoading ? (
                  <div style={{
                    width: '22px',
                    height: '22px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </span>
            </motion.button>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.15)' }} />
              <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.15)' }} />
            </div>

            {/* Register Link */}
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '12px'
              }}>
                Don't have an account?
              </p>
              <Link
                to="/register"
                style={{
                  width: '100%',
                  height: '56px',
                  fontSize: '16px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '14px',
                  color: 'white',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                Create Free Account
              </Link>
            </div>
          </form>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Login;