import "./SearchResult.css";

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
  return (
      <div className="search-result" onClick={onSelect}>
          {result}
      </div>
  );
};
