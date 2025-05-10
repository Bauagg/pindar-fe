import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import Navbars from "../component/Navbar";

const PindarAjukan = () => {
  const [count, setCount] = useState(5);
  const link = sessionStorage.getItem('linkdetail');
  const img = sessionStorage.getItem('imgdetail');
  const lendername = sessionStorage.getItem('titlecc');
  
  useEffect(() => {
    if (!link) {
      // Jika link tidak ditemukan di sessionStorage, arahkan ke halaman CC
      window.location.href = '/cc'; // sesuaikan dengan route halaman CC kamu
      return;
    }
  
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          window.location.href = link;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [link]);
  

  const handleClick = () => {
    if (!link) {
      // Jika link tidak ditemukan di sessionStorage, arahkan ke halaman CC
      window.location.href = '/cc'; // sesuaikan dengan route halaman CC kamu
      return;
    }
    window.location.href = link;
  };

  return (
    <div>
        <Navbars />
        <div className="">
          <div style={{ textAlign: 'center', marginTop: '15%' }}>
            <img src={img} alt="akulaku" width="60" />
            <h5 className="mt-3">{lendername}</h5>
            <p>Anda akan dialihkan ke halaman aplikasi</p>

            {/* Progress bar */}
            <div style={{
              width: '200px',
              height: '12px',
              backgroundColor: '#eee',
              borderRadius: '50px',
              margin: '20px auto',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(5 - count) * 20}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #CC1C22, #F86469)',
                transition: 'width 1s linear'
              }} />
            </div>

            <p>
              Jika anda tidak dialihkan dalam waktu {count} detik,
              <br />
              <button style={{
                border: 'none',
                background: 'none',
                color: '#CC1C22',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontWeight: 'bold'
              }} onClick={handleClick}>klik di sini untuk melanjutkan</button>
            </p>
          </div>
        </div>
    </div>
  );
};

export default PindarAjukan;
