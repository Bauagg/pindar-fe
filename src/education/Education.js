import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import api from "../component/axiosConfig"; // Import axios instance
import Navbars from "../component/Navbar";

const Education = () => {
  
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [totalData, setTotalData] = useState(0);
        
    const [contents, setContents] = useState([]);
    const [filteredContents, setFilteredContents] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("All");
 
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
      
    const fetchCategories = async () => {
      try {
        const response = await api.get("content/content-category", {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb3NlZEBleGFtcGxlLmNvbSIsInJvbGVzIjpbIkNSRUFURSIsIkRFTEVURSJdLCJpZCI6IjFmOGIyNTM2LTk2YjgtNDdiYi05YzhkLWQxMGRiMjdmMjAxNyIsImlhdCI6MTc0MTY0ODQ2MywiZXhwIjoxNzQyMDA4NDYzfQ.JmW_LUwx2IWhPlLCVc3dCUuzpSmu6193Y7x4qTKZrk0",
          },
        });

        const data = response.data.data.categories;
        setCategories([{ id: "all", name: "All" }, ...data]);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchdatas = async () => {
      try {
        const response = await api.get(`content/list?limit=${limit}&offset=${offset}&search=${search}&sortBy=createdDate&sortDirection=desc&requestType=`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        
        const data = response.data.data.contents || [];
        setContents(data);
        setTotalData(response.data.data.pagination.total); // Pastikan API mengembalikan total data
      } catch (error) {
        console.error("Error fetching datas:", error);
      }
    };
    
    const filterContents = () => {
      if (selectedCategoryId === "All") {
        setFilteredContents(contents);
      } else {
        const filtered = contents.filter(
          (item) => item.category === selectedCategoryId
        );
        console.log(filtered);
        
        setFilteredContents(filtered);
      }
    };

      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      };
      
      const handleSearch = (e) => {
        setSearch(e.target.value);
        setOffset(0); // Reset ke halaman pertama saat mencari
      };

     
     useEffect(() => {
      fetchCategories();  
      fetchdatas();
      }, []);

      useEffect(() => {
        filterContents();
        setOffset(1); // reset ke halaman pertama saat ganti kategori
      }, [selectedCategoryId, contents]);

      const handleDetail = (item) => {
        sessionStorage.setItem('idEducation', item.id);
        navigate("/educationdetail"); // pastikan useNavigate dari react-router-dom
      };
    
      const paginated = filteredContents.slice(
        (offset - 1) * limit,
        offset * limit
      );

  return (
    <div>
        <Navbars search={search} onSearchChange={handleSearch} />
        <div className="bg-light">
            <div className="container-fluid card-shadow">
                <h5 className="text-popins">Home &gt; Edukasi</h5>
                <h3 className="title-lexend">Edukasi</h3>
            </div>

            <div className="conatiner mt-5 container-page">
                <div className="row">
                    {/* Trending */}
                    <div className="col-sm-5">
                      <h2 className="text-xl font-bold mb-4">Trending</h2>
                      {paginated.slice(0, 2).map((item) => (
                         <div key={item.id} className="mb-4">
                          <img
                            src={item.imageLink ? `https://be.pindar.id/api${item.imageLink}` : "https://placehold.co/600x400"}
                            className="img-fluid mb-2"
                            alt={item.title}
                            style={{borderRadius: '24px'}}
                          />
                          <div className="small text-muted mb-1">{item.category}</div>
                          <h6 className="fw-semibold">{item.title}</h6>
                          <div className="text-muted small"><i className="bi bi-clock"></i> {formatDate(item.createdDate)}</div>
                        </div>
                      ))}
                    </div>

                    {/* Terbaru */}
                    <div className="col-sm-7">
                      <h2 className="text-xl font-bold mb-4">Terbaru</h2>
                      {/* Tabs from dynamic categories */}
                      <ul className="nav mb-4">
                       {categories.map((cat) => (
                            <li className="nav-item" key={cat.id}>
                              <button
                                className={`nav-link ${selectedCategoryId === cat.name ? "active" : ""}`}
                                onClick={() => setSelectedCategoryId(cat.name)}
                              >
                                {cat.name}
                              </button>
                            </li>
                        ))}
                      </ul>

                      <div className="">
                        {paginated.map((item) => (
                          <div
                            key={item.id}
                            className="list-group-item list-group-item-action my-3 d-flex gap-3 align-items-start"
                            onClick={() => handleDetail(item)} // ← penting: gunakan arrow function
                          >
                            <img
                              src={item.imageLink ? `https://be.pindar.id/api${item.imageLink}` : "https://placehold.co/600x400"}
                              alt={item.title}
                              width="80"
                              height="60"
                              className="rounded object-fit-cover"
                            />
                            <div className="flex-grow-1">
                              <h6 className="mb-1 fw-semibold">{item.title}</h6>
                              <div className="text-muted small"> <i className="bi bi-clock"></i> {formatDate(item.createdDate)}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                       {/* Pagination */}
                      <div className="d-flex justify-content-between mt-3">
                        <button
                          className="btn btn-secondary"
                          onClick={() => setOffset(prev => Math.max(prev - limit, 0))}
                          disabled={offset === 0}
                        >
                          Previous
                        </button>

                        <span className="my-auto">
                          Page {Math.floor(offset / limit) + 1} of {Math.ceil(totalData / limit)}
                        </span>

                        <button
                          className="btn btn-secondary"
                          onClick={() => setOffset(prev => (prev + limit < totalData ? prev + limit : prev))}
                          disabled={offset + limit >= totalData}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default Education;
