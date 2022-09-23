/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByType,
  getAllPokemons,
  getAllTypes,
  filterCreated,
  orderByAlphabet,
  orderByStrength,
  pokemonCopy,
} from "../../redux/actions/index";
import { Link } from "react-router-dom";
import PokemonCard from "../PokemonCard/PokemonCard";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import Pokeball2 from "../../assets/Pokeball2.png";
import "./Home.css";
import Loading from "../Loading/Loading";

function Home() {
  const allPokemons = useSelector((state) => state.allPokemons);
  const allTypes = useSelector((state) => state.types);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPok = currentPage * pokemonsPerPage; //1 * 12
  const indexOfFirstPok = indexOfLastPok - pokemonsPerPage; //12 - 12 = 0
  const currentPokemons = !allPokemons.length
    ? []
    : allPokemons.slice(indexOfFirstPok, indexOfLastPok);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  // useEffect(() => {
  //   dispatch(getAllPokemons());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getAllTypes());
  // }, [dispatch]);

  const [order, setOrder] = useState("");

  const handleFilterByType = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderByAlphabet = (e) => {
    e.preventDefault();
    if (e.target.value === "All") {
      dispatch(getAllPokemons());
    } else {
      dispatch(orderByAlphabet(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordered ${e.target.value}`);
    }
  };

  const handleOrderByStrength = (e) => {
    e.preventDefault();
    if (e.target.value === "All") {
      dispatch(getAllPokemons());
    } else {
      dispatch(orderByStrength(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordered ${e.target.value}`);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(pokemonCopy());
    setCurrentPage(1);
  };

  return (
    <div className="home">
      <div className="nav">
        <NavBar />
      </div>
      <div>
        <button className="btnRecarga" onClick={(e) => handleClick(e)}>
          <img className="imgRecarga" src={Pokeball2} alt=""></img>
        </button>
      </div>
      <div className="containerSearch">
        <div className="allSelects">
          <select className="selects" onChange={(e) => handleFilterByType(e)}>
            <option value="All">Filter by type</option>
            {allTypes?.map((pokemonType, index) => {
              return (
                <option key={index} value={pokemonType?.name}>
                  {pokemonType?.name}
                </option>
              );
            })}
          </select>

          <select className="selects" onChange={(e) => handleFilterCreated(e)}>
            <option value="All">All</option>
            <option value="created">Created</option>
            <option value="existent">Existent</option>
          </select>

          <select
            className="selects"
            onChange={(e) => handleOrderByAlphabet(e)}
          >
            <option value="All">Order by alphabet</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select
            className="selects"
            onChange={(e) => handleOrderByStrength(e)}
          >
            <option value="All">Order by strength</option>
            <option value="high strength">High Strength</option>
            <option value="low strength">Low Strength</option>
          </select>
        </div>
      </div>
      {currentPokemons[0] === "Nothing Found" ? (
        <div>
          <h1>No Pokemon With That Name</h1>
        </div>
      ) : currentPokemons[0] ? (
        <div className="grid">
          {currentPokemons?.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon?.id}
                id={pokemon?.id}
                name={pokemon?.name}
                image={pokemon?.image}
                types={pokemon?.type}
                createdInDb={pokemon.createdInDb}
              />
            );
          })}
        </div>
      ) : (
        <div className="homeLoading">
          <Loading />
        </div>
      )}
      <div className="paginationDiv">
        <li>
          <button onClick={handlePrevBtn} className="prevBtn">
            Prev
          </button>
        </li>
        <li>
          {allPokemons.length > 12 && (
            <Pagination
              currentPage={currentPage}
              pokemonsPerPage={pokemonsPerPage}
              allPokemons={allPokemons?.length}
              paginate={paginate}
            />
          )}
        </li>
        <li>
          <button onClick={handleNextBtn} className="nextBtn">
            Next
          </button>
        </li>
      </div>
    </div>
  );
}

export default Home;
