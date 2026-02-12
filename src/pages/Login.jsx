import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        setMessage('Check your email to confirm your account.');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate('/contact');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label htmlFor="email" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--dark-text)',
        }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--dark-text)',
        }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          minLength={6}
        />
      </div>
      {error && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#FEE2E2',
          color: '#991B1B',
          borderRadius: 'var(--radius)',
          fontSize: '0.9rem',
        }}>
          {error}
        </div>
      )}
      {message && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#D1FAE5',
          color: '#065F46',
          borderRadius: 'var(--radius)',
          fontSize: '0.9rem',
        }}>
          {message}
        </div>
      )}
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--dark-text)', textAlign: 'center' }}>
        {isSignUp ? (
          <>Already have an account?{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-blue)',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
                fontSize: 'inherit',
              }}
            >
              Sign in
            </button>
          </>
        ) : (
          <>Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-blue)',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
                fontSize: 'inherit',
              }}
            >
              Sign up
            </button>
          </>
        )}
      </p>
    </form>
  );
}
