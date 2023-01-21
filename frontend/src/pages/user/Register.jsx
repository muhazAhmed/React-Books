import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    title: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (E) => {
    E.preventDefault();
    try {
      await axios.post("http://localhost:8800/register", inputs);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleChange = async (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="form">
      <form>
        <div className="user">
        <h1>Registeration</h1>
          <div className="select">
            <select name="title" onChange={handleChange}>
              <option defaultValue>Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
            </select>
          </div>
          <input
            placeholder="Enter your Name"
            name="name"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Enter your phone number"
            name="phone"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="address">

            <h3>Address:</h3>
            <input
              placeholder="Enter your street "
              name="address.street"
              onChange={handleChange}
            />
            <input
              placeholder="Enter your city"
              name="address.city"
              onChange={handleChange}
            />
            <input
              placeholder="Enter your pincode"
              name="address.pincode"
              onChange={handleChange}
            />
        </div>
        <div className="btn">
          <Link to="/login">
            <button onClick={handleSubmit} className="home-btn">
              Register
            </button>
          </Link>
          {error && <h4 style={{"color" : "#fb2576", "marginTop" : "1rem"}}>{error}</h4>}
          <p>
            Already registered ?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span>&nbsp;Login</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
