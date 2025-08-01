import "./styles/App.css";
import React, { useState } from "react";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Welcome from "./components/welcome";
import Login from "./components/Login";
import Auto from "./components/Auto";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // aquí guardarás los datos del usuario logueado


  const [currentPage, setCurrentPage] = useState("welcome");
  function renderPage() {
    if (currentPage === "login" && isAuthenticated) {
      setCurrentPage("profile");
    }
    switch (currentPage) {
      case "welcome":
        return <Welcome />;
      case "login":
        return <Login
          setIsAuthenticated={setIsAuthenticated}
          setUserProfile={setUserProfile}
          setCurrentPage={setCurrentPage}
        />;
      case "profile":
        return <Profile user={userProfile} />
      case "auto":
        return <Auto user={userProfile} />;
      default:
        return null;
    }
  }
  
  return (
    <div className="auto-page-wrapper">
      <Header
        isAuthenticated={isAuthenticated}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setIsAuthenticated={setIsAuthenticated}
        setUserProfile={setUserProfile}
      />
      <main className="auto-main-content">{renderPage()}</main>
    </div>
  );
}

export default App;
