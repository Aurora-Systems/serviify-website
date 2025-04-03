import {FormEvent, useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "./db/init_firebase.ts";
import {ToastContainer, toast} from "react-toastify";
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PrivacyPolicy from './components/PrivacyPolicy';
import HelpCentre from './components/HelpCentre';
import TermsOfService from './components/TermsOfService';
import About from './components/About';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [loading, set_loading] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  // Functions to navigate to pages instead of showing modals
  const goToPrivacyPolicy = () => {
    navigate('/privacy-policy');
  };

  const goToTermsOfService = () => {
    navigate('/terms-of-service');
  };

  const goToHelpCentre = () => {
    navigate('/help-centre');
  };

  // Wrapper functions to match Footer's expected function signatures
  const navToPrivacyPolicy = () => goToPrivacyPolicy();
  const navToTermsOfService = () => goToTermsOfService();
  const navToHelpCentre = () => goToHelpCentre();

  const handle_submit = (e:FormEvent) => {
    e.preventDefault()
    set_loading(true)
    createUserWithEmailAndPassword(auth,email,password).then(()=>{
      toast("✅ Signed up successfully, we will notify you when Serviify is available!")
      set_email("")
      set_password("")
      setShowSignup(false)
    }).catch(()=>{
      toast("⚠️ We ran into a problem, please try again later")
    }).finally(()=>{
      set_loading(false)
    })
  }
  
  return (
    <div className="app">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar 
              setShowSignup={setShowSignup} 
              setShowPrivacyPolicy={navToPrivacyPolicy}
              setShowTermsOfService={navToTermsOfService}
              setShowHelpCentre={navToHelpCentre}
            />
            <Hero 
              setShowSignup={setShowSignup}
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
      </Routes>
      
      {/* Signup Modal */}
      {showSignup && (
        <div className="signup-modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
            <div className="signup-header">
              <h2>Sign Up for Early Access</h2>
              <button className="close-btn" onClick={() => setShowSignup(false)}>×</button>
            </div>
            
            <form onSubmit={handle_submit}>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-envelope-at"></i></span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => set_email(e.target.value)}
                  required={true}
                />
              </div>
              
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-key"></i></span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => set_password(e.target.value)}
                  required={true}
                />
              </div>
              
              <div className="mb-3">
                <span><small>By signing up you agree to be contacted in relation to Serviify services and custom offers</small></span>
                <div className="policy-links">
                  <small>
                    <a href="/privacy-policy" onClick={(e) => {
                      e.preventDefault();
                      setShowSignup(false);
                      goToPrivacyPolicy();
                    }}>Read our Privacy Policy</a>
                  </small>
                  <small>
                    <a href="/terms-of-service" onClick={(e) => {
                      e.preventDefault();
                      setShowSignup(false);
                      goToTermsOfService();
                    }}>Terms of Service</a>
                  </small>
                </div>
              </div>
              
              <div>
                {!loading ? (
                  <button type="submit" className="btn p_btn w-100">Sign Up</button>
                ) : (
                  <div className="spinner-border p_txt" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      
      <ToastContainer />
    </div>
  )
}

export default App
