import React, { useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate=useNavigate()
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{ fontWeight: "600" }}>
          iNotebook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav nav justify-content-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {!localStorage.getItem('token')?<div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link className="btn btn-outline-dark" to="/login" role="button">
          Login
        </Link>
        <Link className="btn btn-dark mx-2" to="/signup" role="button">
          SignUp
        </Link>
      </div>:<button onClick={handleLogout} className="btn btn-outline-dark mx-2">
          Logout
        </button>}
    </nav>
  );
};

export default Navbar;
