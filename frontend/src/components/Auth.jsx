import React, { useState } from 'react';

const Auth = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setApiError('');
    setApiSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const standardEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomainRegex = /^[^\s@]+@(gmail\.com|outlook\.com|icloud\.com|yahoo\.com)$/i;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{8,}$/;

    if (isRegister && !formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (isRegister && !allowedDomainRegex.test(formData.email.trim())) {
      newErrors.email = 'Email must end with gmail.com, outlook.com, icloud.com, or yahoo.com.';
    } else if (!isRegister && !standardEmailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (isRegister && !passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include letters, numbers, and special characters.';
    } else if (!isRegister && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setApiSuccess('');

    if (!validate()) return;

    setLoading(true);

    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const endpoint = `${BASE_URL}${isRegister ? '/api/register' : '/api/login'}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Action failed');
      }

      if (isRegister) {
        setApiSuccess('Account created successfully! Please sign in.');
        setIsRegister(false);
        setFormData({ name: '', email: formData.email, password: '' });
      } else {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="brand-header">
        <h1 className="brand-logo">SPY CREATIONS</h1>
        <p className="brand-subtitle">
          {isRegister ? 'Create your new account' : 'Enter your credentials to access your workspace'}
        </p>
      </div>

      {apiError && <div className="alert-banner">{apiError}</div>}
      {apiSuccess && <div className="alert-banner success">{apiSuccess}</div>}

      <form onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'error-border' : ''}`}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'error-border' : ''}`}
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${errors.password ? 'error-border' : ''}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className="field-error">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="auth-toggle-text">
        {isRegister ? (
          <>
            Already have an account?
            <button type="button" className="auth-toggle-btn" onClick={toggleMode}>
              Sign In
            </button>
          </>
        ) : (
          <>
            Don't have an account?
            <button type="button" className="auth-toggle-btn" onClick={toggleMode}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;