import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger px-3 navbar-radius bg-arrow">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand text-white" href="#">
          <img src="/logo-pindar.png" alt="Logo" width={50} className="me-2" />
        </a>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="row w-100">
            {/* Kolom Search dan Menu */}
            <div className="col-lg-8 d-flex align-items-center">
              <form className="d-flex flex-grow-1">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search here..."
                />
              </form>
              <div className="d-flex">
                <a href="#" className="text-white me-3">
                    <i className="bi bi-house" style={{ fontSize: 'x-large' }}></i>
                </a>
                <a href="#" className="text-white me-3">
                    <i className="bi bi-credit-card" style={{ fontSize: 'x-large' }}></i>
                </a>
                <a href="#" className="text-white me-3">
                    <i className="bi bi-wallet2" style={{ fontSize: 'x-large' }}></i>
                </a>
                <a href="#" className="text-white me-3">
                    <i className="bi bi-bell" style={{ fontSize: 'x-large' }}></i>
                </a>
              </div>
            </div>

            {/* Kolom User Info & Avatar */}
            <div className="col-lg-4 d-flex justify-content-end align-items-center">
              <div className="text-end me-2">
                <h4 className="text-white mb-0">Hi Putri!</h4>
                <p className="text-white mb-0">Jakarta, Indonesia</p>
              </div>

              {/* Avatar dengan Dropdown */}
              <div
                className="position-relative d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src="/avatar-10.jpg"
                  alt="User Avatar"
                  width={50}
                  className="rounded-circle"
                />
                {/* Ikon Panah */}
                <i
                 className={showDropdown ? 'bi bi-caret-up-fill text-white ms-2' : 'bi bi-caret-down-fill text-white ms-2'}
                ></i>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="position-absolute top-100 start-50 translate-middle-x mt-2 bg-white shadow rounded p-3" style={{ width: "150px" }}>
                    <a href="#" className="d-block text-dark text-decoration-none px-3 py-2">Profile</a>
                    <a href="#" className="d-block text-dark text-decoration-none px-3 py-2">Settings</a>
                    <a href="#" className="d-block text-dark text-decoration-none px-3 py-2">Logout</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
