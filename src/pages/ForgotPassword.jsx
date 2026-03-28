import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, Lock, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  // Steps: 1 = Email, 2 = Security Question, 3 = New Password
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Fetch security question
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/get_security_question.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setSecurityQuestion(data.security_question);
        setStep(2);
        toast.success('Security question loaded');
      } else {
        toast.error(data.error || 'Failed to verify email');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      toast.error('Failed to verify email');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify security answer
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    
    if (!securityAnswer) {
      toast.error('Please enter your answer');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/verify_security_answer.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          email, 
          answer: securityAnswer 
        })
      });

      const data = await response.json();

      if (data.success) {
        setStep(3);
        toast.success('Answer verified! Set your new password');
      } else {
        toast.error(data.error || 'Incorrect answer');
      }
    } catch (error) {
      console.error('Answer verification error:', error);
      toast.error('Failed to verify answer');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset password
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/reset_password_simple.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          email, 
          newPassword 
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Password reset successful! Please login');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(data.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    height: '52px',
    padding: '0 16px 0 48px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)'
  };

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.4)',
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
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '500px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #9333ea, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              💜
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #9333ea, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0
            }}>
              SoulTalk
            </h1>
          </div>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
            Reset Password
          </p>
        </div>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px'
        }}>
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: step >= num 
                  ? 'linear-gradient(135deg, #9333ea, #ec4899)' 
                  : 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700',
                color: 'white',
                transition: 'all 0.3s'
              }}
            >
              {step > num ? <Check size={20} /> : num}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>

          {/* STEP 1: Enter Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '8px',
                color: 'white'
              }}>
                Enter your email
              </h2>
              <p style={{ 
                fontSize: '14px', 
                color: 'rgba(255, 255, 255, 0.6)', 
                marginBottom: '24px' 
              }}>
                We'll retrieve your security question
              </p>

              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={20} style={iconStyle} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '52px',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                {isLoading ? (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                ) : (
                  <>
                    Continue
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <Link
                to="/login"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </form>
          )}

          {/* STEP 2: Answer Security Question */}
          {step === 2 && (
            <form onSubmit={handleAnswerSubmit}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '8px',
                color: 'white'
              }}>
                Security Question
              </h2>
              <p style={{ 
                fontSize: '14px', 
                color: 'rgba(255, 255, 255, 0.6)', 
                marginBottom: '24px' 
              }}>
                Answer your security question to continue
              </p>

              {/* Display Security Question */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Your Security Question</label>
                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(147, 51, 234, 0.1)',
                  border: '2px solid rgba(147, 51, 234, 0.3)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Shield size={20} style={{ color: '#a855f7' }} />
                  {securityQuestion}
                </div>
              </div>

              {/* Answer Input */}
              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Your Answer</label>
                <div style={{ position: 'relative' }}>
                  <Shield size={20} style={iconStyle} />
                  <input
                    type="text"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    placeholder="Type your answer"
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  />
                </div>
                <p style={{ 
                  fontSize: '12px', 
                  color: 'rgba(255, 255, 255, 0.5)', 
                  marginTop: '6px' 
                }}>
                  Answer is case-insensitive
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '52px',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                {isLoading ? (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                ) : (
                  <>
                    Verify Answer
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setSecurityAnswer('');
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <ArrowLeft size={16} />
                Change Email
              </button>
            </form>
          )}

          {/* STEP 3: Set New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordReset}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '8px',
                color: 'white'
              }}>
                Set New Password
              </h2>
              <p style={{ 
                fontSize: '14px', 
                color: 'rgba(255, 255, 255, 0.6)', 
                marginBottom: '24px' 
              }}>
                Choose a strong password for your account
              </p>

              {/* New Password */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} style={iconStyle} />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 chars)"
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} style={iconStyle} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    style={{
                      ...inputStyle,
                      borderColor: confirmPassword && newPassword !== confirmPassword
                        ? 'rgba(239, 68, 68, 0.5)'
                        : confirmPassword && newPassword === confirmPassword
                        ? 'rgba(34, 197, 94, 0.5)'
                        : 'rgba(255, 255, 255, 0.1)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  />
                </div>
                {confirmPassword && (
                  <p style={{
                    fontSize: '12px',
                    marginTop: '6px',
                    color: newPassword === confirmPassword
                      ? 'rgba(34, 197, 94, 0.9)'
                      : 'rgba(239, 68, 68, 0.9)'
                  }}>
                    {newPassword === confirmPassword
                      ? '✅ Passwords match'
                      : '❌ Passwords do not match'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '52px',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isLoading ? (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                ) : (
                  <>
                    Reset Password
                    <Check size={20} />
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </motion.div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;