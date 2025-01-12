import React from 'react';
import { useEffect, useRef } from "react";
import './Pagefour.css';  // Import the CSS
import Icon1 from './assets/icon1.webp';
import Icon2 from './assets/icon2.webp';
import Icon3 from './assets/icon3.webp';
import Icon4 from './assets/icon4.webp';
import Icon5 from './assets/icon5.webp';
import Icon6 from './assets/icon6.webp';

const FourthComponent = () => {
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Ensure animation triggers only once
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );
// Observe the heading
if (headingRef.current) observer.observe(headingRef.current);

// Observe the cards
cardsRef.current.forEach((card) => {
  if (card) observer.observe(card);
});

return () => {
  // Cleanup observers
  if (headingRef.current) observer.unobserve(headingRef.current);
  cardsRef.current.forEach((card) => {
    if (card) observer.unobserve(card);
  });
};
}, []);

  const cardData = [
    { text: "Pay bill on time", image: Icon1 },
    { text: "Reduce card utilisation", image: Icon2 },
    { text: "Monitor reports for errors", image: Icon3 },
    { text: "Do not open many credit accounts", image: Icon4 },
    { text: "Maintain mix of accounts", image: Icon5 },
    { text: "Keep old credit accounts active", image: Icon6 },
  ];

  return (
    <div className="area">
        <ul className="circles">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <li key={index}></li>
            ))}
        </ul>
    <div className="cards-list">
      <div className="Heading scale-element" ref={headingRef}>
        <h2>How can you improve your credit score?</h2>
      </div>
      {cardData.map((card, index) => (
        <div key={index} className="cardy scale-element " ref={(el) => (cardsRef.current[index] = el)}>
          <div className="card_image">
            <img src={card.image} className={`card${index+1}`} alt={`Card ${index + 1}`} />
          </div>
          <div className="card_title title-white">
            <p>{card.text}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FourthComponent;
