// birdlen_official_page/src/App.jsx
import './App.css'

// Simple SVG icons for features (replace with better ones or images if you have them)
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


function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <AppPreviewSection />
      <DownloadSection />
      <Footer />
    </>
  )
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="#" className="navbar-logo">
          <img src="/images/logo.png" alt="BirdLens Logo" />
        </a>
        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#download">Download APK</a>
          {/* Link to Facebook page, which is a key channel */}
          <a href="https://www.facebook.com/BirdLensVietnamOfficial" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="hero" id="home">
      <h1>Discover Vietnam's Avian Wonders with BirdLens</h1>
      <p className="subtitle">
        Your pocket guide to identifying birds, exploring nature hotspots, and connecting with fellow enthusiasts.
        Built by students, for students and nature lovers across Vietnam!
      </p>
      <a href="#download" className="button hero-cta">Download BirdLens APK</a>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section section-light">
      <div className="container">
        <h2 className="text-center">What is BirdLens?</h2>
        <p className="text-center" style={{ maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
          BirdLens Vietnam is a mobile application designed to help students, nature enthusiasts, and aspiring birdwatchers
          easily identify and learn about the diverse birdlife of Vietnam. Our mission is to foster a deeper appreciation
          for nature through technology, community engagement, and accessible educational content. We are starting lean,
          focusing on core features and growing with our user base, primarily engaging through university partnerships and
          our official Facebook page.
        </p>
        <h3 className="text-center" style={{ marginTop: '2rem', marginBottom: '1rem' }}>Why Download the APK?</h3>
        <ul style={{ listStyle: 'none', padding: 0, maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
          <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--birdlens-green-wave-2)' }}>✔</span>
            Get early access to the latest features and improvements.
          </li>
          <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--birdlens-green-wave-2)' }}>✔</span>
            Be part of our growing community from the very beginning.
          </li>
          <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--birdlens-green-wave-2)' }}>✔</span>
            Provide direct feedback to help shape the future of BirdLens.
          </li>
          <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--birdlens-green-wave-2)' }}>✔</span>
            It's free! We're distributing via APK to make it accessible to everyone.
          </li>
        </ul>
      </div>
    </section>
  );
}


function FeaturesSection() {
  const features = [
    {
      icon: <BirdIcon />,
      title: "Bird Identification",
      description: "Easily identify birds around you. (Target: Upload a photo for identification - Key Action Completion ≥ 40%)"
    },
    {
      icon: <MapIcon />,
      title: "Explore Hotspots",
      description: "Discover local birding hotspots and see recent sightings powered by eBird data. Find the best places for your next birdwatching adventure."
    },
    {
      icon: <CommunityIcon />,
      title: "Community Hub",
      description: "Share your bird photos, connect with fellow nature lovers, and participate in challenges. (Target: 100-150 user-generated items by W12)"
    },
    {
      icon: ( // Placeholder for Tour/Event Icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
      ),
      title: "Tours & Events",
      description: "Stay updated on local birdwatching tours and events. (Future: Pilot bookings)"
    },
    {
      icon: ( // Placeholder for Edu Icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73V12.2l5 2.73 5-2.73v3.79z" />
        </svg>
      ),
      title: "Learn & Discover",
      description: "Access identification tips, facts about Vietnamese birds, and educational content shared on our platform and Facebook page."
    },
    {
      icon: ( // Placeholder for Premium Icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
      title: "Premium Features (Coming Soon!)",
      description: "Unlock advanced features with our 'ExBird' subscription. (Target: 2-3% Free-to-Paid Conversion by Month 3)"
    }
  ];

  return (
    <section id="features" className="section features">
      <div className="container">
        <h2 className="text-center">App Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppPreviewSection() {
  return (
    <section id="preview" className="section app-preview section-light">
      <div className="container">
        <h2 className="text-center">Take a Peek Inside BirdLens</h2>
        <div className="app-preview-images">
          {/* Replace with actual app screenshot paths */}
          <img src="/images/app-feature-1.png" alt="BirdLens App Screenshot 1" />
          <img src="/images/app-feature-2.png" alt="BirdLens App Screenshot 2" />
          <img src="/images/app-feature-3.png" alt="BirdLens App Screenshot 3" />
        </div>
      </div>
    </section>
  );
}
function DownloadSection() {
  // You can update these values manually when you update the APK
  const apkVersion = "v0.1 Alpha";
  const apkFileSize = "approx. 55MB"; // Example: Replace with actual size
  const apkLastUpdated = "June 5, 2025"; // Example: Replace with actual date

  return (
    <section id="download" className="section download-section">
      <div className="container">
        <h2>Ready to Start Your Birdwatching Journey?</h2>
        <p style={{ marginBottom: "1rem", maxWidth: "700px" }}>Download the BirdLens Vietnam APK now and join our community!</p>
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>
            <strong>Version:</strong> {apkVersion}
          </p>
          <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>
            <strong>Size:</strong> {apkFileSize}
          </p>
          <p style={{ fontSize: "0.9rem", margin: "0.2rem 0" }}>
            <strong>Last Updated:</strong> {apkLastUpdated}
          </p>
        </div>
        {/* Make sure birdlens.apk is in your public folder */}
        <a href="/birdlens.apk" download className="button">
          Download BirdLens APK ({apkVersion})
        </a>
        <div className="download-instructions">
          <p><strong>Note:</strong> Since this is an APK file, you might need to enable "Install from Unknown Sources" in your Android settings.
            This is a standard step for installing apps outside the Play Store. We assure you our app is safe.</p>
          {/* Optional: Rephrased or removed the target users line */}
          <p>Become an early adopter and help us grow our community of nature enthusiasts in Vietnam!</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="#about">About Us</a>
          <a href="#features">Features</a>
          <a href="mailto:birdlens.vietnam@gmail.com">Contact Us</a>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/BirdLensVietnamOfficial" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook-icon.svg" alt="Facebook" />
          </a>
          {/* Add other social links if you have them */}
        </div>
        <p>© {new Date().getFullYear()} BirdLens Vietnam. All rights reserved.</p>
        <p>A student-led project focused on nature and technology.</p>
      </div>
    </footer>
  );
}

export default App