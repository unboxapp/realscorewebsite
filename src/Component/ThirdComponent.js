import React from "react";
import "./Pagethree.css"; // Importing the same CSS file for styling

const PageThree = () => {
  return (
    <div className="area">
    <ul className="circles">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <li key={index}></li>
        ))}
    </ul>
    <div className="Pagethree1">
      {/* Heading Section */}
      <div className="heading3">
        <h1>Why keep track of credit score?</h1>
      </div>

      {/* Layered Card Section */}
      <div className="boxess">
        {/* First Box */}
        <div className="box">
          {/* Card 1 */}
          <Card 
            imageSrc="../image/one.png" 
            description="Monthly free credit report" 
          />
          {/* Card 2 */}
          <Card 
            imageSrc="../image/two.png" 
            description="Detailed analysis of factors affecting score" 
          />
        </div>

        {/* Separator */}
        <div className="seperator"></div>

        {/* Second Box */}
        <div className="box">
          {/* Card 3 */}
          <Card 
            imageSrc="../image/three.png" 
            description="Personalised tips on improving & building score" 
          />
          {/* Card 4 */}
          <Card 
            imageSrc="../image/four.png" 
            description="Pre-approved offers" 
          />
        </div>
      </div>
      </div>
      </div>

  );
};

// Card Component
const Card = ({ imageSrc, description }) => {
  return (
    <div className="card">
      <div className="imgBx">
        <img src={imageSrc} alt="card visual" />
      </div>
      <div className="details">
        <h2>{description}</h2>
      </div>
    </div>
    
  );
};

export default PageThree;