import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

export default function PokemonCard({ id, name, image, types, createdInDb }) {
  return (
    <Link to={`/pokemon/${id}`} className="name">
      <div className="card">
        <div className="name">
          <h1>{name.toUpperCase()}</h1>
        </div>

        <img className="image" src={image} alt="Not found" />

        <div>
          {types.map((t) => {
            return (
              <div key={t} className="type">
                <img alt="Type" src={require(`./Icons/${t}.png`).default} />
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
