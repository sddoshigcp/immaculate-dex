import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import {BsSearch} from "react-icons/bs";
import { getAllPokemon } from "../Service/pokedexService";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const fetchData = (value) => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       const results = json.filter((user) => {
  //         return (
  //           value &&
  //           user &&
  //           user.name &&
  //           user.name.toLowerCase().includes(value)
  //         );
  //       });
  //       setResults(results);
  //       setSearchResults(results);
  //     });
  // };

  const fetchData = (value) => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((json) => {
        const results = json.results.filter((pokemon) => {
          return (
            value &&
            pokemon &&
            pokemon.name &&
            pokemon.name.toLowerCase().includes(value)
          );
        });

        results.push({
          name: "None"
        });

        
        setResults(results);
        setSearchResults(results);
      });
  };



  const handleChange = (value) => {

    setInput(value);
    fetchData(value);
  };

  return (
    <div className={`input-wrapper ${searchResults.length > 0 ? 'full' : 'empty'}`}>
      <BsSearch id="search-icon" />
      <input
        className="search-input"
        placeholder="Search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};