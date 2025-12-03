import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import api from "../component/axiosConfig"; // Import axios instance
import Navbars from "../component/Navbar";
import ShareModal from "./Education_share";

const PindarDetail = () => {
  const navigate = useNavigate();
  const [dataEducation, setdataEducation] = useState({});
  const id = sessionStorage.getItem("idEducation");

  const fetchdatas = async () => {
    try {
      const response = await api.get(`content/detail/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data);

      setdataEducation(response.data.data);
    } catch (error) {
      console.error("Error fetching datas:", error);
    }
  };

  useEffect(() => {
    fetchdatas();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div>
      <Navbars />
      <div className="bg-light">
        <div className="container-fluid card-shadow">
          <h5 className="text-popins">Home &gt; Edukasi</h5>
          <h3 className="title-lexend">Edukasi</h3>
        </div>

        <div className="container detail-page py-4">
          <div className="row">
            <div className="col-sm-8 mx-auto text-center">
              <img
                src={
                  dataEducation.imageLink
                    ? `https://be.pindar.id/api${dataEducation.imageLink}`
                    : "https://placehold.co/600x400"
                }
                className="img-fluid mb-2"
                alt={dataEducation.title}
                style={{ borderRadius: "24px", maxheight: "434px" }}
              />
              <div className="text-muted small">
                <i className="bi bi-clock"></i>{" "}
                {formatDate(dataEducation.createdDate)}
              </div>
              <h4 className="fw-semibold">{dataEducation.title}</h4>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="mx-2 my-2">
                    <button type="button" className="btn">
                      <i class="bi bi-chat-left"></i> Comments
                    </button>
                  </div>
                  <div className="mx-2 my-2">
                    <button type="button" className="btn">
                      <i class="bi bi-heart"></i> Likes
                    </button>
                  </div>
                  <div className="mx-2 my-2">
                    <button
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      <i class="bi bi-share"></i> Share
                    </button>
                  </div>
                </div>
                <div>
                  <div className="small text-muted mb-1">
                    {dataEducation.categoryName}
                  </div>
                </div>
              </div>
              <div
                className="my-4"
                dangerouslySetInnerHTML={{
                  __html: dataEducation.contentDetail,
                }}
              />
              {/* Modal */}
              <ShareModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PindarDetail;
