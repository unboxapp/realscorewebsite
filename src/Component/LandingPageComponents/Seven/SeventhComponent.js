
import React from 'react';
// import { Link } from 'react-router-dom';
import './Pageseven.css'; // Importing the CSS file for styling

const SeventhComponent = () => {
  return (
    <footer className="footer">
      
      <div className="footer-social">
      <a href="https://www.facebook.com/profile.php?id=61563956750710" className="social-icon"><i className="fab fa-facebook"></i></a>
<a href="https://www.linkedin.com/company/realscore-creditscore/" className="social-icon"><i className="fab fa-linkedin"></i></a>
<a href="https://play.google.com/store/apps/details?id=com.loanunbox.realscore&hl=en" className="social-icon"><i className="fa-google-play"></i></a>

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