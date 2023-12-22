import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext.js";
import { useEffect, useState } from "react"; // Import useState

const SearchBar = ({ handleSearch, setSearchQuery, setCurrentPage }) => {
  // Pass 'query' as a prop
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState("");

  const clearInput = () => {
    if (searchValue === "") {
      return;
    }
    setSearchValue(""); // Clear the input field
    handleSearch(1, "");
    setSearchQuery("");
    setCurrentPage(1);
    window.history.replaceState({}, "", `/courses?page=${1}`); // Clear the query from the url
  };

  // im getting kind of lost in my own code, but this appears to work, could use some more testing
  /**
   * TLDR: checks if there is a query in the url, if there is, set the search value to that query
   * Search value will then be applied as the value of the input field
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    if (query) {
      setSearchValue(query);
    } else {
      setSearchValue("");
    }
  }, []);

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
          value={searchValue} // Set the input value to 'searchValue'
          onChange={(e) => {
            handleSearch(1, e.target.value);
            setSearchValue(e.target.value); // Update searchValue when the input changes
            setCurrentPage(1);
          }}
          autoComplete="off"
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
};

export default SearchBar;
