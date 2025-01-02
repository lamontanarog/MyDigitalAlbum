import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Camera, Plus, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { AuthForm } from './components/AuthForm';
import { HomePage } from './pages/HomePage';
import { CreateEventPage } from './pages/CreateEventPage';
import { EventPage } from './pages/EventPage';
import { QRCodePage } from './pages/QRCodePage';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return children;
}

function AppContent() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center">
              <Camera className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold">Digital Album</span>
            </Link>
            {user && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/create-event"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </Link>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route path="/create-event" element={
            <PrivateRoute>
              <CreateEventPage />
            </PrivateRoute>
          } />
          <Route path="/event/:id" element={
            <PrivateRoute>
              <EventPage />
            </PrivateRoute>
          } />
          <Route path="/event/:id/qr" element={
            <PrivateRoute>
              <QRCodePage />
            </PrivateRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

function AuthPage() {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Digital Album</h1>
      <AuthForm />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}