import React, { useContext } from "react";
import svg from "../images/Maintenance.svg";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Maintenance = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="pageNotFound">
      <img src={svg} alt="img" data-aos="fade-in" />
      <p>This page is under maintenance</p>
      <p>Please contact us if you still have any issue.</p>
      {currentUser ? (
        <Link to="/book/dashboard">
          <button className="home-btn">Back to Dashboard</button>
        </Link>
      ) : (
        <Link to="/">
          <button className="home-btn">Back to Home</button>
        </Link>
      )}
    </div>
  );
};

export default Maintenance;
