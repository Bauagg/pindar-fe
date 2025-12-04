import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import api from "./component/axiosConfig"; // Import axios instance
import Navbars from "./component/Navbar";
import { data } from "react-router-dom";

const Aboutus = () => {
  const [Data, setdata] = useState({});
      
  const fetchdatas = async () => {
    try {
      const response = await api.get(`parameter/group/DOC`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      
      setdata(response.data.data);
  
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
                <h5 className="text-popins">Home &gt; About Us</h5>
                <h3 className="title-lexend">About Us</h3>
            </div>

            <div className="container my-4">
              <div className="row">
                <div className="col-sm-8 mx-auto text-center">
                  <img src="./logo-pindar.png" className="img-fluid my-4"></img>
                  {Array.isArray(Data) && Data.length > 0 ? (
                    Data.filter(item => item.name === "ABOUT_US").map((item, index) => (
                      <div key={index}>
                        {item.value.split("\n\n").map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p>Loading or no data available.</p>
                  )}
                  <br/>
                  <br/>
                  {Array.isArray(Data) && Data.length > 0 ? (
                    Data.filter(item => item.name === "APP_VERSION").map((item, index) => (
                      <div key={index}>
                        {item.value.split("\n\n").map((paragraph, i) => (
                          <p key={i}><b>{paragraph}</b></p>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p>Loading or no data available.</p>
                  )}
                </div>
              </div>
            </div>
          
        </div>
    </div>
  );
};

export default Aboutus;
