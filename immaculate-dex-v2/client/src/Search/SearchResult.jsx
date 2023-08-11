import "./SearchResult.css";
import { getSprite } from "../Grid/Pokemon";
import { useEffect, useState } from "react";


export const SearchResult = ({ result, onSelect }) => {
  const [pokemonSprite, setPokemonSprite] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const sprite = await getSprite(result);
      setPokemonSprite(sprite);
      setLoading(false);
    }
    fetchData();
  }, [result]);
  

  return (
      <div className="search-result">
          <p className="pokemon-name">{result.toUpperCase()}</p>
          {!loading && <img className="sprite-image" key={pokemonSprite} src={pokemonSprite} alt="pokemon" />}
          <button className="select-pokemon" onClick={onSelect}>Select</button>
      </div>
  );
};
