import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import "./Grid.css";
import { getAllPokemon } from "../Service/pokedexService";
import { getHeaders } from "./Categories";
import {
    getSprite,
    getAllPokemonByType,
    getAllPokemonByTypes,
    getTypesForPokemon,
} from "./Pokemon";
import { SearchBar } from "../Search/SearchBar";
import { SearchResultsList } from "../Search/SearchResultsList";

function Grid() {
    const [selectedButtonId, setSelectedButtonId] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [pokemonNames, setPokemonNames] = useState([]);
    const [gridHeaders, setGridHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pokemonSprite, setPokemonSprite] = useState(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [results, setResults] = useState([]);

    const coverDivRef = useRef(null);
    const inputRef = useRef(null);

    const handleSearchResultSelect = (selectedOption) => {
        setSelectedPokemon(selectedOption);
        console.log(`Option selected:`, selectedOption);
        handleSearchBarClose();
    };

    const handleButtonClick = (buttonId) => {
        setSelectedButtonId(buttonId);
        setShowSearchBar(true);
    };

    const handleSearchBarClose = (e) => {
        setShowSearchBar(false);
        setSelectedButtonId(null);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const pokemon = await getAllPokemon();
                setPokemonNames(pokemon);

                const gridHeaders = await getHeaders();
                const upperCaseGridHeaders = gridHeaders.map((header) =>
                    header.toUpperCase()
                );
                setGridHeaders(upperCaseGridHeaders);

                const pokemonSprite = await getSprite("bulbasaur");
                setPokemonSprite(pokemonSprite);

                const types = await getTypesForPokemon("bulbasaur");
                const pokemonByType = await getAllPokemonByType("grass");
                const pokemonByTypes = await getAllPokemonByTypes(
                    "grass",
                    "poison"
                );

                setLoading(false);
            } catch (error) {
                console.error("Error in component:", error.message);
            }
        }
        fetchData();
    }, []);

    const pokemonNamesArray = pokemonNames.map((pokemon) => pokemon.name);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-contents">
            {showSearchBar && (
                <div className="search-div">
                    <div
                        className="cover-div"
                        ref={coverDivRef}
                        onClick={handleSearchBarClose}
                    ></div>
                    <div className="search-bar-container" ref={inputRef} >
                        <SearchBar setResults={setResults} />
                        {results && results.length > 0 && (
                            <SearchResultsList results={results} onSelect={handleSearchResultSelect} />
                        )}
                    </div>
                </div>
            )}

            <div className="button-grid">
                <p className="column-header">LOGO GOES HERE</p>
                <p className="column-header">{gridHeaders[0]}</p>
                <p className="column-header">{gridHeaders[1]}</p>
                <p className="column-header">{gridHeaders[2]}</p>
                <p></p>
                <p className="row-header">{gridHeaders[3]}</p>
                <button
                    id="button1"
                    className={
                        selectedButtonId === 1
                            ? "grid-button selected"
                            : disabledButtons.includes(1)
                            ? "grid-button disabled"
                            : "grid-button"
                    }
                    onClick={() => handleButtonClick(1)}
                >
                    Button 1
                </button>
                <button
                    id="button2"
                    className={
                        selectedButtonId === 2
                            ? "grid-button selected"
                            : disabledButtons.includes(2)
                            ? "grid-button disabled"
                            : "grid-button"
                    }
                    onClick={() => handleButtonClick(2)}
                >
                    Button 2
                </button>
                <button
                    id="button3"
                    className={
                        selectedButtonId === 3
                            ? "grid-button selected"
                            : disabledButtons.includes(3)
                            ? "grid-button disabled"
                            : "grid-button"
                    }
                    onClick={() => handleButtonClick(3)}
                >
                    Button 3
                </button>
                <p></p>
                <p className="row-header">{gridHeaders[4]}</p>
                <button
                    id="button4"
                    className={
                        selectedButtonId === 4
                            ? "grid-button selected"
                            : disabledButtons.includes(4)
                            ? "grid-button disabled"
                            : "grid-button"
                    }
                    onClick={() => handleButtonClick(4)}
                >
                    Button 4
                </button>
                <button
                    id="button5"
                    className={
                        selectedButtonId === 5
                            ? "grid-button selected"
                            : disabledButtons.includes(5)
                            ? "grid-button disabled"
                            : "grid-button"
                    }
                    onClick={() => handleButtonClick(5)}
                >
                    Button 5
                </button>
                <button
                    id="button6"
                    className={
                        selectedButtonId === 6
                            ? "grid-button selected"
                            : disabledButtons.includes(6)
                            ? "grid-button disabled"
                            : "grid-button"
                    }
                    onClick={() => handleButtonClick(6)}
                >
                    Button 6
                </button>
                <p></p>
                <p className="row-header">{gridHeaders[5]}</p>
                <button
                    id="button7"
                    className={
                        selectedButtonId === 7
                            ? "grid-button selected"
                            : disabledButtons.includes(7)
                            ? "grid-button disabled"
                            : "grid-button"
                    }
                    onClick={() => handleButtonClick(7)}
                >
                    Button 7
                </button>
                <button
                    id="button8"
                    className={
                        selectedButtonId === 8
                            ? "grid-button selected"
                            : disabledButtons.includes(8)
                            ? "grid-button disabled"
                            : "grid-button"
                    }
                    onClick={() => handleButtonClick(8)}
                >
                    Button 8
                </button>
                <button
                    id="button9"
                    className={
                        selectedButtonId === 9
                            ? "grid-button selected"
                            : disabledButtons.includes(9)
                            ? "grid-button disabled"
                            : "grid-button"
                    }
                    onClick={() => handleButtonClick(9)}
                >
                    Button 9
                </button>
            </div>
            <div>
                <img src={pokemonSprite} alt="pokemon" />
            </div>
        </div>
    );
}

export default Grid;
