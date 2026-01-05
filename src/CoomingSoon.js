import React from "react";

const CoomingSoon = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
      <div className=" text-center p-5 ">
        <img
          src="../img/under-maintenance.svg"
          className="img-fluid"
          alt="Kartu Kredit"
          style={{ height: "250px", width: "250px" }}
        />
        <h3 className="fw-bold my-1">🚀 Coming Soon 🚀</h3>

        <p className="mb-4">
          Kami sedang menyiapkan sesuatu yang baru dan menarik.
        </p>
      </div>
    </div>
  );
};

export default CoomingSoon;
