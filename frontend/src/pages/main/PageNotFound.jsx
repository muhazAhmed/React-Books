import React, { useContext } from 'react'
import nf from "../../images/404.svg"
import { AuthContext } from '../../Context/AuthContext'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='pageNotFound'>
    <img src={nf} alt='img'/>
    {currentUser ? (
          <Link to="/book/dashboard" >
            <button className="home-btn">Back to Dashboard</button>
          </Link>
        ) : (
          <Link to="/">
            <button className="home-btn" >Back to Home</button>
          </Link>
        )}
    </div>
  )
}

export default PageNotFound
