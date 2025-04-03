import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TermsOfService.css';
import Footer from './Footer';

const TermsOfService: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('agreement');
  
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll('.terms-section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionElement = section as HTMLElement;
      const sectionTop = sectionElement.offsetTop;
      const sectionHeight = sectionElement.offsetHeight;
      const sectionId = sectionElement.id;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        setActiveSection(sectionId);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-of-service-page">
      <div className="simple-header">
        <div className="simple-header-content">
          <Link to="/" className="logo-link">
            <img src="https://ngratesc.sirv.com/i-claim/serviify/logo.png" alt="Serviify Logo" />
            <span className="header-title">Terms of Service</span>
          </Link>
          <div className="header-links">
            <Link to="/" className="back-link">
              <i className="bi bi-arrow-left"></i> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
      
      <div className="terms-of-service-container">
        <div className="terms-content-wrapper">
          <div className="terms-sidebar">
            <nav className="terms-nav">
              <ul>
                <li className={activeSection === 'agreement' ? 'active' : ''}>
                  <a href="#agreement" onClick={() => handleNavClick('agreement')}>
                    1. Agreement to Terms
                  </a>
                </li>
                <li className={activeSection === 'service-description' ? 'active' : ''}>
                  <a href="#service-description" onClick={() => handleNavClick('service-description')}>
                    2. Service Description
                  </a>
                </li>
                <li className={activeSection === 'account' ? 'active' : ''}>
                  <a href="#account" onClick={() => handleNavClick('account')}>
                    3. Account Registration and Security
                  </a>
                </li>
                <li className={activeSection === 'responsibilities' ? 'active' : ''}>
                  <a href="#responsibilities" onClick={() => handleNavClick('responsibilities')}>
                    4. User Responsibilities
                  </a>
                </li>
                <li className={activeSection === 'content' ? 'active' : ''}>
                  <a href="#content" onClick={() => handleNavClick('content')}>
                    5. Content and Intellectual Property
                  </a>
                </li>
                <li className={activeSection === 'payment' ? 'active' : ''}>
                  <a href="#payment" onClick={() => handleNavClick('payment')}>
                    6. Payment Terms
                  </a>
                </li>
                <li className={activeSection === 'liability' ? 'active' : ''}>
                  <a href="#liability" onClick={() => handleNavClick('liability')}>
                    7. Liability and Indemnification
                  </a>
                </li>
                <li className={activeSection === 'dispute' ? 'active' : ''}>
                  <a href="#dispute" onClick={() => handleNavClick('dispute')}>
                    8. Dispute Resolution
                  </a>
                </li>
                <li className={activeSection === 'modifications' ? 'active' : ''}>
                  <a href="#modifications" onClick={() => handleNavClick('modifications')}>
                    9. Platform Modifications
                  </a>
                </li>
                <li className={activeSection === 'governing-law' ? 'active' : ''}>
                  <a href="#governing-law" onClick={() => handleNavClick('governing-law')}>
                    10. Governing Law and Jurisdiction
                  </a>
                </li>
                <li className={activeSection === 'force-majeure' ? 'active' : ''}>
                  <a href="#force-majeure" onClick={() => handleNavClick('force-majeure')}>
                    11. Force Majeure
                  </a>
                </li>
                <li className={activeSection === 'assignment' ? 'active' : ''}>
                  <a href="#assignment" onClick={() => handleNavClick('assignment')}>
                    12. Assignment
                  </a>
                </li>
                <li className={activeSection === 'entire-agreement' ? 'active' : ''}>
                  <a href="#entire-agreement" onClick={() => handleNavClick('entire-agreement')}>
                    13. Entire Agreement
                  </a>
                </li>
                <li className={activeSection === 'contact' ? 'active' : ''}>
                  <a href="#contact" onClick={() => handleNavClick('contact')}>
                    14. Contact Information
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="terms-content">
            <section id="agreement" className="terms-section">
              <h2>1. Agreement to Terms</h2>
              
              <h3>1.1 Binding Agreement</h3>
              <p>
                By accessing or using Serviify ("Platform," "we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms"), 
                our Privacy Policy, and any additional terms or policies referenced herein. These Terms constitute 
                a legally binding agreement between you and Serviify.
              </p>
              
              <h3>1.2 Capacity to Contract</h3>
              <p>
                You represent and warrant that:
              </p>
              <ul>
                <li>You are at least 16 years old</li>
                <li>You have the legal capacity to enter into binding contracts</li>
                <li>You are not barred from using our services under applicable law</li>
                <li>You will comply with these Terms and all applicable laws and regulations</li>
              </ul>
              
              <h3>1.3 Modifications</h3>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. 
                Your continued use of the Platform constitutes acceptance of modified Terms.
              </p>
            </section>
            
            <section id="service-description" className="terms-section">
              <h2>2. Service Description</h2>
              
              <h3>2.1 Platform Overview</h3>
              <p>
                Serviify is a communication and networking platform connecting service providers with potential clients. 
                We provide:
              </p>
              <ul>
                <li>Professional networking features</li>
                <li>Messaging systems</li>
                <li>Service listing capabilities</li>
                <li>Booking and scheduling tools</li>
                <li>Payment processing services</li>
                <li>Review and rating systems</li>
              </ul>
              
              <h3>2.2 Platform Role</h3>
              <ul>
                <li>We are a technology platform, not a service provider</li>
                <li>We do not provide, control, or manage the services listed</li>
                <li>We do not employ service providers</li>
                <li>We facilitate connections but do not guarantee outcomes</li>
              </ul>
            </section>
            
            <section id="account" className="terms-section">
              <h2>3. Account Registration and Security</h2>
              
              <h3>3.1 Account Creation</h3>
              <ul>
                <li>Accurate information required</li>
                <li>One account per person/entity</li>
                <li>Verification may be required</li>
                <li>Professional credentials must be valid</li>
              </ul>
              
              <h3>3.2 Account Security</h3>
              <ul>
                <li>Strong password requirements</li>
                <li>Two-factor authentication recommended</li>
                <li>Regular security updates</li>
                <li>Immediate breach notification</li>
              </ul>
              
              <h3>3.3 Account Restrictions</h3>
              <ul>
                <li>No account sharing</li>
                <li>No unauthorized transfers</li>
                <li>No impersonation</li>
                <li>No automated access</li>
              </ul>
            </section>
            
            <section id="responsibilities" className="terms-section">
              <h2>4. User Responsibilities</h2>
              
              <h3>4.1 Service Provider Obligations</h3>
              <ul>
                <li>Maintain current licenses and certifications</li>
                <li>Provide accurate service descriptions</li>
                <li>Set clear pricing and policies</li>
                <li>Respond to inquiries promptly</li>
                <li>Maintain professional standards</li>
                <li>Carry appropriate insurance</li>
                <li>Comply with tax obligations</li>
                <li>Meet service commitments</li>
              </ul>
              
              <h3>4.2 Client Obligations</h3>
              <ul>
                <li>Provide accurate information</li>
                <li>Honor appointments</li>
                <li>Pay for services received</li>
                <li>Communicate respectfully</li>
                <li>Follow cancellation policies</li>
                <li>Provide honest feedback</li>
              </ul>
              
              <h3>4.3 General User Conduct</h3>
              <ul>
                <li>No harassment or abuse</li>
                <li>No discriminatory behavior</li>
                <li>No fraudulent activity</li>
                <li>No intellectual property violations</li>
                <li>No platform manipulation</li>
                <li>No unauthorized commercial use</li>
              </ul>
            </section>
            
            <section id="content" className="terms-section">
              <h2>5. Content and Intellectual Property</h2>
              
              <h3>5.1 User Content</h3>
              
              <h4>Ownership</h4>
              <ul>
                <li>Users retain ownership of their content</li>
                <li>Platform granted worldwide license to use content</li>
                <li>Right to remove content at any time</li>
              </ul>
              
              <h4>Content License</h4>
              <p>
                You grant Serviify a non-exclusive, worldwide, royalty-free, sublicensable, transferable license to:
              </p>
              <ul>
                <li>Host and store content</li>
                <li>Display and distribute content</li>
                <li>Modify and adapt content</li>
                <li>Promote and market content</li>
              </ul>
              
              <h3>5.2 Platform Intellectual Property</h3>
              <ul>
                <li>All platform features and functionality</li>
                <li>Trademarks and branding</li>
                <li>Proprietary algorithms</li>
                <li>User interface designs</li>
                <li>Documentation and marketing materials</li>
              </ul>
              
              <h3>5.3 Prohibited Content</h3>
              <ul>
                <li>Illegal or fraudulent material</li>
                <li>Harmful or malicious content</li>
                <li>Discriminatory or hateful speech</li>
                <li>Adult or explicit content</li>
                <li>Spam or unsolicited advertising</li>
                <li>Copyrighted material without permission</li>
                <li>False or misleading information</li>
                <li>Personal information of others</li>
                <li>Violent or threatening content</li>
              </ul>
            </section>
            
            <section id="payment" className="terms-section">
              <h2>6. Payment Terms</h2>
              
              <h3>6.1 Service Fees</h3>
              <ul>
                <li>Platform commission rates</li>
                <li>Payment processing fees</li>
                <li>Subscription fees (if applicable)</li>
                <li>Cancellation fees</li>
                <li>Refund processing fees</li>
              </ul>
              
              <h3>6.2 Payment Processing</h3>
              <ul>
                <li>Secure payment handling</li>
                <li>Multiple payment methods</li>
                <li>Automatic payment collection</li>
                <li>Invoice generation</li>
                <li>Tax calculation and collection</li>
              </ul>
              
              <h3>6.3 Refunds and Disputes</h3>
              <ul>
                <li>Refund eligibility criteria</li>
                <li>Dispute resolution process</li>
                <li>Chargeback handling</li>
                <li>Payment holds</li>
                <li>Service credits</li>
              </ul>
            </section>
            
            <section id="liability" className="terms-section">
              <h2>7. Liability and Indemnification</h2>
              
              <h3>7.1 Limitation of Liability</h3>
              <p>Serviify shall not be liable for:</p>
              <ul>
                <li>User-generated content</li>
                <li>Service quality or outcomes</li>
                <li>Third-party actions</li>
                <li>Technical issues</li>
                <li>Indirect or consequential damages</li>
                <li>Lost profits or revenue</li>
                <li>Data loss or corruption</li>
                <li>Service interruptions</li>
                <li>Force majeure events</li>
              </ul>
              
              <h3>7.2 Indemnification</h3>
              <p>Users agree to indemnify and hold harmless Serviify from:</p>
              <ul>
                <li>Policy violations</li>
                <li>Content violations</li>
                <li>Legal claims</li>
                <li>Regulatory violations</li>
                <li>Third-party claims</li>
                <li>Damages and losses</li>
                <li>Legal fees and costs</li>
              </ul>
              
              <h3>7.3 Warranty Disclaimer</h3>
              <ul>
                <li>Services provided "as is"</li>
                <li>No guarantees of availability</li>
                <li>No warranty of merchantability</li>
                <li>No fitness for particular purpose</li>
                <li>No third-party rights warranty</li>
              </ul>
            </section>
            
            <section id="dispute" className="terms-section">
              <h2>8. Dispute Resolution</h2>
              
              <h3>8.1 Informal Resolution</h3>
              <ul>
                <li>Direct communication requirement</li>
                <li>Mediation options</li>
                <li>Platform intervention</li>
                <li>Good faith negotiations</li>
              </ul>
              
              <h3>8.2 Arbitration Agreement</h3>
              <ul>
                <li>Binding arbitration</li>
                <li>Individual claims only</li>
                <li>No class actions</li>
                <li>Arbitration procedures</li>
                <li>Cost sharing</li>
              </ul>
              
              <h3>8.3 Small Claims Exception</h3>
              <ul>
                <li>Right to pursue small claims</li>
                <li>Jurisdictional limits</li>
                <li>Individual actions only</li>
                <li>Local court rules</li>
              </ul>
            </section>
            
            <section id="modifications" className="terms-section">
              <h2>9. Platform Modifications</h2>
              
              <h3>9.1 Service Changes</h3>
              <ul>
                <li>Feature modifications</li>
                <li>Pricing updates</li>
                <li>Policy revisions</li>
                <li>Technical requirements</li>
                <li>User interface changes</li>
              </ul>
              
              <h3>9.2 Termination Rights</h3>
              <p>We may terminate or suspend services for:</p>
              <ul>
                <li>Terms violation</li>
                <li>Fraudulent activity</li>
                <li>Harmful behavior</li>
                <li>Extended inactivity</li>
                <li>Platform abuse</li>
                <li>Legal requirements</li>
                <li>Business necessity</li>
              </ul>
            </section>
            
            <section id="governing-law" className="terms-section">
              <h2>10. Governing Law and Jurisdiction</h2>
              
              <h3>10.1 Choice of Law</h3>
              <p>
                These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.
              </p>
              
              <h3>10.2 Jurisdiction</h3>
              <ul>
                <li>Exclusive jurisdiction</li>
                <li>Venue selection</li>
                <li>Choice of forum</li>
                <li>Consent to jurisdiction</li>
              </ul>
              
              <h3>10.3 Severability</h3>
              <p>If any provision of these Terms is found invalid:</p>
              <ul>
                <li>Remainder remains in effect</li>
                <li>Invalid terms modified to valid terms</li>
                <li>Purpose preservation</li>
                <li>Judicial modification</li>
              </ul>
            </section>
            
            <section id="force-majeure" className="terms-section">
              <h2>11. Force Majeure</h2>
              <p>We are not liable for failure or delay due to:</p>
              <ul>
                <li>Natural disasters</li>
                <li>Government actions</li>
                <li>War or terrorism</li>
                <li>Pandemics</li>
                <li>Technical failures</li>
                <li>Labor disputes</li>
                <li>Supply chain disruptions</li>
                <li>Other circumstances beyond reasonable control</li>
              </ul>
            </section>
            
            <section id="assignment" className="terms-section">
              <h2>12. Assignment</h2>
              <ul>
                <li>No user assignment without consent</li>
                <li>Platform right to assign</li>
                <li>Successor binding</li>
                <li>Notice of assignment</li>
              </ul>
            </section>
            
            <section id="entire-agreement" className="terms-section">
              <h2>13. Entire Agreement</h2>
              <ul>
                <li>Complete understanding</li>
                <li>Prior agreements superseded</li>
                <li>Modification requirements</li>
                <li>Integration clause</li>
              </ul>
            </section>
            
            <section id="contact" className="terms-section">
              <h2>14. Contact Information</h2>
              
              <h3>14.1 General Inquiries</h3>
              <p>
                <strong>Email:</strong> support@serviify.com<br />
                <strong>Phone:</strong> +263 78 011 6891<br />
                <strong>Address:</strong> 258 Smuts Rd, Waterfalls, Harare, Zimbabwe
              </p>
            </section>
            
            <p className="last-updated">Last Updated: January 2025</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService; 