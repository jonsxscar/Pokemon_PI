import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import style from "./Detail.module.css";
import { getDetail } from "../../redux/action/action";
import { Link } from "react-router-dom";
import poke from "../../images/bolaPokemon.png";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams(); //Permite acceder a los valores de los parámetros definidos en las rutas de tu aplicación.
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id]);

  const typesColors = {
    //colores interactivos al type del pokemon
    fire: style.fire,
    normal: style.normal,
    fighting: style.fighting,
    flying: style.flying,
    ground: style.ground,
    poison: style.poison,
    rock: style.rock,
    bug: style.bug,
    ghost: style.ghost,
    steel: style.steel,
    water: style.water,
    grass: style.grass,
    electric: style.electric,
    psychic: style.psychic,
    ice: style.ice,
    dragon: style.dragon,
    dark: style.dark,
    fairy: style.fairy,
    unknown: style.unknown,
    shadow: style.shadow,
  };

  if (detail) {
    const detailTypes = detail.types
      ? detail.types.map((type) => type.name) //sin condicional me arroja error por estar vacio al inicio
      : [];

    return (
      //boton de back al home
      <div className={style.containerAll}>
        <Link to="/home">
          <button className={style.poke}>
            <img src={poke} alt="pokebola" width="20px" /> Back
          </button>
        </Link>

        <div className={style.containerDetail}>
          <div className={style.containerImg}>
            <h1 className={`${style.titleImg} ${typesColors[detailTypes[0]]}`}>
              {detail.name ? detail.name.toUpperCase() : ""}
            </h1>
            <img src={detail.img} alt="poki" width="400em" />
          </div>

          <div>
            <h1
              className={`${style.titleDetails} ${typesColors[detailTypes[0]]}`}
            >
              POKEMON DETAILS
            </h1>

            <div className={style.about}>
              <span className={style.subTitle}>About</span>
              <ul>
                <li className={style.list}>DATE: {detail.date} </li>
                <li className={style.list}>ID: {detail.id}</li>
                <li className={style.list}>HAPPINESS: {detail.happiness}</li>
                <li className={style.list}>CAPTURE RATE: {detail.capture} </li>
                <li
                  className={`${style.typetitle} ${
                    typesColors[detailTypes[0]]
                  }`}
                >
                  TYPES:{" "}
                  {detail.types
                    ? detail.types.map((type) => type.name).join(", ")
                    : "No types available"}
                </li>
              </ul>
            </div>

            <div className={style.stats}>
              <span className={style.subTitle}>Stats</span>
              <ul>
                <li className={style.list}>HP: {detail.hp}</li>
                <li className={style.list}>ATTACK: {detail.attack}</li>
                <li className={style.list}>DEFENSE: {detail.defense}</li>
                <li className={style.list}>SPEED: {detail.speed}</li>
                <li className={style.list}>WEIGHT: {detail.weight / 10}kg</li>
                <li className={style.list}>HEIGHT: {detail.height / 10}m</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
