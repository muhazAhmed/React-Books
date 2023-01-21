import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Model";

const Dashboard = () => {
  const [book, setBook] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchdata = async () => {
    let res = await axios.get("http://localhost:8800/books");
    setBook(res.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="dashboard">
      <div className="btns">
        <Link to="/book/create">
          <button data-aos="zoom-out">ADD</button>
        </Link>
      </div>
      {Object.entries(book).map((items) => (
        <div className="book" key={items} data-aos="slide-up">
          {modalOpen && <Modal setOpenModal={setModalOpen} setId = {items[1]._id} />}
          <div className="book-container" >
            <h3>Title : {items[1].title}</h3>
            <h3>Excerpt : {items[1].excerpt}</h3>
            <h3>Author : {items[1].author}</h3>
            <h3>ISBN : {items[1].ISBN}</h3>
            <h3>Category : {items[1].category}</h3>
            <h3>Subcategory : {items[1].subcategory}</h3>
            <h3>ReleasedAt : {items[1].releasedAt}</h3>
          </div>
          <div className="btns">
            <Link to={`/book/edit/${items[1]._id}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
            <Link onClick={() => { setModalOpen(true) }}>
              <i className="fa-solid fa-trash"></i>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
