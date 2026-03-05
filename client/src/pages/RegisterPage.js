import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 50,
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    street: '',
    city: '',
    postalCode: '',
    dietaryRestrictions: '',
    agreeToTerms: false,
  });

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    setMessage('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setMessage('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setMessage('Last name is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setMessage('Valid email is required');
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setMessage('Valid phone number is required');
      return false;
    }
    if (formData.password.length < 8) {
      setMessage('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return false;
    }
    if (!formData.street.trim() || !formData.city.trim() || !formData.postalCode.trim()) {
      setMessage('Complete address is required');
      return false;
    }
    if (!formData.agreeToTerms) {
      setMessage('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      // Simulate API call - replace with actual backend URL
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Registration data:', formData);
      setMessage('Registration successful! Redirecting...');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        gender: 50,
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        street: '',
        city: '',
        postalCode: '',
        dietaryRestrictions: '',
        agreeToTerms: false,
      });

      // Redirect to login or home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('Error during registration: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthText = () => {
    if (formData.password.length === 0) return '';
    const texts = ['Very Weak', 'Weak', 'Good', 'Strong', 'Very Strong'];
    return texts[passwordStrength];
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c', '#2d8659'];
    return colors[passwordStrength];
  };

  return (
    <div className="register-page">
      {/* Navigation */}
      <nav className="register-navbar">
        <div className="register-nav-container">
          <div className="register-nav-brand">
            <span className="register-nav-title">S2UGAR</span>
          </div>
          <div className="register-nav-links">
            <a href="/" className="register-nav-link">Home</a>
            <a href="/admin" className="register-nav-link">Admin</a>
          </div>
        </div>
      </nav>

      {/* Register Container */}
      <div className="register-container">
        <div className="register-form-wrapper">
          <div className="register-header">
            <h1>Create Your Account</h1>
            
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Personal Information */}
            <div className="register-section">
              <h2 className="register-section-title">Personal Information</h2>
              
              <div className="register-form-row">
                <div className="register-form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="register-form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="register-form-group">
                <label htmlFor="gender">Gender</label>
                <div className="gender-slider-container">
                  <span className="gender-label female-label">Female</span>
                  <input
                    type="range"
                    id="gender"
                    name="gender"
                    min="0"
                    max="100"
                    value={formData.gender}
                    onChange={handleChange}
                    className="gender-slider"
                  />
                  <span className="gender-label male-label">Male</span>
                </div>
                <div className="gender-slider-display">
                  {formData.gender === 0 ? (
                    <span>100% Female</span>
                  ) : formData.gender === 100 ? (
                    <span>100% Male</span>
                  ) : (
                    <span>{100 - formData.gender}% Female / {formData.gender}% Male</span>
                  )}
                </div>
              </div>

              <div className="register-form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="register-section">
              <h2 className="register-section-title">Delivery Address</h2>
              
              <div className="register-form-group">
                <label htmlFor="street">Street Address *</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="123 Main Street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-row">
                <div className="register-form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="register-form-group">
                  <label htmlFor="postalCode">Postal Code *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password & Preferences */}
            <div className="register-section">
              <h2 className="register-section-title">Security & Preferences</h2>
              
              <div className="register-form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="password-strength-bar">
                      <div
                        className="password-strength-fill"
                        style={{
                          width: `${(passwordStrength / 4) * 100}%`,
                          backgroundColor: getPasswordStrengthColor(),
                        }}
                      ></div>
                    </div>
                    <span className="password-strength-text" style={{ color: getPasswordStrengthColor() }}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                )}
              </div>

              <div className="register-form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <span className="password-mismatch">Passwords do not match</span>
                )}
              </div>

              <div className="register-form-group">
                <label htmlFor="dietaryRestrictions">Dietary Restrictions / Allergies</label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  placeholder="Let us know about any allergies or dietary preferences (e.g., gluten-free, vegan)"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="register-section">
              <div className="register-checkbox-group">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="agreeToTerms" className="checkbox-label">
                  I agree to the Terms and Conditions and Privacy Policy *
                </label>
              </div>
            </div>

            {/* Messages */}
            {message && (
              <div className={`register-message ${message.includes('successful') ? 'success' : message.includes('Error') ? 'error' : 'info'}`}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="register-submit-btn"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Login Link */}
            <div className="register-footer">
              <p>Already have an account? <a href="#login" className="login-link">Login here</a></p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="register-footer-section">
        <div className="register-footer-content">
          <p>&copy; 2025 S2UGAR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
