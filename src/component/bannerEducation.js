import React, { useEffect, useState } from "react";

import api from "./axiosConfig"; // Import axios instance
import Slider from "react-slick";
import Education from "../education/Education";
import { useNavigate } from "react-router-dom";

const BannerEducations = () => {
  const [eduactionsList, setEducationslist] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get("/content/list-pinned", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const list = response.data.data;
        setEducationslist(list.contents);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

 const handleClickButton = (data) => {
    sessionStorage.setItem("idEducation", data.id);

    navigate("/educationdetail");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
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
              src={`https://be.pindar.id/api${banner.imageLink}`}
              alt="Banner"
              className="banner-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerEducations;
