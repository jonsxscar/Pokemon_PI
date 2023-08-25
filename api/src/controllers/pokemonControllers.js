const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { URL_API } = process.env;

//obtener los pokemones de la base de datos
const getPokemonsDb = async () => {
  const response = await Pokemon.findAll({
    include: {
      attributes: ['name'],
      model: Type,
      through: {
        attributes: [],
      },
    },
  });
  return response;
};

//obtener los 100 pokemones de la API
const getApiInfo = async () => {
  const apiUrl = await axios.get(`${URL_API}?limit=100`);
  const results = apiUrl.data.results;

  /*   const pokemonInfo = []
  for(let i = 0 ; i < results.length ; i++){
    const pokes = await axios.get(results[i].url);
    const pokeInfo = pokes.data;
    pokemonInfo.push({
      id: pokeInfo.id,
      name: pokeInfo.name,
      etc
    });
  }
  return pokemonInfo;
} */
//*check
  // Función aux para obtener información detallada de un pokemon
  const fetchPokemonInfo = async (url) => {
    const response = await axios.get(url);
    const pokeInfo = response.data;
    return {
      id: pokeInfo.id,
      name: pokeInfo.name,
      types: pokeInfo.types.map((t) => t.type.name),
      img: pokeInfo.sprites.other["official-artwork"].front_default,
      attack: pokeInfo.stats[1].base_stat,
      //defense: pokeInfo.stats[2].base_stat,
      weight: pokeInfo.weight,
      height: pokeInfo.height,
    };
  };
  // Creo un arreglo de promesas para obtener la información detallada de todos los pokemones recorriendo con map
  const pokemonPromises = results.map((result) => fetchPokemonInfo(result.url));

  // Esperar a que todas las promesas se resuelvan (usando Promise.all)
  const pokemonInfo = await Promise.all(pokemonPromises);

  // Retornar la información detallada de los pokemones
  return pokemonInfo;
};

const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const pokemonDb = await getPokemonsDb();
  return [...apiInfo, ...pokemonDb];
};
//revisar
const getPokemonByName = async (name) => {//realmente no hace falta el try y catch pero xd
  try {
    const resss = await axios.get(`${URL_API}/${name.toLowerCase()}`);
    const res = resss.data
    const pokeInfo = {
      id: res.id,
      name: res.name,
      types: res.types.map((t) => t.type.name),
      img: res.sprites.other['official-artwork'].front_default,
      weight: res.weight,
      height: res.height,
    };
    return pokeInfo;
  } catch (e) {
    if (e.status === 404) return null; //considerar trhougt y un mensaje
  }
};
//*c
const getPokemonById = async (id) => {
  if (isNaN(id)) { //si es numero busco en DB, si no en api
    const response = await Pokemon.findOne({ where: { id } });
    return response;
  }//else
  const res = (await axios.get(`${URL_API}/${id}`)).data;
  return {
    id: res.id,
    name: res.name,
    img: res.sprites.other['official-artwork'].front_default,
    hp: res.stats[0].base_stat,
    attack: res.stats[1].base_stat,
    defense: res.stats[2].base_stat,
    speed: res.stats[5].base_stat,
    height: res.height,
    weight: res.weight,
    types: res.types.map((t) => {
      return {
        name: t.type.name,
      };
    }),
  };
};

//lo creo en la base de datos
const postPokemon = async(name,img,hp,attack,defense,speed,height,weight,type = 'unknown')=>{
  if(!name || !img || !hp || !attack || !defense ){
      throw Error('Campos obligatorios estan vacios')
  }
  const pokemon = await Pokemon.create({name,img,hp,attack,defense,speed,height,weight})
  const typee = type.split(',')
  typee.map(async(t)=>{ //busco
      const types = await Type.findOne({where: {name: t}})
      console.log(types)
      pokemon.addType(types)
  })
  console.log("Tipos asociados al Pokémon:", await pokemon.getTypes());
  console.log(pokemon)
  console.log("holamundo")
  return pokemon
}

module.exports = {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  postPokemon
}