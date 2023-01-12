import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import "./Search.css";

const Search = (props) => {
  const handleChange = (event) => {
    props.setSearchValue(event.target.value);
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.searchValue}
        onChange={handleChange}
      />
      <SearchIcon className="search__icon" />
    </div>
  );
};

export default Search;
