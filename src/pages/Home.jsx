import React from 'react'
import abc from '../abc.png';

const Home = () => {
  return (
      <div className="page-container">
                <div className="content-area">
                <h1>Smart Support, Swift Solutions! Raise a ticket and get instant assistance.</h1>
                
                </div>
    
            <div className="image-container">
                <img src={abc} alt = "Support Ticket" />
            </div>
            </div>
  )
}

export default Home