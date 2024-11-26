import React from "react";
import './Pageone.css';

const FirstComponent = () => {
  return (
    <div>
      <div className="Topnav">
        <div className="logo">
          <img src="../image/RealScoreLogo.png" alt="Logo" height="60px" />
        </div>
        <div className="signin">
          <button>
            <h3>Sign In</h3>
          </button>
        </div>
      </div>
      <div className="area">
        <ul className="circles">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <li key={index}></li>
            ))}
        </ul>
        <div className="Pageone">
          <div className="HeadingLeft">
            <div className="heading1">
              <h1>
                Check & Build Your Credit Score
                <br />
                With RealScore
              </h1>
            </div>
            <div className="Threelogos">
              <div className="monthly">
                <img
                  src="https://static.paisabazaar.com/media/bureau/clipboard-tick.svg"
                  alt="Clipboard Icon"
                />
                <p>Latest Credit Report</p>
              </div>
              <div className="loan">
                <img
                  src="https://static.paisabazaar.com/media/bureau/discount-shape.svg"
                  alt="Discount Icon"
                />
                <p>Get best Loan & Card offers</p>
              </div>
              <div className="impact">
                <img
                  src="https://static.paisabazaar.com/media/bureau/score.svg"
                  alt="Score Icon"
                />
                <p>No impact on Credit Score</p>
              </div>
            </div>
            <div className="secured-info">
              <img
                src="https://static.paisabazaar.com/media/bureau/security-safe.svg"
                alt="Shield Icon"
              />
              <p>
                Your Personal Information is 100% secured with us. We do not
                share your data with any third party.
              </p>
            </div>
          </div>
          <div className="FormRight">
            <div className="form-container">
              <form className="credit-form">
                <h2>Get Your Credit Report</h2>
                <label htmlFor="full-name">Full Name</label>
                <input
                  type="text"
                  id="full-name"
                  
                  required
                />

                <label htmlFor="pan">Pan Number</label>
                <input
                  type="text"
                  id="pan"
                
                  required
                />

                <label htmlFor="dob">Date of Birth</label>
                <input
                  className="dob"
                  type="date"
                  id="dob"
                
                  required
                />

                <label htmlFor="mobile-number">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile-number"
                  maxLength="10"
                  
                  required
                />
                <p className="note">
                  Note: Use the number registered with your bank account
                </p>

                <div className="checkbox-container">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    I have read and agree to{" "}
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Credit Score Terms of Use
                    </a>{" "}
                    and hereby appoint Paisabazaar as my authorised
                    representative to receive my credit information from{" "}
                    <a href="#">Cibil</a> / <a href="#">Equifax</a> /{" "}
                    <a href="#">Experian</a> /{" "}
                    <a href="#">CRIF Highmark</a> (bureau).
                  </label>
                </div>

                <button type="submit">Get Your Credit Report</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstComponent;
