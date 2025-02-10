import React from 'react';


const AboutPage = () => {
  const today = new Date();

  return (
    <div className="about-container">
      <h2 className="about-title">About Us</h2>
      <p className="about-description">
        Welcome to our Support Ticket System! At <strong>Support Ticket</strong>, we aim to provide exceptional service and streamline the process for both customers and agents.
      </p>

      <h3 className="about-section-title">Our Mission</h3>
      <p className="about-description">
        Our mission is simple – to provide quick, reliable, and effective support to all our users. Whether you're raising a ticket or resolving one, we make it seamless and efficient.
      </p>

      <p className="about-thankyou">
        Thank you for choosing <strong>Support Ticket</strong>. We're dedicated to providing the best support experience possible.
      </p>

      <footer className="footer">
        <p>&copy; {today.getFullYear()} Support Ticket System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;