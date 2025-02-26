// App.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Header from './components/header.jsx'

function App() {
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null)
  const [showSignup, setShowSignup] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('User data:', data);
      alert(`Welcome, ${data.full_name || data.username}!`);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchDB = async () => {
    const response = await fetch('/api/alumni', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log('DB data:', data);
    setResponse(data);
  };

  return (
    <>
    <div>
      <h1>Alumni Website</h1>
      {token ? (
        <div>
          <p>Logged in!</p>
          <button onClick={fetchUserData}>Fetch My Profile</button>
          <button onClick={fetchDB}>Fetch DB</button>
          {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
      ) : (
        <div>
        {showSignup ? (
          <Signup setToken={setToken} />
        ) : (
          <Login setToken={setToken} />
        )}
        <button onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? 'Have an account? Login' : "Don't have an account? Sign Up"}
        </button>
      </div>
      )}
    </div>
    </>
  );
}

export default App;
