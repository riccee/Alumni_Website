// App.js
import React, { useState } from 'react';
import Login from './Login';

import Header from './components/header.jsx'

function App() {
  const [token, setToken] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/users/me', {
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

  return (
    <>
    <div>
    <Header />
      <h1>Alumni Website</h1>
      {token ? (
        <div>
          <p>Logged in!</p>
          <button onClick={fetchUserData}>Fetch My Profile</button>
        </div>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
    </>
  );
}

export default App;
