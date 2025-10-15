import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/About.css';
import '../styles/Navbar.css';
import Footer from './Footer';
import { FontLoader } from '../lib/fontLoader';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load Caveat font
    const fontLoader = FontLoader.getInstance();
    fontLoader.preloadCaveatFont();
  }, []);

  const goToHelpCentre = () => {
    navigate('/help-centre');
  };

  const goToAuth = () => {
    navigate('/auth');
  };

  const goToProviders = () => {
    navigate('/provider-search');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="about-page">
      <div className="navbar navbar-visible">
     
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <img src="https://ngratesc.sirv.com/i-claim/serviify/logo.png" alt="Serviify Logo" />
              <span className="logo-text">Serviify</span>
            </Link>
          </div>

          <div className="mobile-menu-btn" onClick={handleMenuToggle}>
            <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
          </div>

          <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <a href="/" onClick={handleNavLinkClick}>Home</a>
            <a href="/" onClick={handleNavLinkClick}>Services</a>
            <Link to="/about" onClick={handleNavLinkClick}>About us</Link>
            <a href="/support" onClick={handleNavLinkClick}>Support</a>
            <Link to="/help-centre" onClick={() => {
              handleNavLinkClick();
              goToHelpCentre();
            }}>Help Centre</Link>
          </div>

          <div className="navbar-buttons">
            <a href="/app" className="sign-in-btn" onClick={() => {
              handleNavLinkClick();
            }}>
              Sign up
            </a>
            <button className="try-free-btn" onClick={() => {
              handleNavLinkClick();
              goToProviders();
            }}>Find a provider</button>
          </div>
        </div>
      </div>

      <div className="about-container">
        {/* Top section - High density icons */}
        <div className="bg-icon bg-icon-1"><i className="bi bi-tools"></i></div>
        <div className="bg-icon bg-icon-2"><i className="bi bi-brush"></i></div>
        <div className="bg-icon bg-icon-3"><i className="bi bi-house-gear"></i></div>
        <div className="bg-icon bg-icon-4"><i className="bi bi-car-front"></i></div>
        <div className="bg-icon bg-icon-5"><i className="bi bi-laptop"></i></div>
        <div className="bg-icon bg-icon-6"><i className="bi bi-gear"></i></div>
        <div className="bg-icon bg-icon-7"><i className="bi bi-hammer"></i></div>
        <div className="bg-icon bg-icon-8"><i className="bi bi-scissors"></i></div>
        <div className="bg-icon bg-icon-9"><i className="bi bi-truck"></i></div>
        <div className="bg-icon bg-icon-10"><i className="bi bi-telephone"></i></div>

        {/* Left side - Encapsulating */}
        <div className="bg-icon bg-icon-11"><i className="bi bi-lightning"></i></div>
        <div className="bg-icon bg-icon-12"><i className="bi bi-clipboard2-check"></i></div>
        <div className="bg-icon bg-icon-13"><i className="bi bi-briefcase"></i></div>
        <div className="bg-icon bg-icon-14"><i className="bi bi-palette"></i></div>
        <div className="bg-icon bg-icon-15"><i className="bi bi-pc-display"></i></div>

        {/* Right side - Encapsulating */}
        <div className="bg-icon bg-icon-16"><i className="bi bi-wrench"></i></div>
        <div className="bg-icon bg-icon-17"><i className="bi bi-camera"></i></div>
        <div className="bg-icon bg-icon-18"><i className="bi bi-basket"></i></div>
        <div className="bg-icon bg-icon-19"><i className="bi bi-gem"></i></div>
        <div className="bg-icon bg-icon-20"><i className="bi bi-calendar-check"></i></div>

        {/* Middle section - Medium density */}
        <div className="bg-icon bg-icon-21"><i className="bi bi-cloud-arrow-up"></i></div>
        <div className="bg-icon bg-icon-22"><i className="bi bi-flower1"></i></div>
        <div className="bg-icon bg-icon-23"><i className="bi bi-shield-check"></i></div>
        <div className="bg-icon bg-icon-24"><i className="bi bi-printer"></i></div>

        {/* Lower section - Low density */}
        <div className="bg-icon bg-icon-25"><i className="bi bi-key"></i></div>
        <div className="bg-icon bg-icon-26"><i className="bi bi-music-note"></i></div>

        {/* Bottom - Sparse */}
        <div className="bg-icon bg-icon-27"><i className="bi bi-lightbulb"></i></div>
        <div className="bg-icon bg-icon-28"><i className="bi bi-award"></i></div>

        <div className="about-content">
          <section className="about-section">
            <h1>Who are we?</h1>
            <p className="about-intro" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Serviify began as a vision to simplify how people find and access professional services.
              We're building a platform that will connect service providers with clients,
              making professional services accessible to everyone.
            </p>
          </section>

          <section className="about-section">
            <h1>Vision</h1>
            <p style={{ fontFamily: 'Poppins, sans-serif' }}>
              Create economic opportunity for every service provider and client by making professional
              services as simple as a single click, empowering both providers and clients to achieve their goals.
            </p>
          </section>

          <section className="about-section">
            <h1>Mission</h1>
            <p style={{ fontFamily: 'Poppins, sans-serif' }}>
              The mission of Serviify is simple: connect people with the right service providers
              through a reliable and affordable platform to make them more productive and successful.
            </p>
          </section>
        </div>
      </div>

      <div className="more-info-section">
        <div className="more-info-content">
          <h2 className="more-info-title">For more information about Serviify</h2>

          <div className="info-links">
            <div className="info-link-item">
              <i className="bi bi-people-fill" style={{ fontSize: "2.2rem", color: "#293040" }}></i>
              <h3>Company Page</h3>
              <p style={{ fontFamily: 'Poppins, sans-serif' }}>Connect with our network of service professionals.</p>
              <Link to="/about" className="learn-more-link">Learn more</Link>
            </div>

            <div className="info-link-item">
              <i className="bi bi-newspaper" style={{ fontSize: "2.2rem", color: "#293040" }}></i>
              <h3>Pressroom</h3>
              <p style={{ fontFamily: 'Poppins, sans-serif' }}>Explore the latest Serviify news, updates, and reports.</p>
              <Link to="/help-centre" className="learn-more-link">Learn more</Link>
            </div>

            <div className="info-link-item">
              <i className="bi bi-brush-fill" style={{ fontSize: "2.2rem", color: "#293040" }}></i>
              <h3>Branding policies</h3>
              <p style={{ fontFamily: 'Poppins, sans-serif' }}>Find up-to-date guidelines on Serviify brand usage.</p>
              <Link to="/terms-of-service" className="learn-more-link">Learn more</Link>
            </div>

            <div className="info-link-item">
              <i className="bi bi-phone-fill" style={{ fontSize: "2.2rem", color: "#293040" }}></i>
              <h3>App Services</h3>
              <p style={{ fontFamily: 'Poppins, sans-serif' }}>Access our services on the go with mobile applications.</p>
              <Link to="/app-services" className="learn-more-link">Learn more</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;