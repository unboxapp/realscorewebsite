import React from 'react';
import './Pagetwo.css';
import { Playstore } from './Playstore';

const SecondComponent = () => {
  return (
    <div className="Pagetwo">
      <div className="PhoneLeft">
        <img src="./image/imagess-removebg-preview.png" alt="Phone Preview" />
      </div>
      <div className="WhatisRight">
        <div className="heading">
          <u>
            <h1>What is Real Score?</h1>
          </u>
        </div>
        <div className="para">
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
          <Playstore/>
        </div>
      </div>
    </div>
  );
};

export default SecondComponent;
