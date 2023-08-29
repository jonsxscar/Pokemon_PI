import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import './details.css'
import { getDetail } from "../../redux/action/action";
import { Link } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id]);

  /*   let barraHp = null;
  let barraAttack = null;
  let barraDefense = null;
  let barraSpeed = null; */

  if (detail) {
    let porcentajeHp = (detail.hp / 255) * 100;
    let porcentajeAttack = (detail.attack / 255) * 100;
    let porcentajeDefense = (detail.defense / 255) * 100;
    let porcentajeSpeed = (detail.speed / 255) * 100;

    /*     barraHp = React.CSSProperties = {
      "--bar-value": porcentajeHp.toString() + "%",
    };
    barraAttack = React.CSSProperties = {
      "--bar-value": porcentajeAttack.toString() + "%",
    };
    barraDefense = React.CSSProperties = {
      "--bar-value": porcentajeDefense.toString() + "%",
    };
    barraSpeed = React.CSSProperties = {
      "--bar-value": porcentajeSpeed.toString() + "%",
    };
  } */

    return (
      <div>
        <div className="container-title-details">
          <h1 className="details_title">POKEMON DETAILS</h1>
        </div>

        <div className="container_details">
          <div>
            <img
              className="details_image"
              src="https://vignette.wikia.nocookie.net/doblaje/images/c/c2/Ash_Ketchum_BW.png/revision/latest?cb=20161002052941&path-prefix=es"
              alt="ashe"
              height="80px"
            />
          </div>
        </div>

        <div className="details_stats">
          <div>
            <span className="stats_title">Measures</span>
            <ul className="list">
              <img src={detail.img} alt="poki" />
              <li className="item">name: {detail.name}</li>
              <li className="item">Weight: {detail.weight}</li>
              <li className="item">Height: {detail.height}</li>
              <li className="item">hp: {detail.hp}</li>
              <li className="item">speed: {detail.speed}</li>
              <li className="item">attack: {detail.attack}</li>
              <li className="item">defense: {detail.defense}</li>
              <li className="item">
                tipos:{" "}
                {detail.types
                  ? detail.types.map((type) => type.name).join(", ")
                  : "No types available"}
              </li>
            </ul>
            <Link to='/home'><button>Back</button></Link>
          </div>
        </div>
      </div>
    );
  }
}
