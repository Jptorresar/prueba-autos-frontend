import "../styles/header.css";

function Header(props) {

  const pages = props.isAuthenticated
    ? ['welcome', 'profile','auto'] // Si está autenticado
    : ['welcome', 'login'];  // Si NO está autenticado
  
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
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;