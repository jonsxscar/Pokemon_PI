const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case "RELOAD_POKEMONS":
      const apidbPokesSort = state.allPokemons.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (b.id > a.id) {
          return -1;
        }
        return 0;
      });
      let sortedArrayNormal = [...apidbPokesSort];

      return {
        ...state,
        pokemons: sortedArrayNormal,
      };

      case "GET_POKEMON_NAME":
        return {
            ...state,
            pokemons: action.payload,
            
        }  

    default:
      return state;
  }
}

export default rootReducer;
