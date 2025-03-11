import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbars from "./component/Navbar";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
        <Navbars />
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-md-5 text-center">
                    <img src="/logo-pindar.png" alt="Logo" className="mb-3" width={80} />
                    <h3 className="mb-4">Sign in</h3>
                    <form>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i className="bi bi-envelope" style={{ fontSize: 'x-large' }}></i></span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        {/* Icon Lock */}
                        <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-lock" style={{ fontSize: "x-large" }}></i>
                        </span>

                        {/* Input Password */}
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                        />

                        {/* Icon Show/Hide */}
                        <span
                            className="input-group-text bg-white cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: "pointer" }}
                        >
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} style={{ fontSize: "x-large" }}></i>
                        </span>
                        </div>
                    <div className="d-flex justify-content-between mb-3">
                        <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember Me
                        </label>
                        </div>
                        <a href="#" className="text-decoration-none">
                        Forgot Password?
                        </a>
                    </div>
                    <button className="btn btn-red w-100">SIGN IN</button>
                    </form>
                    <div className="text-center my-4">
                    <label>OR</label>
                    </div>
                    <br/>
                    <p className="mt-3">
                    Don't have an account? <a href="#" className="text-danger">Sign up</a>
                    </p>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
