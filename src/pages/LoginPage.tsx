import React from 'react';
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from 'firebase/auth';
import type { ConfirmationResult } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, hasFirebaseConfig } from '../lib/firebase';
import { useAuthStore } from '../stores';
import { mapFirebaseUserToAppUser } from '../utils/auth';
import './LoginPage.css';

const formatIndianPhone = (value: string) => {
  const onlyDigits = value.replace(/\D/g, '');
  if (onlyDigits.length === 10) {
    return `+91${onlyDigits}`;
  }
  if (onlyDigits.length > 10 && onlyDigits.startsWith('91')) {
    return `+${onlyDigits}`;
  }
  if (value.startsWith('+')) {
    return value;
  }
  return `+${onlyDigits}`;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [authMode, setAuthMode] = React.useState<'email' | 'phone'>('email');
  const [emailMode, setEmailMode] = React.useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const recaptchaVerifierRef = React.useRef<RecaptchaVerifier | null>(null);

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || '/menu';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  React.useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const handleEmailAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!auth) {
      setMessage('Firebase is not configured. Add Firebase env values to continue.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const credential =
        emailMode === 'signin'
          ? await signInWithEmailAndPassword(auth, email.trim(), password)
          : await createUserWithEmailAndPassword(auth, email.trim(), password);

      setUser(mapFirebaseUserToAppUser(credential.user));
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const authError = error as { message?: string };
      setMessage(authError.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!auth) {
      setMessage('Firebase is not configured. Add Firebase env values to continue.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        });
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        formatIndianPhone(phone),
        recaptchaVerifierRef.current
      );
      setConfirmationResult(confirmation);
      setMessage('OTP sent successfully. Enter the verification code.');
    } catch (error) {
      const authError = error as { message?: string };
      setMessage(authError.message || 'Unable to send OTP. Please verify the phone number.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) {
      setMessage('Please request OTP first.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await confirmationResult.confirm(otp.trim());
      setUser(mapFirebaseUserToAppUser(result.user));
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const authError = error as { message?: string };
      setMessage(authError.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card card">
        <h1>Sign In</h1>
        <p className="login-subtitle">Login to place orders and track your deliveries.</p>

        {!hasFirebaseConfig && (
          <div className="auth-message warning">
            Firebase config is missing. Create environment variables before login.
          </div>
        )}

        <div className="auth-mode-tabs" aria-label="Authentication mode">
          <button
            className={`mode-tab ${authMode === 'email' ? 'active' : ''}`}
            onClick={() => setAuthMode('email')}
            type="button"
          >
            Email & Password
          </button>
          <button
            className={`mode-tab ${authMode === 'phone' ? 'active' : ''}`}
            onClick={() => setAuthMode('phone')}
            type="button"
          >
            Mobile OTP
          </button>
        </div>

        {authMode === 'email' ? (
          <form onSubmit={handleEmailAuth} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>

            <button disabled={loading || !hasFirebaseConfig} className="btn btn-primary btn-full" type="submit">
              {loading ? 'Please wait...' : emailMode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>

            <button
              className="switch-mode"
              type="button"
              onClick={() => setEmailMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))}
            >
              {emailMode === 'signin' ? 'New here? Create account' : 'Already have an account? Sign in'}
            </button>
          </form>
        ) : (
          <div className="auth-form">
            <div className="form-group">
              <label htmlFor="phone">Mobile Number</label>
              <input
                id="phone"
                type="tel"
                className="form-input"
                placeholder="10 digit mobile number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <button
              className="btn btn-outline btn-full"
              type="button"
              onClick={sendOtp}
              disabled={loading || !hasFirebaseConfig}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            {confirmationResult && (
              <>
                <div className="form-group otp-group">
                  <label htmlFor="otp">OTP</label>
                  <input
                    id="otp"
                    type="text"
                    className="form-input"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary btn-full"
                  type="button"
                  onClick={verifyOtp}
                  disabled={loading || !hasFirebaseConfig}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </>
            )}
          </div>
        )}

        {message && <p className="auth-message">{message}</p>}

        <div id="recaptcha-container" />

        <p className="go-back-text">
          Continue browsing from <Link to="/menu">Menu</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
