import "../App.css";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

interface SearchBarProps {
  handleSearch: (page: number, query: string) => void;
  setCurrentPage: (page: number) => void;
  query: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch, setCurrentPage, query }) => {
  const { isDarkMode } = useTheme();

  const clearInput = () => {
    handleSearch(1, "");
    setCurrentPage(1);
    window.history.replaceState({}, "", `/courses?page=1`);
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 mt-5 w-96`}
    >
        <FontAwesomeIcon
          icon={faSearch}
          className={`text-zinc-300 mr-[-30px] z-[40] opacity-50`}
        />
        <input
          className={`bg-dark rounded-lg w-full py-2 text-md pl-8 w-full text-zinc-300 opacity-70 focus:opacity-100 outline outline-zinc-300 outline-1 transition duration-300`}
          id="searchBar"
          type="text"
          placeholder="ex. CS 1210 Fall 2022"
          value={query}
          onChange={(e) => {
            handleSearch(1, e.target.value);
            setCurrentPage(1);
          }}
          autoComplete="off"
          autoFocus
        />
      <FontAwesomeIcon
        icon={faBackspace}
        className={`opacity-50 text-zinc-300 cursor-pointer hover:opacity-100 transition duration-300 ml-[-30px] z-[40]`}
        onClick={clearInput}
      />
    </div>
  );
};

export default SearchBar;