// birdlen_official_page/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n'; // Import to initialize i18next

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);