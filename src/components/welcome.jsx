import "../styles/Welcome.css";

function welcome() {
  return (
    <div className="auto-welcome-container">
      <h1 className="auto-main-title">Aplicación de gestion de autos</h1>
      <p className="auto-subtitle">
        Hola aqui puedes gestionar tus autos, 
        ver los detalles de cada uno y realizar acciones como agregar, 
        editar o eliminar autos.
      </p>
    </div>
  );
}

export default welcome;
