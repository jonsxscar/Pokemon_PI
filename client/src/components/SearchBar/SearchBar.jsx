import React from "react";
//import { useDispatch } from 'react-redux';
//import { getPokemonName } from '../../actions';
import style from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={style.searchBox}>
      <form>
        <input
          className={style.searchTxt}
          type="text"
          placeholder="Search Pokemon..."
        />
        <button
          type="submit"
          className={style.searchBtn}
          style={{ outline: "none" }}
        >
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}
