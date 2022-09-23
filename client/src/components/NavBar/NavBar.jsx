import React from "react";
import PokeLogo2 from "../../assets/PokeLogo2.png";
import "./NavBar.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/home">
          <img className="head" src={PokeLogo2} alt="Img Not Found" />
        </Link>
      </div>
      <div className="createPoke">
        <Link to="/create">
          <button>Create Your Pokemon</button>
        </Link>
      </div>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
