import React from 'react';
import { useEffect, useRef } from "react";
import './Pagefour.css';  // Import the CSS file

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
    { text: "Pay bill on time", image: "/image/icon1.png" },
    { text: "Reduce card utilisation", image: "/image/icon2.avif" },
    { text: "Monitor reports for errors", image: "/image/icon3.png" },
    { text: "Do not open many credit accounts", image: "/image/icon4.jpg" },
    { text: "Maintain mix of accounts", image: "/image/icon5.webp" },
    { text: "Keep old credit accounts active", image: "/image/icon6.jpg" },
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
        <h1>How can you improve your credit score?</h1>
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
