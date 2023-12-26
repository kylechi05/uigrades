import "../App.css"
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faAngleRight} from "@fortawesome/free-solid-svg-icons"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"
import { useTheme } from "../context/ThemeContext.js";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleChangePage: (page: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleChangePage,
}) => {
  const { isDarkMode } = useTheme();
  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className="flex justify-center items-center mb-20 sm:gap-10 gap-4 mt-auto">
      <button
        onClick={() => handleChangePage("-1")}
        disabled={currentPage === 1}
        className={`bg-yellow-400 rounded-full w-8 h-8 ${
          currentPage === 1 ? "invisible" : "hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className="flex justify-center items-center gap-1">
        <span
          className={`rounded-full ${
            isDarkMode
              ? "bg-zinc-500 text-white hover:bg-zinc-300 hover:text-black"
              : "bg-stone-50 text-black hover:bg-zinc-800 hover:text-zinc-300"
          } w-8 h-8 justify-center flex items-center shadow-md text-sm cursor-pointer transition ${
            2 >= currentPage ? "invisible" : ""
          }`}
          onClick={() => handleChangePage("1")}
        >
          1
        </span>
        <span
          className={`rounded-full ${
            isDarkMode ? "text-white" : "text-black"
          } mx-1 justify-center flex items-center shadow-xl text-sm ${
            2 >= currentPage ? "invisible" : ""
          }`}
        >
          ...
        </span>
        <span
          className={`rounded-full ${
            isDarkMode ? "bg-zinc-500 text-white" : "bg-stone-50 text-black"
          } w-8 h-8 justify-center flex items-center shadow-md text-sm`}
        >
          {currentPage == 1 ? "-" : currentPage - 1}
        </span>
        <span
          className={`rounded-full ${
            isDarkMode
              ? "bg-zinc-300 text-zinc-800"
              : " bg-zinc-800 text-zinc-300"
          } w-8 h-8 justify-center flex items-center shadow-xl text-sm`}
        >
          {currentPage}
        </span>
        <span
          className={`rounded-full ${
            isDarkMode ? "bg-zinc-500 text-white" : "bg-stone-50 text-black"
          } w-8 h-8 justify-center flex items-center shadow-md text-sm`}
        >
          {currentPage == totalPages ? "-" : currentPage + 1}
        </span>
        <span
          className={`rounded-full ${
            isDarkMode ? "text-white" : "text-black"
          } mx-1 justify-center flex items-center shadow-xl text-sm ${
            totalPages - 1 <= currentPage ? "invisible" : ""
          }`}
        >
          ...
        </span>
        <span
          className={`rounded-full ${
            isDarkMode
              ? "bg-zinc-500 text-white hover:bg-zinc-300 hover:text-black"
              : "bg-stone-50 text-black hover:bg-zinc-800 hover:text-zinc-300"
          } w-8 h-8 justify-center flex items-center shadow-md text-sm cursor-pointer transition ${
            totalPages - 1 <= currentPage ? "invisible" : ""
          }`}
          onClick={() => handleChangePage("last")}
        >
          {totalPages}
        </span>
      </div>
      <button
        onClick={() => handleChangePage("+1")}
        disabled={totalPages <= 1 || currentPage == totalPages}
        className={`bg-yellow-400 rounded-full w-8 h-8 black br-black ${
          totalPages <= 1 || currentPage == totalPages
            ? "invisible"
            : "hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Pagination