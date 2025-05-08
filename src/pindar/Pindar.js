import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import api from "../component/axiosConfig"; // Import axios instance
import Navbars from "../component/Navbar";

const Pindar = () => {
  
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [dataPindar, setDataPindar] = useState([]);

    const [selectedPayments, setSelectedPayments] = useState([]);
    const [dataPayment, setDataPayment] = useState([]);

    const [loanAmountData, setLoanAmountData] = useState([]);
    const [selectedLoanAmounts, setSelectedLoanAmounts] = useState([]);

      
    const fetchdatas = async () => {
      try {
        const response = await api.get(`lender/list?limit=${limit}&offset=${offset}&search=${search}&sortBy=maxloan&sortDirection=${selectedPlafond}&loanType=${selectedLoanAmounts}&paymentType=${selectedPayments}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        
        setDataPindar(response.data.data.lenders);
        setTotalData(response.data.data.pagination.total); // Pastikan API mengembalikan total data
      } catch (error) {
        console.error("Error fetching datas:", error);
      }
    };
    
    const handleSearch = (e) => {
      setSearch(e.target.value);
      setOffset(0); // Reset ke halaman pertama saat mencari
    };

      const fetchpayments = async () => {
        try {
          const response = await api.get(`parameter/group/LENDER_PAYMENT_TYPE`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          // Ambil hanya data customer
          setDataPayment(response.data.data);
          
        } catch (error) {
          console.error("Error fetching datas:", error);
        }
      };

      const handlePaymentChange = (name) => {
        setSelectedPayments((prevSelected) =>
          prevSelected.includes(name)
            ? prevSelected.filter((item) => item !== name)
            : [...prevSelected, name]
        );
      };
    
      const handleSelectAllPayment = () => {
        if (selectedPayments.length === dataPayment.length) {
          // Uncheck all
          setSelectedPayments([]);
          
        } else {
          // Select all
          setSelectedPayments(dataPayment.map((item) => item.name));
          
        }
      };
    
      const isAllSelected = selectedPayments.length === dataPayment.length;
    

      const fetchLoanAmounts = async () => {
        try {
          const response = await api.get(
            "https://be.pindar.id/api/parameter/group/LENDER_LOAN_TYPE",
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          setLoanAmountData(response.data.data);
        } catch (error) {
          console.error("Error fetching loan amount data:", error);
        }
      };

      const handleLoanAmountChange = (name) => {
        setSelectedLoanAmounts((prev) =>
          prev.includes(name)
            ? prev.filter((item) => item !== name)
            : [...prev, name]
        );
      };
      
      const handleSelectAllLoanAmounts = () => {
        if (selectedLoanAmounts.length === loanAmountData.length) {
          setSelectedLoanAmounts([]);
          
        } else {
          setSelectedLoanAmounts(loanAmountData.map((item) => item.name));
          
        }
      };
      
      const isAllLoanAmountsSelected = selectedLoanAmounts.length === loanAmountData.length;
      
      const handleSelectAll = () => {
        handleSelectAllLoanAmounts();
        handleSelectAllPayment();
        
      };
      
      const [selectedPlafond, setSelectedPlafond] = useState('');
      const handlePlafondChange = (value) => {
        setSelectedPlafond(prev => prev === value ? '' : value); // toggle if clicked again
        
      };
      

      useEffect(() => {
        fetchdatas();
        fetchpayments();
        fetchLoanAmounts();
      }, [limit, offset, search, selectedPayments, selectedLoanAmounts, selectedPlafond]);

      const formatRupiah = (value) => {
        if (!value) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
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
        sessionStorage.setItem('idPindar', item.id);
        navigate("/pindardetail"); // pastikan useNavigate dari react-router-dom
      };
      

  return (
    <div>
        <Navbars search={search} onSearchChange={handleSearch} />
        <div className="bg-light">
            <div className="container-fluid card-shadow">
                <h5 className="text-popins">Home &gt; Pinjaman &gt; Semua Pinjaman</h5>
                <h3 className="title-lexend">Pinjaman</h3>
            </div>

            <div className="conatiner-fluid mt-5 container-page">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="card-filter">
                            <div className="d-flex justify-content-between mb-3">
                                <h4><b>Filter</b></h4>
                                <button
                                type="button"
                                className="btn"
                                onClick={handleSelectAll}
                                >
                                <small className="text-red">Select All</small>
                                </button>

                            </div>
                            <h6><b>Jumlah Pinjaman</b></h6>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input form-red"
                                    type="checkbox"
                                    id="jmlpall"
                                    checked={isAllLoanAmountsSelected}
                                    onChange={handleSelectAllLoanAmounts}
                                />
                                <label className="form-check-label" htmlFor="jmlpall">
                                    Semua
                                </label>
                            </div>

                            {loanAmountData.map((item, index) => (
                            <div className="form-check mb-2" key={item.name}>
                                <input
                                className="form-check-input form-red"
                                type="checkbox"
                                value={item.name}
                                id={`jmlp${index}`}
                                checked={selectedLoanAmounts.includes(item.name)}
                                onChange={() => handleLoanAmountChange(item.name)}
                                />
                                <label className="form-check-label" htmlFor={`jmlp${index}`}>
                                {item.value}
                                </label>
                            </div>
                            ))}
                            <br/>
                            <h6><b>Jenis Pinjaman</b></h6>
                            <div className="form-check mb-2">
                                <input
                                className="form-check-input form-red"
                                type="checkbox"
                                id="jnspall"
                                checked={isAllSelected}
                                onChange={handleSelectAllPayment}
                                />
                                <label className="form-check-label" htmlFor="jnspall">
                                Semua Pinjaman
                                </label>
                            </div>

                            {dataPayment.map((item, index) => (
                                <div className="form-check mb-2" key={item.name}>
                                <input
                                    className="form-check-input form-red"
                                    type="checkbox"
                                    value={item.name}
                                    id={`jnsp${index}`}
                                    checked={selectedPayments.includes(item.name)}
                                    onChange={() => handlePaymentChange(item.name)}
                                />
                                <label className="form-check-label" htmlFor={`jnsp${index}`}>
                                    {item.value}
                                </label>
                                </div>
                            ))}

                            
                        </div>

                        <div className="card-filter mt-4">
                            <div className="d-flex justify-content-between mb-3">
                                <h4><b>Urutkan</b></h4>
                                <button type="button" className="btn"><small className="text-red">Select All</small></button>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input form-red" type="checkbox" value="" id="produkp"/>
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
                                    checked={selectedPlafond === 'asc'}
                                    onChange={() => handlePlafondChange('asc')}
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
                                    checked={selectedPlafond === 'desc'}
                                    onChange={() => handlePlafondChange('desc')}
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
                                    <div className="col-sm-4 d-flex">
                                    <img src={`https://be.pindar.id${item.imagelink}`} className="img-fluid" style={{width: '61px'}} alt="logo" />
                                    <h6 className="mx-3 my-auto">
                                        <b>{item.lendername}</b>
                                    </h6>
                                    </div>
                                    <div className="col-sm-4">
                                    <label>Maksimal Pinjaman</label>
                                    <h4>
                                        <b>{formatRupiah(item.maxloan)}</b>
                                    </h4>
                                    </div>
                                    <div className="col-sm-4">
                                    <label>Maksimal Lama Pinjam</label>
                                    <h4>
                                        <b>{item.maxtenor}</b>
                                    </h4>
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
                                <button type="button" className="btn btn-red">
                                    <b>Ajukan Sekarang</b>
                                </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setOffset(prev => Math.max(prev - limit, 0))}
                        disabled={offset === 0}
                      >
                        Previous
                      </button>

                      <span className="my-auto">
                        Page {Math.floor(offset / limit) + 1} of {Math.ceil(totalData / limit)}
                      </span>

                      <button
                        className="btn btn-secondary"
                        onClick={() => setOffset(prev => (prev + limit < totalData ? prev + limit : prev))}
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
                                    src={`https://be.pindar.id${item.imagelink}`}
                                    alt={item.lendername}
                                    style={{ width: "30px", height: "30px" }}
                                    />
                                    <span className="mx-2"><b>{item.lendername}</b></span>
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
