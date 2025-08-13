import "./styles/App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Profile from "./components/Profile";
import Header from "./components/Header";
import Welcome from "./components/welcome";
import Login from "./components/Login";
import Auto from "./components/Auto";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  return (
    <Router>
      <div className="auto-page-wrapper">
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          setUserProfile={setUserProfile}
        />
        <main className="auto-main-content">
          <Routes>
            <Route path="/" element={<Welcome />} />
             <Route
              path="/login"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setUserProfile={setUserProfile}
                />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile user={userProfile} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/auto"
              element={
                isAuthenticated ? (
                  <Auto user={userProfile} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
