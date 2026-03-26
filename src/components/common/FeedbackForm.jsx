import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Star, Send, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';


const EMAILJS_SERVICE_ID = 'service_Palak';
const EMAILJS_TEMPLATE_ID = 'template_srwal8m'; 
const EMAILJS_PUBLIC_KEY = '0CRNlzBDDf-C1Ub1A';

const FeedbackForm = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    character_used: '',
    felt_realistic: '',
    response_quality: '',
    liked_most: '',
    issues: '',
    suggestions: '',
    emotional_connection: '',
  });

  const [errors, setErrors] = useState({});

  const characters = [
    'BTS / K-pop Character',
    'Mafia Boss (Vincent Moretti)',
    'Soft Friend',
    'Therapist / Empathetic',
    'Romantic AI',
    'Motivational Coach',
    'Wise Mentor',
    'Custom Character',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.character_used) newErrors.character_used = 'Please select a character';
    if (!rating) newErrors.rating = 'Please give a rating';
    if (!formData.felt_realistic) newErrors.felt_realistic = 'Please answer this';
    if (!formData.response_quality) newErrors.response_quality = 'Please answer this';
    if (!formData.emotional_connection) newErrors.emotional_connection = 'Please answer this';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fill required fields');
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.from_name || 'Anonymous',
      from_email: formData.from_email || 'Not provided',
      character_used: formData.character_used,
      rating: rating + ' / 5',
      felt_realistic: formData.felt_realistic,
      response_quality: formData.response_quality,
      liked_most: formData.liked_most || 'Not provided',
      issues: formData.issues || 'None',
      suggestions: formData.suggestions || 'None',
      emotional_connection: formData.emotional_connection,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      toast.success('Feedback sent! Thank you 💜');

    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      from_name: '',
      from_email: '',
      character_used: '',
      felt_realistic: '',
      response_quality: '',
      liked_most: '',
      issues: '',
      suggestions: '',
      emotional_connection: '',
    });
    setRating(0);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.07)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: 'white',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  };

  const fieldStyle = {
    marginBottom: '18px',
  };

  const errorStyle = {
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '4px',
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(6px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '32px',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>

        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'white',
            width: '36px', height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>

        {/* Success State */}
        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircle size={64} style={{ color: '#a855f7', marginBottom: '20px' }} />
            <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>
              Thank You! 💜
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', lineHeight: 1.6 }}>
              Your feedback has been received. It helps us make SoulTalk better for everyone!
            </p>
            <button
              onClick={handleClose}
              className="btn btn-primary"
              style={{ padding: '12px 32px' }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                marginBottom: '8px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Share Your Feedback
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                Help us improve SoulTalk! All fields marked * are required.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>

              {/* Name & Email Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                <div>
                  <label style={labelStyle}>Your Name (optional)</label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Your Email (optional)</label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Character Used */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Character Used *</label>
                <select
                  name="character_used"
                  value={formData.character_used}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="" style={{ background: '#1e1b4b' }}>Select a character...</option>
                  {characters.map(char => (
                    <option key={char} value={char} style={{ background: '#1e1b4b' }}>{char}</option>
                  ))}
                </select>
                {errors.character_used && <p style={errorStyle}>{errors.character_used}</p>}
              </div>

              {/* Star Rating */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Overall Experience *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        transition: 'transform 0.1s',
                        transform: hoveredRating >= star ? 'scale(1.2)' : 'scale(1)',
                      }}
                    >
                      <Star
                        size={32}
                        fill={(hoveredRating || rating) >= star ? '#f59e0b' : 'transparent'}
                        stroke={(hoveredRating || rating) >= star ? '#f59e0b' : 'rgba(255,255,255,0.3)'}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', alignSelf: 'center', marginLeft: '8px' }}>
                      {['', 'Poor', 'Fair', 'Good', 'Great', 'Amazing!'][rating]}
                    </span>
                  )}
                </div>
                {errors.rating && <p style={errorStyle}>{errors.rating}</p>}
              </div>

              {/* Felt Realistic */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Did the character feel realistic? *</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['Yes', 'Somewhat', 'No'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, felt_realistic: opt }));
                        setErrors(prev => ({ ...prev, felt_realistic: '' }));
                      }}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: formData.felt_realistic === opt ? '#a855f7' : 'rgba(255,255,255,0.2)',
                        background: formData.felt_realistic === opt
                          ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                          : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.felt_realistic && <p style={errorStyle}>{errors.felt_realistic}</p>}
              </div>

              {/* Response Quality */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Response Quality *</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['Very engaging', 'Good', 'Average', 'Needs improvement'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, response_quality: opt }));
                        setErrors(prev => ({ ...prev, response_quality: '' }));
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: formData.response_quality === opt ? '#a855f7' : 'rgba(255,255,255,0.2)',
                        background: formData.response_quality === opt
                          ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                          : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.response_quality && <p style={errorStyle}>{errors.response_quality}</p>}
              </div>

              {/* Emotional Connection */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Did you feel an emotional connection? *</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['Yes', 'Maybe', 'Not really'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, emotional_connection: opt }));
                        setErrors(prev => ({ ...prev, emotional_connection: '' }));
                      }}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: formData.emotional_connection === opt ? '#a855f7' : 'rgba(255,255,255,0.2)',
                        background: formData.emotional_connection === opt
                          ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                          : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.emotional_connection && <p style={errorStyle}>{errors.emotional_connection}</p>}
              </div>

              {/* What did you like most */}
              <div style={fieldStyle}>
                <label style={labelStyle}>What did you like most? (optional)</label>
                <textarea
                  name="liked_most"
                  value={formData.liked_most}
                  onChange={handleChange}
                  placeholder="Tell us what you enjoyed..."
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                />
              </div>

              {/* Issues faced */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Any issues faced? (optional)</label>
                <textarea
                  name="issues"
                  value={formData.issues}
                  onChange={handleChange}
                  placeholder="Describe any problems you encountered..."
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                />
              </div>

              {/* Suggestions */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Suggestions for improvement (optional)</label>
                <textarea
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleChange}
                  placeholder="How can we make SoulTalk better?..."
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  height: '52px',
                  borderRadius: '12px',
                  background: isSubmitting
                    ? 'rgba(168, 85, 247, 0.5)'
                    : 'linear-gradient(135deg, #9333ea, #ec4899)',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.2s',
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '20px', height: '20px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Feedback
                  </>
                )}
              </button>

            </form>
          </>
        )}

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        select option {
          background: #1e1b4b;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default FeedbackForm;