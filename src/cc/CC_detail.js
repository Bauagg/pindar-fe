import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import api from "../component/axiosConfig"; // Import axios instance
import Navbars from "../component/Navbar";

const CCDetail = () => {
  const navigate = useNavigate();
  const [dataCC, setdataCC] = useState({});
  const id = sessionStorage.getItem("idCC");

  const [openSection, setOpenSection] = useState("detail");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const fetchdatas = async () => {
    try {
      const response = await api.get(`credit-card/detail/${id}`, {
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
    fetchdatas();
  }, []);

  const formatRupiah = (value) => {
    if (!value) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleAjukan = (item) => {
    // sessionStorage.setItem("linkdetail", "/cc");
    // sessionStorage.setItem("titlecc", dataCC.title);
    // sessionStorage.setItem(
    //   "imgdetail",
    //   `https://be.pindar.id/api${dataCC.imageLink}`
    // );
    navigate(`/ccajukan/${item.id}`); // pastikan useNavigate dari react-router-dom
  };

  return (
    <div>
      <Navbars />
      <div className="bg-light">
        <div className="container-fluid card-shadow">
          <h5 className="text-popins">Home &gt; Credit Card &gt; Detail</h5>
          <h3 className="title-lexend">{dataCC.title}</h3>
        </div>

        <div className="container detail-page py-4">
          <div className="row">
            {/* Kiri: Gambar dan Tombol */}
            <div className="col-md-3 text-center">
              <div className="card-detail">
                <img
                  src={`https://be.pindar.id/api${dataCC.imageLink}`}
                  alt="logo"
                  className="img-detail mb-3"
                  style={{ maxWidth: "150px" }}
                />
                <br />
                <h4 className="title-lexend">{dataCC.title}</h4>
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="title-lexend">
                      {formatRupiah(dataCC.yearlyFee)}
                    </h6>
                    <p>Iuran Tahunan</p>
                  </div>
                  <div>
                    <h6 className="title-lexend">{dataCC.type?.name}</h6>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-detail-ajukan"
                  onClick={() => handleAjukan(dataCC)}
                >
                  <b>Ajukan Sekarang</b>
                </button>
              </div>
            </div>

            {/* Kanan: Konten Detail */}
            <div className="col-md-9">
              <div className="accordion-wrapper">
                <div className="accordion-section my-4">
                  <button onClick={() => toggleSection("detail")}>
                    Detail Informasi
                  </button>
                  {openSection === "detail" && (
                    <div className="accordion-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            dataCC?.detailInformation ||
                            "<p>Tidak ada informasi.</p>",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="accordion-section my-4">
                  <button onClick={() => toggleSection("features")}>
                    Fitur Utama
                  </button>
                  {openSection === "features" && (
                    <div className="accordion-content">
                      <div dangerouslySetInnerHTML=
                      {{
                        __html:
                          dataCC?.mainFeature || "<p>'Tidak tersedia'</p>"
                      }}
                      />
                    </div>
                  )}
                </div>

                <div className="accordion-section my-4">
                  <button onClick={() => toggleSection("facilities")}>
                    Fasilitas Kartu
                  </button>
                  {openSection === "facilities" && (
                    <div className="accordion-content">
                      <ul>
                        {dataCC.features && dataCC.features.length > 0 ? (
                          dataCC.features.map((f, i) => <li key={i}>{f}</li>)
                        ) : (
                          <li>Tidak ada fasilitas</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="accordion-section my-4">
                  <button onClick={() => toggleSection("fees")}>
                    Biaya & Denda
                  </button>
                  {openSection === "fees" && (
                    <div className="accordion-content">
                      <p>
                        <b>Iuran Tahunan:</b> {formatRupiah(dataCC.yearlyFee)}
                      </p>
                      <p>
                        <b>Biaya Tambahan Kartu:</b>{" "}
                        {formatRupiah(dataCC.additionalCardAnnualFee)}
                      </p>
                      <p>
                        <b>Bunga Pembelian:</b> {dataCC.purchaseRate}%
                      </p>
                      <p>
                        <b>Cashback:</b> {dataCC.cashbackRate}%
                      </p>
                      <p>
                        <b>Denda Telat Bayar:</b>{" "}
                        {dataCC.latePaymentChargePenalty}
                      </p>
                      <p>
                        <b>Biaya Admin Telat Bayar:</b>{" "}
                        {dataCC.latePaymentAdminCharge}
                      </p>
                    </div>
                  )}
                </div>

                <div className="accordion-section my-4">
                  <button onClick={() => toggleSection("requirements")}>
                    Persyaratan
                  </button>
                  {openSection === "requirements" && (
                    <div className="accordion-content">
                      <p>
                        <b>Pendapatan Bulanan Minimum:</b>{" "}
                        {formatRupiah(dataCC.monthlyIncomeMinimum)}
                      </p>
                      <p>
                        <b>Pendapatan Tahunan Minimum:</b>{" "}
                        {formatRupiah(dataCC.yearlyIncomeMinimum)}
                      </p>
                      <p>
                        <b>Usia Minimum Kartu Utama:</b>{" "}
                        {dataCC.mainCardMinimumAge}
                      </p>
                      <p>
                        <b>Usia Maksimum Kartu Utama:</b>{" "}
                        {dataCC.mainCardMaximumAge}
                      </p>
                      <p>
                        <b>Usia Minimum Kartu Tambahan:</b>{" "}
                        {dataCC.additionalCardMinimumAge}
                      </p>
                    </div>
                  )}
                </div>

                <div className="accordion-section my-4">
                  <button onClick={() => toggleSection("howto")}>
                    Cara Pengajuan
                  </button>
                  {openSection === "howto" && (
                    <div className="accordion-content">
                       <div
                        dangerouslySetInnerHTML={{
                          __html:
                            dataCC?.detailInformation ||
                            "<p>Tidak ada informasi.</p>",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCDetail;
