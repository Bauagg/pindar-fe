import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Navbars from "../component/Navbar";
import { useParams } from "react-router-dom";
import api from "../component/axiosConfig";

const CCAjukanCopy = () => {
  const [count, setCount] = useState(5);
  const [dataCC, setdataCC] = useState();
  const [error, setErrorMessage] = useState();

  const { id } = useParams();

  const fetchdatas = async (idcc) => {
    try {
      const response = await api.get(`credit-card/detail/${idcc}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setdataCC(response.data.data);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchdatas(id);
    }
  }, [id]);

  useEffect(() => {
    if (!dataCC?.redirectLink) {
      // Jika link tidak ditemukan di sessionStorage, arahkan ke halaman CC
      setErrorMessage("Redirect Link tidak ditemukan, hubungi administrator");
      return;
    }
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          window.location.href = dataCC?.redirectLink;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [!dataCC?.redirectLink]);

  const handleClick = () => {
    if (!dataCC?.redirectLink) {
      // Jika link tidak ditemukan di sessionStorage, arahkan ke halaman CC
      window.location.href = "/cc"; // sesuaikan dengan route halaman CC kamu
      return;
    }
    window.location.href = !dataCC?.redirectLink;
  };

  return (
    <div>
      <Navbars />
      <div className="">
        {}
        <div style={{ textAlign: "center", marginTop: "15%" }}>
          <img
            src={`https://be.pindar.id/api${dataCC?.imageLink}`}
            alt="Kartu Kredit Imagex"
            width="120"
          />
          <h5 className="mt-3">{dataCC?.title}</h5>
          <p>Anda akan dialihkan ke halaman aplikasi</p>

          {error ? (
            <p
              style={{
                color: "#CC1C22",

                fontWeight: "bold",
              }}
              className="text-red"
            >
              {error}
            </p>
          ) : (
            <>
              {/* Progress bar */}
              <div
                style={{
                  width: "200px",
                  height: "12px",
                  backgroundColor: "#eee",
                  borderRadius: "50px",
                  margin: "20px auto",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(5 - count) * 20}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #CC1C22, #F86469)",
                    transition: "width 1s linear",
                  }}
                />
              </div>

              <p>
                Jika anda tidak dialihkan dalam waktu {count} detik,
                <br />
                <button
                  style={{
                    border: "none",
                    background: "none",
                    color: "#CC1C22",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={handleClick}
                >
                  klik di sini untuk melanjutkan
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CCAjukanCopy;
