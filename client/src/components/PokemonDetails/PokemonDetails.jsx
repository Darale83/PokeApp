import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetails, removeDetail } from "../../redux/actions";
import { useEffect } from "react";
import "./PokemonDetails.css";
import Loading from "../Loading/Loading";

export default function PokemonDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(removeDetail());
    dispatch(getPokemonDetails(id));
  }, [dispatch, id]);
  console.log(pokemon);

  return (
    <div className="box">
      {pokemon.length !== 0 ? (
        <div className="detailsWrapper">
          <div className="detailsCard">
            <div className="detailsTitle">
              <h1>
                {(
                  pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)
                ).toString()}
              </h1>
            </div>
            <div className="detailsInfo">
              <div>
                <img
                  className="detailsImage"
                  src={pokemon.image}
                  alt="Not found"
                />
              </div>
              <div className="detailsStats">
                <p>
                  <strong>Life: </strong>
                  {pokemon.life}
                </p>
                <p>
                  <strong>Strength: </strong>
                  {pokemon.strength}
                </p>
                <p>
                  <strong>Defense: </strong>
                  {pokemon.defense}
                </p>
                <p>
                  <strong>Speed: </strong>
                  {pokemon.speed}
                </p>
                <p>
                  <strong>Height: </strong>
                  {pokemon.height}
                </p>
                <p>
                  <strong>Weight: </strong>
                  {pokemon.weight}
                </p>
                <div className="type-icon-container">
                  {pokemon.type?.map((type) => {
                    return (
                      <div key={type} className="type">
                        <img
                          height="80px"
                          alt="Type"
                          src={require(`./Icons/${type}.png`).default}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Link to="/home">
            <button className="detail-button">Back</button>
          </Link>
        </div>
      ) : (
        <div className="details-loader">
          <Loading />
        </div>
      )}
    </div>
  );
}
