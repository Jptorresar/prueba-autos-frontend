import { useState } from "react";
import "../styles/User.css"
import api from "../api/apiService";
import { UserPlus } from 'lucide-react';
import "../styles/Formularios.css";

const User = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      await api.createUser(formData)
      const data = await api.login(formData)
      const token = data.token;
      const user = data.user;

      // Guarda el token en localStorage
      localStorage.setItem('token', token);
      setMessage('Login exitoso ✅');

      // Actualizar estado global
      props.setIsAuthenticated(true);
      props.setUserProfile(user);
      props.setCurrentPage("profile");

    } catch (error) {
      console.error('Error en el login:', error);
      setMessage('Error al conectar con el servidor ❌');
    }
  };
  return (
    <div className="auth-page auth-page-green">
      <div className="auth-container">
        <div className="auth-header">
        <UserPlus className="auth-icon auth-icon-green" />
        <h2 className="auth-title">Crear Cuenta</h2>
      </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Nombre de Usuario</label>
            <input
            className="form-input form-input-green"
            type="text"
            name="username"
            placeholder="Nombre de Usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
          </div>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input
            className="form-input form-input-green"
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </div>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input
            className="form-input form-input-green"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          </div>
          <button className="btn btn-success btn-full" type="submit" >Crear Cuenta</button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default User;