import React, { useState, useEffect } from "react";
import "./Pagesix.css";

const CreditScoreMeter = () => {
  const [score, setScore] = useState(750);
  const [currentDescription, setCurrentDescription] = useState("");
  const [direction, setDirection] = useState(1); // 1 for increasing, -1 for decreasing

  const scoreData = [
    {
      range: [300, 650],
      label: "Poor",
      color: "#D32F2F",
      angle: -90,
      descriptions: [
        "You might face challenges getting approved for credit.",
        "Consider working on your credit health for better opportunities.",
      ],
    },
    {
      range: [650, 700],
      label: "Fair",
      color: "#FFA000",
      angle: -45,
      descriptions: [
        "You’re doing okay, but there’s room for improvement.",
        "Lenders might offer you credit with slightly higher interest rates.",
      ],
    },
    {
      range: [700, 750],
      label: "Good",
      color: "#FFC107",
      angle: 0,
      descriptions: [
        "You have a good score. Keep up the responsible behavior!",
        "Most lenders will likely offer you credit on favorable terms.",
      ],
    },
    {
      range: [750, 800],
      label: "Very Good",
      color: "#2DA35D",
      angle: 45,
      descriptions: [
        "Your credit score is very good! You’re eligible for great terms.",
        "Lenders view you as a reliable borrower.",
      ],
    },
    {
      range: [800, 900],
      label: "Excellent",
      color: "#008000",
      angle: 90,
      descriptions: [
        "You have an excellent credit score! Keep up the great work.",
        "You’re in the top tier of credit scores—lenders love this.",
      ],
    },
  ];

  const currentScore = scoreData.find(
    (data) => score >= data.range[0] && score <= data.range[1]
  );

  const needleAngle = currentScore ? currentScore.angle : 0;

  // Update description whenever the score changes
  useEffect(() => {
    if (currentScore) {
      const randomDescription =
        currentScore.descriptions[
          Math.floor(Math.random() * currentScore.descriptions.length)
        ];
      setCurrentDescription(randomDescription);
    }
  }, [currentScore]);

  // Handle auto-increment/decrement every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prevScore) => {
        if (prevScore >= 900 && direction === 1) {
          setDirection(-1); // Switch to decreasing
          return prevScore - 50;
        } else if (prevScore <= 300 && direction === -1) {
          setDirection(1); // Switch to increasing
          return prevScore + 50;
        }
        return prevScore + direction * 50;
      });
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [direction]);

  return (
    <div className="outer">
      <div className="meter-container">
        <h1>What does your credit score mean?</h1>
        <div className="inner1">
          <div className="meter-wrapper">
            <div className="meter-image">
              <img
                src="../image/credit.svg"
                alt="Credit Score Gauge Background"
                className="gauge-background"
              />
              <div
                className="needle"
                style={{
                  transform: `rotate(${needleAngle}deg)`,
                }}
              >
                <div className="needle-arrow"></div>
                <div className="needle-base"></div>
              </div>
            </div>
          </div>
          <div className="score-info">
            <h2 style={{ color: currentScore?.color || "#000" }}>
              {currentScore?.range[0]} - {currentScore?.range[1]} |{" "}
              {currentScore?.label}
            </h2>
            <p>{currentDescription || "Loading description..."}</p>
            <div className="buttons-container">
              <button
                className="btn"
                onClick={() => {
                  setDirection(-1);
                  setScore((prevScore) => Math.max(300, prevScore - 50));
                }}
              >
                Decrease Score
              </button>
              <button
                className="btn"
                onClick={() => {
                  setDirection(1);
                  setScore((prevScore) => Math.min(900, prevScore + 50));
                }}
              >
                Increase Score
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScoreMeter;