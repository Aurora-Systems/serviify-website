import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  setShowSignup: (show: boolean) => void;
  setShowHelpCentre: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  setShowSignup, 
  setShowHelpCentre 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScrollPosRef = useRef(window.scrollY);
  const lastScrollTime = useRef(Date.now());
  
  useEffect(() => {
    const handleScroll = () => {
      // Skip if menu is open
      if (menuOpen) return;
      
      const currentScrollPos = window.scrollY;
      const currentTime = Date.now();
      
      // Only process the scroll event if enough time has passed since the last one (throttling)
      if (currentTime - lastScrollTime.current > 100) {
        // Show navbar when scrolling up or near the top of the page
        const isScrollingUp = prevScrollPosRef.current > currentScrollPos;
        const isAtTop = currentScrollPos < 100;
        
        // Update visibility state based on scroll direction
        setVisible(isScrollingUp || isAtTop);
        
        // Update references for next scroll event
        prevScrollPosRef.current = currentScrollPos;
        lastScrollTime.current = currentTime;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };
  
  return (
    <nav className={`navbar ${visible ? 'navbar-visible' : 'navbar-hidden'} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="https://ngratesc.sirv.com/i-claim/serviify/logo.png" alt="Serviify Logo" />
            <span className="logo-text">Serviify</span>
          </Link>
        </div>
        
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <a href="#services" onClick={handleNavLinkClick}>Services</a>
          <a href="#Providers" onClick={handleNavLinkClick}>Providers</a>
          <Link to="/about" onClick={handleNavLinkClick}>About us</Link>
          <a href="#support" onClick={handleNavLinkClick}>Support</a>
          <Link to="/help-centre" onClick={() => {
            handleNavLinkClick();
            setShowHelpCentre();
          }}>Help</Link>
        </div>
        
        <div className="navbar-buttons">
          <button className="sign-in-btn" onClick={() => {
            setShowSignup(true);
            setMenuOpen(false);
          }}>Sign in</button>
          <button className="try-free-btn" onClick={() => {
            setShowSignup(true);
            setMenuOpen(false);
          }}>Find a provider</button>
        </div>
        
        <div className="mobile-menu-btn" onClick={handleMenuToggle}>
          <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 