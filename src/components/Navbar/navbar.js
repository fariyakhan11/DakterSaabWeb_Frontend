import React from "react";
import './navbar.css'
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import LogoP from '../../images/logo.png'

function Navbar({ scrollToAbout, scrollToContact,scrollToHome,scrollToDownload }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav>
      <div className="navbar-container">
        <a href="/" className="logo">
          <img src={LogoP} style={{width:'2em',height:'2em'}}></img>
          <h1 style={{fontFamily:'Fraunces'}} className='title'> DakterSaab</h1>
        </a>
        <button
          className="navbar-toggler"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaBars />
        </button>
        <ul className={showMenu ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item" onClick={scrollToHome}>
            <a href="#home" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item" onClick={scrollToAbout}>
            <a href="#about" className="nav-link" >
              About
            </a>
          </li>
          <li className="nav-item" onClick={scrollToDownload}>
            <a href="#home" className="nav-link">
              Download
            </a>
          </li>
          <li className="nav-item" onClick={scrollToContact}>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a href="#home" className="nav-link">
              Help
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;