
class Pokemon {
    //general info
    name
    number
    types = []
    type
    photo
    weight
    height
    abilities = []
    stats = []
    //species
    generation
    genus
    captureRate
    breeding = {
        genderRate: [],
        eggGroups: []
    }
    evolution

    constructor(pokeApiPokemonData) {
        this.name = pokeApiPokemonData.name
        this.number = pokeApiPokemonData.id
        this.types = pokeApiPokemonData.types.map(typeSlot => typeSlot.type.name)
        this.type = this.types[0]
        this.photo = pokeApiPokemonData.sprites.other.dream_world.front_default || pokeApiPokemonData.sprites.other["official-artwork"].front_default
        this.weight = pokeApiPokemonData.weight
        this.height = pokeApiPokemonData.height
        this.abilities = pokeApiPokemonData.abilities.map(({ ability, is_hidden }) => ({ name: ability.name, isHidden: is_hidden }))
        this.moves = pokeApiPokemonData.moves.map(({ move, version_group_details }) => ({ name: move.name, detail: version_group_details.at(-1) }))
        this.generation = pokeApiPokemonData.species.generation?.name.toUpperCase().split('-')[1]
        this.genus = pokeApiPokemonData.species.genera?.find((genus) => genus.language.name == 'en').genus.split(' ')[0]
        this.captureRate = pokeApiPokemonData.species.capture_rate
        this.breeding.genderRate = pokeApiPokemonData.species.gender_rate === -1 ?
            [{ name: 'agender', chance: 100 }] :
            [{ name: 'female', chance: pokeApiPokemonData.species.gender_rate * 100 / 8 }, { name: 'male', chance: 100 - pokeApiPokemonData.species.gender_rate * 100 / 8 }]
        this.breeding.eggGroups = pokeApiPokemonData.species.egg_groups?.map((group) => group.name)
        this.stats = pokeApiPokemonData.stats.map((statObject) => {
            const attributeNamesMap = { hp: 'HP', attack: 'Attack', defense: 'Defense', 'special-attack': 'Special Attack', 'special-defense': 'Special Defense', speed: 'Speed' }
            return { name: attributeNamesMap[statObject.stat.name], baseValue: statObject.base_stat }
        })
        this.evolution = pokeApiPokemonData.species.evolution_chain
    }
}
