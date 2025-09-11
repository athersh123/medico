import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Developer from './pages/Developer';
import Scan from './pages/Scan';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { loading, user } = useAuth();

  console.log('AppContent: loading =', loading, 'user =', user);

  if (loading) {
    console.log('AppContent: Showing loading screen');
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Medicor...</p>
        </div>
      </div>
    );
  }

  console.log('AppContent: Showing main content');
  
  return (
    <div className="min-h-screen gradient-bg" style={{backgroundColor: '#f0f0f0'}}>
      <Header />
      <main className="flex-1">
        <Routes>
          {/* Default route - redirect based on auth status */}
          <Route path="/" element={
            user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          } />
          
          {/* Login route - redirect to home if already authenticated */}
          <Route path="/login" element={
            user ? <Navigate to="/home" replace /> : <Login />
          } />
          
          {/* Signup route - redirect to home if already authenticated */}
          <Route path="/signup" element={
            user ? <Navigate to="/home" replace /> : <SignUp />
          } />
          
          {/* Protected routes - redirect to login if not authenticated */}
          <Route path="/home" element={
            user ? (
              <React.Suspense fallback={<div className="p-8 text-center text-white">Loading Home...</div>}>
                <Home />
              </React.Suspense>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          <Route path="/about" element={
            user ? <About /> : <Navigate to="/login" replace />
          } />
          
          <Route path="/contact" element={
            user ? <Contact /> : <Navigate to="/login" replace />
          } />
          
          <Route path="/developer" element={
            user ? <Developer /> : <Navigate to="/login" replace />
          } />
          
          <Route path="/scan" element={
            user ? <Scan /> : <Navigate to="/login" replace />
          } />
          
          {/* Test route - accessible without auth */}
          <Route path="/test" element={
            <div className="min-h-screen gradient-bg flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl mb-4">🎉 Test Route Working!</h1>
                <p className="text-xl mb-4">If you can see this, the React app is working!</p>
                <p className="text-lg">Current time: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          } />
          
          {/* Catch-all route - redirect based on auth status */}
          <Route path="*" element={
            user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  console.log('App component: rendering');
  
  React.useEffect(() => {
    console.log('App component: mounted');
  }, []);
  
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App; 