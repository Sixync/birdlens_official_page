// file: birdlen_official_page/src/components/Footer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

// This config should ideally be shared or passed down, but for simplicity, we redefine it here.
const SECTION_COMPONENTS_CONFIG = [
  { id: "home" }, { id: "map-demo" }, { id: "about" }, { id: "features" },
  { id: "preview" }, { id: "download" }, { id: "contact" },
];

export default function Footer({ id }) {
    const { t } = useTranslation();
    
    const handleFooterLinkClick = (e, sectionIdToGo) => {
      e.preventDefault();
      if (typeof window !== 'undefined' && window.globalGoToSection) {
        const targetIndex = SECTION_COMPONENTS_CONFIG.findIndex(s => s.id === sectionIdToGo);
        if (targetIndex !== -1) {
            window.globalGoToSection(targetIndex);
        }
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
          <div className="social-icons">
            <a href="https://www.facebook.com/BirdLensVietnamOfficial" target="_blank" rel="noopener noreferrer">
              <img src="/images/facebook.png" alt="Facebook" />
            </a>
          </div>
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <p>{t('footer.tagline')}</p>
        </div>
      </footer>
    );
}