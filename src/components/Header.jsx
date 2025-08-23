import "../styles/header.css";
import { NavLink } from "react-router-dom";
import { Car, LogOut } from 'lucide-react';

function Header(props) {

  //const navigate = useNavigate();
  const pages = props.isAuthenticated
    ? [// Si está autenticado
      { path: "/profile", label: "profile" },
      { path: "/auto", label: "auto" }
    ]
    : [ // Si NO está autenticado
      { path: "/", label: "welcome" },
      { path: "/login", label: "login" },
      { path: "/register", label: "register" }
    ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setIsAuthenticated(false);
    props.setUserProfile(null);
  };
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-brand">
          <Car className="header-logo" />
          <div className="header-brand-text">
            <h1 className="header-title">AutoManager</h1>
            <p className="header-subtitle">Sistema de Gestión de Automóviles</p>
          </div>
        </div>

        <nav className="header-nav">
          <div className="nav-menu">
            <nav className="auto-navigation">
              {pages.map((page) => (
                <NavLink
                  key={page.path}
                  to={page.path}
                  className={({ isActive }) =>
                    `auto-nav-button ${isActive ? "auto-nav-active" : "auto-nav-inactive"
                    }`}
                >
                  {page.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="header-user">
            <div className="user-info">
              <span className="user-name">{props.isAuthenticated ? props.user.username : ""}</span>
              <span className="user-email">{props.isAuthenticated ? props.user.email : ""}</span>
            </div>
            {props.isAuthenticated && (
              <button onClick={handleLogout} className="logout-button">
                <LogOut className="logout-icon" />
                <span className="logout-text">Salir</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;