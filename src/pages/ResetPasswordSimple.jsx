
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPasswordSimple = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: security question, 3: new password
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://soultalk-api.ct.ws/soulapp/php/get_security_question.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setSecurityQuestion(data.question);
        setStep(2);
      } else {
        toast.error('Email not found');
      }
    } catch (error) {
      toast.error('Failed to verify email');
    } finally {
      setLoading(false);
    }
  };

  const handleSecurityAnswer = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://soultalk-api.ct.ws/soulapp/php/verify_security_answer.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, answer: securityAnswer })
      });

      const data = await response.json();

      if (data.success) {
        setStep(3);
      } else {
        toast.error('Incorrect answer');
      }
    } catch (error) {
      toast.error('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://soultalk-api.ct.ws/soulapp/php/reset_password_simple.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: newPassword })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Password reset successful!');
        navigate('/login');
      } else {
        toast.error('Failed to reset password');
      }
    } catch (error) {
      toast.error('Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '440px', background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '32px', textAlign: 'center' }}>
          Reset <span className="text-gradient">Password</span>
        </h1>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{ width: '100%', height: '52px', marginBottom: '16px', padding: '0 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? 'Checking...' : 'Continue'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSecurityAnswer}>
            <p style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.7)' }}>{securityQuestion}</p>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              placeholder="Your answer"
              required
              style={{ width: '100%', height: '52px', marginBottom: '16px', padding: '0 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset}>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (min 6 characters)"
              required
              minLength={6}
              style={{ width: '100%', height: '52px', marginBottom: '16px', padding: '0 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordSimple;