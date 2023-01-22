import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Create = () => {
  const { currentUser } = useContext(AuthContext);

  const [book, setBook] = useState({
    title: "",
    excerpt: "",
    userId: currentUser.user._id,
    author: currentUser.user.name,
    ISBN: "",
    category: "",
    subcategory: "",
    releasedAt: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (E) => {
    E.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
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
  return (
    <div className="create-book" data-aos="zoom-in">
      <form>
        <div className="form">
          <h1>Add books details</h1>
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
          <input
            type="date"
            placeholder="Enter your release date"
            name="releasedAt"
            onChange={handleChange}
          />
        </div>
        <div className="btn">
        <Link to="/dashboard">
          <button onClick={handleSubmit}>ADD</button>
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

export default Create;
