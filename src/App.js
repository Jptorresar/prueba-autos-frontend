import "./styles/App.css";
import React, {useState} from "react";
import api from "./api/apiService";
import JsonViewer from "./components/JsonView";
import Header from "./components/Header";
import Welcome from "./components/welcome";
import Login from "./components/Login";

function App() {
  const [result, setResult] = useState(null);
  const [userId, setUserId] = useState("");
  const [placa, setPlaca] = useState("");

  const [currentPage, setCurrentPage] = useState("welcome");
  function renderPage() {
    switch (currentPage) {
      case "welcome":
        return <Welcome />;
        case "login":
        return <Login />;
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
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="auto-main-content">{renderPage()}</main>
    </div>
    );
}

export default App;
