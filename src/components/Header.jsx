import "../styles/header.css";

function Header(props) {

  const pages = props.isAuthenticated
    ? ['welcome', 'profile','auto'] // Si está autenticado
    : ['welcome', 'login'];  // Si NO está autenticado
  
    const handleLogout = () => {
    localStorage.removeItem("token");
    props.setIsAuthenticated(false);
    props.setUserProfile(null);
    props.setCurrentPage("login");
  };
  return (
    <div className="auto-page-wrapper">
      <header className="auto-header">
        <div className="auto-header-content">
          <div className="auto-header-logo">Auto Gestion</div>
          <nav className="auto-navigation">
          {pages.map((page) => (
              <button 
                key={page}
                className={`auto-nav-button ${
                  props.currentPage === page ? 'auto-nav-active' : 'auto-nav-inactive'
                }`}
                onClick={() => props.setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            {props.isAuthenticated && (
              <button className="logout-button" onClick={handleLogout} title="Cerrar sesión">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 1a1 1 0 0 0-1 1v3h1V2h7v12H6v-3H5v3a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"/>
                  <path d="M.146 8.354a.5.5 0 0 1 0-.708L3.5 4.293a.5.5 0 1 1 .707.707L1.707 8l2.5 3a.5.5 0 0 1-.707.707L.146 8.354z"/>
                  <path d="M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8z"/>
                </svg>
              </button>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;