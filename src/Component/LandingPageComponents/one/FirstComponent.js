import React, { useState } from "react";
import "./Pageone.css";
import { createOrder } from "../../../services/api"; // Ensure this API function is implemented correctly.
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const FirstComponent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    pan: "",
    dob: "",
    mobileNumber: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for the current field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.pan.trim()) {
      newErrors.pan = "PAN Number is required.";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = "Enter a valid PAN Number.";
    }
    if (!formData.dob.trim()) newErrors.dob = "Date of Birth is required.";
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required.";
    } else if (formData.mobileNumber.trim().length !== 10) {
      newErrors.mobileNumber = "Mobile Number must be 10 digits.";
    }
    if (!formData.terms) newErrors.terms = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    className="dob"
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    aria-label="Enter your date of birth"
                  />
                  {errors.dob && <p className="error">{errors.dob}</p>}
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
    </div>
  );
};

export default FirstComponent;
