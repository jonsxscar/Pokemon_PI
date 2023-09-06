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
      };

    case "REMOVE_DETAILS":
      return {
        ...state,
        detail: [],
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    // se viene lo chungo

    case "FILTER_CREATED":
      const allPokemons2 = state.allPokemons;
      const statusFiltered2 =
        action.payload === "Created"
          ? allPokemons2.filter((el) => el.createdInDb)
          : allPokemons2.filter((el) => !el.createdInDb);

      return {
        ...state,
        pokemons:
          action.payload === "All"
            ? allPokemons2
            : statusFiltered2.length
            ? statusFiltered2
            : ["Pokemons created"],
      };

    case "ORDER_BY_NAME_OR_STRENGH":
      let sortedArray;

      if (action.payload === "asc") {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "desc") {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "HAttack") {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return -1;
          }
          if (b.attack > a.attack) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "LAttack") {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1;
          }
          if (b.attack > a.attack) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "normal") { //areglar 
        const apiPokes = state.pokemons
          .filter((el) => !el.createdInDb)
          .sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (b.id > a.id) {
              return -1;
            }
            return 0;
          });
        const dbPokes = state.pokemons //arreglar
          .filter((el) => el.createdInDb)
          .sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (b.id > a.id) {
              return -1;
            }
            return 0;
          });
        sortedArray = [...apiPokes, ...dbPokes];
      }
      return {
        ...state,
        pokemons: sortedArray,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "FILTER_BY_TYPES":
      const allPokemons = state.allPokemons;
      const statusFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((el) => el.types.includes(action.payload));

      return {
        ...state,
        pokemons: statusFiltered.length
          ? statusFiltered
          : [`${action.payload} Pokemons`],
      };

    default:
      return state;
  }
}

export default rootReducer;
