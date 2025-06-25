// birdlen_official_page/src/pages/VerifyEmailPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import { Spin, Result, Button, ConfigProvider } from 'antd';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        const userId = searchParams.get('user_id');

        if (!token || !userId) {
            setStatus('error');
            setErrorMessage('Invalid verification link. Please check the URL and try again.');
            return;
        }

        const verify = async () => {
            try {
                // The backend responds with HTML, not JSON. We only care about the status code.
                await authService.verifyEmail(token, userId);
                setStatus('success');
            } catch (err) {
                setStatus('error');
                // The backend error response is HTML, so we use a generic message.
                const defaultMessage = 'Email verification failed. The link may be invalid, expired, or already used.';
                setErrorMessage(err.response?.data?.message || defaultMessage);
            }
        };

        verify();
    }, [searchParams]);

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#050f07',
            padding: '1rem',
            color: 'white',
        },
    };

    const renderContent = () => {
        switch (status) {
            case 'loading':
                return <Spin size="large" tip="Verifying your email..." />;
            case 'success':
                return (
                    <Result
                        status="success"
                        title="Email Verified Successfully!"
                        subTitle="You can now log in to your account."
                        extra={[
                            <Button type="primary" key="login" onClick={() => navigate('/login')}>
                                Go to Login
                            </Button>,
                        ]}
                    />
                );
            case 'error':
                return (
                    <Result
                        status="error"
                        title="Verification Failed"
                        subTitle={errorMessage}
                        extra={[
                            <Button type="primary" key="home" onClick={() => navigate('/')}>
                                Back to Home
                            </Button>,
                        ]}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <ConfigProvider theme={{
            token: { colorText: 'rgba(255, 255, 255, 0.85)', colorTextHeading: 'white' },
            components: {
                Result: {
                    titleColor: 'white',
                    subtitleColor: 'rgba(255, 255, 255, 0.65)',
                    iconFontSize: 72
                },
                Spin: {
                    colorText: 'rgba(255, 255, 255, 0.65)',
                },
                Button: {
                    colorPrimary: '#466043',
                    colorPrimaryHover: '#7ba06a',
                }
            }
        }}>
            <div style={styles.container}>
                {renderContent()}
            </div>
        </ConfigProvider>
    );
}