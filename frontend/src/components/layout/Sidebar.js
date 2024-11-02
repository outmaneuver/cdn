import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Sidebar.css';

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <NavLink exact to="/" className="sidebar-item" activeClassName="active">
          <i className="fas fa-home"></i>
          Dashboard
        </NavLink>
        <NavLink to="/upload" className="sidebar-item" activeClassName="active">
          <i className="fas fa-upload"></i>
          Upload
        </NavLink>
        <NavLink to="/settings" className="sidebar-item" activeClassName="active">
          <i className="fas fa-cog"></i>
          Settings
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar; 