// file: birdlen_official_page/src/pages/ResetPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import * as authService from '../services/authService';

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('No reset token found. Please use the link from your email.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 3) {
            setError('Password must be at least 3 characters long.');
            return;
        }
        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            const response = await authService.resetPassword(token, password);
            
            if (response.data && !response.data.error) {
                setMessage('Your password has been reset successfully! You will be redirected to the login page shortly.');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                throw new Error(response.data.message || 'Failed to reset password.');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    const styles = {
      container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#050f07', padding: '1rem' },
      card: { width: '100%', maxWidth: '450px', padding: '2rem', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '12px', color: 'white' },
      title: { textAlign: 'center', marginBottom: '1.5rem', color: '#fff', fontSize: '2rem' },
      message: { color: 'var(--birdlens-green-wave-2)', marginBottom: '1rem', textAlign: 'center' },
      error: { color: '#F44336', marginBottom: '1rem', textAlign: 'center' },
      form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
      input: { padding: '0.8rem', borderRadius: '8px', border: '1px solid #555', backgroundColor: '#333', color: 'white', fontSize: '1rem' },
      button: { padding: '0.8rem', borderRadius: '8px', border: 'none', backgroundColor: '#466043', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s' },
      buttonDisabled: { backgroundColor: '#555', cursor: 'not-allowed' },
      link: { color: '#6dcfa8', textAlign: 'center', display: 'block', marginTop: '1rem' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Reset Password</h1>
                {message && <p style={styles.message}>{message}</p>}
                {error && <p style={styles.error}>{error}</p>}
                {!message && (
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left' }}>New Password</label>
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} disabled={isLoading || !token}/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left' }}>Confirm New Password</label>
                            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={styles.input} disabled={isLoading || !token} />
                        </div>
                        <button type="submit" disabled={isLoading || !token} style={{...styles.button, ...(isLoading || !token ? styles.buttonDisabled : {})}}>
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
                 <Link to="/login" style={styles.link}>Back to Login</Link>
            </div>
        </div>
    );
}