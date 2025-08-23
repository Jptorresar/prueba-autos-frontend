import "../styles/Formularios.css";
import { useState } from 'react';
import api from "../api/apiService";
import {  LogIn } from 'lucide-react';
import { useNavigate  } from "react-router-dom";

const Login = (props) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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
            navigate("/profile")

        } catch (error) {
            console.error('Error en el login:', error);
            setMessage('Error al conectar con el servidor ❌');
        }
    }
    return (
        <div className="auth-page auth-page-blue">
            <div className="auth-container">
                <div className="auth-header">
                    <LogIn className="auth-icon" />
                    <h2 className="auth-title">Iniciar Sesión</h2>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Nombre de usuario</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Nombre de Usuario"
                            value={formData.username}
                            onChange={handleChange}
                            name="username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Contraseña</label>
                        <input
                            className="form-input"
                            type="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            required
                        />
                    </div>
                    <button className="btn btn-primary btn-full" type="submit" >Iniciar Sesión</button>
                </form>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};

export default Login;