"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useLocation } from "react-router-dom"
import SEOHead, { generateProviderStructuredData } from './SEOHead';
import { 
  ArrowLeft2, 
  Star1, 
  User, 
  Whatsapp,
  ToggleOn, 
  Call, 
  TickCircle,
  Gallery,
  DocumentText,
  Profile2User,
  Location,
  Bookmark,
  InfoCircle,
  CloseCircle,
  Star,
  TagUser,
  Heart,

  Messages2,
  Like1,
} from 'iconsax-react';
import type { Provider, GalleryItem, Post } from "../services/providers.service"
import { ProvidersService } from "../services/providers.service"
import logo from "../assets/logo.png"
import placeholderPost from "../assets/posts/post.png"
import placeholderGallery from "../assets/gallery/gallary.png"
import placeholderReview from "../assets/providers/provider_4.png"

export default function ProviderProfile() {
  const { id } = useParams<{ id: string }>()
  const [provider, setProvider] = useState<Provider | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'posts' | 'gallery' | 'reviews'>('posts')
  const [viewMode, setViewMode] = useState<'activity' | 'introduction' | 'contact'>('activity')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isFollowLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const location = useLocation();
  const from = new URLSearchParams(location.search).get('from');
  const backLink = from === 'services' ? '/services' : '/provider-search';

  useEffect(() => {
    
    const fetchProviderData = async () => {
      if (!id) {
        setError("Provider ID is missing")
        setIsLoading(false)
        return
      }

     
      
      try {
        setIsLoading(true)
        const providerService = ProvidersService.getInstance()
        
        const providerData = await providerService.getProviderById(id)
      
        if (!providerData) {
          console.error("Provider not found for ID:", id);
          setError("Provider not found")
        } else {
          console.log("Setting provider data:", {
        
            
          });
          setProvider(providerData)
          
          setIsFollowing(false)
        }
      } catch (err) {
        
        setError("Failed to load provider data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProviderData()
  }, [id])

  const handleFollowToggle = async () => {
    if (!id || !provider) return
    
    // Open modal instead of redirecting
    setIsModalOpen(true)
  }

 
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleReferClick = (post: Post) => {
    setSelectedPost(post);
    setIsReferModalOpen(true);
  };

  // Format date string to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="d-flex align-items-center">
        <div className="me-1" style={{ color: "#293040" }}>
          {Array.from({ length: 5 }, (_, i) => {
            const starValue = i + 1;
            const decimal = rating % 1;
            
            if (starValue <= Math.floor(rating)) {
              return <span key={i}>★</span>; 
            } else if (starValue === Math.floor(rating) + 1 && decimal > 0) {
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <span style={{ color: "#293040" }}>☆</span>
                  <span style={{ 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    width: `${decimal * 100}%`, 
                    overflow: 'hidden', 
                    color: "#293040" 
                  }}>★</span>
                </span>
              ); 
            } else {
              return <span key={i}>☆</span>;
            }
          })}
        </div>
        <span className="small text-muted">{(rating || 0).toFixed(1)}</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading provider details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert" style={{
          backgroundColor: "rgba(41, 48, 64, 0.1)",
          color: "#293040",
          border: "1px solid #293040",
          borderRadius: "6px",
          padding: "16px"
        }}>
          <div className="d-flex align-items-center">
            <InfoCircle size="20" color="#293040" className="me-2" />
            {error}
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to={backLink} className="start-now-btn">
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="container mt-5 text-center">
        <h3>Provider not found</h3>
        <p>The provider you're looking for doesn't exist or has been removed.</p>
        <Link to={backLink} className="start-now-btn mt-3">
          Back to Search
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={`${provider.name} - Service Provider`}
        description={`Find and book ${provider.name}, a trusted service provider on Serviify. View their profile, services, and reviews in ${provider.location || 'Zimbabwe'}.`}
        canonical={`/provider/${provider.id}`}
        ogType="profile"
        ogImage={provider.profile_image_url || provider.avatar}
        keywords={`${provider.name}, ${provider.serviceType || provider.service_type || 'service provider'}, ${provider.location || provider.provider_location || 'Zimbabwe'}, Serviify`}
        structuredData={generateProviderStructuredData(provider)}
      />
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f8f9fa",
      position: isModalOpen || isReferModalOpen ? "relative" : "static"
    }}>
      {/* Sign Up Modal */}
      {isModalOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ 
               backgroundColor: "rgba(0,0,0,0.5)", 
               zIndex: 1050,
             }}>
          <div className="bg-white p-4 rounded-3 shadow" style={{ maxWidth: "400px", width: "90%" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0">Create an Account</h5>
              <button 
                className="btn btn-sm" 
                onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}
                style={{ color: "#293040" }}
              >
                <CloseCircle size="24" />
              </button>
            </div>
            <p>Join Serviify to connect with service providers, leave reviews, and more!</p>
            <div className="d-flex flex-column gap-2 mt-4">
              <a 
                href="/app" 
                className="start-now-btn" 
                style={{ 
                  textAlign: "center",
                  padding: "10px 0"
                }}
              >
                Create Account
              </a>
              <a 
                href="/app" 
                className="btn" 
                style={{ 
                  borderColor: "#293040",
                  color: "#293040",
                  textAlign: "center" 
                }}
              >
                Log In
              </a>
              <button 
                className="btn btn-link text-muted" 
                onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refer Modal */}
      {isReferModalOpen && selectedPost && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ 
               backgroundColor: "rgba(0,0,0,0.5)", 
               zIndex: 1050,
             }}>
          <div className="bg-white p-4 rounded-3 shadow" style={{ maxWidth: "400px", width: "90%" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0">Refer Service Request</h5>
              <button 
                className="btn btn-sm" 
                onClick={() => setIsReferModalOpen(false)}
                style={{ color: "#293040" }}
              >
                <CloseCircle size="24" />
              </button>
            </div>
            <p>Sign up to refer this service request to other providers in your network!</p>
            <div className="d-flex flex-column gap-2 mt-4">
              <a 
                href="/app" 
                className="start-now-btn" 
                style={{ 
                  textAlign: "center",
                  padding: "10px 0"
                }}
              >
                Create Account
              </a>
              <a 
                href="/app" 
                className="btn" 
                style={{ 
                  borderColor: "#293040",
                  color: "#293040",
                  textAlign: "center" 
                }}
              >
                Log In
              </a>
              <button 
                className="btn btn-link text-muted" 
                onClick={() => setIsReferModalOpen(false)}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="py-3 border-bottom bg-white shadow-sm">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <div className="me-2">
                <img src={logo} alt="Serviify Logo" width="40" height="40" className="rounded" />
              </div>
              <span className="logo-text">Serviify</span>
            </Link>
            
            <div className="header-nav">
              <Link to={backLink} className="header-btn header-btn-secondary">
                <ArrowLeft2 size="16" className="header-btn-icon" />
                <span className="header-btn-text">Search</span>
              </Link>
              <a href="/app" className="header-btn header-btn-primary">
                <User size="16" className="header-btn-icon" />
                <span className="header-btn-text">Sign in</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-4" style={{ flex: "1 0 auto" }}>
        <div className="row">
          {/* Left Sidebar - Vertical Profile Section */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 rounded-3 shadow-sm mb-4" style={{ 
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}>
              <div className="card-body text-center">
                <div style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  marginBottom: "1.5rem" 
                }}>
                  <div className="position-relative">
                    <img
                      src={provider.profile_image_url || logo}
                      alt={`${provider.first_name} ${provider.last_name}`}
                      className="rounded-circle"
                      style={{ 
                        width: "160px", 
                        height: "160px", 
                        objectFit: "cover", 
                        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                        transition: "transform 0.3s ease",
                        backgroundColor: !provider.profile_image_url ? '#eee' : 'transparent'
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = logo;
                        target.style.objectFit = 'contain';
                        target.alt = 'Placeholder image';
                      }}
                    />
                  </div>
                </div>
                
                <h4 className="mb-4" style={{ color: "#293040" }}>
                  {provider.first_name} {provider.last_name}
                </h4>
                
                {/* Stats Row */}
                <div className="d-flex justify-content-center align-items-center mb-4 border-top border-bottom py-3">
                  <div className="text-center px-2 mx-1">
                    <div className="fw-bold fs-5">{provider.posts_count || 0}</div>
                    <div className="text-muted small">Posts</div>
                  </div>
                  <div className="text-center px-2 mx-1">
                    <div className="fw-bold fs-5">{provider.follows_count || 0}</div>
                    <div className="text-muted small">Followers</div>
                  </div>
                  <div className="text-center px-2 mx-1">
                    <div className="fw-bold fs-5">{provider.following_count || 0}</div>
                    <div className="text-muted small">Following</div>
                  </div>
                </div>
                
                {/* About Section */}
                <div className="text-start">
                  <h5 className="card-title border-bottom pb-2 mb-3">Bio</h5>
                  {provider.provider_bio ? (
                    <p className="card-text">{provider.provider_bio}</p>
                  ) : (
                    <p className="card-text text-muted">No bio information available.</p>
                  )}

                  {/* Skills Section*/}
                  {provider.provider_skills && provider.provider_skills.length > 0 && (
                    <div className="mt-4">
                      <h5 className="card-title border-bottom pb-2 mb-3">Skills</h5>
                      <div>
                        {provider.provider_skills.map((skill: string) => (
                          <span key={skill} className="skill-tag me-1 mb-1">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Availability & Location Section */}
                  <div className="mt-4 d-flex justify-content-between">
                     {provider.provider_availability && (
                      <div>
                        <h5 className="card-title border-bottom pb-2 mb-3">Availability</h5>
                        <p className="card-text">
                           <span className="skill-tag me-1 mb-1">{provider.provider_availability}</span>
                        </p>
                      </div>
                     )}
                    
                  </div>

                </div>
              </div>
            </div>

            {/* Analytics Card */}
            <div className="card border-0 rounded-3 shadow-sm mb-4" style={{ 
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2 mb-3">Analytics</h5>
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}>
                    <Star size="20" color="#293040" />
                  </div>
                  <div>
                    <div className="fw-bold">{(provider.service_rating || 0).toFixed(1)}</div>
                    <div className="text-muted small">Rating</div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}>
                    <TagUser size="20" color="#293040" />
                  </div>
                  <div>
                    <div className="fw-bold">{provider.total_referrals || 0}</div>
                    <div className="text-muted small">Refers</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}>
                    <Bookmark size="20" color="#293040" />
                  </div>
                  <div>
                    <div className="fw-bold">{provider.total_bookmarks || 0}</div>
                    <div className="text-muted small">Bookmarks</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 rounded-3 shadow-sm mb-4" style={{ 
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}>
              <div className="card-body">
                <h5 className="card-title mb-3">View Full Profile</h5>
                <div className="mb-3">
                  <div 
                    className={`d-flex align-items-center mb-3 p-2 rounded cursor-pointer ${viewMode === 'activity' ? 'bg-light' : ''}`}
                    onClick={() => setViewMode('activity')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                      style={{ width: "32px", height: "32px", flexShrink: 0 }}>
                      <ToggleOn size="16" color="#293040" />
                    </div>
                    <div className="w-100">
                      <div className="fw-medium">See activity</div>
                      <small className="text-muted">View {provider.first_name}'s recent posts</small>
                    </div>
                    {viewMode === 'activity' && (
                      <TickCircle size="16" color="#293040" variant="Bold" />
                    )}
                  </div>
                  
                  <div 
                    className={`d-flex align-items-center mb-3 p-2 rounded cursor-pointer ${viewMode === 'introduction' ? 'bg-light' : ''}`}
                    onClick={() => setViewMode('introduction')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                      style={{ width: "32px", height: "32px", flexShrink: 0 }}>
                      <Profile2User size="16" color="#293040" />
                    </div>
                    <div className="w-100">
                      <div className="fw-medium">Get introduction</div>
                      <small className="text-muted">Connect through mutual contacts</small>
                    </div>
                    {viewMode === 'introduction' && (
                      <TickCircle size="16" color="#293040" variant="Bold" />
                    )}
                  </div>
                  
                  <div 
                    className={`d-flex align-items-center p-2 rounded cursor-pointer ${viewMode === 'contact' ? 'bg-light' : ''}`}
                    onClick={() => setViewMode('contact')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                      style={{ width: "32px", height: "32px", flexShrink: 0 }}>
                      <Call size="16" color="#293040" />
                    </div>
                    <div className="w-100">
                      <div className="fw-medium">Contact details</div>
                      <small className="text-muted">Get direct contact information</small>
                    </div>
                    {viewMode === 'contact' && (
                      <TickCircle size="16" color="#293040" variant="Bold" />
                    )}
                  </div>
                </div>
                
                <div className="text-center">
                  <a href="/app" className="start-now-btn w-100">
                    Join the Network
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content Area */}
          <div className="col-md-8">
            <div className="card border-0 rounded-3 shadow-sm mb-4 provider-details-card" style={{ 
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}>
              <div className="card-body">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                  <div className="flex-grow-1 mb-3 mb-md-0">
                    <h4 className="mb-2" style={{ color: "#293040" }}>
                      {provider.first_name} {provider.last_name}
                    </h4>
                    {provider.headline && (
                      <p className="mb-2">{provider.headline}</p>
                    )}
                    <div className="mb-3">
                      <span className="me-2">
                        {provider.service_type || "Service Provider"}
                      </span>
                    </div>
                    
                    {/* Location on mobile - show below service type */}
                    {provider.provider_location && (
                      <div className="location-mobile">
                        <Location size="16" className="me-1 flex-shrink-0" />
                        <span className="location-text">{provider.provider_location}</span>
                      </div>
                    )}
                    
                    <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
                      <button 
                        className="btn flex-fill flex-sm-grow-0" 
                        style={{ 
                          minWidth: "130px", 
                          padding: "10px 16px",
                          backgroundColor: "#293040",
                          color: "white",
                          fontWeight: "500",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 2px 5px rgba(41, 48, 64, 0.2)",
                          transition: "all 0.2s ease"
                        }} 
                        onClick={handleFollowToggle}
                        disabled={isFollowLoading}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          {isFollowLoading ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          ) : (
                            <User size="16" className="me-2" />
                          )}
                          <span>{isFollowing ? "Unfollow" : "Follow"}</span>
                        </div>
                      </button>
                      <button 
                        className="btn flex-fill flex-sm-grow-0" 
                        style={{ 
                          minWidth: "130px", 
                          padding: "10px 16px",
                          borderColor: "#293040",
                          color: "#293040",
                          fontWeight: "500",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 5px rgba(41, 48, 64, 0.1)" 
                        }}
                        onClick={handleButtonClick}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <Whatsapp size="16" className="me-2" />
                          <span>Contact</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Location on desktop - show on the right */}
                  {provider.provider_location && (
                    <div className="location-desktop">
                      <Location size="16" className="me-1 flex-shrink-0" />
                      <span className="location-text">{provider.provider_location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Posts/Gallery/Reviews Card */}
            <div className="card border-0 rounded-3 shadow-sm mb-4" style={{ 
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}>
              <div className="card-header bg-white border-bottom-0 pb-0">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
                      onClick={() => setActiveTab('posts')}
                      style={{
                        cursor: 'pointer',
                        fontWeight: 500,
                        padding: '12px 20px',
                        borderRadius: activeTab === 'posts' ? '0' : '8px 8px 0 0',
                        ...(activeTab !== 'posts' && { 
                          backgroundColor: 'transparent', 
                          borderColor: 'transparent', 
                          color: '#6c757d'
                        }),
                        ...(activeTab === 'posts' && {
                          borderBottom: '3px solid #293040',
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                        })
                      }} 
                    >
                      <div className="d-flex align-items-center">
                        <DocumentText size="16" className="me-2" />
                        Posts
                      </div>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'gallery' ? 'active' : ''}`}
                      onClick={() => setActiveTab('gallery')}
                      style={{
                        cursor: 'pointer',
                        fontWeight: 500,
                        padding: '12px 20px',
                        borderRadius: activeTab === 'gallery' ? '0' : '8px 8px 0 0',
                        ...(activeTab !== 'gallery' && { 
                          backgroundColor: 'transparent', 
                          borderColor: 'transparent', 
                          color: '#6c757d'
                        }),
                        ...(activeTab === 'gallery' && {
                          borderBottom: '3px solid #293040',
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                        })
                      }} 
                    >
                      <div className="d-flex align-items-center">
                        <Gallery size="16" className="me-2" />
                        Gallery
                      </div>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                      onClick={() => setActiveTab('reviews')}
                      style={{
                        cursor: 'pointer',
                        fontWeight: 500,
                        padding: '12px 20px',
                        borderRadius: activeTab === 'reviews' ? '0' : '8px 8px 0 0',
                        ...(activeTab !== 'reviews' && { 
                          backgroundColor: 'transparent', 
                          borderColor: 'transparent', 
                          color: '#6c757d'
                        }),
                        ...(activeTab === 'reviews' && {
                          borderBottom: '3px solid #293040',
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                        })
                      }} 
                    >
                      <div className="d-flex align-items-center">
                        <Star1 size="16" className="me-2" />
                        Reviews
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {activeTab === 'posts' ? (
                  <div>
                    {provider.posts && provider.posts.length > 0 ? (
                      <div className="posts-container" style={{ 
                        maxHeight: "600px", 
                        overflowY: "auto",
                        paddingRight: "8px",
                        position: "relative" 
                      }}>
                        {provider.posts.slice(0, 2).map((post: Post) => (
                          <div key={post.id} className="card mb-3 border-0 shadow-sm">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex align-items-center">
                                  <img 
                                    src={provider.profile_image_url || logo} 
                                    alt={`${provider.first_name} ${provider.last_name}`}
                                    className="rounded-circle me-2"
                                    style={{ 
                                      width: "40px", 
                                      height: "40px", 
                                      objectFit: "cover",
                                      backgroundColor: !provider.profile_image_url ? '#eee' : 'transparent'
                                    }}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = logo;
                                      target.style.objectFit = 'contain';
                                      target.alt = 'Placeholder image';
                                    }}
                                  />
                                  <div>
                                    <div className="d-flex align-items-center">
                                      <span className="fw-bold me-2">{provider.first_name} {provider.last_name} | SP</span>
                                    
                                    </div>
                                    {provider.provider_location && post.post_type !== 'Service Request' && (
                                      <div className="text-muted small">{provider.provider_location} • {formatDate(post.created_at)}</div>
                                    )}
                                    {post.post_type === 'Service Request' && (
                                      <div className="text-muted small">{formatDate(post.created_at)}</div>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <button className="btn btn-link text-dark p-0" onClick={handleButtonClick}>
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </button>
                                </div>
                              </div>
                              
                              <hr style={{ margin: "0.5rem 0 1rem 0" }} />
                              
                              <p className="card-text mb-3">{post.caption}</p>
                              {post.image_url ? (
                                <div className="position-relative" style={{ 
                                  width: "100%",
                                  height: "400px",
                                  overflow: "hidden",
                                  borderRadius: "16px",
                                  marginBottom: "1rem",
                                  backgroundColor: "#f8f9fa"
                                }}>
                                  <img 
                                    src={post.image_url}
                                    alt="Post image"
                                    style={{ 
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover"
                                    }}
                                  />
                                </div>
                              ) : null}
                              
                              {post.post_type === 'Service Request' && (
                                <hr style={{ margin: "1rem 0 0.5rem 0" }} />
                              )}
                              
                              <div className="d-flex justify-content-between align-items-center mb-2" style={{ width: "100%" }}>
                                {post.post_type === 'Service Request' ? (
      
                                  <div className="d-flex justify-content-between w-100">
                                    <button className="btn p-0" onClick={handleButtonClick}>
                                      <Heart size="20" color="#293040" />
                                    </button>
                                    <button className="btn p-0" onClick={handleButtonClick}>
                                      <Messages2 size="20" color="#293040" />
                                    </button>


                                    <button className="btn p-0" onClick={() => handleReferClick(post)}>
                                      <TagUser size="20" color="#293040" />
                                    </button>
                                        
                                    <button className="btn p-0" onClick={handleButtonClick}>
                                      <Like1 size="20" color="#293040" />
                                    </button>
                        
                                  </div>
                                ) : (
                                
                                  <div className="d-flex justify-content-between w-100">
                                    <button className="btn p-0" onClick={handleButtonClick}>
                                      <Heart size="20" color="#293040" />
                                    </button>
                                    <button className="btn p-100 ml-auto" onClick={handleButtonClick}>
                                      <Messages2 size="20" color="#293040" />
                                    </button>
                                    <div></div>
                                  </div>
                                )}
                              </div>
                              
                          
                              <div className={`w-100 ${post.post_type !== 'Service Request' ? 'border-top' : ''} pt-2 mt-2`}>
                                {post.post_type === 'Service Request' ? (
                            
                                  <div className="d-flex justify-content-between w-100">
                                    <div className="text-start" style={{width: '70%'}}>
                                      <span className="text-muted small">
                                        {post.likes_count || 0} Likes • {post.comments_count || 0} Comments
                                      </span>
                                    </div>
                                    <span className="text-muted small">
                                      Request: {post.status || 'Open'}
                                    </span>
                                  </div>
                                ) : (
                            
                                  <div className="text-center">
                                    <span className="text-muted small">
                                      {post.likes_count || 0} Likes • {post.comments_count || 0} Comments
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {provider.posts.length > 2 && (
                          <div className="text-center mt-3 mb-2">
                            <button className="start-now-btn" onClick={handleButtonClick}>
                              View More Posts ({provider.posts.length - 2} more)
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="empty-state-container">
                        <img 
                          src={placeholderPost} 
                          alt="No posts available" 
                          className="empty-state-image"
                        />
                        <p className="empty-state-text">No posts available yet</p>
                      </div>
                    )}
                  </div>
                ) : activeTab === 'gallery' ? (
                  <div>
                    {provider.gallery && provider.gallery.length > 0 ? (
                      <div className="gallery-container" style={{ 
                        maxHeight: "600px", 
                        overflowY: "auto",
                        paddingRight: "8px",
                        position: "relative" 
                      }}>
                        <div className="tile-grid">
                          {provider.gallery.slice(0, 6).map((item: GalleryItem) => (
                            <div key={item.id} className="tile-grid-item">
                              <img 
                                src={item.image_url || logo} 
                                alt={item.caption || "Gallery image"}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = logo;
                                  target.style.objectFit = 'contain';
                                  target.alt = 'Placeholder image';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        
                        {provider.gallery.length > 6 && (
                          <div className="text-center mt-4">
                            <button className="start-now-btn" onClick={handleButtonClick}>
                              View More Photos ({provider.gallery.length - 6} more)
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="empty-state-container">
                        <img 
                          src={placeholderGallery} 
                          alt="No gallery items available" 
                          className="empty-state-image"
                        />
                        <p className="empty-state-text">No gallery items available yet</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {provider.reviews && provider.reviews.length > 0 ? (
                      <div className="reviews-container" style={{ 
                        maxHeight: "600px", 
                        overflowY: "auto",
                        paddingRight: "8px",
                        position: "relative" 
                      }}>
                        {provider.reviews.slice(0, 2).map((review, index) => (
                          <div key={review.id || index} className="card mb-3 shadow-sm border-0">
                            <div className="card-body">
                              <div className="d-flex justify-content-between mb-2">
                                <div className="fw-bold">
                                  {review.client?.first_name} {review.client?.last_name || review.reviewer_name}
                                </div>
                                <div>{renderRating(review.rating || 0)}</div>
                              </div>
                              <div className="text-muted small mb-2">
                                {review.created_at ? formatDate(review.created_at) : 'Date not available'}
                              </div>
                              <p className="card-text">{review.comment}</p>
                            </div>
                          </div>
                        ))}
                        
                        {provider.reviews.length > 2 && (
                          <div className="text-center mt-4">
                            <button className="start-now-btn" onClick={handleButtonClick}>
                              View More Reviews ({provider.reviews.length - 2} more)
                            </button>
                            <div className="text-muted small mt-2">Sign up to read all reviews</div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="empty-state-container">
                        <img 
                          src={placeholderReview} 
                          alt="No reviews available" 
                          className="empty-state-image"
                        />
                        <p className="empty-state-text">No Reviews Available</p>
                        <p className="empty-state-text" style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>Be the first to leave a review for this provider</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer style={{
        backgroundColor: "white",
        borderTop: "1px solid #dee2e6",
        padding: "1.5rem 0",
        flex: "0 0 auto",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.03)"
      }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex align-items-center mb-3">
                <img src={logo} alt="Serviify Logo" width="32" height="32" className="me-2" />
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#293040" }}>Serviify</span>
              </div>
              <p className="text-muted small mb-0">Connecting professionals with those who need their services.</p>
              <p className="text-muted small"> {new Date().getFullYear()} Serviify. All rights reserved.</p>
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div className="col-sm-4 mb-3 mb-sm-0">
                  <h6 className="mb-3 text-dark">Company</h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><a href="/about" className="text-decoration-none small" style={{ color: "#566074" }}>About Us</a></li>
                    <li className="mb-2"><a href="/careers" className="text-decoration-none small" style={{ color: "#566074" }}>Careers</a></li>
                    <li><a href="/press" className="text-decoration-none small" style={{ color: "#566074" }}>Press</a></li>
                  </ul>
                </div>
                <div className="col-sm-4 mb-3 mb-sm-0">
                  <h6 className="mb-3 text-dark">Legal</h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><a href="/privacy-policy" className="text-decoration-none small" style={{ color: "#566074" }}>Privacy Policy</a></li>
                    <li className="mb-2"><a href="/terms-of-service" className="text-decoration-none small" style={{ color: "#566074" }}>Terms of Service</a></li>
                    <li><a href="/cookie-policy" className="text-decoration-none small" style={{ color: "#566074" }}>Cookie Policy</a></li>
                  </ul>
                </div>
                <div className="col-sm-4">
                  <h6 className="mb-3 text-dark">Support</h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><a href="/help-centre" className="text-decoration-none small" style={{ color: "#566074" }}>Help Centre</a></li>
                    <li className="mb-2"><a href="/support" className="text-decoration-none small" style={{ color: "#566074" }}>Contact Support</a></li>
                    <li><a href="/faq" className="text-decoration-none small" style={{ color: "#566074" }}>FAQ</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}