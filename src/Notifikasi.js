import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import api from "./component/axiosConfig"; // Import axios instance
import Navbars from "./component/Navbar";

const Notifikasi = () => {
  const [dataNotif, setdataNotif] = useState({});
      
  const fetchdatas = async () => {
    try {
      const response = await api.get(`notification/list`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data);
      
      setdataNotif(response.data.data);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };
  
  
  useEffect(() => {
    fetchdatas();
  }, []);
  

  
  return (
    <div>
        <Navbars />
        <div className="">
            <div className="container-fluid card-shadow">
                <h5 className="text-popins">Home &gt; Notifikasi</h5>
                <h3 className="title-lexend">Notifikasi</h3>
            </div>

            <div className="container my-4">
              <div className="card-notif">
                <div className="row">
                  <div className="col-sm-2 my-auto text-end">
                    <img src="./img/icon-notif.png" className="img-fluid" ></img>
                  </div>
                  <div className="col-sm-8">
                    <h6 className="title-lexend">Persetujuan Pinjaman</h6>
                    <p>"Selamat! Pinjaman Rp5.000.000 Anda telah disetujui. Dana segera cair ke rekening Anda."</p>
                    <small className="text-secondary">Sat, 12 Nov 2024, 2 day ago</small>
                  </div>
                  <div className="col-sm-2 my-auto">
                    <button className="btn btn-lg" type="button">
                      <img src="./img/icon-delete.png" className="img-fluid" ></img>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          
        </div>
    </div>
  );
};

export default Notifikasi;
