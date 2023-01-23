import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src="/logo2.png" alt="logo"/>
        </Link>
        </div>
        <div className="links">
          <Link className="link" to="/">
            <h6>Home</h6>
          </Link>
          <Link className="link" to="/about">
            <h6>About</h6>
          </Link>
          <Link className="link" to="/contact">
            <h6>Contact Us</h6>
          </Link>

          <Link to="/user/update/:id" style={{ textDecoration: "none" }}>
            <span>{currentUser?.user.name}</span>
          </Link>
          {currentUser ? (
            <Link to="/login" style={{ textDecoration: "none", "fontSize" : "1em", }}>
              <span onClick={logout} style={{"color" : "#fb2576" }}>Logout</span>
            </Link>
          ) : (
            <Link className="link" to="/login" style={{ textDecoration: "none", "fontSize" : "1em" }}>
              <span style={{"color" : "#fb2576" }}>Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
