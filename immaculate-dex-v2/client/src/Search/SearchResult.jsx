import "./SearchResult.css";
import { getSprite } from "../Grid/Pokemon";
import { useEffect, useState } from "react";

// export const SearchResult = ({ result }) => {
//   return (
//     <div
//       className="search-result"
//       onClick={(e) => alert(`You selected ${result}!`)}
//     >
//       {result}
//     </div>
//   );
// };

export const SearchResult = ({ result, onSelect }) => {
  const [pokemonSprite, setPokemonSprite] = useState("");

  useEffect(() => {
    async function fetchData() {
      const sprite = await getSprite(result);
      setPokemonSprite(sprite);
    };
    fetchData();
  }, []);

  return (
      <div className="search-result" onClick={onSelect}>
          <p className="pokemon-name">{result.toUpperCase()}</p>
          <img className="sprite-image" src={pokemonSprite} alt="pokemon" />
          <button className="select-pokemon" onClick={onSelect}>Select</button>
      </div>
  );
};
