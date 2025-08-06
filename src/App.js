import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Developer from './pages/Developer';
import Scan from './pages/Scan';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen gradient-bg">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/scan" element={<Scan />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App; 