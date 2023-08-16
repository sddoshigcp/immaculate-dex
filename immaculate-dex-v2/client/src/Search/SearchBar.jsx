import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import {BsSearch} from "react-icons/bs";
import { getAllPokemon } from "../Service/pokedexService";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = (value) => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1281")
      .then((response) => response.json())
      .then((json) => {
        // const results = json.results.filter((pokemon) => {
        //   return (
        //     value &&
        //     pokemon &&
        //     pokemon.name &&
        //     pokemon.name.toLowerCase().includes(value)
        //   );
        // });
        const results = json.results.filter((pokemon) => {
          return (
            value &&
            pokemon &&
            pokemon.name &&
            pokemon.name.toLowerCase().includes(value.toLowerCase())
          );
        }).slice(0, 100);
  

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