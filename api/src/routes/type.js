const { Router } = require("express");
const axios = require("axios");
const Pokemon = require("../models/Pokemon");
const Type = require("../models/Type");
const { getAllTypes } = require("../utils/index");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const allTypes = await axios.get(`https://pokeapi.co/api/v2/type`);
    const types = allTypes.data.results.map((type) => {
      return { name: type.name };
    });
    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
