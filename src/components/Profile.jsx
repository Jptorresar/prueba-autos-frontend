import "../styles/Profile.css";
import React from "react";

function Profile({ user }) {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Perfil del Usuario</h2>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nombre:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

export default Profile;
