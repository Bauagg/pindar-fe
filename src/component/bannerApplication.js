import React, { useEffect, useState } from "react";

import api from "./axiosConfig"; // Import axios instance
import Slider from "react-slick";
import Education from "../education/Education";
import { useNavigate } from "react-router-dom";

const BannerApplication = () => {
  const [eduactionsList, setEducationslist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get("/lender/list-pinned", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const list = response.data.data;
        setEducationslist(list.lenders);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  

   const handleClickButton = (data) => {
    sessionStorage.setItem("idPindar", data.id);

    navigate("/pindardetail");
  };


  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };



  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "20px" }}>
      <Slider {...settings}>
        {eduactionsList?.map((banner) => (
          <div onClick={() => handleClickButton(banner)} key={banner.id}>
            <img
              src={`${process.env.REACT_APP_API_URL}${banner?.imagelink}`}
              alt="Banner"
              className="banner-custom-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerApplication;
