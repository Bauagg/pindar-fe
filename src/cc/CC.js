import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import api from "../component/axiosConfig"; // Import axios instance
import Navbars from "../component/Navbar";
import ReactSlider from "react-slider";

const DataCC = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [dataPindar, setDataPindar] = useState([]);

  const [selectedFeature, setselectedFeature] = useState("");
  const [dataFeature, setDataFeature] = useState([]);

  const [selectedPenerbit, setselectedPenerbit] = useState("");
  const [dataPenerbit, setdataPenerbit] = useState([]);

  const [yearlyFeeRange, setYearlyFeeRange] = useState([0, 100000000]);
  const [incomeRange, setIncomeRange] = useState([0, 100000000]);

  const [soft, setsoft] = useState({});

  const fetchdatas = async () => {
    try {
      const response = await api.get(
        `credit-card/search?featureId=${selectedFeature}&minYearlyFee=${yearlyFeeRange[0]}&maxYearlyFee=${yearlyFeeRange[1]}&sortBy=yearly_fee&sortDirection=${selectedPlafond}&limit=${limit}&offset=${offset}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      setDataPindar(response.data.data.creditCards);
      setTotalData(response.data.data.pagination.total); // Pastikan API mengembalikan total data
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setOffset(0); // Reset ke halaman pertama saat mencari
  };

  const fetchfeatures = async () => {
    try {
      const response = await api.get(`credit-card/card-feature`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Ambil hanya data customer
      setDataFeature(response.data.data.features);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };

  const handleFeatureChange = (id) => {
    setselectedFeature((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllFeature = () => {
    if (selectedFeature.length === dataFeature.length) {
      // Uncheck all
      setselectedFeature([]);
    } else {
      // Select all
      setselectedFeature(dataFeature.map((item) => item.id));
    }
  };

  const isAllSelected = selectedFeature.length === dataFeature.length;

  const fetchPenerbit = async () => {
    try {
      const response = await api.get("credit-card/card-publisher", {
        headers: { "Content-Type": "application/json" },
      });
      setdataPenerbit(response.data.data.publishers);
    } catch (error) {
      console.error("Error fetching loan amount data:", error);
    }
  };

  const handlePenerbitChange = (id) => {
    setselectedPenerbit((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllPenerbits = () => {
    if (selectedPenerbit.length === dataPenerbit.length) {
      setselectedPenerbit([]);
    } else {
      setselectedPenerbit(dataPenerbit.map((item) => item.id));
    }
  };

  const isAllPenerbitsSelected =
    selectedPenerbit.length === dataPenerbit.length;

  const handleSelectAll = () => {
    handleSelectAllPenerbits();
    handleSelectAllFeature();
  };

  const [selectedPlafond, setSelectedPlafond] = useState("desc");
  const handlePlafondChange = (value) => {
    setSelectedPlafond((prev) => (prev === value ? "" : value)); // toggle if clicked again
  };

  useEffect(() => {
    fetchdatas();
    fetchfeatures();
    fetchPenerbit();
  }, [
    limit,
    offset,
    search,
    selectedFeature,
    selectedPenerbit,
    selectedPlafond,
    yearlyFeeRange,
  ]);

  const formatRupiah = (value) => {
    if (!value) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

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

  const handleDetail = (item) => {
    sessionStorage.setItem("idCC", item.id);
    navigate("/ccdetail"); // pastikan useNavigate dari react-router-dom
  };

  const handleAjukan = (item) => {
    console.log(item);
    sessionStorage.setItem("linkdetail", item.redirectLink);
    sessionStorage.setItem("lendername", item.title);
    sessionStorage.setItem(
      "imgdetail",
      `https://be.pindar.id${item.imageLink}`
    );
    navigate(`/ccajukan/${item.id}`);
    // pastikan useNavigate dari react-router-dom
  };

  const handleCompere = (item) => {
    sessionStorage.setItem("dataCompere", JSON.stringify(item));
    navigate("/cccompere"); // pastikan useNavigate dari react-router-dom
  };

  return (
    <div>
      <Navbars search={search} onSearchChange={handleSearch} />
      <div className="bg-light">
        <div className="container-fluid card-shadow">
          <h5 className="text-popins">
            Home &gt; Kartu Kredit &gt; Semua Kartu Kredit
          </h5>
          <h3 className="title-lexend">Kartu Kredit</h3>
        </div>

        <div className="conatiner-fluid  container-page-mobile">
          <div className="row">
            <div className="col-sm-2">
              <div className="card-filter">
                <div className="d-flex justify-content-between mb-3">
                  <h4>
                    <b>Filter</b>
                  </h4>
                  <button
                    type="button"
                    className="btn"
                    onClick={handleSelectAll}
                  >
                    <small className="text-red text-nowrap">Select All</small>
                  </button>
                </div>
                <h6>
                  <b>Penerbit Kartu</b>
                </h6>
                <select
                  className="form-select"
                  value={selectedPenerbit}
                  onChange={(e) => setselectedPenerbit(e.target.value)}
                >
                  <option value="">-- Semua Penerbit --</option>
                  {dataPenerbit.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.publisherName}
                    </option>
                  ))}
                </select>

                <br />
                <h6>
                  <b>Fitur</b>
                </h6>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input form-red"
                    type="checkbox"
                    id="jnspall"
                    checked={isAllSelected}
                    onChange={handleSelectAllFeature}
                  />
                  <label className="form-check-label" htmlFor="jnspall">
                    Semua
                  </label>
                </div>

                {dataFeature.map((item, index) => (
                  <div className="form-check mb-2" key={item.id}>
                    <input
                      className="form-check-input form-red"
                      type="checkbox"
                      value={item.id}
                      id={`jnsp${index}`}
                      checked={selectedFeature.includes(item.id)}
                      onChange={() => handleFeatureChange(item.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`jnsp${index}`}
                    >
                      {item.featureName}
                    </label>
                  </div>
                ))}

                <div className="mt-4">
                  <h5>
                    <b>Iuran Tahunan</b>
                  </h5>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="min"
                      value={yearlyFeeRange[0]}
                      onChange={(e) =>
                        setYearlyFeeRange([
                          Number(e.target.value),
                          yearlyFeeRange[1],
                        ])
                      }
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="max"
                      value={yearlyFeeRange[1]}
                      onChange={(e) =>
                        setYearlyFeeRange([
                          yearlyFeeRange[0],
                          Number(e.target.value),
                        ])
                      }
                    />
                  </div>
                  <ReactSlider
                    className="custom-slider"
                    thumbClassName="custom-thumb"
                    trackClassName="custom-track"
                    min={0}
                    max={100000000}
                    step={100000}
                    value={yearlyFeeRange}
                    onChange={setYearlyFeeRange}
                    pearling
                    minDistance={10000}
                  />
                  <div className="d-flex justify-content-between text-danger mt-1">
                    <small>{formatRupiah(yearlyFeeRange[0])}</small>
                    <small>{formatRupiah(yearlyFeeRange[1])}</small>
                  </div>
                </div>

                {/* Penghasilan Tahunan */}
                <div className="filter-box mb-4">
                  <h5>
                    <b>Penghasilan Tahunan</b>
                  </h5>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="number"
                      className="form-control"
                      value={incomeRange[0]}
                      onChange={(e) =>
                        setIncomeRange([Number(e.target.value), incomeRange[1]])
                      }
                    />
                    <input
                      type="number"
                      className="form-control"
                      value={incomeRange[1]}
                      onChange={(e) =>
                        setIncomeRange([incomeRange[0], Number(e.target.value)])
                      }
                    />
                  </div>
                  <ReactSlider
                    className="custom-slider"
                    thumbClassName="custom-thumb"
                    trackClassName="custom-track"
                    min={0}
                    max={100000000}
                    step={100000}
                    value={incomeRange}
                    onChange={setIncomeRange}
                    pearling
                    minDistance={10000}
                  />
                  <div className="d-flex justify-content-between text-danger mt-1">
                    <small>{formatRupiah(incomeRange[0])}</small>
                    <small>{formatRupiah(incomeRange[1])}</small>
                  </div>
                </div>
              </div>

              <div className="card-filter mt-4">
                <div className="d-flex justify-content-between mb-3">
                  <h4>
                    <b>Urutkan</b>
                  </h4>
                  <button type="button" className="btn">
                    <small className="text-red text-nowrap">Select All</small>
                  </button>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input form-red"
                    type="checkbox"
                    value=""
                    id="produkp"
                  />
                  <label className="form-check-label" for="produkp">
                    Produk Pilihan
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input form-red"
                    type="checkbox"
                    value="asc"
                    id="platfondmin"
                    checked={selectedPlafond === "asc"}
                    onChange={() => handlePlafondChange("asc")}
                  />
                  <label className="form-check-label" htmlFor="platfondmin">
                    Plafond Terendah
                  </label>
                </div>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input form-red"
                    type="checkbox"
                    value="desc"
                    id="platfondmax"
                    checked={selectedPlafond === "desc"}
                    onChange={() => handlePlafondChange("desc")}
                  />
                  <label className="form-check-label" htmlFor="platfondmax">
                    Plafond Tertinggi
                  </label>
                </div>
              </div>
            </div>

            <div className="col-sm-10">
              {dataPindar.map((item) => (
                <div key={item.id} className="card-pindar mb-3">
                  <div className="row">
                    <div className="col-sm-10 px-4 py-3">
                      <div className="row">
                        <div className="col-sm-4 d-flex align-items-center">
                          <img
                            src={`https://be.pindar.id/api${item.imageLink}`}
                            className="img-fluid"
                            style={{
                              height: "120px",
                              width: "100%",
                              objectFit: "contain",
                            }}
                            alt="logo"
                          />

                          <h6 className="mx-3 my-auto">
                            <b>{item.title}</b>
                          </h6>
                        </div>
                        <div className="col-sm-4">
                          <label>Iuran Tahunan</label>
                          <h4>
                            <b>{formatRupiah(item.yearlyFee)}</b>
                          </h4>
                        </div>
                        <div className="col-sm-4">
                          <label>
                            <b>Fitur</b>
                          </label>
                          <ul className="list-unstyled">
                            {item.features.map((itm, index) => (
                              <li key={index}>
                                <i
                                  className="bi bi-check-circle-fill"
                                  style={{ color: "#34C759" }}
                                ></i>{" "}
                                {itm.feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-12 mt-4">
                          <button
                            type="button"
                            className="btn btn-abu-abu w-100"
                            onClick={() => handleDetail(item)} // ← penting: gunakan arrow function
                          >
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
                      <button
                        type="button"
                        className="btn btn-red"
                        onClick={() => handleAjukan(item)}
                      >
                        <b>Ajukan Sekarang</b>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
                  disabled={offset === 0}
                >
                  Previous
                </button>

                <span className="my-auto">
                  Page {Math.floor(offset / limit) + 1} of{" "}
                  {Math.ceil(totalData / limit)}
                </span>

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setOffset((prev) =>
                      prev + limit < totalData ? prev + limit : prev
                    )
                  }
                  disabled={offset + limit >= totalData}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          {/* Bar Bandingkan */}
          {selectedItems.length > 0 && (
            <div
              style={{
                position: "fixed",
                bottom: "30px",
                left: "64px",
                right: "64px",
                backgroundColor: "white",
                boxShadow: "3px 4px 18.3px 0px #0000004F",
                padding: "30px 64px 30px 64px",
                zIndex: 1000,
                borderRadius: "28px",
              }}
            >
              <div className="row align-items-center">
                <div className="col-sm-4">
                  <h5 className="text-red">
                    <b>Pinjaman yang Anda Bandingkan</b>
                  </h5>
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
                          src={`https://be.pindar.id/api${item.imageLink}`}
                          alt={item.title}
                          style={{ width: "30px", height: "30px" }}
                        />
                        <span className="mx-2">
                          <b>{item.title}</b>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-sm-4 text-end">
                  <button
                    className="btn btn-red mx-2"
                    style={{ width: "130px", height: "42px" }}
                    onClick={() => handleCompere(selectedItems)}
                  >
                    Bandingkan
                  </button>
                  <button
                    className="btn btn-outline-danger px-3"
                    style={{ width: "130px", height: "42px" }}
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

export default DataCC;
