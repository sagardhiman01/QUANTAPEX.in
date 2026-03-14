import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundParticles from './components/canvas/BackgroundParticles';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

import Home from './pages/Home';
import Work from './pages/Work';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Admin from './pages/Admin';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/company" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <BackgroundParticles />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh', overflow: 'hidden' }}>
        <AnimatedRoutes />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
