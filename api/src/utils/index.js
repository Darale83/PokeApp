const axios = require("axios");
const { Pokemon, Type } = require("../db");

const infoPoke = (pokemon) => {
  const pokeApi = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other.dream_world.front_default,
    life: pokemon.stats[0].base_stat,
    strength: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    speed: pokemon.stats[5].base_stat,
    weight: pokemon.weight,
    height: pokemon.height,
    type: pokemon.types.map((t) => t.type.name),
  };
  return pokeApi;
};

const pokeDbInfo = (poke) => {
  return {
    id: poke.id,
    name: poke.name,
    image: poke.image,
    life: poke.hp,
    speed: poke.speed,
    strength: poke.attack,
    defense: poke.defense,
    weight: poke.weight,
    height: poke.height,
    type: poke.types.map((e) => e.name),
    createdInDb: poke.createdInDb,
  };
};

// const getApiPokemons2 = async () => {
//   const apiInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`);
//   const apiPokemon = apiInfo.data?.results.map((el) => axios.get(el.url));
//   const urlInfo = await axios.all(apiPokemon);
//   console.log(urlInfo);
//   let pokemons = urlInfo.map((el) => el.data);
//   let infoPokemons = pokemons.map((el) => infoPoke(el));

//   return infoPokemons;
// };

const getApiPokemons2 = async () => {
  try {
    const pokeArray = [];
    for (let i = 1; i <= 100; i++) {
      pokeArray.push(await axios.get("https://pokeapi.co/api/v2/pokemon/" + i));
    }
    const fullfill = await axios.all(pokeArray);
    let pok = fullfill.map((e) => e.data);
    let pok2 = pok.map((e) => infoPoke(e));
    return pok2;
  } catch (error) {
    next(error);
  }
};

const getDbPokemons = async () => {
  try {
    const pokk = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        trough: {
          attributes: [],
        },
      },
    });

    const masPokk = pokk.map((p) => pokeDbInfo(p));
    return masPokk;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllPokemons = async () => {
  try {
    let apiInfo = await getApiPokemons2();

    let dbInfo = await getDbPokemons();
    return [...apiInfo, ...dbInfo];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getPokemonByName = async (name) => {
  try {
    const findPoke = await Pokemon.findOne({
      where: { name },
      include: { model: Type },
    });
    if (findPoke) {
      return pokeDbInfo(findPoke);
    } else {
      const apiPoke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const foundPoke = infoPoke(apiPoke.data);
      return foundPoke;
    }
  } catch (error) {
    console.log(error);
    return "xD";
  }
};

const getPokemonById = async (id) => {
  try {
    if (id.length > 4) {
      const dbPok = await Pokemon.findOne({
        where: { id },
        include: { model: Type },
      });

      return pokeDbInfo(dbPok);
    } else {
      const apiPoke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id.toString()}`
      );
      let pokeInfo = apiPoke.data
        ? infoPoke(apiPoke.data)
        : "Pokemon Not Found";

      return pokeInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllTypes = async () => {
  try {
    const typePromise = await axios.get(`https://pokeapi.co/api/v2/type`);
    const types = typePromise.data.results.map((el) => [{ name: el.name }]);

    const tipos = types.flat();
    await Type.bulkCreate(tipos);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getApiPokemons2,
  getDbPokemons,
  getAllPokemons,
  getPokemonByName,
  getPokemonById,
  getAllTypes,
};
