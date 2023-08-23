import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import img from "../../images/pngegg.png";
import img2 from "../../images/pngegg2.png";

export default function LandingPage() {
  return (
    <div className={style.position}>
      <div style={{display:'flex', flexFlow:'column'}}>
        <img src={img} alt="Pokemon" width="400px" />
        <Link to="/home">
          <button className={style.boton}>Home</button>
        </Link>
      </div>
      <img src= {img2} alt="Loading.." width='500px'/>
    </div>
  );
}
