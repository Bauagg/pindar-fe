import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import api from "../component/axiosConfig"; // Import axios instance
import Navbars from "../component/Navbar";

const PindarCompare = () => {
    const [dataPindar, setDataPindar] = useState([]);
    const id = sessionStorage.getItem('idPindar');
      
    const fetchdatas = async () => {
      try {
        const response = await api.get(`lender/detail/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        
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

  return (
    <div>
        <Navbars />
        <div className="bg-light">
            <div className="container-fluid card-shadow">
                <h5 className="text-popins">Home &gt; Pinjaman &gt; Komparasi Pinjaman</h5>
                <h3 className="title-lexend">Komparasi Pinjaman</h3>
            </div>

            <div className="conatiner-fluid mt-5 container-page">
                <div className="row">
                    <div className="col-sm-12">
                    

                    </div>
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default PindarCompare;
