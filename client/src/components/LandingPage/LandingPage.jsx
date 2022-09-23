import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import PokeLogo from "../../assets/PokeLogo2.png";

export default function LandingPage() {
  return (
    <div className="background">
      <div>
        <div>
          <img className="poke-logo" src={PokeLogo} alt="" />
        </div>
        <Link to="/home">
          <button className="btn" type="submit">
            <img src="../../assets/Pokeball.jpg" alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
}
