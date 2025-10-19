import React, { useState } from 'react';

function LoginPage({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setLoading(true);

    if (!email || !password) {
      setStatusMessage('Error: Please enter both email and password.');
      setLoading(false);
      return;
    }

    const result = await onLogin(email, password);

    if (!result.success) {
      setStatusMessage(`Login Error: ${result.message}`);
    }
    // On success, the App.jsx component will automatically handle the redirect.
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Hasiru Santhe</h1>
          <p>Welcome back! Please login to your account.</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {statusMessage && <p className="status-message error">{statusMessage}</p>}

        <div className="switch-auth">
          <p>Don't have an account? <button onClick={onSwitchToRegister} className="link-button">Register here</button></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

