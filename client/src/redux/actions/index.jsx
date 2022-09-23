import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const REMOVE_DETAIL = "REMOVE_DETAIL";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET";
export const ORDER_BY_STRENGTH = "ORDER_BY_STRENGTH";
export const POKEMONS_COPY = "POKEMONS_COPY";

export const getAllPokemons = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:3001/pokemons")

      .then((response) => {
        if (response.data.name === "Error") {
          console.log(response);
          // return alert(response.data.name);
        } else {
          window.localStorage.setItem(
            "allPokemons",
            JSON.stringify(response.data)
          );
          dispatch({
            type: GET_ALL_POKEMONS,
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        // alert(error.message);
        //if(error.message === )
      });
  };
};

export const getAllTypes = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:3001/type")
      .then((response) => {
        if (response.data.name === "Error") {
          console.log(response);
          return alert(response.data.name);
        } else {
          window.localStorage.setItem("types", JSON.stringify(response.data));
          dispatch({
            type: GET_ALL_TYPES,
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const pokemonCopy = () => {
  return {
    type: POKEMONS_COPY,
  };
};

export const createPokemon = (payload) => {
  return async function (dispatch) {
    return await axios
      .post("http://localhost:3001/pokemons", payload)
      .then((response) => {
        dispatch({
          type: CREATE_POKEMON,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getPokemonDetails = (id) => {
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/pokemons/${id}`)
      .then((response) => {
        dispatch({
          type: GET_POKEMON_DETAIL,
          payload: response.data,
        });
      })
      .catch((err) => console.error(err));
  };
};

export const removeDetail = () => {
  return {
    type: REMOVE_DETAIL,
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/pokemons/?name=${name}`)
      .then((response) => {
        dispatch({
          type: SEARCH_POKEMON,
          payload: response.data,
        });
      })
      .catch((err) => console.error(err));
  };
};

export const filterByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const orderByAlphabet = (payload) => {
  return {
    type: ORDER_BY_ALPHABET,
    payload,
  };
};

export const orderByStrength = (payload) => {
  return {
    type: ORDER_BY_STRENGTH,
    payload,
  };
};
