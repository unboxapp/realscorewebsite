import React, { useState, useEffect } from "react";
import "./Pagefive.css";
// Import Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faHistory,
  faCalendarAlt,
  faUsers,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const FifthComponent = () => {
  const [activeDropdown, setActiveDropdown] = useState("credit-utilization");
  const [activeImpact, setActiveImpact] = useState("high-impact");
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = (id) => {
    // Toggle the dropdown
    setActiveDropdown(activeDropdown === id ? null : id);

    // Set the active pyramid impact
    if (id === "credit-utilization" || id === "payment-history") {
      setActiveImpact("high-impact");
    } else if (id === "credit-history" || id === "total-accounts") {
      setActiveImpact("medium-impact");
    } else if (id === "credit-enquiries") {
      setActiveImpact("low-impact");
    } else {
      setActiveImpact("");
    }
  };

  useEffect(() => {
    const fadeInElements = document.querySelectorAll(".fade-in-left, .fade-in-right");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    fadeInElements.forEach((element) => observer.observe(element));

    return () => {
      fadeInElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="containerf2">
      <div className="containerf">
        {/* Heading */}
        <h2 className="main-headingf fade-in-left">
          Factors Affecting <span className="highlight">Credit Score</span>
        </h2>

        <div className="content-wrapperf">
          {/* Dropdown Content Section */}
          <div className="contentf ">
            <div className="dropdown-itemf fade-in-left">
              {[
                {
                  id: "credit-utilization",
                  icon: <FontAwesomeIcon icon={faCreditCard} />,
                  title: "Credit Utilization",
                  text: "Credit utilization is the percentage of the credit balance utilized across your credit account and your total credit limit across all your accounts.",
                },
                {
                  id: "payment-history",
                  icon: <FontAwesomeIcon icon={faHistory} />,
                  title: "Payment History",
                  text: "The Payment history is the account of several timely payments made in each account of credit availed by the user in the last 36 months.",
                },
                {
                  id: "credit-history",
                  icon: <FontAwesomeIcon icon={faCalendarAlt} />,
                  title: "Credit History",
                  text: "Credit History is a record of how a person manages debt, such as credit cards and loans. Credit History helps Credit Bureaus track activity against each account. It forms the majority part of the credit report.",
                },
                {
                  id: "total-accounts",
                  icon: <FontAwesomeIcon icon={faUsers} />,
                  title: "Total Accounts",
                  text: "Accounts comprise various credit/loans taken by you, including credit cards, home loans, Personal loans, Car loans, Consumer loans, etc. Credit accounts or credit mix is an important parameter that affects the credit score.",
                },
                {
                  id: "credit-enquiries",
                  icon: <FontAwesomeIcon icon={faSearch} />,
                  title: "Credit Enquiries",
                  text: "A credit inquiry is a request by an institution for credit report information from a credit bureau. Credit inquiries are generally of two types: - Hard enquiry & Soft enquiry.",
                },
              ].map((item) => (
                <div
                  className={`dropdown-itemf fade-in-left hidden`}
                  key={item.id}
                >
                  <div
                    className="dropdown-headerf"
                    onClick={() => toggleDropdown(item.id)}
                  >
                    <span className="iconf">{item.icon}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <div
                    className={`dropdown-contentf ${
                      activeDropdown === item.id ? "show" : ""
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pyramid Section */}
          <div className="pyramid fade-in-right">
            <div
              className={`triangle high-impact ${
                activeImpact === "high-impact" ? "active" : "blurred"
              }`}
            >
              <div className="triangle-text h">High Impact</div>
            </div>
            <div
              className={`triangle medium-impact ${
                activeImpact === "medium-impact" ? "active" : "blurred"
              }`}
            >
              <div className="triangle-text m">Medium Impact</div>
            </div>
            <div
              className={`triangle low-impact ${
                activeImpact === "low-impact" ? "active" : "blurred"
              }`}
            >
              <div className="triangle-text l">Low Impact</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FifthComponent;
