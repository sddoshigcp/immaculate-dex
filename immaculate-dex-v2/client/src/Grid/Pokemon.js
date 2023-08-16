import {getAllPokemon} from "../Service/pokedexService";

const pokemon = await getAllPokemon();

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
const typeUrl = "https://pokeapi.co/api/v2/type/";

function getPokemonByName(name) {
    for (const item of pokemon) {
        //console.log("item.name: " + item.name);
        if (item.name === name) {
            return item;
        }
    }

    console.log("no matching pokemon found");
    return null; // If no matching Id is found
}

export async function getAllPokemonNames() {
    let pokemonNames = [];

    for (const item of pokemon) {
        pokemonNames.push(item.name);
    }

    return pokemonNames;
}

export async function getSprite(name) {
    let pokemonName = name.toLowerCase();

    if(pokemonName === "none") {
        try {
            const response = await fetch(
                "https://pokeapi.co/api/v2/item/poke-ball"
            );
            const data = await response.json();
            return data.sprites.default;
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    const identifier = getPokemonByName(pokemonName).name;

    try {
        const response = await fetch(pokemonUrl + identifier);
        const data = await response.json(); 

        if(data.sprites.front_default === null) {
            try {
                const response = await fetch(
                    "https://pokeapi.co/api/v2/item/poke-ball"
                );
                const data = await response.json();
                return data.sprites.default;
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        }
        
        return data.sprites.front_default;

    }
    catch (error) {
        console.error("Error fetching data:", error.message);
    }
    
}

export async function getAllPokemonByType(type) {
    let pokemonType = type.toLowerCase();

    try {
        const response = await fetch(typeUrl + pokemonType);
        const data = await response.json(); 
        
        return data.pokemon;

    }
    catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

export async function getAllPokemonByTypes(type1, type2) {
    let pokemonType1 = type1.toLowerCase();
    let pokemonType2 = type2.toLowerCase();

    try {
        const response = await fetch(typeUrl + pokemonType1);
        const data = await response.json(); 
        
        const response2 = await fetch(typeUrl + pokemonType2);
        const data2 = await response2.json(); 

        //Check if pokemon is in both types
        let pokemonInBothTypes = [];
        for (const item of data.pokemon) {
            for (const item2 of data2.pokemon) {
                if (item.pokemon.name === item2.pokemon.name) {
                    pokemonInBothTypes.push(item.pokemon);
                }
            }
        }

        return pokemonInBothTypes;
    }
    catch(error) {
        console.error("Error fetching data:", error.message);
    }
}

export async function getTypesForPokemon(name) {
    let pokemonName = name.toLowerCase();

    const identifier = getPokemonByName(pokemonName).name;

    try {
        const response = await fetch(pokemonUrl + identifier);
        const data = await response.json(); 
        
        return data.types;

    }
    catch (error) {
        console.error("Error fetching data:", error.message);
    }
}


/** Pokemon checking functions below */

export async function checkGuess(guess, clues) {

    //If clues includes single-type
    if(clues[0].clue_type === 2) {
        return await checkSingleType(guess, clues[1].category);
    }  
    else if (clues[1].clue_type === 2) {
        return await checkSingleType(guess, clues[0].category);
    }

    //get all pokemon by types
    const pokemonByTypes = await getAllPokemonByTypes(clues[0].category, clues[1].category);

    console.log("pokemonByTypes: " + JSON.stringify(pokemonByTypes));

    if(pokemonByTypes.length === 0) {
        if(guess.toLowerCase() === "none") {
            return true;
        }
    }

    //if guess is in pokemonByTypes, return true
    for (const item of pokemonByTypes) {
        if (item.name === guess) {
            return true;
        }
    }
    
    return false;
}

export async function checkSingleType(pokemon, type) {
    const types = await getTypesForPokemon(pokemon);

    if(types.length > 1) {
        return false;
    }

    if(types[0].type.name === type) {
        return true;
    }

    return false;
}