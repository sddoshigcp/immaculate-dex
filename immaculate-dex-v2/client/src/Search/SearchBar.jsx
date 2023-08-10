import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import {BsSearch} from "react-icons/bs";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
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
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};