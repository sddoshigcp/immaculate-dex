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
    checkGuess,
} from "./Pokemon";
import { SearchBar } from "../Search/SearchBar";
import { SearchResultsList } from "../Search/SearchResultsList";
import { GridButton } from "../GridButton/GridButton";
import { EndGame } from "../EndGame/EndGame";
import { Header } from "../Header/Header";
import { StartGame } from "../StartGame/StartGame";

function Grid() {
    //Selected button and pokemon
    const [selectedButtonId, setSelectedButtonId] = useState(null);
    const [previouslySelectedButtonId, setPreviouslySelectedButtonId] =
        useState(null); //TODO: find way to remove
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    //Disabled buttons and correct buttons
    const [buttonStates, setButtonStates] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);

    //Header for categories, clues based on headers, and answers based on clues
    const [gridHeaders, setGridHeaders] = useState([]);
    const [gridClues, setGridClues] = useState([]);
    const [gridAnswers, setGridAnswers] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]); //Correct answers from user

    //User guesses
    const [userGuesses, setUserGuesses] = useState([]); //All user answers
    const [guessesRemaining, setGuessesRemaining] = useState(null);

    //Loading state
    const [loading, setLoading] = useState(true);

    //Whether to show the search bar
    const [showSearchBar, setShowSearchBar] = useState(false);

    //Search results
    const [results, setResults] = useState([]);

    //Start screen
    const [startScreen, setStartScreen] = useState(true);

    //Refs
    const coverDivRef = useRef(null);
    const inputRef = useRef(null);

    //When the user selects a pokemon from the search bar (aka, making a guess)
    const handleSearchResultSelect = async (selectedOption) => {
        console.log(`Option selected:`, selectedOption);

        //Set the selected pokemon (TODO: might be unnecessary)
        setSelectedPokemon(selectedOption);

        //check guess
        const guess = await checkGuess(
            selectedOption,
            gridClues[selectedButtonId - 1]
        );

        //Push guess into userguesses
        userGuesses.push(selectedOption); //TODO: repeat checking

        //TODO: if guess is correct, change button state to 2
        if (guess) {
            //Add pokemon to gridAnswers
            let newGridAnswers = gridAnswers;
            newGridAnswers[selectedButtonId - 1] = selectedOption;
            setGridAnswers(newGridAnswers);
            console.log("Grid answers: " + gridAnswers);

            //Change button state to 2
            let newButtonStates = buttonStates;
            newButtonStates[selectedButtonId - 1] = 2;
            setButtonStates(newButtonStates);
            console.log("Button states: " + buttonStates);
        }

        //Close the search bar
        handleSearchBarClose();

        //Decrement guesses remaining
        let newRemainingGuesses = guessesRemaining;
        newRemainingGuesses--;
        setGuessesRemaining(newRemainingGuesses);

        if (newRemainingGuesses === 0) {
            //delegate end of game to another function
        }
    };

    //Test code for selected pokemon
    useEffect(() => {
        console.log(`Pokemon selected:`, selectedPokemon);
    }, [selectedPokemon]); // This useEffect will run whenever selectedPokemon changes

    //Selecting a box from the grid
    const handleButtonClick = (buttonId) => {
        //if button is already selected, do nothing
        if (buttonStates[buttonId - 1] > 0) {
            return;
        }

        //change button states
        let newButtonStates = buttonStates;
        newButtonStates[buttonId - 1] = 1;

        //set button states
        setButtonStates(newButtonStates);

        //set selected button
        setSelectedButtonId(buttonId);
        setPreviouslySelectedButtonId(buttonId);

        //show search bar
        setShowSearchBar(true);

        //print corresponding clue
        console.log("Clue: " + JSON.stringify(gridClues[buttonId - 1]));
    };

    //Test code for button states
    useEffect(() => {
        // console.log("previouslySelectedButtonId:", previouslySelectedButtonId);
        // console.log("selectedButtonId:", selectedButtonId);
        // console.log(`Button states:`, buttonStates);
    }, [selectedButtonId]);

    //Closing the search bar
    const handleSearchBarClose = (e) => {
        //Make every 1 in buttonStates a 0
        let newButtonStates = buttonStates;
        for (let i = 0; i < newButtonStates.length; i++) {
            if (newButtonStates[i] === 1) {
                newButtonStates[i] = 0;
            }
        }

        setShowSearchBar(false);
        setResults([]);
        setSelectedButtonId(null);
    };

    //Close Start Screen
    function handleStartScreenClose() {
        setStartScreen(false);
    };

    //Open start screen
    function handleStartScreenOpen() {
        setStartScreen(true);
    }
    


    useEffect(() => {
        //Fetch data from API
        async function fetchData() {
            try {
                //Retrieving headers
                const gridHeaders = await getHeaders();

                //Setting up clues
                const firstArray = gridHeaders.slice(3);
                const secondArray = gridHeaders.slice(0, 3);
                for (const element1 of firstArray) {
                    for (const element2 of secondArray) {
                        gridClues.push([element1, element2]);
                    }
                }

                //Set remaining guesses
                setGuessesRemaining(gridClues.length);

                //Setting up headers
                const upperCaseGridHeaders = gridHeaders.map((header) =>
                    header.category.toUpperCase()
                );
                setGridHeaders(upperCaseGridHeaders);

                //Completed loading
                setLoading(false);
            } catch (error) {
                console.error("Error in component:", error.message);
            }
        }
        fetchData();
    }, []);

    //TODO: Loading screen
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-contents">
            <Header open={handleStartScreenOpen}></Header>

            {startScreen && (
                <div className="search-div">
                    <div className="cover-div"></div>
                    <StartGame close={handleStartScreenClose} />
                </div>
            )}

            {guessesRemaining === 0 && (
                <div className="search-div">
                    <div className="cover-div"></div>
                    <EndGame guesses={buttonStates}></EndGame>
                </div>
            )}

            {showSearchBar && (
                <div className="search-div">
                    <div
                        className="cover-div"
                        ref={coverDivRef}
                        onClick={handleSearchBarClose}
                    ></div>
                    <div className="search-bar-container" ref={inputRef}>
                        <SearchBar setResults={setResults} />
                        {results && results.length > 0 && (
                            <SearchResultsList
                                results={results}
                                onSelect={handleSearchResultSelect}
                            />
                        )}
                    </div>
                </div>
            )}

            <div className="button-grid">
                <img src="./immaculate-dex-logo.png" className="grid-logo" />
                <p className="column-header">{gridHeaders[0]}</p>
                <p className="column-header">{gridHeaders[1]}</p>
                <p className="column-header">{gridHeaders[2]}</p>
                <p></p>
                <p className="row-header">{gridHeaders[3]}</p>

                <GridButton
                    id="button1"
                    state={buttonStates[0]}
                    func={() => handleButtonClick(1)}
                    name={gridAnswers[1 - 1]}
                />
                <GridButton
                    id="button1"
                    state={buttonStates[1]}
                    func={() => handleButtonClick(2)}
                    name={gridAnswers[2 - 1]}
                />
                <GridButton
                    id="button1"
                    state={buttonStates[2]}
                    func={() => handleButtonClick(3)}
                    name={gridAnswers[3 - 1]}
                />

                <p></p>
                <p className="row-header">{gridHeaders[4]}</p>
                <GridButton
                    id="button1"
                    state={buttonStates[3]}
                    func={() => handleButtonClick(4)}
                    name={gridAnswers[4 - 1]}
                />
                <GridButton
                    id="button1"
                    state={buttonStates[4]}
                    func={() => handleButtonClick(5)}
                    name={gridAnswers[5 - 1]}
                />
                <GridButton
                    id="button1"
                    state={buttonStates[5]}
                    func={() => handleButtonClick(6)}
                    name={gridAnswers[6 - 1]}
                />

                <div className="guess-div">
                    <p className="guess-header">GUESSES LEFT</p>
                    <p className="guess-remaining">{guessesRemaining}</p>
                </div>
                <p className="row-header">{gridHeaders[5]}</p>
                <GridButton
                    id="button1"
                    state={buttonStates[6]}
                    func={() => handleButtonClick(7)}
                    name={gridAnswers[7 - 1]}
                />
                <GridButton
                    id="button1"
                    state={buttonStates[7]}
                    func={() => handleButtonClick(8)}
                    name={gridAnswers[8 - 1]}
                />
                <GridButton
                    id="button1"
                    state={buttonStates[8]}
                    func={() => handleButtonClick(9)}
                    name={gridAnswers[9 - 1]}
                />
            </div>
        </div>
    );
}

export default Grid;
