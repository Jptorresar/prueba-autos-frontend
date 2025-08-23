import "../styles/Profile.css";
import React from "react";
import { User } from 'lucide-react';
import "../styles/Formularios.css";

function Profile({ user }) {
  return (
    <div className="profile-page">
    <div className="profile-container">
      <div className="page-header">
        <h2 className="page-title">Mi Perfil</h2>
        <p className="page-subtitle">Información de tu cuenta</p>
      </div>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User className="profile-icon" />
          </div>
          <div className="profile-info">
            <h3 className="profile-name">{user.username}</h3>
            <p className="profile-role">Usuario registrado</p>
          </div>
        </div>
        
        <div className="profile-grid">
          <div className="profile-field">
            <label className="profile-label">ID</label>
            <div className="profile-value">{user.id}</div>
          </div>
          <div className="profile-field">
            <label className="profile-label">Nombre Completo</label>
            <div className="profile-value">{user.username}</div>
          </div>
          <div className="profile-field">
            <label className="profile-label">Email</label>
            <div className="profile-value">{user.email}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
