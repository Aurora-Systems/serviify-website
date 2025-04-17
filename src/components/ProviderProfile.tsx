"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Masonry from 'react-masonry-css';
import { 
  ArrowLeft2, 
  Star1, 
  User, 
  HeartAdd, 
  Messages1, 
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
 
  // Breakpoints for Masonry layout
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  useEffect(() => {
    const fetchProviderData = async () => {
      if (!id) {
        setError("Provider ID is missing")
        setIsLoading(false)
        return
      }

      console.log("Fetching provider with ID:", id);
      
      try {
        setIsLoading(true)
        const providerService = ProvidersService.getInstance()
        
        const providerData = await providerService.getProviderById(id)
        console.log("Provider data received:", providerData);
        
        // Log detailed provider data structure to inspect all available fields
        console.log("DETAILED PROVIDER DATA:");
        console.log(JSON.stringify(providerData, null, 2));
        
        if (!providerData) {
          console.error("Provider not found for ID:", id);
          setError("Provider not found")
        } else {
          console.log("Setting provider data:", {
            name: `${providerData.first_name} ${providerData.last_name}`,
            headline: providerData.headline,
            location: providerData.provider_location,
            rating: providerData.service_rating,
            gallery: providerData.gallery?.length,
            posts: providerData.posts?.length,
            bio: providerData.provider_bio?.substring(0, 50) + "..."
          });
          setProvider(providerData)
          
          setIsFollowing(false)
        }
      } catch (err) {
        console.error("Error fetching provider data:", err)
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

  // New function to handle button clicks
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

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
          <Link to="/provider-search" className="start-now-btn">
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
        <Link to="/provider-search" className="start-now-btn mt-3">
          Back to Search
        </Link>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f8f9fa",
      position: isModalOpen ? "relative" : "static"
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
              <Link 
                to="/auth?mode=signup" 
                className="start-now-btn" 
                style={{ 
                  textAlign: "center",
                  padding: "10px 0"
                }}
              >
                Create Account
              </Link>
              <Link 
                to="/auth?mode=login" 
                className="btn" 
                style={{ 
                  borderColor: "#293040",
                  color: "#293040",
                  textAlign: "center" 
                }}
              >
                Log In
              </Link>
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

      <header className="py-3 border-bottom bg-white shadow-sm">
        <div className="container">
          <div className="d-flex align-items-center">
            <Link to="/" className="d-flex align-items-center text-decoration-none me-auto">
              <div className="me-2">
                <img src={logo} alt="Serviify Logo" width="40" height="40" className="rounded" />
              </div>
              <span style={{ fontSize: "26px", fontWeight: 700, color: "#293040", letterSpacing: "-0.5px" }}>
                Serviify
              </span>
            </Link>
            <Link to="/provider-search" className="btn me-3" style={{ 
              borderColor: "#293040", 
              color: "#293040", 
              borderRadius: "8px", 
              padding: "8px 16px",
              fontWeight: 500,
              transition: "all 0.2s ease"
            }}>
              <div className="d-flex align-items-center">
                <ArrowLeft2 size="16" className="me-2" />
                <span>Search</span>
              </div>
            </Link>
            <Link to="/auth?mode=login" className="start-now-btn" style={{
              padding: "8px 20px",
              borderRadius: "8px",
              fontWeight: 500,
              transition: "all 0.2s ease",
              boxShadow: "0 2px 4px rgba(41, 48, 64, 0.1)"
            }}>
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <div className="container mt-4" style={{ flex: "1 0 auto" }}>
        <div className="row">
          {/* Left Sidebar - Vertical Profile Section */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 rounded-3 shadow-sm mb-4" style={{ 
              overflow: "hidden",
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
                <div className="d-flex justify-content-around mb-4 border-top border-bottom py-3" style={{ margin: "0 -20px" }}>
                  <div className="text-center px-2">
                    <div className="fw-bold fs-5">{provider.posts_count || 0}</div>
                    <div className="text-muted small">Posts</div>
                  </div>
                  <div className="text-center px-2">
                    <div className="fw-bold fs-5">{provider.follows_count || 0}</div>
                    <div className="text-muted small">Followers</div>
                  </div>
                  <div className="text-center px-2">
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
                        {provider.provider_skills.map((skill: string, index: number) => (
                          <span key={index} className="skill-tag me-1 mb-1">{skill}</span>
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
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2 mb-3">Analytics</h5>
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}>
                    <Star1 size="20" color="#293040" />
                  </div>
                  <div>
                    <div className="fw-bold">{(provider.service_rating || 0).toFixed(1)}</div>
                    <div className="text-muted small">Rating</div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}>
                    <User size="20" color="#293040" />
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
              overflow: "hidden",
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
                  <Link to="/auth?mode=signup" className="start-now-btn w-100">
                    Join the Network
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content Area */}
          <div className="col-md-8">
            <div className="card border-0 rounded-3 shadow-sm mb-4" style={{ 
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
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
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn me-2" 
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
                            <HeartAdd size="16" className="me-2" />
                          )}
                          <span>{isFollowing ? "Unfollow" : "Follow"}</span>
                        </div>
                      </button>
                      <button 
                        className="btn" 
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
                          <Messages1 size="16" className="me-2" />
                          <span>Contact</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-end">
                    {provider.provider_location && (
                      <div className="d-flex align-items-center justify-content-end">
                        <Location size="16" className="me-1" />
                        <span>{provider.provider_location || "Location not specified"}</span>
                      </div>
                    )}
                  </div>
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
                      <div className="posts-container">
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
                                    <div className="fw-bold">{provider.first_name} {provider.last_name} | SP</div>
                                    {provider.provider_location && (
                                      <div className="text-muted small">{provider.provider_location} • {formatDate(post.created_at)}</div>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <button className="btn btn-link text-dark p-0" onClick={handleButtonClick}>
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </button>
                                </div>
                              </div>
                              <p className="card-text mb-3">{post.caption}</p>
                              {post.image_url ? (
                                <img 
                                  src={post.image_url}
                                  alt="Post image"
                                  className="img-fluid rounded mb-3 w-100"
                                  style={{ 
                                    maxHeight: "400px", 
                                    objectFit: "cover"
                                  }}
                                />
                              ) : null}
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <button className="btn p-0 me-3" onClick={handleButtonClick}>
                                    <i className="bi bi-heart text-danger"></i>
                                  </button>
                                  <span className="text-muted small">{post.likes_count || 0} Likes • {post.comments_count || 0} Comments</span>
                                </div>
                              
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
                      <div className="text-center py-4 d-flex flex-column align-items-center">
                        <img 
                          src={placeholderPost} 
                          alt="No posts available" 
                          style={{ 
                            maxWidth: '150px', 
                            marginBottom: '1rem', 
                            opacity: 0.6 
                          }} 
                        />
                        <p className="text-muted mb-0">No posts available yet</p>
                      </div>
                    )}
                  </div>
                ) : activeTab === 'gallery' ? (
                  <div>
                    {provider.gallery && provider.gallery.length > 0 ? (
                      <>
                        <Masonry
                          breakpointCols={breakpointColumnsObj}
                          className="my-masonry-grid"
                          columnClassName="my-masonry-grid_column"
                        >
                          {provider.gallery.slice(0, 3).map((item: GalleryItem) => (
                            <div key={item.id} className="mb-3">
                              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                                <img 
                                  src={item.image_url || logo} 
                                  className="card-img-top" 
                                  alt={item.caption || "Gallery image"}
                                  style={{ 
                                    height: "160px", 
                                    objectFit: "cover",
                                    backgroundColor: !item.image_url ? '#eee' : 'transparent'
                                  }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = logo;
                                    target.style.objectFit = 'contain';
                                    target.alt = 'Placeholder image';
                                  }}
                                />
                                {item.caption && (
                                  <div className="card-body">
                                    <p className="card-text small">{item.caption}</p>
                                    <p className="card-text"><small className="text-muted">{formatDate(item.created_at)}</small></p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </Masonry>
                        
                        {provider.gallery.length > 3 && (
                          <div className="text-center mt-4">
                            <button className="start-now-btn" onClick={handleButtonClick}>
                              View More Photos ({provider.gallery.length - 3} more)
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-4 d-flex flex-column align-items-center">
                        <img 
                          src={placeholderGallery} 
                          alt="No gallery items available" 
                          style={{ 
                            maxWidth: '150px', 
                            marginBottom: '1rem', 
                            opacity: 0.6 
                          }} 
                        />
                        <p className="text-muted mb-0">No gallery items available yet</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {provider.reviews && provider.reviews.length > 0 ? (
                      <div>
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
                       <div className="text-center py-3 d-flex flex-column align-items-center">
                         <img 
                          src={placeholderReview} 
                          alt="No reviews available" 
                          style={{ 
                            maxWidth: '150px', 
                            marginBottom: '1rem', 
                            opacity: 0.6 
                          }} 
                        />
                        <p className="text-muted mb-0">No Reviews Available</p>
                        <p className="text-muted small mt-1">Be the first to leave a review for this provider</p>
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
              <p className="text-muted small">© {new Date().getFullYear()} Serviify. All rights reserved.</p>
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
  )
}