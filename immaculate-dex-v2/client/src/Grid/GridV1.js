import React, { Component, createRef } from "react";
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

export default class GridV1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedButtonId: null,
            selectedPokemon: null,
            disabledButtons: [],
            pokemonNames: [],
            gridHeaders: [],
            loading: true,
            pokemonSprite: null,

            // search bar state
            showSearchBar: false,

            // search results state
            searchResults: [],
        };

        this.coverDivRef = createRef();
        this.inputRef = createRef();

        
    }

    

    handlePokemonChange = (selectedOption) => {
        this.setState({ selectedPokemon: selectedOption });
    };

    handleButtonClick = (buttonId) => {
        this.setState({
            selectedButtonId: buttonId,
            showSearchBar: true,
        });
    };

    handleSearchBarClose = (e) => {
        // Check if the click occurred outside the search bar
        if (!this.inputRef.current.contains(e.target)) {
            this.setState({
                showSearchBar: false,
                selectedButtonId: null,
            });
        }
    };

    //For first render
    async componentDidMount() {
        try {
            //call getAllPokemon
            const pokemon = await getAllPokemon();
            this.setState({ pokemonNames: pokemon });

            //call getGridHeaders
            const gridHeaders = await getHeaders();

            //set all grid headers to uppercase
            for (let i = 0; i < gridHeaders.length; i++) {
                gridHeaders[i] = gridHeaders[i].toUpperCase();
            }

            //initialize gridHeaders state
            this.setState({ gridHeaders: gridHeaders });

            //Test sprite
            const pokemonSprite = await getSprite("bulbasaur");
            this.setState({ pokemonSprite: pokemonSprite });

            //test getTypesForPokemon
            const types = await getTypesForPokemon("bulbasaur");
            //console.log("types: " + JSON.stringify(types));

            //test getAllPokemonByType
            const pokemonByType = await getAllPokemonByType("grass");
            //console.log("pokemonByType: " + JSON.stringify(pokemonByType));

            //test getAllPokemonByTypes
            const pokemonByTypes = await getAllPokemonByTypes(
                "grass",
                "poison"
            );
            //console.log("pokemonByTypes: " + JSON.stringify(pokemonByTypes));

            //Finish loading
            this.setState({ loading: false });
        } catch (error) {
            console.error("Error in component:", error.message);
        }
    }

    componentDidUpdate() {}

    render() {
        const { selectedPokemon, selectedButtonId } = this.state;
        const pokemonNames = this.state.pokemonNames;
        
        //make array of all pokemon names
        let pokemonNamesArray = [];
        for (let i = 0; i < pokemonNames.length; i++) {
            pokemonNamesArray.push(pokemonNames[i].name);
            //console.log("pokemonNamesArray: " + JSON.stringify(pokemonNamesArray));
        }


        const pokemonSprite = this.state.pokemonSprite;
        let gridHeaders = [];
        gridHeaders = this.state.gridHeaders;
        //console.log("in render: " + JSON.stringify(pokemonNames));
        //console.log("gridHeaders: " + JSON.stringify(gridHeaders));

        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="page-contents">
                {this.state.showSearchBar && (
                    <div
                        className="cover-div"
                        ref={this.coverDivRef}
                        onClick={this.handleSearchBarClose}
                    >
                        <input
                            type="text"
                            placeholder={"Ex. " + pokemonNames[0].name}
                            ref={this.inputRef}
                        />
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
                            this.state.selectedButtonId === 1
                                ? "grid-button selected"
                                : this.state.disabledButtons.includes(1)
                                ? "grid-button disabled"
                                : "grid-button"
                        }
                        onClick={() => this.handleButtonClick(1)}
                    >
                        Button 1
                    </button>
                    <button
                        id="button2"
                        className={
                            this.state.selectedButtonId === 2
                                ? "grid-button selected"
                                : this.state.disabledButtons.includes(2)
                                ? "grid-button disabled"
                                : "grid-button"
                        }
                        onClick={() => this.handleButtonClick(2)}
                    >
                        Button 2
                    </button>
                    <button
                        id="button3"
                        className={
                            this.state.selectedButtonId === 3
                                ? "grid-button selected"
                                : this.state.disabledButtons.includes(3)
                                ? "grid-button disabled"
                                : "grid-button"
                        }
                        onClick={() => this.handleButtonClick(3)}
                    >
                        Button 3
                    </button>
                    <p></p>
                    <p className="row-header">{gridHeaders[4]}</p>
                    <button
                        id="button4"
                        className={
                            this.state.selectedButtonId === 4
                                ? "grid-button selected"
                                : this.state.disabledButtons.includes(4)
                                ? "grid-button disabled"
                                : "grid-button"
                        }
                        onClick={() => this.handleButtonClick(4)}
                    >
                        Button 4
                    </button>
                    <button
                        id="button5"
                        className={
                            this.state.selectedButtonId === 5
                                ? "grid-button selected"
                                : this.state.disabledButtons.includes(5)
                                ? "grid-button disabled"
                                : "grid-button"
                        }
                        onClick={() => this.handleButtonClick(5)}
                    >
                        Button 5
                    </button>
                    <button
                        id="button6"
                        className={
                            this.state.selectedButtonId === 6
                                ? "grid-button selected"
                                : this.state.disabledButtons.includes(6)
                                ? "grid-button disabled"
                                : "grid-button"
                        }
                        onClick={() => this.handleButtonClick(6)}
                    >
                        Button 6
                    </button>
                    <p></p>
                    <p className="row-header">{gridHeaders[5]}</p>
                    <button
                        id="button7"
                        className={
                            this.state.selectedButtonId === 7
                                ? "grid-button selected"
                                : this.state.disabledButtons.includes(7)
                                ? "grid-button disabled"
                                : "grid-button"
                        }
                        onClick={() => this.handleButtonClick(7)}
                    >
                        Button 7
                    </button>
                    <button
                        id="button8"
                        className={
                            this.state.selectedButtonId === 8
                                ? "grid-button selected"
                                : this.state.disabledButtons.includes(8)
                                ? "grid-button disabled"
                                : "grid-button"
                        }
                        onClick={() => this.handleButtonClick(8)}
                    >
                        Button 8
                    </button>
                    <button
                        id="button9"
                        className={
                            this.state.selectedButtonId === 9
                                ? "grid-button selected"
                                : this.state.disabledButtons.includes(9)
                                ? "grid-button disabled"
                                : "grid-button"
                        }
                        onClick={() => this.handleButtonClick(9)}
                    >
                        Button 9
                    </button>
                </div>
                {/* <div>
                    {pokemonNames.map((pokemon, index) => (
                        <div key={index}>{pokemon.name}</div>
                    ))}
                </div> */}
                <div>
                    <img src={pokemonSprite} alt="pokemon" />
                </div>
            </div>
        );
    }
}
