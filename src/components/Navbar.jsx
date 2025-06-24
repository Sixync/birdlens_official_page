// file: birdlen_official_page/src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navbar({ goToSection, activeSectionIndex, sectionIds }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const { t, i18n } = useTranslation();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    
    const handleNavLinkClick = (index) => {
        goToSection(index);
        setIsMobileMenuOpen(false);
    };
    
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };
        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    const navLinksData = [
        { i18nKey: "navbar.home", sectionId: "home", defaultLabel: "Home" },
        { i18nKey: "navbar.mapDemo", sectionId: "map-demo", defaultLabel: "Map Demo" },
        { i18nKey: "navbar.about", sectionId: "about", defaultLabel: "About" },
        { i18nKey: "navbar.features", sectionId: "features", defaultLabel: "Features" },
        { i18nKey: "navbar.preview", sectionId: "preview", defaultLabel: "Preview" },
        { i18nKey: "navbar.download", sectionId: "download", defaultLabel: "Download APK" },
        { i18nKey: "navbar.contact", sectionId: "contact", defaultLabel: "Contact" },
    ];

    return (
        <nav className="navbar" ref={navRef}>
            <div className="container">
                <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavLinkClick(0); }}>
                    <img src="/images/logo.png" alt="BirdLens Logo" />
                </a>
                <button className={`navbar-toggler ${isMobileMenuOpen ? 'active' : ''}`} type="button" aria-label="Toggle navigation" aria-expanded={isMobileMenuOpen} onClick={toggleMobileMenu}>
                    <span className="navbar-toggler-icon"></span>
                    <span className="navbar-toggler-icon"></span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    {navLinksData.map((link) => {
                        const index = sectionIds.indexOf(link.sectionId);
                        if (index === -1) return null;
                        return (
                            <a 
                                key={link.sectionId} 
                                href={`#${link.sectionId}`} 
                                onClick={(e) => { e.preventDefault(); handleNavLinkClick(index); }}
                                className={activeSectionIndex === index ? 'active-link' : ''}
                            >
                                {t(link.i18nKey, link.defaultLabel)}
                            </a>
                        );
                    })}
                    <a href="https://www.facebook.com/profile.php?id=61576742646528" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                        {t('navbar.facebook', 'Facebook')}
                    </a>
                    <div className="language-switcher">
                        <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>{t('lang.en', 'EN')}</button>
                        <button onClick={() => changeLanguage('vi')} disabled={i18n.language === 'vi'}>{t('lang.vi', 'VI')}</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}