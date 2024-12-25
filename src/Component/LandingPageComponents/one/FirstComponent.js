import React, { useState } from "react";
import Modal from "react-modal";
import "./Pageone.css";
import { createOrder } from "../../../services/api"; // Ensure this API function is implemented correctly.
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreditScoreImage1 from './assets/300-650.png';
import CreditScoreImage2 from './assets/650-700.png';
import CreditScoreImage3 from './assets/700-750.png';
import CreditScoreImage4 from './assets/750-800.png';
import CreditScoreImage5 from './assets/800-900.png';



// toast.configure();
Modal.setAppElement("#root");

const FirstComponent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    pan: "",
   
    mobileNumber: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const creditScore=675;

  

  const validateForm = () => {
    const newErrors = {};
  
    // Validate Full Name: No numbers allowed and must have at least 2 words
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full Name must not contain numbers.";
    } else if (formData.fullName.trim().split(" ").length < 2) {
      newErrors.fullName = "Full Name must contain at least 2 words.";
    }
  
    // Validate PAN: Auto-capitalize, max length of 10
    if (!formData.pan.trim()) {
      newErrors.pan = "PAN Number is required.";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = "Enter a valid PAN Number.";
    }
  
    // Validate Date of Birth
    
  
    // Validate Mobile Number: Must be 10 digits, no alphabets allowed
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Mobile Number must be exactly 10 digits.";
    }
  
    // Validate Terms Agreement
    if (!formData.terms) newErrors.terms = "You must agree to the terms.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Update Handlers for Constraints
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "fullName") {
      // Prevent typing numbers in the fullName field
      if (/^[A-Za-z\s]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "pan") {
      // Auto-capitalize PAN and limit length to 10
      if (value.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
      }
    } else if (name === "mobileNumber") {
      // Prevent typing alphabets in mobileNumber field
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form before proceeding.");
      return;
    }

    setLoading(true);

    try {
      // Create Razorpay Order
      const order = await createOrder({
        amount: 1, // Amount in paisa
        currency: "INR",
        receipt: "receipt#1",
      });

      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay SDK. Please try again.");
        setLoading(false);
        return;
      }

      // Open Razorpay Payment Gateway
      openRazorpay(order);
    } catch (error) {
      console.error("Error in payment process:", error.message);
      toast.error("Error creating payment order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    if (document.getElementById("razorpay-script")) return Promise.resolve(true);

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openRazorpay = (order) => {
    const options = {
      amount: order.amount,
      currency: order.currency,
      name: "RealScore",
      description: "Credit Report Fee",
      order_id: order.id,
      handler: async (response) => {
        try {
          console.log("Payment successful:", response);
          toast.success(
            "Payment Successful! Credit report will be emailed shortly."
          );

          // Simulate fetching JSON data
          const fetchedData = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            name: formData.fullName,
            mobile: formData.mobileNumber,
            pan: formData.pan,
          };

          setPaymentData(fetchedData);
          setIsModalOpen(true); // Open the modal
        } catch (error) {
          console.error("Payment verification failed:", error);
          toast.error("Error verifying payment. Please contact support.");
        }
      },
      prefill: {
        name: formData.fullName,
        email: "user@example.com", // Replace with dynamic user data if available
        contact: formData.mobileNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentData(null); // Clear payment data after closing modal
  };

  
  const getImageAndColor = () => {
    if (creditScore >= 300 && creditScore <= 650) {
      return { image: CreditScoreImage1, color: "red" };
    } else if (creditScore >= 651 && creditScore <= 700) {
      return { image: CreditScoreImage2, color: "orange" };
    } else if (creditScore >= 701 && creditScore <= 750) {
      return { image: CreditScoreImage3, color: "yellow" };
    } else if (creditScore >= 751 && creditScore <= 800) {
      return { image: CreditScoreImage4, color: "lightgreen" };
    } else if (creditScore >= 801 && creditScore <= 900) {
      return { image: CreditScoreImage5, color: "darkgreen" };
    } else {
      return { image: null, color: "black" }; // Default fallback
    }
  };
  const { image, color } = getImageAndColor();

  return (
    <div>
      <div className="Topnav">
        <div className="logo">
          <img src="../image/RealScoreLogo.png" alt="Logo" height="40px"  />
        </div>
       
      </div>
      <div className="vsep"></div>

      <div className="area">
      <ul className="circles">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <li key={index}></li>
            ))}
        </ul>
        <div className="Pageone">
          {/* Form */}
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

                <div className="input-container">
                  <label htmlFor="full-name">Full Name</label>
                  <input
                    type="text"
                    id="full-name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    aria-label="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="error">{errors.fullName}</p>
                  )}
                </div>

                <div className="input-container">
                  <label htmlFor="pan">PAN Number</label>
                  <input
                    type="text"
                    id="pan"
                    name="pan"
                    value={formData.pan}
                    onChange={handleInputChange}
                    aria-label="Enter your PAN number"
                  />
                  {errors.pan && <p className="error">{errors.pan}</p>}
                </div>

                

                <div className="input-container">
                  <label htmlFor="mobile-number">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobile-number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    maxLength="10"
                    aria-label="Enter your mobile number"
                  />
                  {errors.mobileNumber && (
                    <p className="error">{errors.mobileNumber}</p>
                  )}
                </div>

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="terms">
                    I have read and agree to{" "}
                    <a href="terms-and-conditions" target="_blank" rel="noopener noreferrer">
                      Credit Score Terms of Use
                    </a>{" "}
                    and hereby appoint RealScore as my authorised
                    representative to receive my credit information from{" "}
                    <a href="https://www.cibil.com/">Cibil</a>, <a href="https://www.equifax.com/">Equifax</a>,{" "}
                    <a href="https://www.experian.in/">Experian</a>, or <a href="https://www.crifhighmark.com/">CRIF Highmark</a>{" "}
                    (bureau).
                  </label>
                  {errors.terms && <p className="error">{errors.terms}</p>}
                </div>

                <button
                
                  type="submit"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Get Your Credit Report"}
                </button>
              </form>
            </div>
          </div>
          <div className="vsep"></div>
        </div>
      </div>
      <div className="vsep"></div>
      {/* Modal for displaying JSON data */}
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Consumer Details"
  className="modal"
  overlayClassName="overlay"
>
  
<div className="meter">
<span 
    className="close-icon" 
    onClick={closeModal} 
    title="Close"
  >
    &times;
  </span>
<img className="CreditScoreImage1" src={getImageAndColor(creditScore).image}  />
    <p 
    style={{ color: getImageAndColor(creditScore).color }}
    className="DynamicCreditScore"> {creditScore || "No Data Available"}</p>
  </div>
 
  {paymentData ? (
    <div className="modal-content">
      <div className="columns-container">
       
        <div className="column">
          <div className="details-row">
            <span className="label">Number of Accounts:</span>
            <span className="value">{paymentData?.Accounts || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Number of Open Accounts:</span>
            <span className="value">{paymentData?.openAccounts || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Number of Past Due Accounts:</span>
            <span className="value">{paymentData?.pastDueAccounts || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Number of Write-off Accounts:</span>
            <span className="value">{paymentData?.writeOffAccounts || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Number of Zero Balance Accounts:</span>
            <span className="value">{paymentData?.zeroBalanceAccounts || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Most Severe Status &lt; 24 Months:</span>
            <span className="value">{paymentData?.severeStatus || "-"}</span>
          </div>
        </div>

       
        <div className="column">
         
          <div className="details-row">
            <span className="label">Total Balance Amount:</span>
            <span className="value">{paymentData?.totalBalance || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total Past Due Amount:</span>
            <span className="value">{paymentData?.pastDueAmount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total High Credit:</span>
            <span className="value">{paymentData?.highCredit || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total Sanction Amount:</span>
            <span className="value">{paymentData?.sanctionAmount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total Monthly Payment Amount:</span>
            <span className="value">{paymentData?.monthlyPayment || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Average Open Balance:</span>
            <span className="value">{paymentData?.averageOpenBalance || "-"}</span>
          </div>
        </div>

    
        <div className="column">
          
          <div className="details-row">
            <span className="label">Recent Account:</span>
            <span className="value">{paymentData?.recentAccount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Oldest Account:</span>
            <span className="value">{paymentData?.oldestAccount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Loan Against Bank:</span>
            <span className="value">{paymentData?.loanAgainstBank || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total Credit Limit:</span>
            <span className="value">{paymentData?.totalCreditLimit || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Single Highest Credit:</span>
            <span className="value">{paymentData?.highestCredit || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Single Highest Sanction Amount:</span>
            <span className="value">{paymentData?.highestSanctionAmount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Single Highest Balance:</span>
            <span className="value">{paymentData?.highestBalance || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>No payment data available.</p>
  )}

  <div className="modal-footer">
    {/* <button onClick={closeModal}>Close</button> */}
    <button className="ModalButton"
    onClick={closeModal}>Get Detailed Report</button>
  </div>
</Modal>




    </div>
  );
};

export default FirstComponent;
