import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, getPokemons } from "../../redux/action/action";
import { Link } from "react-router-dom";
import style from "./PokemonCreate.module.css";
import poke from "../../images/bolaPokemon.png";
import create from "../../images/created.png";

const stringRegExp = /^[a-zA-Z]{1,20}$/;
const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;

// Función para validar la entrada del formulario
const validate = (state, name) => {
  let error = {};
  if (name === "name") {
    if (state.name === "") error.name = "The Pokémon must have a name.";
    if (state.name !== "" && !stringRegExp.test(state.name)) {
      error.name = "The Pokémon shouldn't have signs.";
    }
    if (state.name.split("").some((letter) => !isNaN(parseInt(letter, 10)))) {
      error.name = "The name not contain numbers";
    }
  }
  return error;
};

const Formulario = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [state, setState] = useState({
    name: "",
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: "",
    weight: "",
    img: "",
    types: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    hp: "",
    attack: "",
    height: "",
    weight: "",
    defense: "",
    img: "",
    types: "",
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  function handleClick() {
    dispatch(getPokemons());
  }

  const handleChange = (e) => {
    //mirar errores name, height, weight,
    if (e.target.name === "name" && e.target.value.length > 1) {
      if (!stringRegExp.test(e.target.value)) {
        console.log(errors);
        return false;
      }
    }
    if (e.target.name === "name" && e.target.value.length > 13) {
      setErrors({
        ...errors,
        [e.target.name]: "No more than 12 characters.",
      });
      return false;
    }

    if (e.target.name === "height" || e.target.name === "weight") {
      if (!numberRegExp.test(e.target.value) && e.target.value.length !== 0) {
        setErrors({
          ...errors,
          [e.target.name]: "999 is the maximum allowed.",
        });
        console.log(errors);
        return false;
      }
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...state,
          [e.target.name]: e.target.value,
        },
        e.target.name
      )
    );
  };

  function handleChangeType(e) {
    if (e.target.value === "0") return;

    if (
      state.types.filter((type) => type.name === e.target.value).length === 0
    ) {
      let newType = { name: e.target.value };
      setState({
        ...state,
        types: [...state.types, newType],
      });

      setErrors(
        validate(
          {
            ...state,
            types: [...state.types, newType],
          },
          e.target.name
        )
      );

      if (state.types.length === 2 - 1) {
        e.target.disabled = true;
      }
    }
    e.target.value = "0";
  }

  const handlerClose = (e) => {
    let newTypes = state.types.filter((type) => type.name !== e.target.value);
    setState({
      ...state,
      types: newTypes,
    });

    if (state.types.length < 2 + 1) {
      document.getElementById("typesSelect").disabled = false;
    }

    setErrors(
      validate({
        ...state,
        types: newTypes,
      })
    );
  };

  const onChangeRange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convierte los tipos seleccionados en una cadena separada por comas

    if (
      state.img &&
      state.name &&
      state.height &&
      state.weight &&
      state.types.length > 0 &&
      Object.keys(errors).length === 0
    ) {
      // Llama a la función postPokemon con typesString en lugar de state.types
      const type = state.types.map((type) => type.name).join(",");
      console.log(state.types);
      console.log(type);
      const modifiedState = { ...state, type };
      delete modifiedState.types; // Elimina la propiedad "types"
      dispatch(postPokemon(modifiedState));
    } else {
      alert("Please complete the form correctly before submitting.");
    }
  };

  return (
    <div>
      <Link to="/home">
        <button
          className={style.poke}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <img src={poke} alt="pokebola" width="20px" /> Back
        </button>
      </Link>

      <div className={style.title}>
        <h1>Create Pokémon</h1>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.container1}>
          <div>
            <img src={create} alt="crear" width="250em" />
          </div>
          <div className={style.stats}>
            <div>
              <label>Types </label>
              <select
                defaultValue="0"
                id="typesSelect"
                name="types"
                onChange={handleChangeType}
                className={style.selection}
              >
                <option value="0">Select Types</option>
                {types.map((type, index) => (
                  <option key={index} value={type.name}>
                    {type.name[0].toUpperCase() + type.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {state.types.map((type, index) => (
                <div key={index}>
                  <span>{type.name[0].toUpperCase() + type.name.slice(1)}</span>
                  <button
                    value={type.name}
                    onClick={handlerClose}
                    className={style.close}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div>
              <span>HP</span>
              <input
                type="range"
                name="hp"
                onChange={onChangeRange}
                min={1}
                max={255}
                value={state.hp}
              />
            </div>
            <span>{state.hp}</span>
            <div>
              <span>DEFENSE</span>
              <input
                type="range"
                name="defense"
                onChange={onChangeRange}
                min={1}
                max={255}
                value={state.defense}
              />
            </div>
            <span>{state.defense}</span>
            <div>
              <span>ATTACK</span>
              <input
                type="range"
                name="attack"
                onChange={onChangeRange}
                min={1}
                max={255}
                value={state.attack}
              />
            </div>
            <span>{state.attack}</span>
            <div>
              <span>SPEED</span>
              <input
                type="range"
                name="speed"
                onChange={onChangeRange}
                min={1}
                max={255}
                value={state.speed}
              />
            </div>
            <span>{state.speed}</span>
          </div>
        </div>

        <div className={style.container2}>
          <div className={style.date}>
            <div>
              <label>Name </label>
              <input
                value={state.name}
                placeholder="Name"
                type="text"
                name="name"
                onChange={handleChange}
              />
              <p>{errors && errors.name}</p>
            </div>
            <div className={style.link}>
              <label>Img </label>
              <input
                value={state.img}
                placeholder="Url img"
                type="text"
                name="img"
                onChange={handleChange}
              />
              <p>{errors && errors.img}</p>
            </div>
            <div>
              <label>Height </label>
              <input
                value={state.height}
                placeholder="1  ⇄  999"
                type="text"
                name="height"
                onChange={handleChange}
              />
              <p>{errors && errors.height}</p>
            </div>
            <div>
              <label>Weight </label>
              <input
                value={state.weight}
                placeholder="1  ⇄  999"
                type="text"
                name="weight"
                onChange={handleChange}
              />
              <p>{errors && errors.weight}</p>
            </div>
          </div>
        </div>
        <div className={style.contboton}>
          <input className={style.botonc} value="Create" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Formulario;
