import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import Header from './components/header.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [response, setResponse] = useState(null)
  const [showSignup, setShowSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Not authenticated');
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        });
      const data = await response.json();
      console.log('User data:', data);
      alert(`Welcome, ${data.full_name || data.username}!`);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDB = async () => {
    try{
    const response = await fetch('/api/alumni', {
      credentials: 'include',
    });
    const data = await response.json();
    setResponse(data);
    } catch (error) {
      console.error('Error fetching DB:', error);
    } finally {
      setIsLoading(false);
    }
  };

return (
  <>
    {isAuthLoading ? (
      <div>Loading...</div>
    ) : (
    <div>
      <h1>Alumni Website</h1>
      {isAuthenticated ? (
        <div>
          <p>Logged in!</p>
          <button onClick={handleLogout}>Logout</button>
          <button 
            onClick={fetchUserData}
            disabled={isLoading}
          >
          {isLoading ? 'Loading...' : 'Fetch My Profile'}
          </button>
          <button 
            onClick={fetchDB}
            disabled={isLoading}
          >
          {isLoading ? 'Loading...' : 'Fetch DB'}
          </button>
          {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
      ) : (
        <div>
          {showSignup ? (
            <Signup onSuccess={() => setIsAuthenticated(true)} />
          ) : (
            <Login onSuccess={() => setIsAuthenticated(true)} />
          )}
          <button onClick={() => setShowSignup(!showSignup)}>
            {showSignup ? 'Have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      )}
    </div>
  )}
  </>
);
}
export default App;
