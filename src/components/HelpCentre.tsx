import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HelpCentre.css';
import Footer from './Footer';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const HelpCentre: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: FaqCategory[] = [
    {
      title: "Getting Started",
      items: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on the 'Sign Up' button on the top right of our homepage. Fill in your details, verify your email address, and you're all set to start using Serviify."
        },
        {
          question: "Is the service really free?",
          answer: "Yes, basic access to Serviify is completely free. We offer premium features for businesses that require additional capabilities."
        },
        {
          question: "How do I find service providers?",
          answer: "You can search for service providers by category, location, or specific skills. Use the search bar or browse through our service categories to find the perfect match for your needs."
        }
      ]
    },
    {
      title: "For Service Providers",
      items: [
        {
          question: "How do I register as a service provider?",
          answer: "After creating your account, go to your profile settings and select 'Become a Provider'. Complete your business profile, add your services, and submit for verification."
        },
        {
          question: "How do I set my availability?",
          answer: "In your provider dashboard, navigate to 'Schedule' where you can set your working hours, breaks, and days off to ensure clients book you only when you're available."
        },
        {
          question: "How do payments work?",
          answer: "Serviify handles all payment processing. Clients pay through our platform, and we transfer the funds to your linked bank account after service completion, minus our service fee."
        }
      ]
    },
    {
      title: "For Clients",
      items: [
        {
          question: "How do I book a service?",
          answer: "Find a service provider you like, click on their profile, select the service you need, choose an available time slot, and confirm your booking."
        },
        {
          question: "Can I cancel a booking?",
          answer: "Yes, you can cancel bookings through your dashboard. Please note that cancellation policies vary by provider and may include cancellation fees if done too close to the appointment time."
        },
        {
          question: "How do I leave a review?",
          answer: "After a service is completed, you'll receive a notification to leave a review. You can rate your experience and leave comments to help the provider and other users."
        }
      ]
    },
    {
      title: "Account & Billing",
      items: [
        {
          question: "How do I update my payment information?",
          answer: "Go to 'Account Settings', select 'Payment Methods', and follow the instructions to add, remove, or update your payment information."
        },
        {
          question: "I need a receipt for my service, how do I get one?",
          answer: "All receipts are automatically generated and can be found in your account under 'Billing History'. You can download or print them as needed."
        },
        {
          question: "How do I delete my account?",
          answer: "To delete your account, go to 'Account Settings', scroll to the bottom and select 'Delete Account'. Please note this action is permanent and cannot be undone."
        }
      ]
    }
  ];

  const toggleItem = (itemIndex: number) => {
    setOpenItems(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }));
  };

  return (
    <div className="help-centre-page">
      <div className="simple-header">
        <div className="simple-header-content">
          <Link to="/" className="logo-link">
            <img src="https://ngratesc.sirv.com/i-claim/serviify/logo.png" alt="Serviify Logo" />
            <span>Help Centre</span>
          </Link>
          <Link to="/" className="back-link">
            <i className="bi bi-arrow-left"></i> Back to Homepage
          </Link>
        </div>
      </div>
      
      <div className="help-centre-container">
        <div className="help-centre-content-wrapper">
          
          <div className="help-centre-main">
            <div className="help-categories">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`category-btn ${activeCategory === index ? 'active' : ''}`}
                  onClick={() => setActiveCategory(index)}
                >
                  {category.title}
                </button>
              ))}
            </div>
            
            <div className="faq-container">
              <h2 className="category-title">{categories[activeCategory].title}</h2>
              
              <div className="faq-items">
                {categories[activeCategory].items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${openItems[index] ? 'open' : ''}`}
                  >
                    <div 
                      className="faq-question"
                      onClick={() => toggleItem(index)}
                    >
                      <h3>{item.question}</h3>
                      <span className="toggle-icon">{openItems[index] ? '−' : '+'}</span>
                    </div>
                    
                    {openItems[index] && (
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="help-centre-contact">
            <h2>Need more help?</h2>
            <p>Our support team is here to assist you with any questions or issues you may have.</p>
            <a href="mailto:support@serviify.com" className="contact-button">Contact Support</a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpCentre; 