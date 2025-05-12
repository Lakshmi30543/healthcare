import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./styles/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./Home";
import Login from "./Login";
import DoctorRegistration from "./DoctorRegistration";
import PatientRegistration from "./PatientRegistration";
import logo from "../assets/images/eCareLogo.webp";

function Navbar() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register/doctor", "/register/patient"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && (
        <nav className="homepage-navbar fixed">
          <div className="navbar-container">
            <div className="navbar-logo">
              <Link to="/">
                <img src={logo} alt="Logo" className="logo-image" />
              </Link>
            </div>
            
            <ul className="nav-links">
              <li>
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li>
                <a href="#about">
                  <i className="fas fa-info-circle"></i> About
                </a>
              </li>
              <li>
                <a href="#program">
                  <i className="fas fa-calendar-alt"></i> Program
                </a>
              </li>
              <li>
                <a href="#pages">
                  <i className="fas fa-file-alt"></i> Pages
                </a>
              </li>
              <li>
                <a href="#blog">
                  <i className="fas fa-blog"></i> Blog
                </a>
              </li>
              <li>
                <a href="#contact">
                  <i className="fas fa-envelope"></i> Contact
                </a>
              </li>
            </ul>
            
            <div className="navbar-buttons">
              <Link to="/login" className="emergency-button">
                <i className="fas fa-ambulance"></i> EMERGENCY
              </Link>
              <Link to="/login" className="homepage-appointment">
                <i className="fas fa-calendar-check"></i> BOOK APPOINTMENT
              </Link>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/doctor" element={<DoctorRegistration />} />
        <Route path="/register/patient" element={<PatientRegistration />} />
      </Routes>
    </>
  );
}

export default Navbar;