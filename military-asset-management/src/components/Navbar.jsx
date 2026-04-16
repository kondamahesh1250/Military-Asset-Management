import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="nav-main-container">
      <h2 className="nav-logo-text">Military Assets</h2>

      <div className="nav-links-section">
        {token && (
          <>
            <Link to="/dashboard" className="nav-link-item">
              Dashboard
            </Link>

            {(role === "ADMIN" || role === "LOGISTICS") && (
              <Link to="/purchases" className="nav-link-item">
                Purchases
              </Link>
            )}

            {(role === "ADMIN" || role === "COMMANDER") && (
              <Link to="/transfers" className="nav-link-item">
                Transfers
              </Link>
            )}

            {role === "COMMANDER" && (
              <Link to="/assignments" className="nav-link-item">
                Assignments
              </Link>
            )}
          </>
        )}
      </div>

      <div className="nav-right-section">
        {token ? (
          <>
            <span className="nav-role-badge">{role}</span>
            <button onClick={logout} className="nav-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/" className="nav-link-item">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}