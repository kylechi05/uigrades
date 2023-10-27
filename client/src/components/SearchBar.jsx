import "../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBackspace, faSearch} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "../context/ThemeContext.js";
import {useEffect} from 'react';

const SearchBar = ({handleSearch, setSearchQuery}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const clearInput = () => {
    document.getElementById("searchBar").value = "";
    handleSearch("");
  };

  return (
    <div
      className={`flex items-center justify-between rounded-full gap-2 px-4 py-2 w-80 ${
        isDarkMode ? "bg-zinc-600" : "bg-white"
      } absolute top-20 shadow-lg`}
    >
      <div className="flex justify-center items-center w-full">
        <FontAwesomeIcon
          icon={faSearch}
          className={`${isDarkMode ? "text-stone-50" : "text-stone-600"}`}
        />
        <input
          className={`${
            isDarkMode ? "bg-zinc-600 text-stone-50" : "text-stone-600"
          } focus:outline-none text-md  pl-2 w-full`}
          id="searchBar"
          type="text"
          placeholder="ex. CS 1210 Fall 2022"
          onChange={(e) => {
            handleSearch(e.target.value);
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <FontAwesomeIcon
        icon={faBackspace}
        className={`${
          isDarkMode ? "text-stone-50" : "text-stone-600"
        } cursor-pointer hover:text-stone-400 transition duration-300`}
        onClick={clearInput}
      />
    </div>
  );
}

export default SearchBar