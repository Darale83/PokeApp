const { Router } = require("express");
const axios = require("axios");
// const Pokemon = require("../models/Pokemon");
// const Type = require("../models/Type");
const { Pokemon, Type } = require("../db");
const {
  getApiPokemons,
  getApiPokemons2,
  getDbPokemons,
  getAllPokemons,
  getPokemonByName,
  getPokemonById,
} = require("../utils/index");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      let poke = await getPokemonByName(name);
      let pokeToArr = [poke];
      pokeToArr[0] === "xD" ? res.json(["Nothing Found"]) : res.json(pokeToArr);
    } else {
      const allPoke = await getAllPokemons();
      return res.status(200).json(allPoke);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const pokeById = await getPokemonById(id);
      return res.status(200).json(pokeById);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      image,
      life,
      strength,
      defense,
      speed,
      weight,
      height,
      types,
      createdInDb,
    } = req.body;
    const createdPoke = await Pokemon.create({
      name,
      image,
      life,
      strength,
      defense,
      speed,
      weight,
      height,
      createdInDb,
    });
    for (let i = 0; i < types.length; i++) {
      const pokemonType = await Type.findOne({
        where: { name: types[i] },
      });
      createdPoke.addType(pokemonType);
    }
    res.send("Pokemon created successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
