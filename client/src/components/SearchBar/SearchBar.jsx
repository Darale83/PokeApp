import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import "./SearchBar.css";
import Pokeball3 from "../../assets/Pokeball3.png";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [pokemonName, setPokemonName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setPokemonName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(pokemonName));
    setPokemonName("");
  };

  return (
    <div className="wrapper">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Search By Name"
          onChange={(e) => handleChange(e)}
        />
        <button
          type="submit"
          className="searchButton"
          style={{ outline: "none" }}
          onClick={(e) => handleSubmit(e)}
        >
          {/* <i className="material-icons">search</i> */}
          <img className="searchBoxButtonImg" src={Pokeball3} alt="" />
        </button>
      </div>
    </div>
  );
}
