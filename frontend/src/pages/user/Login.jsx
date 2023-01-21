import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/book/dashboard");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
      <div className="form" style={{"marginTop" : "8em"}}>
        <form>
        <div className="user">
          <h1>Login</h1>

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
          <div className="btn">
            <Link to="/book/dashboard">
              <button onClick={handleSubmit}>Login</button>
            </Link>
            {error && <h4 style={{"color" : "#fb2576", "marginTop" : "1rem"}}>{error}</h4>}
            <p>
              New member ?
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span>&nbsp;Register</span>
              </Link>
            </p>
          </div>
      </div>
        </form>
      </div>
  );
};

export default Login;
