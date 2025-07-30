import "../styles/Login.css";
import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías llamar a una API de login o realizar validaciones
        if (formData.username === 'admin' && formData.password === '1234') {
            setMessage('Login exitoso ✅');
        } else {
            setMessage('Credenciales incorrectas ❌');
        }
    };
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
}

export default Login;