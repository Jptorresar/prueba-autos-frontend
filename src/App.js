import React, {useState} from "react";
import api from "./api/apiService";
import JsonViewer from "./components/JsonView";

function App() {
  const [result, setResult] = useState(null);
  const [userId, setUserId] = useState("");
  const [placa, setPlaca] = useState("");

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
    <div style={{ padding: "2em", fontFamily: "sans-serif" }}>
      <h1>Conexión a API</h1>

      <div style={{ marginBottom: "1em" }}>
        <button onClick={() => fetchData("users")}>Obtener todos los usuarios</button>
      </div>

      <div style={{ marginBottom: "1em" }}>
        <input
          type="number"
          placeholder="ID de usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: "0.5em" }}
        />
        <button onClick={() => fetchData("userById")}>Obtener usuario por ID</button>
      </div>

      <div style={{ marginBottom: "1em" }}>
        <input
          type="number"
          placeholder="ID de usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: "0.5em" }}
        />
        <button onClick={() => fetchData("userAutos")}>Obtener autos del usuario</button>
      </div>

      <div style={{ marginBottom: "1em" }}>
        <button onClick={() => fetchData("autos")}>Obtener todos los autos</button>
      </div>

      <div style={{ marginBottom: "1em" }}>
        <input
          type="text"
          placeholder="Placa del auto"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          style={{ marginRight: "0.5em" }}
        />
        <button onClick={() => fetchData("autoByPlaca")}>Obtener auto por placa</button>
      </div>

      {result && <JsonViewer data={result} />}
    </div>
  );
}

export default App;
