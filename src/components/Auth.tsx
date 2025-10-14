"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import logo from '../assets/logo.png'
import { ApiService } from "../lib/api/apiService"
import { ApiConstants } from "../lib/api/apiConstants"

export default function Auth() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [nameError, setNameError] = useState("")
  const [showApiWarning, setShowApiWarning] = useState(false)

  
  useEffect(() => {
    // Check if coming from sign-in link or has mode=login in the URL
    const params = new URLSearchParams(location.search)
    const mode = params.get('mode')
    if (mode === 'login' || location.state?.isLogin) {
      setIsLogin(true)
    }
  }, [location])

  // Password validation function
  const validatePassword = (password: string): boolean => {
    // minimum length
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return false
    }
    
    // uppercase
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must include at least one uppercase letter")
      return false
    }
    
    // for lowercase
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must include at least one lowercase letter")
      return false
    }
    
    // for numbers
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must include at least one number")
      return false
    }
    
    // for special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must include at least one special character")
      return false
    }
    
    setPasswordError("")
    return true
  }

  // Name validation function
  const validateName = (name: string, fieldName: string): boolean => {
    if (!name.trim()) {
      setNameError(`${fieldName} is required`)
      return false
    }
    
    // Check if name starts with a capital letter
    if (!/^[A-Z]/.test(name)) {
      setNameError(`${fieldName} should start with a capital letter`)
      return false
    }

    setNameError("")
    return true
  }

  // Phone validation function
  const validatePhoneNumber = (phone: string): boolean => {
    // Only allow digits
    if (!/^\d+$/.test(phone)) {
      setPhoneError("Phone number should contain only digits")
      return false
    }

    // Check length (adjust for your country's phone number format)
    if (phone.length < 10 || phone.length > 15) {
      setPhoneError("Phone number should be between 10-15 digits")
      return false
    }

    setPhoneError("")
    return true
  }

  // Form validation function
  const validateForm = (): boolean => {
    const isPasswordValid = validatePassword(password)
    const isFirstNameValid = validateName(firstName, "First name")
    const isLastNameValid = validateName(lastName, "Last name")
    const isPhoneValid = validatePhoneNumber(phone)

    return isPasswordValid && isFirstNameValid && isLastNameValid && isPhoneValid
  }

  // Define a proper interface for API errors
  interface ApiError {
    status?: number;
    message?: string;
    code?: string;
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to /app for signup - use window.location for full page navigation
    window.location.href = "/app"
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to /app for login - use window.location for full page navigation
    window.location.href = "/app"
  }

  const handleGoogleSignIn = () => {
    // Redirect to /app for Google sign-in - use window.location for full page navigation
    window.location.href = "/app"
  }

  const handleAppleSignIn = () => {
    // Redirect to /app for Apple sign-in - use window.location for full page navigation
    window.location.href = "/app"
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 position-relative">
      <div className="position-absolute top-0 end-0 p-4">
        <Link to="/" className="text-decoration-none" style={{ color: "#293040" }}>Home</Link>
      </div>
      <div className="card shadow border-0 mx-auto" style={{ maxWidth: "450px" }}>
        <div className="card-header bg-white border-0 text-center position-relative">
          <div className="d-flex justify-content-center mb-4">
            <img src={logo} alt="Serviify Logo" style={{ height: "60px" }} />
          </div>

          <h2 className="card-title fs-3 fw-bold">{isLogin ? "Log in to your account" : "Create an account"}</h2>

          <p className="text-muted">
            {isLogin ? "Welcome back! Please enter your details" : "Fill in your details to get started"}
          </p>
        </div>

        <div className="card-body pt-3">
          {!isLogin ? (
            // Signup form
            <form onSubmit={handleSignup} className="mb-3">
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                      if (nameError) validateName(e.target.value, "First name")
                    }}
                    onBlur={(e) => validateName(e.target.value, "First name")}
                    className={`form-control py-2 ${nameError && nameError.includes("First name") ? "is-invalid" : ""}`}
                  />
                  {nameError && nameError.includes("First name") && (
                    <div className="invalid-feedback">{nameError}</div>
                  )}
                </div>
                <div className="col-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                      if (nameError) validateName(e.target.value, "Last name")
                    }}
                    onBlur={(e) => validateName(e.target.value, "Last name")}
                    className={`form-control py-2 ${nameError && nameError.includes("Last name") ? "is-invalid" : ""}`}
                  />
                  {nameError && nameError.includes("Last name") && (
                    <div className="invalid-feedback">{nameError}</div>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (phoneError) validatePhoneNumber(e.target.value)
                  }}
                  onBlur={(e) => validatePhoneNumber(e.target.value)}
                  className={`form-control py-2 ${phoneError ? "is-invalid" : ""}`}
                />
                {phoneError ? (
                  <div className="invalid-feedback">{phoneError}</div>
                ) : (
                  <small className="text-muted d-block mt-1">
                    Enter a valid phone number containing only digits (e.g., 0777777777)
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control py-2"
                />
                <small className="text-muted d-block mt-1">
                  Each account requires a unique email address
                </small>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    validatePassword(e.target.value)
                  }}
                  className={`form-control py-2 ${passwordError ? "is-invalid" : ""}`}
                />
                {passwordError ? (
                  <div className="invalid-feedback">{passwordError}</div>
                ) : (
                  <small className="text-muted d-block mt-1">
                    Password should include uppercase, lowercase, numbers, and special characters
                  </small>
                )}
              </div>

              <button type="submit" className="btn w-100 py-2 mb-3" style={{ backgroundColor: "#293040", color: "white" }}>
                Create account
              </button>
            </form>
          ) : (
            // Login form
            <>
              <form onSubmit={handleLogin} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    id="loginEmail"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control py-2"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <input
                    id="loginPassword"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control py-2"
                  />
                  <div className="d-flex justify-content-end mt-2">
                    <Link to="/forgot-password" className="text-primary text-decoration-none small" target="_blank" rel="noopener noreferrer">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button type="submit" className="btn w-100 py-2 mb-3" style={{ backgroundColor: "#293040", color: "white" }}>
                  Log in
                </button>
              </form>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-3 text-muted">or continue with</span>
                  <hr className="flex-grow-1" />
                </div>
                
                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleGoogleSignIn}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                    </svg>
                    <span className="text-muted">Google</span>
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleAppleSignIn}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-apple" viewBox="0 0 16 16">
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                    </svg>
                    <span className="text-muted">Apple</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="text-center mb-3">
            <p className="mb-0">
              {isLogin ? (
                <>Don't have an account? <button onClick={() => setIsLogin(false)} className="btn btn-link p-0 text-primary text-decoration-none">Sign up</button></>
              ) : (
                <>Already have an account? <button onClick={() => setIsLogin(true)} className="btn btn-link p-0 text-primary text-decoration-none">Log in</button></>
              )}
            </p>
          </div>

          <div className="text-center text-muted" style={{ fontSize: "0.75rem" }}>
            By continuing, you agree to our{" "}
            <Link to="/terms-of-service" className="text-primary text-decoration-none" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="text-primary text-decoration-none" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

