import React, { useRef, useEffect } from "react";
import './Pagetwo.css';
import { Playstore } from './Playstore';
import PhonePhoto from './assets/imagess-removebg-preview.webp';

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
        <img src={PhonePhoto} alt="Phone Preview" />
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
            <h2>What is Real Score?</h2>
          </u>
        </div>
        <div
          className="para fade-element fade-in-right"
          ref={(el) => (elementsRef.current[3] = el)}
        >
          <p>
          RealScore Service is your go-to solution for improving credit scores and repairing credit histories. We specialize in removing negative items from your profile, ensuring financial health and easier credit access.
</p>
<p>
Our process starts with an in-depth analysis of your credit report, where we identify errors and discrepancies that may harm your credit standing. Our experts then craft customized strategies to rectify inaccuracies and strengthen your credit profile.
</p>
<p>
By focusing on accuracy and tailored solutions, RealScore empowers you with tools to achieve long-term financial success. Whether it’s correcting errors or providing actionable advice, we minimize future financial risks and help you unlock opportunities like lower interest rates and easier loan approvals.
</p>
<p>
Partner with RealScore for expert-driven credit repair and a brighter financial future.
          </p>
        </div>
        <Playstore />
      </div>
    </div>
  );
};

export default SecondComponent;
