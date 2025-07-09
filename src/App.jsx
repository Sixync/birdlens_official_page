// birdlen_official_page/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AdminLayout from './components/admin/AdminLayout';
import TourList from "./pages/admin/tours/TourList"
import CreateTour from './pages/admin/tours/CreateTour';
import EditTour from './pages/admin/tours/EditTour';
// Import the new component for the download route.
import DownloadPage from './pages/DownloadPage';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
      <Helmet>
        <title>Birdlens Vietnam - The Social App for Bird Lovers</title>
        <meta
          name="description"
          content="Discover and identify birds in Vietnam with Birdlens, the ultimate social network for birdwatching enthusiasts. Share your findings and connect with a community of nature lovers."
        />
        {/* Open Graph tags for social media sharing */}
        <meta property="og:title" content="Birdlens Vietnam - The Social App for Bird Lovers" />
        <meta property="og:description" content="Discover and identify birds in Vietnam with Birdlens..." />
        <meta property="og:image" content="https://birdlens.netlify.app/images/app-feature-1.png" />
        <meta property="og:url" content="https://birdlens.netlify.app/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* This new route will handle the automatic download. */}
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="tours" element={<TourList />} />
          <Route path="tours/create" element={<CreateTour />} />
          <Route path="tours/edit/:tourId" element={<EditTour />} />
          {/* Add other admin routes here */}
        </Route>
      </Routes>
    </>
  );
}

export default App;