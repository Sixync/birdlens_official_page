// birdlen_official_page/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.jsx';
import './i18n'; // Import to initialize i18next
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider> {/* Wrap the App with AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);