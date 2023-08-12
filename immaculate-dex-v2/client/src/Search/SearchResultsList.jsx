import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, onSelect }) => {
    return (
        <div className="results-list">
            {/* <SearchResult result="None" onSelect={() => onSelect("None")} /> */}

            {results.map((result, id) => {
                return (
                    <SearchResult
                        result={result.name}
                        key={id}
                        onSelect={() => onSelect(result.name)}
                    />
                );
            })}
        </div>
    );
};
