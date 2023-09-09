import React, { useState } from 'react';
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import logolanding from "../../images/logolanding.png";
import landing from "../../images/landing.png";
import poke from "../../images/ball.png";


export default function LandingPage() {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={style.position}>
      <div style={{ display: "flex", flexFlow: "column" }}>
        <img src={logolanding} alt="Pokemon" width="300px" />
        <Link to="/home">
          <button
            className={style.poke}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={poke} alt="pokebola" width="250px" />
            <span className={style.homeText}>HOME</span>
          </button>
        </Link>
      </div>
      <img
        src={landing}
        alt="pikachu"
        className={`${style.landing} ${isHovered ? style.landingHovered : ''}`}
        width="500px"
      />
    </div>
  );
}
