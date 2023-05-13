import React from "react";
import './navbar.css'
import { useState } from "react";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav>
      <div className="navbar-container">
        <a href="/" className="logo">
          <h1 style={{fontFamily:'Fraunces'}} className='title'> DakterSaab</h1>
        </a>
        <button
          className="navbar-toggler"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaBars />
        </button>
        <ul className={showMenu ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="#home" className="nav-link">
              Help
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;