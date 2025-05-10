import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import api from "../component/axiosConfig"; // Import axios instance
import Navbars from "../component/Navbar";

const PindarCompare = () => {
  const navigate = useNavigate();
  const [compareData, setCompareData] = useState([]);
  const baseURL = "https://be.pindar.id/api";

  useEffect(() => {
    const fetchAllDetails = async () => {
      const data = sessionStorage.getItem("dataCompere");
      if (!data) return;

      const items = JSON.parse(data); // array of objects, each should contain 'id'

      const promises = items.map(async (item) => {
        try {
          const response = await api.get(`credit-card/detail/${item.id}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const lender = response.data.data;
          lender.id = item.id; // Menambahkan item.id ke dalam objek lender
          return lender
        } catch (err) {
          console.error(`Error fetching detail for ID ${item.id}`, err);
          return null;
        }
      });

      const results = await Promise.all(promises);
      const filteredResults = results.filter(Boolean);
      setCompareData(filteredResults);
    };

    fetchAllDetails();
  }, []);
  
  if (compareData.length === 0) return <p>Tidak ada data untuk dibandingkan.</p>;
  
  const renderRow = (label, key) => (
    <tr>
      <th className="td-style-label">{label}</th>
      {compareData.map((item, index) => {
        if (key === 'maxLoan') {
          return (
            <td className="td-style-isi" key={index}>
              {formatRupiah(item[key]) || '-'}
            </td>
          );
        } else if (key === 'directLink') {
          return (
            <td className="td-style-isi" key={index}>
              <a href={item[key] || '-'} target="_blank">Open Link</a>
            </td>
          );
        } else{
          return (
            <td className="td-style-isi" key={index}>
              {item[key] || '-'}
            </td>
          );
        }
      })}
    </tr>
  );
  
  const formatRupiah = (value) => {
    if (!value) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleDetail = (item) => {
    console.log(item.id);
    
    sessionStorage.setItem('idPindar', item.id);
    navigate("/pindardetail"); // pastikan useNavigate dari react-router-dom
  };

  return (
    <div>
        <Navbars />
        <div className="bg-light">
            <div className="container-fluid card-shadow">
                <h5 className="text-popins">Home &gt; Credit Card &gt; Komparasi Credit Card</h5>
                <h3 className="title-lexend">Komparasi Credit Card</h3>
            </div>

            <div className="container my-4">
              <div className="table-responsive">
                <table className="table text-center">
                  <thead className="table-light">
                    <tr>
                      <th></th>
                      {compareData.map((item, index) => (
                        <th key={index}>
                          <img src={baseURL+item.imageLink} alt={item.lenderName} style={{ height: '50px' }} /><br />
                          {item.lenderName}
                          <br/>
                          <button type="button" className="btn text-red" onClick={() => handleDetail(item)}>Selengkapnya</button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  {renderRow('Nama Kartu', 'title')}
                  {renderRow('Iuran Tahunan', 'yearlyFee')}
                  {renderRow('Biaya Kartu Tambahan', 'additionalCardAnnualFee')}
                  {renderRow('Purchase Rate', 'purchaseRate')}
                  {renderRow('Cashback Rate', 'cashbackRate')}
                  {renderRow('Pendapatan Minimum Tahunan', 'yearlyIncomeMinimum')}
                  {renderRow('Pendapatan Minimum Bulanan', 'monthlyIncomeMinimum')}
                  {renderRow('Pembayaran Minimum Bulanan', 'monthlyMinimumPayment')}
                  {renderRow('Denda Keterlambatan', 'latePaymentChargePenalty')}
                  {renderRow('Biaya Admin Keterlambatan', 'latePaymentAdminCharge')}
                  {renderRow('Penarikan Maksimum Harian', 'maximumWithdrawDaily')}
                  {renderRow('Usia Minimum Kartu Utama', 'mainCardMinimumAge')}
                  {renderRow('Usia Maksimum Kartu Utama', 'mainCardMaximumAge')}
                  {renderRow('Usia Minimum Kartu Tambahan', 'additionalCardMinimumAge')}
                  {renderRow('Fitur Utama', 'mainFeature')}
                  {renderRow('Fasilitas Lengkap', 'allFacilities')}
                  {renderRow('Informasi Tambahan', 'detailInformation')}
                  {renderRow('Tutorial Pembayaran', 'billPaymentTutorial')}
                  {renderRow('Dokumen Persyaratan', 'termsDocument')}
                  {renderRow('Tipe Kartu', 'type.name')}
                  {renderRow('Penerbit', 'publisher.name')}

                  </tbody>
                </table>
              </div>
            </div>
        </div>
    </div>
  );
};

export default PindarCompare;
