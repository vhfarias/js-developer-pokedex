
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((results) => results.map((pokemon) => pokemon.url))
        .then((pokemonUrls) => pokemonUrls.map(pokeApi.getPokemonByUrl))
        .then((pokemonData) => Promise.all(pokemonData))
        .then((pokemons) => pokemons.map((pokemonData) => new Pokemon(pokemonData)))
        .then((detailRequests) => Promise.all(detailRequests))
}


//======= new content

pokeApi.getPokemonByUrl = (url) => {
    return fetch(url)
        .then((response) => response.json())
}

pokeApi.getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return pokeApi.getPokemonByUrl(url)
}


pokeApi.getPokemonFullInfo = (id) => {
    return pokeApi.getPokemonById(id)
        .then((info) => {
            console.log(info)
            //get species info
            return fetch(info.species.url)
                .then((response) => response.json())
                .then((speciesInfo) => info.species = speciesInfo)
                .then(() => info)
        })
        .then((infoWithSpecies) => new Pokemon(infoWithSpecies))
        .then((pokemon) => pokemon)
}