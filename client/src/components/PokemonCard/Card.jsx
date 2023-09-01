import React from "react";
import style from "./Card.module.css";

export default function Card({ name, types, img, weight, height }) {
  const typesColors = {
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

  return (
    <div
      className={style.card}
      style={{ backgroundImage: `url(images/typesbkgm/${types[0]}.png)` }} 
      
    >
      <span className={style.name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </span>

      <img src={img} alt="Img not found" height="130px" className={style.img} />

      <span className={`${style.typetitle} ${typesColors[types[0]]}`}>
        Types
      </span>
      <div className={style.types}>
        {types ? (
          types.map((el) => {
            return (
              <img
                src={`images/types/${el}.png`}
                alt="Types"
                height="90px"
                key={el}
              />
            );
          })
        ) : (
          <span>Types not found</span>
        )}
        {/* <span>{types}</span> */}
      </div>
      <span className={`${style.aboutitle} ${typesColors[types[0]]}`}>
        About
      </span>
      <div className={style.about}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className={style.pokweight}>{weight / 10}kg</span>
          <span className={style.weight}>Weight</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "24%",
          }}
        >
          <span className={style.pokheight}>{height / 10}m</span>
          <span className={style.height}>Height</span>
        </div>
      </div>
    </div>
  );
}
