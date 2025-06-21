// birdlen_official_page/src/App.jsx
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './App.css';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';

// --- Icon Components (from original App.jsx) ---
const BirdIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
    <path d="M22 5.5C22 4.12 20.88 3 19.5 3S17 4.12 17 5.5c0 .05.01.1.01.15L12 11.28l-5.01-5.63C6.99 5.6 7 5.55 7 5.5C7 4.12 5.88 3 4.5 3S2 4.12 2 5.5c0 1.06.63 1.96 1.5 2.31V10c0 1.1.9 2 2 2h1c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1H4c-1.1 0-2-.9-2-2v-1.5C2.63 13.04 2 12.14 2 11V8.85c-.01-.05-.01-.1-.01-.15C1.99 7.65 2 7.6 2 7.59V7c0-2.21 1.79-4 4-4s4 1.79 4 4v10.5c0 .05-.01.1-.01.15L12 11.28l1.01 1.14L12 13.56l-2.2-2.47c-.38-.43-.99-.51-1.48-.19-.57.38-.74 1.18-.36 1.75l3.29 4.7L10.25 19H7.72c-.35 0-.68.11-.95.32l-2.4 1.71C4.02 21.29 4 21.66 4 22c0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-.34-.02-.71-.37-0.97l-2.4-1.71c-.27-.21-.6-.32-.95-.32h-2.53l-1.04-1.75 3.29-4.7c.38-.57.21-1.37-.36-1.75-.49-.32-1.1-.24-1.48.19L12 13.56l-1.01-1.14.01-.15V7c0-2.21 1.79-4 4-4s4 1.79 4 4v1.59c0 .01 0 .06.01.11.01.05.01.1.01.15V11c0 1.14-.63 2.04-1.5 2.31V15c0 1.1-.9 2-2 2h-1c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h1c1.1 0 2-.9 2-2V7.85c.87-.35 1.5-1.25 1.5-2.35z" />
  </svg>
);
const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.12V5l6 2.12V19z" />
  </svg>
);
const CommunityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

// --- Section Components (from original App.jsx) ---
function HeroSection({ id }) {
  const { t } = useTranslation();
  const handleDownloadClick = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.globalGoToSection) {
      const downloadSectionIndex = SECTION_COMPONENTS_CONFIG.findIndex(s => s.id === "download");
      if (downloadSectionIndex !== -1) {
        window.globalGoToSection(downloadSectionIndex);
      }
    }
  };
  return (
    <section className="hero section" id={id}>
      <h1>{t('hero.title')}</h1>
      <p className="subtitle">{t('hero.subtitle')}</p>
      <a href="#download" className="button hero-cta" onClick={handleDownloadClick}>
        {t('hero.cta')}
      </a>
    </section>
  );
}

function MapDemoSection({ id }) {
  const { t } = useTranslation();
  return (
    <section id={id} className="section map-demo-section section-light">
      <div className="container">
        <h2 className="text-center">{t('mapDemoSection.title')}</h2>
        <p className="text-center" style={{ marginBottom: '1.5rem', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          {t('mapDemoSection.description')}
        </p>
        <div className="video-container">
          <video controls width="100%" preload="metadata" poster="/images/map_video_poster.jpg">
            <source src="/videos/Birdlens_map_preview.mp4" type="video/mp4" />
            {t('mapDemoSection.videoNotSupported', 'Your browser does not support the video tag.')}
          </video>
        </div>
        <p className="text-center" style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
          {t('mapDemoSection.videoCaption', 'Watch a quick preview of our interactive map features in action.')}
        </p>
      </div>
    </section>
  );
}

function AboutSection({ id }) {
  const { t } = useTranslation();
  const reasons = t('aboutSection.reasons', { returnObjects: true });
  return (
    <section id={id} className="section section-light">
      <div className="container">
        <h2 className="text-center">{t('aboutSection.title')}</h2>
        <p className="text-center" style={{ margin: '0 auto 1.5rem auto' }}>
          {t('aboutSection.paragraph')}
        </p>
        <h3 className="text-center" style={{ marginTop: '2rem', marginBottom: '1rem' }}>{t('aboutSection.whyDownloadTitle')}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto', textAlign: 'left' }}>
          {Array.isArray(reasons) && reasons.map((reason, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--birdlens-green-wave-2)' }}>✔ </span>
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeaturesSection({ id }) {
    const { t, i18n } = useTranslation();
    const featuresListRaw = t('featuresSection.items', { returnObjects: true });
    const featuresList = Array.isArray(featuresListRaw) ? featuresListRaw.map((feature, index) => ({
      icon: index === 0 ? <BirdIcon /> : index === 1 ? <MapIcon /> : index === 2 ? <CommunityIcon /> :
        index === 3 ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" /></svg>) :
          index === 4 ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73V12.2l5 2.73 5-2.73v3.79z" /></svg>) :
            (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" /></svg>),
      title: feature.title,
      description: feature.description
    })) : [];
  
    const carouselRef = useRef(null);
    const [carouselWidth, setCarouselWidth] = useState(0);
    useEffect(() => {
      const calculateWidth = () => { if (carouselRef.current) { setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth); } };
      calculateWidth();
      window.addEventListener('resize', calculateWidth);
      const timeoutId = setTimeout(calculateWidth, 100);
      return () => { window.removeEventListener('resize', calculateWidth); clearTimeout(timeoutId); };
    }, [featuresList, i18n.language]);
  
    return (
      <section id={id} className="section features">
        <div className="container">
          <h2 className="text-center">{t('featuresSection.title')}</h2>
          <div className="features-carousel-wrapper" ref={carouselRef}>
            <motion.div className="features-grid" drag="x" dragConstraints={{ right: 0, left: -carouselWidth }} whileTap={{ cursor: "grabbing" }}>
              {featuresList.map((feature, index) => (
                <motion.div key={`${feature.title}-${index}`} className="feature-item">
                  {feature.icon}<h3>{feature.title}</h3><p>{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
  
function AppPreviewSection({ id }) {
    const { t, i18n } = useTranslation();
    const images = ["/images/app-feature-1.png","/images/app-feature-2.png","/images/app-feature-3.png",];
    const carouselRef = useRef(null);
    const [carouselWidth, setCarouselWidth] = useState(0);
    useEffect(() => {
      const calculateWidth = () => { if (carouselRef.current) { setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth); } };
      calculateWidth();
      window.addEventListener('resize', calculateWidth);
      const timeoutId = setTimeout(calculateWidth, 100);
      return () => { window.removeEventListener('resize', calculateWidth); clearTimeout(timeoutId); };
    }, [images, i18n.language]);
  
    return (
      <section id={id} className="section app-preview section-light">
        <div className="container">
          <h2 className="text-center">{t('appPreviewSection.title')}</h2>
          <div className="app-preview-carousel-wrapper" ref={carouselRef}>
            <motion.div className="app-preview-images" drag="x" dragConstraints={{ right: 0, left: -carouselWidth }} whileTap={{ cursor: "grabbing" }}>
              {images.map((src, index) => (
                <motion.img key={index} src={src} alt={t('appPreviewSection.imageAlt', { number: index + 1 }, `BirdLens App Screenshot ${index + 1}`)} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
}
  
function DownloadSection({ id }) {
    const { t } = useTranslation();
    const apkVersion = "v0.2.3 Beta";
    const apkFileSize = "approx. 80MB";
    const apkLastUpdated = "June 20, 2025";
    return (
      <section id={id} className="section download-section">
        <div className="container">
          <h2>{t('downloadSection.title')}</h2>
          <p style={{ marginBottom: "1rem", maxWidth: "700px" }}>{t('downloadSection.subtitle')}</p>
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>{t('downloadSection.versionInfo', { version: apkVersion })}</p>
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>{t('downloadSection.sizeInfo', { size: apkFileSize })}</p>
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>{t('downloadSection.lastUpdatedInfo', { date: apkLastUpdated })}</p>
          </div>
          <a href="/app-release.apk" download className="button">{t('downloadSection.downloadButton', { version: apkVersion })}</a>
          <div className="download-instructions">
            <p><strong>{t('downloadSection.noteTitle')}</strong> {t('downloadSection.noteText')}</p>
            <p>{t('downloadSection.earlyAdopterText')}</p>
          </div>
        </div>
      </section>
    );
}

function Navbar({ goToSection, activeSectionIndex, sectionIds }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const { t, i18n } = useTranslation();
  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };
  const handleNavLinkClick = (index) => { goToSection(index); setIsMobileMenuOpen(false); };
  const changeLanguage = (lng) => { i18n.changeLanguage(lng); setIsMobileMenuOpen(false); };
  useEffect(() => {
    const handleClickOutside = (event) => { if (navRef.current && !navRef.current.contains(event.target)) { setIsMobileMenuOpen(false); } };
    if (isMobileMenuOpen) { document.addEventListener('mousedown', handleClickOutside); } else { document.removeEventListener('mousedown', handleClickOutside); }
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [isMobileMenuOpen]);
  const navLinksData = [
    { i18nKey: "navbar.home", sectionId: "home", defaultLabel: "Home" },{ i18nKey: "navbar.mapDemo", sectionId: "map-demo", defaultLabel: "Map Demo" },{ i18nKey: "navbar.about", sectionId: "about", defaultLabel: "About" },{ i18nKey: "navbar.features", sectionId: "features", defaultLabel: "Features" },{ i18nKey: "navbar.preview", sectionId: "preview", defaultLabel: "Preview" },{ i18nKey: "navbar.download", sectionId: "download", defaultLabel: "Download APK" },{ i18nKey: "navbar.contact", sectionId: "contact", defaultLabel: "Contact" },
  ];
  return (
    <nav className="navbar" ref={navRef}>
      <div className="container">
        <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavLinkClick(0); }}><img src="/images/logo.png" alt="BirdLens Logo" /></a>
        <button className={`navbar-toggler ${isMobileMenuOpen ? 'active' : ''}`} type="button" aria-label="Toggle navigation" aria-expanded={isMobileMenuOpen} onClick={toggleMobileMenu}>
          <span className="navbar-toggler-icon"></span><span className="navbar-toggler-icon"></span><span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinksData.map((link) => {
            const index = sectionIds.indexOf(link.sectionId);
            if (index === -1) return null;
            return (<a key={link.sectionId} href={`#${link.sectionId}`} onClick={(e) => { e.preventDefault(); handleNavLinkClick(index); }} className={activeSectionIndex === index ? 'active-link' : ''}>{t(link.i18nKey, link.defaultLabel)}</a>);
          })}
          <a href="https://www.facebook.com/BirdLensVietnamOfficial" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.facebook', 'Facebook')}</a>
          <div className="language-switcher">
            <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>{t('lang.en', 'EN')}</button>
            <button onClick={() => changeLanguage('vi')} disabled={i18n.language === 'vi'}>{t('lang.vi', 'VI')}</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer({ id }) {
    const { t } = useTranslation();
    const handleFooterLinkClick = (e, sectionIdToGo) => {
      e.preventDefault();
      if (typeof window !== 'undefined' && window.globalGoToSection) {
        let targetIndex = -1;
        targetIndex = SECTION_COMPONENTS_CONFIG.findIndex(s => s.id === sectionIdToGo);
        if (targetIndex !== -1) { window.globalGoToSection(targetIndex); }
      }
    };
    return (
      <footer className="footer section" id={id}>
        <div className="container">
          <div className="footer-links">
            <a href="#about" onClick={(e) => handleFooterLinkClick(e, 'about')}>{t('footer.aboutUs')}</a>
            <a href="#features" onClick={(e) => handleFooterLinkClick(e, 'features')}>{t('footer.featuresLink')}</a>
            <a href="mailto:birdlens.vietnam@gmail.com">{t('footer.contactEmail')}</a>
          </div>
          <div className="social-icons"><a href="https://www.facebook.com/BirdLensVietnamOfficial" target="_blank" rel="noopener noreferrer"><img src="/images/facebook.png" alt="Facebook" /></a></div>
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <p>{t('footer.tagline')}</p>
        </div>
      </footer>
    );
}

// --- Section Config (from original App.jsx) ---
const SECTION_COMPONENTS_CONFIG = [
  { id: "home", Component: HeroSection },
  { id: "map-demo", Component: MapDemoSection },
  { id: "about", Component: AboutSection },
  { id: "features", Component: FeaturesSection },
  { id: "preview", Component: AppPreviewSection },
  { id: "download", Component: DownloadSection },
  { id: "contact", Component: Footer },
];
const sectionVariants = {
  enter: (direction) => ({ y: direction > 0 ? "80vh" : "-80vh", scale: 0.9, opacity: 0 }),
  center: { zIndex: 1, y: 0, scale: 1, opacity: 1, transition: { y: { type: "spring", stiffness: 100, damping: 20, mass: 0.7 }, scale: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }, opacity: { duration: 0.3, delay: 0.05, ease: "circOut" } } },
  exit: (direction) => ({ zIndex: 0, y: direction < 0 ? "80vh" : "-80vh", scale: 0.8, opacity: 0, transition: { y: { type: "spring", stiffness: 100, damping: 20, mass: 0.7 }, scale: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }, opacity: { duration: 0.25, ease: "circIn" } } }),
};

// =================== RESET PASSWORD COMPONENT ===================
const ResetPasswordPage = () => {
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
            // Logic Change: Use HTTPS for the API call.
            // It's also better practice to use an environment variable for the base URL.
            // For example: const API_BASE_URL = import.meta.env.VITE_API_URL;
            const response = await fetch('https://birdlens.duckdns.org/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    new_password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `An error occurred: ${response.statusText}`);
            }

            setMessage('Your password has been reset successfully! You will be redirected shortly.');
            setTimeout(() => {
                navigate('/');
            }, 5000);

        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const inputStyle = {
      width: '100%',
      padding: '0.8rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      backgroundColor: '#f0f0f0',
      fontSize: '1rem',
      color: '#333'
    };

    return (
        <section className="section" style={{ backgroundColor: 'var(--birdlens-very-dark-green-base)', justifyContent: 'flex-start', paddingTop: '80px' }}>
            <div className="container" style={{ maxWidth: '450px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '12px' }}>
                <h1 style={{color: 'white', marginBottom: '1rem', fontSize: '2rem'}}>Reset Password</h1>
                {message && <p style={{ color: 'var(--birdlens-green-wave-2)', marginBottom: '1rem', textAlign: 'center' }}>{message}</p>}
                {error && <p style={{ color: '#F44336', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
                {!message && (
                    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: 'white', textAlign: 'left' }}>New Password</label>
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} disabled={isLoading || !token}/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', color: 'white', textAlign: 'left' }}>Confirm New Password</label>
                            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={inputStyle} disabled={isLoading || !token} />
                        </div>
                        <button type="submit" className="button" disabled={isLoading || !token} style={{ marginTop: '1rem' }}>
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

// =================== ORIGINAL APP (NOW LANDING PAGE) ===================
const LandingPage = () => {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(1);
    const isScrolling = useRef(false);
    const appContainerRef = useRef(null);
    const touchStartY = useRef(0);
    const currentSectionRef = useRef(null);
    const { i18n } = useTranslation();
  
    const changeSection = (newIndex, direction) => {
      if (isScrolling.current || newIndex === activeSectionIndex || newIndex < 0 || newIndex >= SECTION_COMPONENTS_CONFIG.length) {
        return false;
      }
      isScrolling.current = true;
      setScrollDirection(direction);
      setActiveSectionIndex(newIndex);
      setTimeout(() => { isScrolling.current = false; }, 800);
      return true;
    };
  
    useEffect(() => {
      if (appContainerRef.current) {
        const motionWrapper = appContainerRef.current.querySelector('.motion-section-wrapper');
        if (motionWrapper && motionWrapper.firstChild && motionWrapper.firstChild.classList && motionWrapper.firstChild.classList.contains('section')) {
          currentSectionRef.current = motionWrapper.firstChild;
        } else {
          currentSectionRef.current = null;
        }
      }
    }, [activeSectionIndex]);
  
    useEffect(() => {
      const handleWheel = (event) => {
        if (isScrolling.current) { event.preventDefault(); return; }
        const activeSectionElement = currentSectionRef.current;
        if (activeSectionElement && activeSectionElement.scrollHeight > activeSectionElement.clientHeight) {
          const { scrollTop, scrollHeight, clientHeight } = activeSectionElement;
          const atTop = scrollTop <= 0;
          const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
          if (event.deltaY < 0 && !atTop) return;
          if (event.deltaY > 0 && !atBottom) return;
        }
        let newIndex = activeSectionIndex, dir = 0;
        if (event.deltaY > 20) { dir = 1; newIndex = Math.min(activeSectionIndex + 1, SECTION_COMPONENTS_CONFIG.length - 1); } 
        else if (event.deltaY < -20) { dir = -1; newIndex = Math.max(activeSectionIndex - 1, 0); }
        if (newIndex !== activeSectionIndex) { if (changeSection(newIndex, dir)) { event.preventDefault(); } }
      };
      const handleTouchStart = (event) => { if (isScrolling.current) return; touchStartY.current = event.touches[0].clientY; };
      const handleTouchEnd = (event) => {
        if (isScrolling.current) return;
        const activeSectionElement = currentSectionRef.current;
        const touchEndY = event.changedTouches[0].clientY;
        const deltaYSwipe = touchStartY.current - touchEndY;
        const swipeThreshold = 60;
        if (activeSectionElement && activeSectionElement.scrollHeight > activeSectionElement.clientHeight) {
          const { scrollTop, scrollHeight, clientHeight } = activeSectionElement;
          const atTop = scrollTop <= 0;
          const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
          if (deltaYSwipe > 0 && !atBottom) return;
          if (deltaYSwipe < 0 && !atTop) return;
        }
        let newIndex = activeSectionIndex, dir = 0;
        if (deltaYSwipe > swipeThreshold) { dir = 1; newIndex = Math.min(activeSectionIndex + 1, SECTION_COMPONENTS_CONFIG.length - 1); } 
        else if (deltaYSwipe < -swipeThreshold) { dir = -1; newIndex = Math.max(activeSectionIndex - 1, 0); }
        if (newIndex !== activeSectionIndex) { changeSection(newIndex, dir); }
      };
  
      const mainContainer = appContainerRef.current;
      if (mainContainer) {
        mainContainer.addEventListener('wheel', handleWheel, { passive: false });
        mainContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        mainContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
      }
  
      if (typeof window !== 'undefined') { window.globalGoToSection = (index) => { const direction = index > activeSectionIndex ? 1 : -1; changeSection(index, direction); }; }
      const setHtmlLang = (lng) => { document.documentElement.lang = lng; };
      setHtmlLang(i18n.language);
      i18n.on('languageChanged', setHtmlLang);
  
      return () => {
        if (mainContainer) {
          mainContainer.removeEventListener('wheel', handleWheel);
          mainContainer.removeEventListener('touchstart', handleTouchStart);
          mainContainer.removeEventListener('touchend', handleTouchEnd);
        }
        if (typeof window !== 'undefined') { delete window.globalGoToSection; }
        i18n.off('languageChanged', setHtmlLang);
      };
    }, [activeSectionIndex, i18n, i18n.language]);
  
    const goToSection = (index) => {
      const direction = index > activeSectionIndex ? 1 : -1;
      changeSection(index, direction);
    };
  
    const ActiveComponent = SECTION_COMPONENTS_CONFIG[activeSectionIndex].Component;
  
    return (
      <>
        <Navbar goToSection={goToSection} activeSectionIndex={activeSectionIndex} sectionIds={SECTION_COMPONENTS_CONFIG.map(s => s.id)} />
        <div ref={appContainerRef} className="app-scroll-container">
          <AnimatePresence initial={false} custom={scrollDirection} mode="wait">
            <motion.div key={`${activeSectionIndex}-${i18n.language}`} custom={scrollDirection} variants={sectionVariants} initial="enter" animate="center" exit="exit" className="motion-section-wrapper">
              <ActiveComponent id={SECTION_COMPONENTS_CONFIG[activeSectionIndex].id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </>
    );
};

// =================== NEW APP ROUTER ===================
function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
  );
}

export default App;