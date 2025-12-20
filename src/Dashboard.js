import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbars from "./component/Navbar";
import BannerCarousel from "./component/bannerPopular";
import BannerDealCarousel from "./component/bannerDeals";
import { useNavigate } from "react-router-dom";
import BannerEducations from "./component/bannerEducation";
import BannerApplication from "./component/bannerApplication";

const Login = () => {
  const navigate = useNavigate();

  const handlePindar = () => {
    // Setelah login berhasil
    navigate("/pindar");
  };
  const handleCC = () => {
    // Setelah login berhasil
    navigate("/cc");
  };

  const handleViewAll = () => {
    // Setelah login berhasil
    navigate("/cc");
  };

  const handleViewAllEdukasi = () => {
    // Setelah login berhasil
    navigate("/education");
  };
  return (
    <div>
      <Navbars />
      <div className="mt-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-6 mx-auto">
              <div className="row justify-content-center text-center">
                <div
                  onClick={handlePindar}
                  className="col-6 col-md-4"
                  style={{ cursor: "pointer" }}
                >
                  <div className="bg-red-white">
                    <img
                      src="../img/pindar.png"
                      className="img-fluid"
                      alt="Pindar"
                    />
                  </div>
                  <div>
                    <h4
                      className="title-life mt-4"
                      style={{ color: "#474864" }}
                    >
                      Pindar
                    </h4>
                  </div>
                </div>
                <div
                  onClick={handleCC}
                  className="col-6 col-md-4"
                  style={{ cursor: "pointer" }}
                >
                  <div className="bg-red-white">
                    <img
                      src="../img/cc.png"
                      className="img-fluid"
                      alt="Kartu Kredit"
                    />
                  </div>
                  <h4 className="title-life mt-4" style={{ color: "#474864" }}>
                    Kartu Kredit
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="trending mt-5">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="title-trending">Trending Products</h5>
                <small>Last Date 29/02/2025</small>
              </div>
              <button onClick={handleViewAllEdukasi} className="btn btn-sm">
                View all →
              </button>
            </div>
          </div>

          <div className="my-4">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 className="ms-4">Aplikasi Rekomendasi</h5>
              <button onClick={handleViewAll} className="btn btn-sm">
                View all →
              </button>
            </div>
            <BannerApplication />
          </div>

          {/* Edukasi Product */}

          <div className="mt-4">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 className="ms-4">Education Product</h5>
              <button onClick={handleViewAll} className="btn btn-sm">
                View all →
              </button>
            </div>

            <BannerEducations />
          </div>

          <div className="mt-4">
            <h5 className="ms-4">Popular Plus</h5>
            <BannerCarousel />
          </div>
          <div className="mt-4">
            <h5 className="ms-4">Popular Deal</h5>
            <BannerDealCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
