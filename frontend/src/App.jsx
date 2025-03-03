/** @format */
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Header from "./components/Header.jsx";
import Directory from "./components/Directory.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [showSignup, setShowSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/auth/me", {
                credentials: "include",
            });
            if (!response.ok) throw new Error("Not authenticated");
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/me", {
                credentials: "include",
            });
            const data = await response.json();
            console.log("User data:", data);
            alert(`Welcome, ${data.full_name || data.username}!`);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDB = async () => {
        try {
            const response = await fetch("/api/alumni", {
                credentials: "include",
            });
            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error("Error fetching DB:", error);
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
                    <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                    {isAuthenticated ? (
                        <div>
                            <Directory 
                                onFetchUser={fetchUserData} 
                                onFetchDB={fetchDB} 
                            />
                            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
                        </div>
                    ) : (
                        <div>
                            {showSignup ? (
                                <Signup
                                    onSuccess={() => setIsAuthenticated(true)}
                                    onToggleSignup={() => setShowSignup(false)}
                                />
                            ) : (
                                <Login
                                    onSuccess={() => setIsAuthenticated(true)}
                                    onToggleSignup={() => setShowSignup(true)}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
export default App;