import React, { useEffect, useState } from 'react';

import api from "./axiosConfig"; // Import axios instance
import Slider from 'react-slick';

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get('announcement/active?type=popular', {
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
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '20px' }}>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <a href={banner.url} target="_blank" rel="noopener noreferrer">
              <img
                src={`https://be.pindar.id/api${banner.imageLink}`}
                alt="Banner"
                style={{ width: '100%', borderRadius: '10px', objectFit: 'cover', maxHeight: '500px' }}
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
