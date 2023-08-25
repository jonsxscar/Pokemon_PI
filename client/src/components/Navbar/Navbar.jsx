import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Navbar.module.css";
import logohome from "../../images/logolanding.png";

export default function Navbar() {
  return (
    <nav className={style.nav}>
      <Link to="/">
        <span className={style.landinglink}>
          <img
            id="logoPoke"
            src={logohome}
            width="120"
            alt="landing"
          />
        </span>
      </Link>
      <SearchBar />
      <Link to="/pokemons">
        <button className={style.create}>Create</button>
      </Link>
    </nav>
  );
}
