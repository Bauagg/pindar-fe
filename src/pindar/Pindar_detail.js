import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import api from "../component/axiosConfig"; // Import axios instance
import Navbars from "../component/Navbar";

const PindarDetail = () => {
    const navigate = useNavigate();
    const [dataPindar, setDataPindar] = useState({});
    const id = sessionStorage.getItem('idPindar');
    const [activeTab, setActiveTab] = useState("informasi");
      
    const fetchdatas = async () => {
      try {
        const response = await api.get(`lender/detail/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.data);
        
        setDataPindar(response.data.data);
      } catch (error) {
        console.error("Error fetching datas:", error);
      }
    };
    
    
      useEffect(() => {
        fetchdatas();
      }, []);

      const formatRupiah = (value) => {
        if (!value) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(value);
      };

      const handleAjukan = (item) => {
        sessionStorage.setItem('linkdetail', item);
        sessionStorage.setItem('lendername', dataPindar.lenderName);
        sessionStorage.setItem('imgdetail', `${process.env.REACT_APP_API_URL}/api${dataPindar.imageLink}`);
        navigate("/pindarajukan"); // pastikan useNavigate dari react-router-dom
      };

     

  return (
    <div>
        <Navbars />
        <div className="bg-light">
            <div className="container-fluid card-shadow">
                <h5 className="text-popins">Home &gt; Pinjaman &gt; Detail</h5>
                <h3 className="title-lexend">{dataPindar.lenderName}</h3>
            </div>

            <div className="container detail-page py-4">
              <div className="row">
                {/* Kiri: Gambar dan Tombol */}
                <div className="col-md-3 text-center">
                  <div className="card-detail">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api${dataPindar.imageLink}`}
                      alt="logo"
                      className="img-detail mb-3"
                      style={{ width: "100%", height:'150px', objectFit:"contain" }}
                    />
                  <button type="button"
                  style={{

                  }}
                  className="btn btn-detail-ajukan-copy" onClick={() => handleAjukan(dataPindar.directLink)}><b>Ajukan Sekarang</b></button>
                  </div>
                </div>

                {/* Kanan: Konten Detail */}
                <div className="col-md-9">
                  {/* Tabs */}
                  <div className="d-flex mb-3">
                    <button
                      className={`btn w-50 ${
                        activeTab === "informasi"
                          ? "tab-detail active"
                          : "tab-detail"
                      }`}
                      onClick={() => setActiveTab("informasi")}
                    >
                      Informasi
                    </button>
                    <button
                      className={`btn w-50 ${
                        activeTab === "syarat"
                          ? "tab-detail active"
                          : "tab-detail"
                      }`}
                      onClick={() => setActiveTab("syarat")}
                    >
                      Syarat & Dokumen
                    </button>
                  </div>

                  <div className="card-detail-isi">
                    {activeTab === "informasi" ? (
                      <>
                        <h5><b>Fitur Utama</b></h5>
                        <ul>
                          <li>Pinjaman hingga {formatRupiah(dataPindar.maxLoan)}</li>
                          <li>Tenor pinjaman hingga {dataPindar.maxTenor} bulan</li>
                          <li>Bunga 0.03% per hari</li>
                        </ul>

                        <h5 className="mt-4"><b>Ulasan</b></h5>
                        <p>
                          Informasi yang tertera di halaman ini dapat berubah sewaktu-waktu. Untuk informasi selengkapnya, dapat mengunjungi website resmi {dataPindar.lenderName}.
                        </p>

                        <h5 className="mt-4"><b>Sekilas Mengenai {dataPindar.lenderName}</b></h5>
                          <div dangerouslySetInnerHTML=
                      {{
                        __html:
                          dataPindar?.additionalInformation || "<p>'Tidak tersedia'</p>"
                      }}
                      />
                      

                        <h5 className="mt-4"><b>Keunggulan {dataPindar.lenderName}</b></h5>
                        <ul>
                          <li>Persyaratan Mudah, Tanpa Jaminan</li>
                          <li>Ajukan hanya dengan KTP</li>
                          <li>Tenor fleksibel hingga {dataPindar.maxTenor} bulan</li>
                          <li>Proses pencairan cepat dan langsung ke rekening</li>
                        </ul>

                        <h5 className="mt-4"><b>Informasi Tambahan</b></h5>
                        <ul>
                          <li>Jumlah pinjaman hingga {formatRupiah(dataPindar.maxLoan)}</li>
                          <li>Tenor pinjaman hingga {dataPindar.maxTenor} bulan</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <h5><b>Syarat & Dokumen</b></h5>
                        <div dangerouslySetInnerHTML=
                      {{
                        __html:
                          dataPindar?.termsDocument || "<p>'Tidak ada informasi syarat & dokumen.'</p>"
                      }}
                      />
                       
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

        </div>
    </div>
  );
};

export default PindarDetail;
