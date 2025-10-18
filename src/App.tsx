import {ToastContainer} from "react-toastify";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PrivacyPolicy from './components/PrivacyPolicy';
import HelpCentre from './components/HelpCentre';
import TermsOfService from './components/TermsOfService';
import About from './components/About';
import Auth from './components/Auth';
import ScrollToTop from './components/ScrollToTop';
import Support from './components/Support';
import ProviderSearch from './components/ProviderSearch';
import ProviderProfile from './components/ProviderProfile';
import ServicesPage from './components/ServicesPage';
// Import font loader for optimization
import './lib/fontLoader';

// GA4/GTM page view tracking for SPA route changes
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Typed declarations for analytics globals
declare global {
  interface Window {
    gtag?: (command: 'config' | 'event', idOrName: string, params?: { page_path?: string; page_location?: string; page_title?: string }) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const didMountRef = useRef(false);

  // Send page_view on route change (supports GA4 via gtag or GTM via dataLayer)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true; // Skip initial load (GTM GA4 config will send it)
      return;
    }
    const page_path = location.pathname + location.search + location.hash;
    const page_location = window.location.href;
    const page_title = document.title;
    if (window.gtag) {
      window.gtag('event', 'page_view', { page_path, page_location, page_title });
    } else if (window.dataLayer) {
      window.dataLayer.push({ event: 'page_view', page_path, page_location, page_title });
    }
  }, [location]);

  // Functions to navigate to pages
  const goToHelpCentre = () => {
    navigate('/help-centre');
  };
  
  return (
    <div className="app">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar 
              setShowHelpCentre={goToHelpCentre}
            />
            <Hero />
          </>
        } />
        
        <Route path="/privacy-policy" element={
          <PrivacyPolicy />
        } />
        
        <Route path="/terms-of-service" element={
          <TermsOfService />
        } />
        
        <Route path="/help-centre" element={
          <HelpCentre />
        } />
        
        <Route path="/about" element={
          <About />
        } />
        
        <Route path="/auth" element={<Navigate to="/app" replace />} />
        <Route path="/forgot-password" element={<Navigate to="/app" replace />} />
        
        <Route path="/support" element={
          <Support />
        } />
        
        <Route path="/provider-search" element={
          <ProviderSearch />
        } />
        
        <Route path="/provider/:id" element={
          <ProviderProfile />
        } />
        
        <Route path="/services" element={
          <ServicesPage />
        } />
        
      
      </Routes>
      
      <ToastContainer />
    </div>
  )
}

export default App
