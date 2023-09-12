import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({
  pokemonsPerPage,
  allPokemons,
  paginado,
  page,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) { //math.ceil redondeo hacia arriba
    pageNumbers.push(i + 1); //comienza en 1
  }

  return (
    <nav>
      <ul className={style.pagination}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} style={{ listStyle: "none" }}>
              <button
                className={style.buttons}
                style={page === number ? { color: "white" } : {}} //el {} es no aplicar estilos si page no es igual a number
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
