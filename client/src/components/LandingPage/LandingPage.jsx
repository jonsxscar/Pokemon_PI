import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import logolanding from "../../images/logolanding.png";
import landing from "../../images/landing.png";
//import bola from "../../images/bolaPokemon.png";

export default function LandingPage() {
  return (
    <div className={style.position}>
      <div style={{display:'flex', flexFlow:'column'}}>
        <img src={logolanding} alt="Pokemon" width="300px" />
        <Link to="/home">
          <button className={style.boton}>Home</button>
        </Link>
      </div>
      <img src= {landing} alt="Loading.." width='500px'/>
    </div>
  );
}
