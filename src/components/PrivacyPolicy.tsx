import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PrivacyPolicy.css';
import Footer from './Footer';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy-page">
      <div className="simple-header">
        <div className="simple-header-content">
          <Link to="/" className="logo-link">
            <img src="https://ngratesc.sirv.com/i-claim/serviify/logo.png" alt="Serviify Logo" />
            <span>Privacy Policy</span>
          </Link>
          <Link to="/" className="back-link">
            <i className="bi bi-arrow-left"></i> Back to Homepage
          </Link>
        </div>
      </div>
      
      <div className="privacy-policy-container">
        <div className="privacy-policy-content">
          
          <section className="privacy-policy-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Serviify. We respect your privacy and are committed to protecting your personal data.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
              you use our platform.
            </p>
          </section>
          
          <section className="privacy-policy-section">
            <h2>2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as:
            </p>
            <ul>
              <li>Personal identifiers (name, email address, phone number)</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>Service preferences</li>
              <li>Payment and transaction information</li>
            </ul>
          </section>
          
          <section className="privacy-policy-section">
            <h2>3. How We Use Your Information</h2>
            <p>
              We use your information for various purposes, including:
            </p>
            <ul>
              <li>Providing and improving our services</li>
              <li>Processing transactions</li>
              <li>Communicating with you</li>
              <li>Marketing and promotional purposes</li>
              <li>Ensuring platform security</li>
            </ul>
          </section>
          
          <section className="privacy-policy-section">
            <h2>4. Information Sharing</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Professional advisors</li>
              <li>Law enforcement or other authorities when required by law</li>
            </ul>
          </section>
          
          <section className="privacy-policy-section">
            <h2>5. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Objection to certain processing activities</li>
              <li>Data portability</li>
            </ul>
          </section>
          
          <section className="privacy-policy-section">
            <h2>6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction.
            </p>
          </section>
          
          <section className="privacy-policy-section">
            <h2>7. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>
          
          <section className="privacy-policy-section">
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <strong>Email:</strong> privacy@serviify.com
            </p>
          </section>
          
          <p className="last-updated">Last Updated: June 2023</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 