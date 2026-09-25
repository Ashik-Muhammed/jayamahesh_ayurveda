// Admin & Staff Login Page with Demo Quick-Fill Presets
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  Key, 
  ArrowLeft, 
  AlertCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const { login, resetPassword, isFirebase } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter your staff email and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.error || 'Failed to authenticate. Please check your credentials.');
    }
  };

  const handleQuickLogin = (demoEmail, demoPass = 'ayurveda123') => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your email above to receive a password reset link.');
      return;
    }
    const res = await resetPassword(email);
    if (res.success) {
      setForgotSent(true);
      setErrorMsg('');
    } else {
      setErrorMsg(res.error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0C2B24 0%, #173A30 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: 'var(--color-paper-white)',
        width: '100%',
        maxWidth: '460px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-modal)',
        border: '1px solid #C69A45',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: '#0C2B24',
          color: '#FBFAF7',
          padding: '28px 24px',
          textAlign: 'center',
          borderBottom: '2px solid #C59A44'
        }}>
          <div style={{ marginBottom: '14px' }}>
            <Logo variant="stacked" theme="dark" size="md" />
          </div>
          <div style={{ color: '#E4C078', fontSize: '0.78rem', margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
            Staff & Clinical Portal
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: '32px 28px' }}>
          {errorMsg && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {forgotSent && (
            <div style={{
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              color: '#065F46',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <CheckCircle2 size={16} />
              <span>Password reset instructions sent to {email}.</span>
            </div>
          )}

          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} color="#C69A45" /> Staff Email
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="staff@jayamahesh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Key size={15} color="#C69A45" /> Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={{ fontSize: '0.78rem', color: '#B96D4B', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem', marginTop: '12px' }}
            >
              <Lock size={16} />
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>

          {/* Quick Preset Buttons for Evaluation */}
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border-soft)'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#77837D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', textAlign: 'center' }}>
              One-Click Evaluation Roles:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@jayamahesh.com', 'admin123')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #C69A45',
                  background: 'rgba(198, 154, 69, 0.1)',
                  color: '#0C2B24',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Admin
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('manager@jayamahesh.com', 'manager123')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #173A30',
                  background: 'rgba(23, 58, 48, 0.08)',
                  color: '#173A30',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Manager
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('staff@jayamahesh.com', 'staff123')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #D6DED9',
                  background: '#FFFFFF',
                  color: '#4B5563',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Staff
              </button>
            </div>
          </div>

          {/* Return link */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                color: '#77837D',
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={14} /> Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
