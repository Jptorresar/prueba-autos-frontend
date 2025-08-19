import { useState } from "react";
import "../styles/User.css"

const User = ( props ) => {
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
  return  (
    <div className="user-container">
            <div className="user-card">
                <h2 className="user-title">Crear Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="user-input"
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="user-input"
                        type="text"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="user-input"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="user-submit" type="submit" >Entrar</button>
                </form>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
  );
}