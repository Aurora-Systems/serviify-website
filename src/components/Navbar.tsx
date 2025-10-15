import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  title?: string;
  setShowHelpCentre: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  title,
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
            <span className="logo-text">{title || 'Serviify'}</span>
          </Link>
        </div>
        
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={handleNavLinkClick}>Home</Link>
          <Link to="/services" onClick={handleNavLinkClick}>Services</Link>
          <Link to="/about" onClick={handleNavLinkClick}>About us</Link>
          <Link to="/support" onClick={handleNavLinkClick}>Support</Link>
          <Link to="/help-centre" onClick={() => {
            handleNavLinkClick();
            setShowHelpCentre();
          }}>Help Centre</Link>
          <div className="mobile-only">
            <a href="/app" onClick={() => {
              handleNavLinkClick();
            }}>Sign in</a>
            <Link to="/provider-search" onClick={handleNavLinkClick}>Find a provider</Link>
          </div>
        </div>
        
        <div className="navbar-buttons">
          <a href="/app" className="sign-in-btn">
            Sign in
          </a>
          <Link to="/provider-search" className="try-free-btn text-decoration-none" onClick={() => {
            setMenuOpen(false);
          }}>Find a provider</Link>
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