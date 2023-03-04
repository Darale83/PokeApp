/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Pokeball2 from "../../assets/Pokeball2.png";
import "./CreatePokemon.css";
import {
  getAllPokemons,
  getAllTypes,
  createPokemon,
} from "../../redux/actions/index";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Must have a name!";
  } else if (input.life <= 0) {
    errors.life = "Life must be over 0!";
  } else if (input.strength <= 0) {
    errors.strength = "Strength must be over 0!";
  } else if (input.defense <= 0) {
    errors.defense = "Defense must be over 0!";
  } else if (input.speed <= 0) {
    errors.speed = "Speed must be over 0!";
  } else if (input.height <= 0) {
    errors.height = "Height must be over 0!";
  } else if (input.weight <= 0) {
    errors.weight = "Weight must be over 0!";
  } else if (input.types.length > 2) {
    errors.much = "Can't pick more than two types!";
  } else if (!input.types.length) {
    errors.empty = "Pick at least one type!";
  } else if (!input) {
    errors.none = "You must fill all fields!";
  }

  return errors;
}

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();
  const pokemonTypes = useSelector((state) => state.types);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    life: 0,
    strength: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectTypes = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
    setError(
      validate({
        ...input,
        types: [...input.types, e.target.value],
      })
    );
  };

  const handleDeleteTypes = (el) => {
    setInput({
      ...input,
      types: input.types?.filter((aux) => aux !== el),
    });
    setError(
      validate({
        ...input,
        types: input.types?.filter((aux) => aux !== el),
      })
    );
  };

  const handleSubmit = (e) => {
    let a = parseInt(input.life);
    let b = parseInt(input.strength);
    let c = parseInt(input.defense);
    let d = parseInt(input.speed);
    let x = parseInt(input.height);
    let y = parseInt(input.weight);

    if (!input.name) {
      e.preventDefault();
      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else if (!input.types?.length) {
      e.preventDefault();
      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else if (
      /^\d+$/.test(a) !== true ||
      /^\d+$/.test(b) !== true ||
      /^\d+$/.test(c) !== true ||
      /^\d+$/.test(d) !== true ||
      /^\d+$/.test(x) !== true ||
      /^\d+$/.test(y) !== true
    ) {
      e.preventDefault();
      setError({ numberError: "Numbers Only!" });
    } else {
      e.preventDefault();
      dispatch(createPokemon(input));
      alert("Pokemon Successfully created!");
      setInput({
        name: "",
        image: "",
        life: 0,
        strength: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
      });
      window.location.href = "/home";
    }
  };
  return (
    <div className="all">
      <div className="pokeball">
        <Link to={"/home"}>
          <img className="imgRecarga" src={Pokeball2} alt=""></img>
        </Link>
        <h1 className="title">Create Your Pokemon</h1>
      </div>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="poke-details">
            <div className="input-box">
              <span className="details">Name:</span>
              <input
                type="text"
                placeholder="Name"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {error.name && (
                <span className="validation-error">{error.name}</span>
              )}
            </div>

            <div className="input-box">
              <span className="details">Image:</span>
              <input
                type="text"
                placeholder="Image"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="input-box">
              <span className="details">Life: </span>
              <input
                type="number"
                value={input.life}
                name="life"
                placeholder="Life..."
                onChange={(e) => handleChange(e)}
              />
              {error.life && (
                <strong>
                  <span className="validation-error">{error.life}</span>
                </strong>
              )}
              {error.numberError && (
                <strong>
                  <span className="validation-error">{error.numberError}</span>
                </strong>
              )}
            </div>

            <div className="input-box">
              <span className="details">Strength: </span>
              <input
                type="number"
                value={input.strength}
                name="strength"
                placeholder="Strength..."
                onChange={(e) => handleChange(e)}
              />
              {error.strength && (
                <strong>
                  <span className="validation-error">{error.strength}</span>
                </strong>
              )}
              {error.numberError && (
                <strong>
                  <span className="validation-error">{error.numberError}</span>
                </strong>
              )}
            </div>

            <div className="input-box">
              <span className="details">Defense: </span>
              <input
                type="number"
                value={input.defense}
                name="defense"
                onChange={(e) => handleChange(e)}
              />
              {error.defense && (
                <strong>
                  <span className="validation-error">{error.defense}</span>
                </strong>
              )}
              {error.numberError && (
                <strong>
                  <span className="validation-error">{error.numberError}</span>
                </strong>
              )}
            </div>

            <div className="input-box">
              <span className="details">Speed: </span>
              <input
                type="number"
                value={input.speed}
                name="speed"
                onChange={(e) => handleChange(e)}
              />
              {error.speed && (
                <strong>
                  <span className="validation-error">{error.speed}</span>
                </strong>
              )}
              {error.numberError && (
                <strong>
                  <span className="validation-error">{error.numberError}</span>
                </strong>
              )}
            </div>

            <div className="input-box">
              <span className="details">Height: </span>
              <input
                type="number"
                value={input.height}
                name="height"
                onChange={(e) => handleChange(e)}
              />
              {error.height && (
                <strong>
                  <span className="validation-error">{error.height}</span>
                </strong>
              )}
              {error.numberError && (
                <strong>
                  <span className="validation-error">{error.numberError}</span>
                </strong>
              )}
            </div>

            <div className="input-box">
              <span className="details">Weight: </span>
              <input
                type="number"
                value={input.weight}
                name="weight"
                onChange={(e) => handleChange(e)}
              />
              {error.weight && (
                <strong>
                  <span className="validation-error">{error.weight}</span>
                </strong>
              )}
              {error.numberError && (
                <strong>
                  <span className="validation-error">{error.numberError}</span>
                </strong>
              )}
            </div>

            <div className="input-box">
              <span className="details">Types: </span>
              <select onChange={(e) => handleSelectTypes(e)}>
                {pokemonTypes?.map((el, index) => (
                  <option key={index} value={el.name}>
                    {el.name}
                  </option>
                ))}
                {/* <option defaultValue="default" selected>
              {null}
            </option> */}
              </select>
              {error.empty && (
                <strong>
                  <span className="validation-error">{error.empty}</span>
                </strong>
              )}
              {error.much && (
                <strong>
                  <span className="validation-error">{error.much}</span>
                </strong>
              )}
            </div>
            <div>
              {input.types?.map((el) => {
                return (
                  <button
                    className="option-button"
                    key={el}
                    type="button"
                    onClick={() => handleDeleteTypes(el)}
                  >
                    <img alt="Type" src={`/Icons/${el}.png`} />
                  </button>
                );
              })}
            </div>
            <div>
              <button className="create-button" type="submit" value="Create!">
                Create!
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
