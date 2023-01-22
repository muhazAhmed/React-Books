import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [value, setValue] = useState({});
  const [book, setBook] = useState({
    title: value.title,
    excerpt: value.excerpt,
    ISBN: value.ISBN,
    category: value.category,
    subcategory: value.subcategory,
    releasedAt: value.releasedAt,
  });

  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBook = async () => {
    const res = await axios.get(`http://localhost:8800/books/${id}`);
    setValue(res.data);
  };

  const handleSubmit = async (E) => {
    E.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${id}`, book);
      navigate("/book/dashboard");
    } catch (error) {
      setError(error.response.data);
      console.log(error.data);
    }
  };

  const handleChange = async (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchBook();
  }, []);
  return (
    <div className="create-book" data-aos="zoom-in">
      <form>
        <div className="form">
          <h1>Edit books details</h1>
          <p style={{"marginBottom" : "0.5em", "color" : "#fb2576"}}>Enter only the fields you want to update</p>
          <input
            placeholder="Enter your title"
            name="title"
            onChange={handleChange}
          />

          <input
            placeholder="Enter your excerpt"
            name="excerpt"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Enter your ISBN"
            name="ISBN"
            onChange={handleChange}
          />
          <input
            placeholder="Enter your book category"
            name="category"
            onChange={handleChange}
          />
          <input
            placeholder="Enter your book subcategory"
            name="subcategory"
            onChange={handleChange}
          />
        </div>
        <div className="btn">
          <Link to="/dashboard">
            <button onClick={handleSubmit}>Update</button>
          </Link>
          {error && <p>{error}</p>}
        </div>
        <span>
          Back to dashboard
          <Link to="/book/dashboard" style={{ textDecoration: "none" }}>
            <p>&nbsp;Dashboard</p>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Edit;
