import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';
import Footer from './Footer';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="simple-header">
        <div className="simple-header-content">
          <Link to="/" className="logo-link">
            <img src="https://ngratesc.sirv.com/i-claim/serviify/logo.png" alt="Serviify Logo" />
            <span>About Serviify</span>
          </Link>
          <Link to="/" className="back-link">
            <i className="bi bi-arrow-left"></i> Back to Homepage
          </Link>
        </div>
      </div>

      <div className="about-container">
        {/* Background service icons */}
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
        <div className="bg-icon bg-icon-11"><i className="bi bi-lightning"></i></div>
        <div className="bg-icon bg-icon-12"><i className="bi bi-clipboard2-check"></i></div>
        <div className="bg-icon bg-icon-13"><i className="bi bi-briefcase"></i></div>
        <div className="bg-icon bg-icon-14"><i className="bi bi-palette"></i></div>
        <div className="bg-icon bg-icon-15"><i className="bi bi-pc-display"></i></div>
        
        <div className="about-content">
          <section className="about-section">
            <h2>Who are we?</h2>
            <p className="about-intro">
              Serviify began as a vision to simplify how people find and access professional services. 
              We're building a platform that will connect service providers with clients,
              making professional services accessible to everyone.
            </p>
        
          </section>

          <section className="about-section">
            <h2>Vision</h2>
            <p>
              Create economic opportunity for every service provider and client by making professional 
              services as simple as a single click, empowering both providers and clients to achieve their goals.
            </p>
          </section>

          <section className="about-section">
            <h2>Mission</h2>
            <p>
              The mission of Serviify is simple: connect people with the right service providers 
              through a reliable and affordable platform to make them more productive and successful.
            </p>
          </section>
        </div>
      </div>

      <div className="more-info-section">
        <div className="more-info-content">
          <h2 className="more-info-title">For more information about our company</h2>
          
          <div className="info-links">
            
            
            <div className="info-link-item">
              <i className="bi bi-people-fill" style={{fontSize: "2.2rem", color: "#293040"}}></i>
              <h3>Company Page</h3>
              <p>Connect with our network of service professionals.</p>
              <Link to="/about" className="learn-more-link">Learn more</Link>
            </div>
            
            <div className="info-link-item">
              <i className="bi bi-newspaper" style={{fontSize: "2.2rem", color: "#293040"}}></i>
              <h3>Pressroom</h3>
              <p>Explore the latest Serviify news, updates, and reports.</p>
              <Link to="/help-centre" className="learn-more-link">Learn more</Link>
            </div>
            
            <div className="info-link-item">
              <i className="bi bi-brush-fill" style={{fontSize: "2.2rem", color: "#293040"}}></i>
              <h3>Branding policies</h3>
              <p>Find up-to-date guidelines on Serviify brand usage.</p>
              <Link to="/terms-of-service" className="learn-more-link">Learn more</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About; 