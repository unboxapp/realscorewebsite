
import React from 'react';
// import { Link } from 'react-router-dom';
import './Pageseven.css'; // Importing the CSS file for styling

const SeventhComponent = () => {
  return (
    <footer className="footer">
      
      <div className="footer-social">
      <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
<a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
<a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>

      </div>
      <div className="footer-bottom">
        <p>&copy; Unbox Technologies & LoanUnbox. All Rights Reserved.</p>
        <p className="corporate-info">
          Corporate Office: 1st Floor, no 1483, Ursu Mandali Co-operative Society, 
          Thyagaraja Road, Near Agrahara circle, Mysuru, Karnataka, 570004
        </p>
      </div>
      <div className="footer-links">
      <a href="/terms-and-conditions" className="footer-link">Terms and Conditions</a>
        <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
        <a href="/refund-policy" className="footer-link">Refund Policy</a>
      </div>
    </footer>
  );
};

export default SeventhComponent;