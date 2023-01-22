import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Modal({ setOpenModal, setId }) {
  const navigate = useNavigate();
  let id = setId;
  console.log(id)

  const handleDelete = async () => {
    try {
      await axios.delete(`/book/${id}`);
      navigate("/book/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  const cancle = () => {
    setOpenModal(false);
  };


  const handleCombain = () => {
    handleDelete();
    cancle();
    
  };

  return (
    <div className="modalBackground" data-aos="zoom-out">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={cancle}>x</button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to <span style={{"color" : "red"}}>Delete?</span></h1>
        </div>
        <div className="body">
          <p>By clicking <span style={{"color" : "red"}}>Delete </span>, this book will be deleted</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <Link to="/book/dashboard">
            <button  onClick={handleCombain}>Delete</button>{}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Modal;