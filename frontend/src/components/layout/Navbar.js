import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar({ toggleSidebar, setIsAuthenticated }) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    history.push('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="navbar-brand">CDN System</h1>
      </div>
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 