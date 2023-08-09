import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Navebar.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  useEffect(() => {
    console.log(location);
  },[location])

  return (
    <nav>
      <button className="menu-button" onClick={handleMenuClick}>
        <i className="fas fa-bars" style={{ transform: isMenuOpen ? 'rotate(45deg)' : 'none' }}></i>
      </button>
      <ul className={`nav-list ${isMenuOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} onClick={handleMenuClick}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className={`nav-link ${location.pathname === "/about" ? 'active' : ''}`} onClick={handleMenuClick}>About</Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className={`nav-link ${location.pathname === "/products" ? 'active' : ''}`} onClick={handleMenuClick}>Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/content" className={`nav-link ${location.pathname === "/content" ? 'active' : ''}`} onClick={handleMenuClick}>Contac US</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navigation;
