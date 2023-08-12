import "./SearchResult.css";
import { getSprite } from "../Grid/Pokemon";
import { useEffect, useState } from "react";

export const SearchResult = ({ result, onSelect }) => {
    const [pokemonSprite, setPokemonSprite] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            //console.log("result: " + result);

            if (result.toLowerCase() === "none") {
                console.log("inside none");

                let sprite = "";

                try {
                    const response = await fetch(
                        "https://pokeapi.co/api/v2/item/poke-ball"
                    );
                    const data = await response.json();
                    sprite = data.sprites.default;
                } catch (error) {
                    console.error("Error fetching data:", error.message);
                }

                setPokemonSprite(sprite);
            } else {
                const sprite = await getSprite(result);
                setPokemonSprite(sprite);
            }

            setLoading(false);
        }
        fetchData();
    }, [result]);

    return (
        <div className="search-result">
            <p className="pokemon-name">{result.toUpperCase()}</p>
            {!loading && (
                <img
                    className="sprite-image"
                    key={pokemonSprite}
                    src={pokemonSprite}
                    alt="pokemon"
                />
            )}
            <button className="select-pokemon" onClick={onSelect}>
                Select
            </button>
        </div>
    );
};
