// birdlen_official_page/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage'; // Import the new verification page
import AdminLayout from './components/admin/AdminLayout';
import TourList from "./pages/admin/tours/TourList"
import CreateTour from './pages/admin/tours/CreateTour';
import EditTour from './pages/admin/tours/EditTour';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* Add the route for email verification */}
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
  );
}

export default App;