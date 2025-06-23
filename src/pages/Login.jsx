// birdlen_official_page/src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin'); // Redirect to dashboard on success
    } catch (err) {
      setError(err.message || 'Failed to log in');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <Link to="/reset-password" style={styles.link}>Forgot Password?</Link>
        <Link to="/" style={styles.link}>Back to Home</Link>
      </div>
    </div>
  );
}

// Basic styling for the component
const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#050f07' },
  card: { width: '100%', maxWidth: '400px', padding: '2rem', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '12px', color: 'white' },
  title: { textAlign: 'center', marginBottom: '1.5rem' },
  error: { color: 'red', textAlign: 'center', marginBottom: '1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.8rem', borderRadius: '8px', border: '1px solid #555', backgroundColor: '#333', color: 'white', fontSize: '1rem' },
  button: { padding: '0.8rem', borderRadius: '8px', border: 'none', backgroundColor: '#466043', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  link: { color: '#6dcfa8', textAlign: 'center', display: 'block', marginTop: '1rem' }
};