import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  CREATE_POKEMON,
  GET_POKEMON_DETAIL,
  REMOVE_DETAIL,
  SEARCH_POKEMON,
  FILTER_BY_TYPE,
  FILTER_CREATED,
  ORDER_BY_ALPHABET,
  ORDER_BY_STRENGTH,
  POKEMONS_COPY,
} from "../actions/index";

const initialState = {
  allPokemons: JSON.parse(window.localStorage.getItem("allPokemons")) || [],
  allPokemonsCopy: JSON.parse(window.localStorage.getItem("allPokemons")) || [],
  types: JSON.parse(window.localStorage.getItem("types")) || [],
  details: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        allPokemonsCopy: action.payload,
      };

    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case POKEMONS_COPY:
      return {
        ...state,
        allPokemons: state.allPokemonsCopy,
      };

    case CREATE_POKEMON:
      return {
        ...state,
        allPokemons: action.payload,
        allPokemonsCopy: action.payload,
      };

    case GET_POKEMON_DETAIL:
      return {
        ...state,
        details: action.payload,
      };

    case REMOVE_DETAIL:
      return {
        ...state,
        details: [],
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        allPokemons: action.payload,
      };

    case FILTER_BY_TYPE:
      return {
        ...state,
        allPokemons:
          action.payload === "All"
            ? state.allPokemonsCopy
            : state.allPokemons.filter((pokemon) =>
                pokemon.type.includes(action.payload)
              ),
      };

    case FILTER_CREATED:
      const createdPokemons = state.allPokemons;
      const filterCreated =
        action.payload === "created"
          ? createdPokemons.filter((el) => el.createdInDb)
          : createdPokemons.filter((el) => !el.createdInDb);
      return {
        ...state,
        allPokemons:
          action.payload === "All" ? state.allPokemonsCopy : filterCreated,
      };

    case ORDER_BY_ALPHABET:
      let orderPokes =
        action.payload === "asc"
          ? state.allPokemons.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.allPokemons.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allPokemons:
          action.payload === "All" ? state.allPokemonsCopy : orderPokes,
      };

    case ORDER_BY_STRENGTH:
      let orderStrength =
        action.payload === "low strength"
          ? state.allPokemons.sort(function (a, b) {
              if (a.strength > b.strength) {
                return 1;
              }
              if (a.strength < b.strength) {
                return -1;
              }
              return 0;
            })
          : state.allPokemons.sort(function (a, b) {
              if (a.strength > b.strength) {
                return -1;
              }
              if (a.strength < b.strength) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allPokemons:
          action.payload === "All" ? state.allPokemonsCopy : orderStrength,
      };

    default:
      return state;
  }
}

export default reducer;
