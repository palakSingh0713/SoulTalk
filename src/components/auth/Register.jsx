import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import AnimatedChatBackground from '../common/AnimatedChatBackground';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: 'What is your favorite color?',
    securityAnswer: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const securityQuestions = [
    'What is your favorite color?',
    'What city were you born in?',
    'What is your mother\'s maiden name?',
    'What was the name of your first pet?',
    'What is your favorite food?',
    'What is your favorite book?',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || 
        !formData.confirmPassword || !formData.securityAnswer) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.securityAnswer.length < 2) {
      toast.error('Please provide a security answer');
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(
        formData.name, 
        formData.email, 
        formData.password,
        formData.securityQuestion,
        formData.securityAnswer
      );
      
      if (result.success) {
        toast.success('Account created! Please login 💜');
        navigate('/login');
      }
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
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
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)'
  };

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.5)',
    pointerEvents: 'none'
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
          maxWidth: '520px',
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
            Create your account
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
            {/* Name Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={20} style={iconStyle} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  style={inputStyle}
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

            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} style={iconStyle} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
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
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={iconStyle} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min 6 chars)"
                  required
                  style={{ ...inputStyle, paddingRight: '50px' }}
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
                  onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field with Real-time Validation */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={iconStyle} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  style={{
                    ...inputStyle,
                    paddingRight: '50px',
                    borderColor: formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'rgba(239, 68, 68, 0.6)'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'rgba(34, 197, 94, 0.6)'
                      : 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => {
                    if (!formData.confirmPassword || formData.password === formData.confirmPassword) {
                      e.target.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                    }
                    e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(168, 85, 247, 0.1)';
                  }}
                  onBlur={(e) => {
                    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
                      e.target.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                    } else if (formData.confirmPassword && formData.password === formData.confirmPassword) {
                      e.target.style.borderColor = 'rgba(34, 197, 94, 0.6)';
                    } else {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <p style={{
                  fontSize: '12px',
                  marginTop: '6px',
                  color: formData.password === formData.confirmPassword
                    ? 'rgba(34, 197, 94, 0.9)'
                    : 'rgba(239, 68, 68, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {formData.password === formData.confirmPassword
                    ? '✅ Passwords match'
                    : '❌ Passwords do not match'}
                </p>
              )}
            </div>

            {/* Security Question Dropdown */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>
                <Shield size={16} style={{ display: 'inline', marginRight: '6px' }} />
                Security Question (for password recovery)
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  required
                  style={{
                    ...inputStyle,
                    paddingLeft: '16px',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'rgba(255,255,255,0.5)\' stroke-width=\'2\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
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
                >
                  {securityQuestions.map(q => (
                    <option key={q} value={q} style={{ background: '#1e1b4b', color: 'white' }}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Security Answer Field */}
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>Your Answer</label>
              <div style={{ position: 'relative' }}>
                <Shield size={20} style={iconStyle} />
                <input
                  type="text"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  onChange={handleChange}
                  placeholder="Type your answer"
                  required
                  style={inputStyle}
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
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                This will be used to recover your password if you forget it
              </p>
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
                    Create Account
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

            {/* Login Link */}
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '12px'
              }}>
                Already have an account?
              </p>
              <Link
                to="/login"
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
                Sign In Instead
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

export default Register;