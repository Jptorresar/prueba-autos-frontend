import "../styles/Welcome.css";
import { Car, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <div className="welcome-header">
          <Car className="welcome-icon" />
          <h1 className="welcome-title">AutoManager</h1>
          <p className="welcome-subtitle">Sistema de Gestión de Automóviles</p>
        </div>
        <div className="welcome-buttons">
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary btn-with-icon"
          >
            <LogIn className="icon" />
            Iniciar Sesión
          </button>
          <button
            onClick={() => navigate("/register")}
            className="btn btn-success btn-with-icon"
          >
            <UserPlus className="icon" />
            Crear Cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
