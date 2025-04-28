import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbars from "./component/Navbar";

const Pindar = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const dataPindar = [
        {
          id: 1,
          nama: "Akulaku",
          maksimalPinjaman: "Rp 50.000.000",
          maksimalLamaPinjam: "24 Bulan",
          img: "../img/al.png",
        },
        {
          id: 2,
          nama: "Indodana",
          maksimalPinjaman: "Rp 20.000.000",
          maksimalLamaPinjam: "12 Bulan",
          img: "../img/indodana.png",
        },
        {
          id: 3,
          nama: "Easy Cash",
          maksimalPinjaman: "Rp 50.000.000",
          maksimalLamaPinjam: "24 Bulan",
          img: "../img/easycash.png",
        },
      ];

      const handleCheckboxChange = (item) => {
        const isSelected = selectedItems.find((i) => i.id === item.id);
    
        if (isSelected) {
          setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
        } else {
          if (selectedItems.length < 3) {
            setSelectedItems([...selectedItems, item]);
          } else {
            alert("Anda hanya dapat membandingkan maksimal 3 pinjaman.");
          }
        }
      };

  return (
    <div>
        <Navbars />
        <div className="bg-light">
            <div className="container-fluid card-shadow">
                <h5 className="text-popins">Home &gt; Pinjaman &gt; Semua Pinjaman</h5>
                <h3 className="title-lexend">Pinjaman</h3>
            </div>

            <div className="conatiner-fluid mt-5 container-page">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card-filter">
                            <div className="d-flex justify-content-between mb-3">
                                <h4><b>Filter</b></h4>
                                <button type="button" className="btn"><small className="text-red">Select All</small></button>
                            </div>
                            <h6><b>Jumlah Pinjaman</b></h6>
                            <div class="form-check mb-2">
                                <input class="form-check-input form-red" type="checkbox" value="" id="jmlpall"/>
                                <label class="form-check-label" for="jmlpall">
                                    Semua
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input form-red" type="checkbox" value="" id="jmlp1"/>
                                <label class="form-check-label" for="jmlp1">
                                    Rp.0 - 1.000.000
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input form-red" type="checkbox" value="" id="jmlp2"/>
                                <label class="form-check-label" for="jmlp2">
                                    Lebih dari Rp. 1.000.000
                                </label>
                            </div>
                            <br/>
                            <h6><b>Jenis Pinjaman</b></h6>
                            <div class="form-check mb-2">
                                <input class="form-check-input form-red" type="checkbox" value="" id="jnspall"/>
                                <label class="form-check-label" for="jnspall">
                                    Semua Pinjaman
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input form-red" type="checkbox" value="" id="jnsp1"/>
                                <label class="form-check-label" for="jnsp1">
                                    Sekali Bayar
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input form-red" type="checkbox" value="" id="jnsp2"/>
                                <label class="form-check-label" for="jnsp2">
                                    Cicilan
                                </label>
                            </div>
                            
                        </div>

                        <div className="card-filter mt-4">
                            <div className="d-flex justify-content-between mb-3">
                                <h4><b>Urutkan</b></h4>
                                <button type="button" className="btn"><small className="text-red">Select All</small></button>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input form-red" type="checkbox" value="" id="produkp"/>
                                <label class="form-check-label" for="produkp">
                                Produk Pilihan
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input form-red" type="checkbox" value="" id="platfondmin"/>
                                <label class="form-check-label" for="platfondmin">
                                Plafond Terendah
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input form-red" type="checkbox" value="" id="platfontmax"/>
                                <label class="form-check-label" for="platfontmax">
                                Plafond Tertinggi
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-9">
                    {dataPindar.map((item) => (
                        <div key={item.id} className="card-pindar mb-3">
                            <div className="row">
                                <div className="col-sm-10 px-4 py-3">
                                <div className="row">
                                    <div className="col-sm-4 d-flex">
                                    <img src={item.img} className="img-fluid" alt="logo" />
                                    <h6 className="mx-3 my-auto">
                                        <b>{item.nama}</b>
                                    </h6>
                                    </div>
                                    <div className="col-sm-4">
                                    <label>Maksimal Pinjaman</label>
                                    <h4>
                                        <b>{item.maksimalPinjaman}</b>
                                    </h4>
                                    </div>
                                    <div className="col-sm-4">
                                    <label>Maksimal Lama Pinjam</label>
                                    <h4>
                                        <b>{item.maksimalLamaPinjam}</b>
                                    </h4>
                                    </div>
                                    <div className="col-12 mt-4">
                                    <button type="button" className="btn btn-abu-abu w-100">
                                        <b>
                                        Lihat Detail{" "}
                                        <i
                                            className="bi bi-box-arrow-up-right"
                                            style={{ color: "#CC1C22" }}
                                        ></i>
                                        </b>
                                    </button>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-2 my-auto">
                                <div className="form-check mb-2">
                                    <input
                                    className="form-check-input form-red"
                                    type="checkbox"
                                    id={`bandingkan-${item.id}`}
                                    onChange={() => handleCheckboxChange(item)}
                                    checked={selectedItems.some((i) => i.id === item.id)}
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor={`bandingkan-${item.id}`}
                                    >
                                    Bandingkan
                                    </label>
                                </div>
                                <button type="button" className="btn btn-red">
                                    <b>Ajukan Sekarang</b>
                                </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                {/* Bar Bandingkan */}
                {selectedItems.length > 0 && (
                    <div
                    style={{
                        position: "fixed",
                        bottom: '30px',
                        left: '64px',
                        right: '64px',
                        backgroundColor: "white",
                        boxShadow: '3px 4px 18.3px 0px #0000004F',
                        padding: "30px 64px 30px 64px",
                        zIndex: 1000,
                        borderRadius: '28px'
                    }}
                    >
                    <div className="row align-items-center">
                        <div className="col-sm-4">
                            <h5 className="text-red"><b>Pinjaman yang Anda Bandingkan</b></h5>
                            <p>Anda dapat membandingkan Max 3 Pinjaman</p>
                        </div>
                        <div className="col-sm-4">
                            <div className="d-flex mt-2">
                                {selectedItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="d-flex align-items-center mx-2"
                                >
                                    <img
                                    src={item.img}
                                    alt={item.nama}
                                    style={{ width: "30px", height: "30px" }}
                                    />
                                    <span className="mx-2"><b>{item.nama}</b></span>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-sm-4 text-end">
                        <button className="btn btn-red mx-2" style={{width: '130px', height: '42px'}}>Bandingkan</button>
                        <button
                            className="btn btn-outline-danger px-3"
                            style={{width: '130px', height: '42px'}}
                            onClick={() => setSelectedItems([])}
                        >
                            Batal
                        </button>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default Pindar;
