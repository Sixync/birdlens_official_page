// src/pages/DownloadPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DownloadPage() {
    useEffect(() => {
        // Create an invisible anchor element
        const link = document.createElement('a');
        // Point it to your APK file in the public directory
        link.href = '/app-release.apk';
        // Logic: Set the desired filename for the download.
        link.setAttribute('download', 'birdlens v2.03.apk'); 
        // Append to the body (required for Firefox)
        document.body.appendChild(link);
        // Programmatically click the link to start the download
        link.click();
        // Clean up by removing the element
        document.body.removeChild(link);
    }, []); // The empty array ensures this effect runs only once

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Download Starting...</h1>
                <p style={styles.message}>
                    Your download for BirdLens has started automatically.
                </p>
                <p style={styles.message}>
                    If the download doesn't begin, please check your browser's download permissions for this site.
                </p>
                <Link to="/" style={styles.link}>Go back to Homepage</Link>
            </div>
        </div>
    );
}

// Simple styling for the feedback page
const styles = {
    container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#050f07', padding: '1rem' },
    card: { width: '100%', maxWidth: '500px', padding: '2rem', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '12px', color: 'white', textAlign: 'center' },
    title: { marginBottom: '1.5rem', color: '#6dcfa8', fontSize: '2rem' },
    message: { marginBottom: '1rem', lineHeight: '1.6' },
    link: { color: '#6dcfa8', display: 'block', marginTop: '2rem', textDecoration: 'underline' }
};