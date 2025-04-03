import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <div className="footer-brand">
                <h2>Serviify</h2>
                <p className="footer-tagline">All your services in one platform</p>
              </div>
              <p className="footer-description">
                Connecting users with service providers through a simple, reliable, and affordable platform.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h3 className="footer-title">Services</h3>
              <ul className="footer-links">
                <li><a href="/services/electrical">Electrical Services</a></li>
                <li><a href="/services/automotive">Auto Mechanics</a></li>
                <li><a href="/services/carpentry">Carpentry Services</a></li>
                <li><a href="/services/agriculture">Agricultural Services</a></li>
                <li><a href="/services/view-all">View All Services</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h3 className="footer-title">Contact Us</h3>
              <ul className="footer-contact">
                <li>
                  <i className="bi bi-geo-alt"></i>
                  <span>
                    258 Smuts Rd<br />
                    Waterfalls<br />
                    Harare<br />
                    Zimbabwe
                  </span>
                </li>
                <li>
                  <i className="bi bi-envelope"></i>
                  <span>admin@serviify.co.zw</span>
                </li>
                <li>
                  <i className="bi bi-telephone"></i>
                  <span>+263 78 011 6891</span>
                </li>
              </ul>
              <div className="footer-newsletter">
                <h4>Stay Updated</h4>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your email" />
                  <button type="button">
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">
                © {currentYear} Serviify. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-legal">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-of-service">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 