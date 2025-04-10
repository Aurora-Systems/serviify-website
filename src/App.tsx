import {ToastContainer} from "react-toastify";
import { Routes, Route, useNavigate } from 'react-router-dom';
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


function App() {
  const navigate = useNavigate();

  // Functions to navigate to pages
  const goToHelpCentre = () => {
    navigate('/help-centre');
  };
  
  // Dummy function for setShowSignup to satisfy prop requirements
  const dummySetShowSignup = () => {
    // Instead of showing a modal, navigate to auth page
    navigate('/auth');
  };
  
  return (
    <div className="app">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar 
              setShowSignup={dummySetShowSignup}
              setShowHelpCentre={goToHelpCentre}
            />
            <Hero 
              setShowSignup={dummySetShowSignup}
            />
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
        
        <Route path="/auth" element={
          <Auth />
        } />
        
        <Route path="/forgot-password" element={
          <Auth />
        } />
        
        <Route path="/support" element={
          <Support />
        } />
        
        
      
      </Routes>
      
      <ToastContainer />
    </div>
  )
}

export default App
