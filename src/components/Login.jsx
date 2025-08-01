import "../styles/Login.css";
import { useState } from 'react';
import api from "../api/apiService";

const Login = (props) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
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
    }
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="login-input"
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="login-submit" type="submit" >Entrar</button>
                </form>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};

export default Login;