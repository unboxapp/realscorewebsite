import React, { useRef, useEffect } from "react";
import './Pagetwo.css';
import { Playstore } from './Playstore';

const SecondComponent = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="Pagetwo">
      <div
        className="PhoneLeft fade-element fade-in-left"
        ref={(el) => (elementsRef.current[0] = el)}
      >
       <img src="./image/imagess-removebg-preview.png" alt="Phone Preview" />
      </div>
      <div
        className="WhatisRight fade-element fade-in-right"
        ref={(el) => (elementsRef.current[1] = el)}
      >
        <div
          className="heading fade-element fade-in-top"
          ref={(el) => (elementsRef.current[2] = el)}
        >
          <u>
            <h1>What is Real Score?</h1>
          </u>
        </div>
        <div
          className="para fade-element fade-in-right"
          ref={(el) => (elementsRef.current[3] = el)}
        >
          <p>
            RealScore Service is your trusted partner in repairing credit scores
            and credit histories. By removing negative flags from your profile,
            it ensures credit becomes more accessible and financial health
            improves.
          </p>
          <p>
            The process begins with a detailed examination of your credit
            report. Experts meticulously identify errors, discrepancies, or
            areas requiring improvement to create an accurate and reliable
            credit profile.
          </p>
          <p>
            Beyond identifying issues, RealScore implements tailored strategies
            to rectify errors and strengthen your credit profile. These
            solutions are customized to address your unique financial
            challenges.
          </p>
          <p>
            This comprehensive approach minimizes future financial risks and
            empowers you with a healthier credit standing, unlocking better
            opportunities for a brighter future.
          </p>
        </div>
        <Playstore></Playstore>
      </div>
    </div>
  );
};

export default SecondComponent;
