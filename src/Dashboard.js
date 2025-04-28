import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbars from "./component/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handlePindar = () => {
        // Setelah login berhasil
        navigate("/pindar");
    };
  return (
    <div>
        <Navbars />
        <div className="mt-5 bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-6 mx-auto">
                        <div className="d-flex justify-content-around">
                            <div onClick={handlePindar} style={{cursor: 'pointer'}}>
                                <div className="bg-red-white">
                                    <img src="../img/pindar.png" ></img>
                                </div>
                                <h4 className="title-life mt-4" style={{color: '#474864'}} >Pindar</h4>
                            </div>
                            <div>
                                <div className="bg-red-white">
                                    <img src="../img/cc.png" ></img>
                                </div>
                                <h4 className="title-life mt-4" style={{color: '#474864'}}>Kartu Kredit</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="trending mt-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="title-trending">Trending Products</h5>
                            <small>Last Date 29/02/2025</small>
                        </div>
                        <button class="btn btn-sm">
                            View all →
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <h6 class="ms-4">Popular Plus</h6>
                    <div class="card-body bg-banner">
                        <div class="row">
                            <div className="col-4">
                                <img src="../img/family.png" alt="family"  className="img-fluid"/>
                            </div>
                            <div className="col-8 my-auto">
                                <h6 className="title-life text-white">Life Insurance</h6>
                                <h3 className="title-popular text-white">Masa Depan Aman, Mulai Rp100K/Bulan!</h3>
                            </div>
                        </div>
                    </div>
                    <div class="dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default Login;
