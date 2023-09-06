import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Card from "../PokemonCard/Card";
import Paginado from "../Paginado/paginado";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterCreated,
  orderByNameOrStrengh,
  getTypes,
  removeDetail,
  filterPokemonsByType,
  reloadPokemons,
} from "../../redux/action/action";
//import random from "../../images/random.png";
import style from "./HomePage.module.css";
import poke from "../../images/bolaPokemon.png";
import notFound from "../../images/notfound.png"
import loading from "../../images/loading.gif";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const all = useSelector((state) => state.allPokemons);
  const types = useSelector((state) => state.types);

  //variables de orden y paginacion basicamente
  const [pokLoaded, setPokLoaded] = useState(all.length ? true : false); //si all es = vacio, pokloaded es false, else true
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // valor 1
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12); //valor 12
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon); //contendrá los Pokémon desde la posición 0 (el primer Pokémon) hasta la posición 11 (el Pokémon número 12) en el array allPokemons

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(removeDetail());
    dispatch(getTypes());
    if (!pokLoaded) {
      dispatch(getPokemons());
    }
  }, [pokLoaded, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allPokemons.length, setCurrentPage]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(reloadPokemons());
  }

  function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
}

function handleFilterByType(e){
    dispatch(filterPokemonsByType(e.target.value));
}

function handleSort(e){
    e.preventDefault();
    dispatch(orderByNameOrStrengh(e.target.value));
    setCurrentPage(1); // que siga manteniendo la pag 1 despues del order
    setOrden(`Ordenado ${e.target.value}`)
}

  return (
    <div className={style.home}>
      <Navbar />
      <button //boton de recargar pokemon
        onClick={(e) => {
          handleClick(e);
        }}
        className={style.poke}
      >
        <img src={poke} alt="pokebola" width="20px" /> Reload all
      </button>

      <div className={style.sortfilter}>
        <select onChange={e => handleSort(e)}>
          <option value="normal">Normal</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
          <option value="HAttack">Highest Attack</option>
          <option value="LAttack">Lowest Attack</option>
        </select>
        <select onChange={e => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="Api">API</option>
          <option value="Created">Created</option>
        </select>
        <select onChange={e => handleFilterByType(e)}>
          <option value="All">all types</option>
          {
                        types.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                    }
        </select>
      </div>

      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
        page={currentPage}
      />

      <div className={style.cards}>
        {currentPokemons.length ? ( //verifica si contiene algo
          typeof currentPokemons[0] === "object" ? ( //verifica si es un objeto
            currentPokemons.map((el) => {
              return (
                <div>
                  <Link
                    to={"/home/" + el.id}
                    style={{ textDecoration: "none" }}
                    key={el.id}
                  >
                    <Card
                      name={el.name}
                      types={el.types}
                      img={el.img}
                      id={el.id}
                      weight={el.weight}
                      height={el.height}
                    />
                  </Link>
                </div>
              );
            })
          ) : (//si currentPokemons no contiene nada
            <div className={style.notfound}> 
              <img
                src={notFound}
                alt="Pokemon not found"
                width="150px"
              />
              <span>{currentPokemons[0]} not found :'c</span>
            </div>
          )
        ) : (//mensaje de carga
          <div className={style.loading}>
            <img src={loading} alt="Loading.." width="250px" />
            <p className={style.loadingtext}>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

