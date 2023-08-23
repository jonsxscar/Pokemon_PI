import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar';

//import random from "../../images/random.png";
import style from "./HomePage.module.css";
//import game from "../../images/game.png";

export default function Home() {
  return (
    <div className={style.home}>
        <Navbar />
      <button>Reload all img</button>
      <Link
        to="/game"
        style={{ textDecoration: "none" }}
        className={style.game}>
        <button className={style.poke}>game opcional</button>
      </Link>

      <div className={style.sortfilter}>
        <select>
          <option value="normal">Normal</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
          <option value="HAttack">Highest Attack</option>
          <option value="LAttack">Lowest Attack</option>
        </select>
        <select>
          <option value="All">All</option>
          <option value="Api">API</option>
          <option value="Created">Created</option>
        </select>
        <select>
          <option value="All">all types</option>
        </select>
      </div>

      <div className={style.cards}></div>
    </div>
  );
}

/* me falta crear las accions y estas funcionalidades...
 segun yo deberia crear para ordenar osea filtrar por orden, tipos y creados.
   tambien otra accion que me obtenga los pokemones, otra que me de los tipos, otra para crear (post) los pokemones
otra para los nombres de los pokemones (aunque aqui me toca averiguar), otra para obtener los detalles del pokemon.
   toca hacer el componente de cartas y el css, igual del detail y el de la creacion del pokemon.
*de momento el mini juego lo veo dificil de aplicar asi que quizas lo descarte */
