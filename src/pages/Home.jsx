import React from 'react'
import abc from '../abc.png';

const Home = () => {
  return (
      <div className="page-container">
                <div className="content-area">
                <h1>Book Your Tickets Easy</h1>
                <p> Travel Makes Life Happy</p>
                </div>
    
            <div className="image-container">
                <img src={abc} alt = "Support Ticket" />
            </div>
            </div>
  )
}

export default Home