import "../styles/Login.css";
import React, { useState } from 'react';

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
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const user = data.user; // <- asegúrate que el backend te mande esto también

                // Guarda el token en localStorage (o donde prefieras)
                localStorage.setItem('token', token);

                setMessage('Login exitoso ✅');
                // Puedes redirigir o cambiar de vista aquí si quieres
                // Actualizar estado global
                props.setIsAuthenticated(true);
                props.setUserProfile(user);
                props.setCurrentPage("welcome");
            } else {
                const errorText = await response.text();
                setMessage('Credenciales incorrectas ❌ (' + errorText + ')');
            }
        } catch (error) {
            console.error('Error en el login:', error);
            setMessage('Error al conectar con el servidor ❌');
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