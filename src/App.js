import "./styles/App.css";
import React, { useState } from "react";
import api from "./api/apiService";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Welcome from "./components/welcome";
import Login from "./components/Login";

function App() {
  const [result, setResult] = useState(null);
  const [userId, setUserId] = useState("");
  const [placa, setPlaca] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // aquí guardarás los datos del usuario logueado


  const [currentPage, setCurrentPage] = useState("welcome");
  function renderPage() {
    if (isAuthenticated) {
      switch (currentPage) {
        case "welcome":
          return <Welcome />;
        case "profile":
          return <Profile user={userProfile} />
        default:
          return null;
      }
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
      default:
        return null;
    }
  }

  const fetchData = async (type) => {
    let data;
    try {
      switch (type) {
        case "users":
          data = await api.fetchUsers();
          break;
        case "userById":
          if (!userId) return alert("Ingresa un ID de usuario");
          data = await api.fetchUserById(userId);
          break;
        case "userAutos":
          if (!userId) return alert("Ingresa un ID de usuario");
          data = await api.fetchUserAutos(userId);
          break;
        case "autos":
          data = await api.fetchAutos();
          break;
        case "autoByPlaca":
          if (!placa) return alert("Ingresa una placa");
          data = await api.fetchAutoByPlaca(placa);
          break;
        default:
          data = {};
      }
      setResult(data);
    } catch (error) {
      setResult({ error: "Error al conectarse a la API" });
    }
  };
  return (
    <div className="auto-page-wrapper">
      <Header
        isAuthenticated={isAuthenticated}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="auto-main-content">{renderPage()}</main>
    </div>
  );
}

export default App;
