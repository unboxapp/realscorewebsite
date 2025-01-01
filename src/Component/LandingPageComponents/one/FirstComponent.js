import React, { useState } from "react";
import Modal from "react-modal";
import "./Pageone.css";
import { createOrder, creditReportFetch, saveCustomerDetails } from "../../../services/api"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreditScoreImage1 from './assets/300-650.png';
import CreditScoreImage2 from './assets/650-700.png';
import CreditScoreImage3 from './assets/700-750.png';
import CreditScoreImage4 from './assets/750-800.png';
import CreditScoreImage5 from './assets/800-900.png';
import { jsPDF } from "jspdf";
import "jspdf-autotable";


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
  const [reportData, setreportData] = useState(null);
  const [isLoading, setIsLoading]=useState(false);


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
  
    // Validate Mobile Number: Must be 10 digits, no alphabets allowed
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Mobile Number must be exactly 10 digits.";
    }
  
    // Validate Terms Agreement
    if (!formData.terms) newErrors.terms = "You must agree to the Terms and Conditions of Real Score.";
  
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
  
  const generateRandomNumber = () => {
    const number = Math.floor(100000 + Math.random() * 900000);
    return number;
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
        receipt: "website_receipt",
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
        
        setIsLoading(true);
        const body = {
          "refid": `${generateRandomNumber()}`,
          "name": formData.fullName,
          "mobile": formData.mobileNumber,
          "document_id": formData.pan,
        };

        const creditReport = await creditReportFetch(body); 
        // await saveCustomerDetails({
        //   body, credit_report: creditReport
        // });
        
        setreportData(creditReport);
        setIsLoading(false);
        console.log("Credit report saved successfully:", creditReport);
        setIsModalOpen(true);

      } catch (error) {
        console.error("Payment verification failed:", error);
      }
    },
    prefill: {
      name: formData.fullName,
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
    setreportData(null); // Clear payment data after closing modal
  };


  const loadLogo = (path) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path; // Path to the image in the assets folder
      img.crossOrigin = "Anonymous"; // Handle CORS issues if needed
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png")); // Convert to Base64
      };
      img.onerror = (err) => reject(err);
    });
  };

  const downloadPDF = async() => {
    if (!reportData) {
      alert("Data not loaded. Please try again later.");
      return;
    }
  
    const doc = new jsPDF();
  
    const {
      iDAndContactInfo: {
        personalInfo,
        identityInfo,
        addressInfo,
        phoneInfo,
        emailAddressInfo,
      },
      retailAccountsSummary,
      scoreDetails,
      enquiries,
      enquirySummary,
      recentActivities,
    } = reportData.data.cCRResponse.cIRReportDataLst[0].cIRReportData;
    
    // Title and Header
       
    const RealScoreLogo = await loadLogo("/image/RealScoreLogo.png");
    const EquifaxLogo = await loadLogo("/image/EquifaxLogo.png")

    doc.setFontSize(18);
    doc.addImage(RealScoreLogo,"PNG",7,3,26,13);
    doc.text("Equifax Credit Report", 105, 15, { align: "center" });
    doc.addImage(EquifaxLogo,"PNG",170,10,31,6);
    doc.setFontSize(10);
    doc.setDrawColor(0);
    doc.line(10, 20, 200, 20);
    doc.text(`${Date().toLocaleUpperCase()}`, 95, 25);
    doc.text(`Report Order No.: ${reportData.reference_id}`, 10, 25);
    doc.line(10, 32, 200, 32);
  
    let yPosition = 40; // Start position for the content
  
    // Personal Information
    doc.setFontSize(14);
    doc.text(`Consumer Name: ${personalInfo.name.fullName}`, 15, yPosition);
    yPosition += 5;
    doc.autoTable({
      startY: yPosition,
      head: [["Personal Info", "Identification", "Contact Details"]],
      body: [
        [
          `Previous Name: ${personalInfo.previousName || "--"}\nAlias Name: ${personalInfo.aliasName || "--"}\nDOB: ${personalInfo.dateOfBirth}\nAge: ${personalInfo.age.age} Years\nGender: ${personalInfo.gender}\nTotal Income: ${personalInfo.totalIncome}\nOccupation: ${personalInfo.occupation}`,
          `PAN: ${identityInfo.pANId[0]?.idNumber || "--"}\nVoter ID: ${identityInfo.voterId || "--"}\nPassport: ${identityInfo.passport || "--"}\nUID: ${identityInfo.uID || "--"}\nDriver's License: ${identityInfo.driversLicense || "--"}\nRation Card: ${identityInfo.rationCard || "--"}\nPhoto Credit Card: ${identityInfo.photoCreditCard || "--"}\nOther ID: ${identityInfo.otherId[0]?.idNumber || "--"}`,
          `Home: ${phoneInfo[0]?.number || "--"}\nOffice: ${phoneInfo[1]?.number || "--"}\nMobile: ${phoneInfo[2]?.number || "--"}\nAlt. Home/Other No.: ${phoneInfo[3]?.number || "--"}\nAlt. Office: ${phoneInfo[4]?.number || "--"}\nAlt. Mobile: ${phoneInfo[5]?.number || "--"}\nEmail: ${emailAddressInfo[0]?.emailAddress || "--"}`,
        ],
      ],
      styles: { fontSize: 8, cellPadding: 4 },
    });
    yPosition = doc.autoTable.previous.finalY + 15;
  
    // Address Information
    doc.setFontSize(14);
    doc.text("Consumer Address:", 15, yPosition);
    yPosition += 5;
    doc.autoTable({
      startY: yPosition,
      head: [["Type", "Address", "State", "Postal Code", "Last Reported Date"]],
      body: addressInfo.map((address) => [
        address.type,
        address.address,
        address.state,
        address.postal,
        address.reportedDate,
      ]),
      styles: { fontSize: 8, cellPadding: 3 },
    });
    yPosition = doc.autoTable.previous.finalY + 10;
  
    // Score Details
    doc.setFontSize(14);
    doc.text("Equifax Score(s):", 15, yPosition);
    yPosition += 5.7;
    doc.autoTable({
      startY: yPosition,
      head: [["Score Name", "Score", "Scoring Elements"]],
      body: scoreDetails.map((score) => [
        score.name,
        score.value,
        score.scoringElements.map((element) => element.description).join(", "),
      ]),
      styles: { fontSize: 8, cellPadding: 4 },
    });
    yPosition = doc.autoTable.previous.finalY + 15;
  
    // Recent Activities
    doc.setFontSize(14);
    doc.text("Recent Activity:", 15, yPosition);
    yPosition += 5;
    doc.autoTable({
      startY: yPosition,
      head: [
        [
          {
            content: "Recent Activity (last 90 days)",
            colSpan: 4,
            styles: { halign: "center", fontSize: 8, fontStyle: "bold" },
          },
        ],
      ],
      body: [
        [
          `Total Inquiries: ${recentActivities.totalInquiries}`,
          `Accounts Opened: ${recentActivities.accountsOpened}`,
          `Accounts Updated: ${recentActivities.accountsUpdated}`,
          `Accounts Delinquent: ${recentActivities.accountsDeliquent}`,
        ],
      ],
      styles: { fontSize: 8, cellPadding: 4 },
    });
    yPosition = doc.autoTable.previous.finalY + 16;
  
    // Retail Account Summary
    doc.setFontSize(14);
    doc.autoTable({
      startY: yPosition,
      head: [
        [
          {
            content: "Credit Report Summary",
            colSpan: 3,
            styles: { halign: "center", fontSize: 8, fontStyle: "bold" },
          },
        ],
      ],
      body: [
        [
          `Number of Accounts: ${retailAccountsSummary.noOfAccounts}\nNumber of Open Accounts: ${retailAccountsSummary.noOfActiveAccounts}\nNumber of Past Due Accounts: ${retailAccountsSummary.noOfPastDueAccounts}\nNumber of Zero Balance Accounts: ${retailAccountsSummary.noOfZeroBalanceAccounts}\nMost Severe Status < 24 Months: ${retailAccountsSummary.mostSevereStatusWithIn24Months}`,
          `Total Balance Amount: ${retailAccountsSummary.totalBalanceAmount}\nTotal Past Due Amount: ${retailAccountsSummary.totalPastDue}\nTotal High Credit: ${retailAccountsSummary.totalHighCredit}\nTotal Sanction Amount: ${retailAccountsSummary.totalSanctionAmount}\nAverage Open Balance: ${retailAccountsSummary.averageOpenBalance}`,
          `Recent Account: ${retailAccountsSummary.recentAccount}\nOldest Account: ${retailAccountsSummary.oldestAccount}\nTotal Credit Limit: ${retailAccountsSummary.totalCreditLimit}\nSingle Highest Credit: ${retailAccountsSummary.singleHighestCredit}\nSingle Highest Sanction Amount: ${retailAccountsSummary.singleHighestSanctionAmount}\nSingle Highest Balance: ${retailAccountsSummary.singleHighestBalance}`,
        ],
      ],
      styles: { fontSize: 7, cellPadding: 4 },
    });
    yPosition = doc.autoTable.previous.finalY + 15;
  
    // Enquiry Summary
    doc.setFontSize(14);
    doc.text("Enquiry Summary:", 15, yPosition);
    yPosition += 5;
    doc.autoTable({
      startY: yPosition,
      head: [
        ["Purpose", "Total", "Past 30 Days", "Past 12 months", "Past 24 Months", "Recent"],
      ],
      body: [
        [
          `${enquirySummary.purpose}`,
          `${enquirySummary.total}`,
          `${enquirySummary.past30Days}`,
          `${enquirySummary.past12Months}`,
          `${enquirySummary.past24Months}`,
          `${enquirySummary.recent}`,
        ],
      ],
      styles: { fontSize: 8, cellPadding: 4 },
    });
    yPosition = doc.autoTable.previous.finalY + 15;
  
    // Enquiries
    doc.setFontSize(14);
    doc.text("Enquiries:", 15, yPosition);
    yPosition += 5;
    doc.autoTable({
      startY: yPosition,
      head: [["Institution", "Date", "Time", "Purpose", "Amount"]],
      body: enquiries.map((enquiry) => [
        enquiry.institution,
        enquiry.date,
        enquiry.time,
        enquiry.requestPurpose,
        enquiry.amount,
      ]),
      styles: { fontSize: 8, cellPadding: 4 },
    });
  
    // Save PDF
    doc.save("Equifax_Credit_Report.pdf");
  };
  
  const creditScore=reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.scoreDetails[0].value;
  
  const getImageAndColor = () => {
    if (creditScore >= 300 && creditScore <= 650) {
      return { image: CreditScoreImage1, color: "#e7554a" };
    } else if (creditScore >= 651 && creditScore <= 700) {
      return { image: CreditScoreImage2, color: "#f59d33" };
    } else if (creditScore >= 701 && creditScore <= 750) {
      return { image: CreditScoreImage3, color: "#e3b53e" };
    } else if (creditScore >= 751 && creditScore <= 800) {
      return { image: CreditScoreImage4, color: "#0b8c4c" };
    } else if (creditScore >= 801 && creditScore <= 900) {
      return { image: CreditScoreImage5, color: "#075a31" };
    } else {
      return { image: null, color: "black" }; // Default fallback
    }
  };
  

  return (
    <div>
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
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
 
  {reportData ? (
    <div className="modal-content">
      <div className="columns-container">
       
        <div className="column">
          <div className="details-row">
            <span className="label">Number of Accounts:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.noOfAccounts || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Number of Open Accounts:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.accountsOpened || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Number of Past Due Accounts:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.noOfPastDueAccounts || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Number of Write-off Accounts:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.noOfWriteOffs || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Number of Zero Balance Accounts:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.noOfZeroBalanceAccounts || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Most Severe Status &lt; 24 Months:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.mostSevereStatusWithIn24Months || "-"}</span>
          </div>
        </div>

       
        <div className="column">
         
          <div className="details-row">
            <span className="label">Total Balance Amount:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.totalBalanceAmount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total Past Due Amount:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.totalPastDue || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total High Credit:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.highestCredit || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total Sanction Amount:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.totalSanctionAmount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total Monthly Payment Amount:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.totalMonthlyPaymentAmount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Average Open Balance:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.averageOpenBalance || "-"}</span>
          </div>
        </div>

    
        <div className="column">
          
          <div className="details-row">
            <span className="label">Recent Account:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.recentAccount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Oldest Account:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.oldestAccount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Total Credit Limit:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.totalCreditLimit || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Single Highest Credit:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.singleHighestCredit || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Single Highest Sanction Amount:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.singleHighestSanctionAmount || "-"}</span>
          </div>
          <div className="details-row">
            <span className="label">Single Highest Balance:</span>
            <span className="value">{reportData?.data.cCRResponse.cIRReportDataLst[0].cIRReportData.retailAccountsSummary.singleHighestBalance || "-"}</span>
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
    onClick={downloadPDF}>Get Detailed Report</button>
  </div>
</Modal>
    </div>
  );
};

export default FirstComponent;
