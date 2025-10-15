import "../styles/Hero.css";
import { FeaturesShowcase } from "./features-showcase";
import Footer from "./Footer";
import { Link, useNavigate } from 'react-router-dom';
import SEOHead, { generateWebsiteStructuredData } from './SEOHead';
import { LazyImage } from './LazyImage';

// Import images
import electricianImg from '../assets/electrician.webp';
import autoMechImg from '../assets/auto-mech.webp';
import carpentryImg from '../assets/carpentry.webp';
import agricultureImg from '../assets/agriculture.webp';
import cleaningImg from '../assets/cleaning.webp';
import realEstateImg from '../assets/real estate.webp';
import eventPlannerImg from '../assets/eventplanner.webp';

interface HeroProps {}

const TechShowcaseCurve = () => (
  <div className="custom-shape-divider-top-tech-showcase">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
        className="shape-fill"
      ></path>
    </svg>
  </div>
);

const Hero: React.FC<HeroProps> = () => {
  const navigate = useNavigate();

  const handlePlatformClick = (service: string) => {
    navigate(`/services?service=${encodeURIComponent(service)}`);
  };

  return (
    <>
      <SEOHead
        title="Serviify - All Your Services in One Platform"
        description="Find and book trusted service providers in Zimbabwe. Connect with professionals for electrical, plumbing, cleaning, carpentry, and more services. Simple, reliable, and affordable."
        canonical="/"
        keywords="service providers Zimbabwe, electricians, plumbers, cleaners, carpenters, home services, professional services, Serviify"
        structuredData={generateWebsiteStructuredData()}
      />
      <div className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-heading">
              All your services in{" "}
              <span className="x_wd_secondary_highlight_bold_05">one platform.</span>
            </h1>
            <p className="hero-subheading">
              Simple, reliable use, yet <span> affordable!</span>
            </p>
            <div className="hero-cta">
              <a href="/app" className="start-now-btn">
                Get Started <i className="bi bi-arrow-right"></i>
              </a>
              <Link to="/support" className="contact-us-btn">
                Contact Us <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
      </div>

        <div className="tech-showcase-container position-relative">
          <TechShowcaseCurve />
          <div className="container">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2 className="tech-showcase-title">
                  All your <span className="x_wd_yellow_highlight_03">providers</span> in one fantastic app
                </h2>
              </div>
            </div>

            <div className="row justify-content-center g-4">
              <div className="col-6 col-md-4 col-lg-3 text-center">
                <div className="platform-item" onClick={() => handlePlatformClick('Electrical Services & Repairs')} style={{cursor: 'pointer'}}>
                  <div className="platform-image-container">
                    <LazyImage 
                      src={electricianImg}
                      alt="Professional Electricians"
                      className="platform-image"
                    />
                    <div className="platform-overlay">
                      <div className="platform-label">
                        Professional Electricians
                      </div>
                    </div>
                  </div>
                  <h3>Electrical Services</h3>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 text-center">
                <div className="platform-item" onClick={() => handlePlatformClick('Auto Repair & Maintenance')} style={{cursor: 'pointer'}}>
                  <div className="platform-image-container">
                    <LazyImage 
                      src={autoMechImg}
                      alt="Automotive Specialists"
                      className="platform-image"
                    />
                    <div className="platform-overlay">
                      <div className="platform-label">
                        Automotive Specialists
                      </div>
                    </div>
                  </div>
                  <h3>Auto Mechanics</h3>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 text-center">
                <div className="platform-item" onClick={() => handlePlatformClick('Carpentry & Handyman Services')} style={{cursor: 'pointer'}}>
                  <div className="platform-image-container">
                    <LazyImage 
                      src={carpentryImg}
                      alt="Expert Carpenters"
                      className="platform-image"
                    />
                    <div className="platform-overlay">
                      <div className="platform-label">Expert Carpenters</div>
                    </div>
                  </div>
                  <h3>Carpentry Services</h3>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 text-center">
                <div className="platform-item" onClick={() => handlePlatformClick('Agricultural & Consultation Services')} style={{cursor: 'pointer'}}>
                  <div className="platform-image-container">
                    <LazyImage 
                      src={agricultureImg}
                      alt="Agricultural Experts"
                      className="platform-image"
                    />
                    <div className="platform-overlay">
                      <div className="platform-label">Agricultural Experts</div>
                    </div>
                  </div>
                  <h3>Agricultural Services</h3>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 text-center">
                <div className="platform-item" onClick={() => handlePlatformClick('Cleaning Services')} style={{cursor: 'pointer'}}>
                  <div className="platform-image-container">
                    <LazyImage 
                      src={cleaningImg}
                      alt="Professional Cleaners"
                      className="platform-image"
                    />
                    <div className="platform-overlay">
                      <div className="platform-label">
                        Professional Cleaners
                      </div>
                    </div>
                  </div>
                  <h3>Cleaning Services</h3>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 text-center">
                <div className="platform-item" onClick={() => handlePlatformClick('Real Estate Services & Property Management')} style={{cursor: 'pointer'}}>
                  <div className="platform-image-container">
                    <LazyImage 
                      src={realEstateImg}
                      alt="Real Estate Professionals"
                      className="platform-image"
                    />
                    <div className="platform-overlay">
                      <div className="platform-label">
                        Real Estate Professionals
                      </div>
                    </div>
                  </div>
                  <h3>Real Estate Services</h3>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 text-center">
                <div className="platform-item" onClick={() => handlePlatformClick('Event Planning & Management')} style={{cursor: 'pointer'}}>
                  <div className="platform-image-container">
                    <LazyImage 
                      src={eventPlannerImg}
                      alt="Event Planning Specialists"
                      className="platform-image"
                    />
                    <div className="platform-overlay">
                      <div className="platform-label">
                        Event Planning Specialists
                      </div>
                    </div>
                  </div>
                  <h3>Event Planning</h3>
                </div>
              </div>
            </div>

            <div className="row mt-4 mb-3">
              <div className="col-12 text-center">
                <Link
                  to="/services"
                  className="view-all-link mt-4 d-inline-block"
                >
                  Explore all service options
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>

            {/* App Benefits Text - integrated within tech showcase */}
            <div className="row mt-5">
              <div className="col-12 text-center">
                <p className="app-benefits-heading">
                  Imagine a vast collection of service providers at your
                  fingertips.
                </p>
                <p className="app-benefits-text">
                  Need a service completed? There's a professional for that on
                  Serviify.
                </p>
                <p className="app-benefits-text">
                  No complexity, no cost, just a one-click connection.
                </p>
                <p className="app-benefits-text mt-4">
                  Each service simplifies a process and empowers more people.
                  <br />
                  Imagine the impact when everyone gets the right service
                  provider for the job, with perfect integration.
                </p>
              </div>
            </div>

            {/* FeaturesShowcase within the tech showcase container */}
            <div className="row mt-5">
              <div className="col-12">
                <FeaturesShowcase />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Serviify Core Function Highlights */}
      <div className="core-function-container">
        <div className="container">
          <div className="row py-5">

          </div>
        </div>
      </div>


      {/* Download Section */}
      <div className="download-section">
        <div className="container text-center py-5">
          <h2 className="download-heading">Download for Android & iOS.</h2>
          <div className="download-buttons">
            <div className="android-download">
              <LazyImage 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="google-play-badge opacity-50"
              />
            </div>
            <div className="ios-download">
              <LazyImage 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="app-store-badge opacity-50"
              />
            </div>
          </div>
          <p className="coming-soon-text text-center mt-3">Coming Soon</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    </>
  );
};

export default Hero;
