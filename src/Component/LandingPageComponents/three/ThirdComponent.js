import React, { useRef, useEffect } from "react";
import "./Pagethree.css";

// Importing images properly
import OnePic from './assets/one.webp';
import TwoPic from './assets/two.webp';
import ThreePic from './assets/three.webp';
import FourPic from './assets/four.webp';

const PageThree = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
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
        <div
          className="heading3 scale-element"
          ref={(el) => (elementsRef.current[0] = el)}
        >
          <h2>Why keep track of credit score?</h2>
        </div>

        {/* Layered Card Section */}
        <div className="boxess">
          {/* First Box */}
          <div className="box">
            <Card
              imageSrc={OnePic}
              description="Monthly free credit report"
              ref={(el) => (elementsRef.current[1] = el)}
            />
            <Card
              imageSrc={TwoPic}
              description="Detailed analysis of factors affecting score"
              ref={(el) => (elementsRef.current[2] = el)}
            />
          </div>

          {/* Separator */}
          <div className="seperator"></div>

          {/* Second Box */}
          <div className="box">
            <Card
              imageSrc={ThreePic}
              description="Personalised tips on improving & building score"
              ref={(el) => (elementsRef.current[3] = el)}
            />
            <Card
              imageSrc={FourPic}
              description="Pre-approved offers"
              ref={(el) => (elementsRef.current[4] = el)}
            />
          </div>
          <div className="vsep"></div>
        </div>
      </div>
    </div>
  );
};

// Card Component
const Card = React.forwardRef(({ imageSrc, description }, ref) => {
  return (
    <div className="card scale-element" ref={ref}>
      <div className="imgBx">
        <img src={imageSrc} alt="card visual" />
      </div>
      <div className="details">
        <h2>{description}</h2>
      </div>
    </div>
  );
});

export default PageThree;
