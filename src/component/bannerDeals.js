import React, { useEffect, useState } from 'react';

import api from "./axiosConfig"; // Import axios instance
import Slider from 'react-slick';

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get('announcement/active?type=deal', {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const popularBanners = response.data.data;
        setBanners(popularBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

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
          slidesToShow: 2
        }
      }
    ]
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '20px' }}>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <a href={banner.url} target="_blank" rel="noopener noreferrer">
              <img
                src={`${process.env.REACT_APP_API_URL}/api${banner.imageLink}`}
                alt="Banner"
                className='banner-image'
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
