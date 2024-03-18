import "../App.css"
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faAngleRight} from "@fortawesome/free-solid-svg-icons"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"

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
  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className="flex justify-center items-center sm:gap-10 gap-4 mb-16 mt-auto w-3/4 md:w-auto safari-pagination">
      <button
        onClick={() => handleChangePage("-1")}
        disabled={currentPage === 1}
        className={`text-zinc-300 text-2xl w-8 h-8 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className="flex justify-center items-center gap-4 text-xs">
        <span
          className={`rounded-sm outline outline-1 text-zinc-300 hover:bg-zinc-800 transition duration-300 w-8 h-8 justify-center flex items-center shadow-md cursor-pointer`}
          onClick={() => handleChangePage("1")}
        >
          1
        </span>
        <span
          className={`rounded-sm outline outline-1 text-zinc-300 hover:bg-zinc-800 transition duration-300 w-8 h-8 justify-center flex items-center shadow-md cursor-pointer ${totalPages >= 2 ? "" : "opacity-50 cursor-not-allowed"}`}
          onClick={() => totalPages >= 2 ? handleChangePage("2") : null}
        >
          2
        </span>
        <span
          className={`rounded-sm outline outline-1 text-zinc-300 hover:bg-zinc-800 transition duration-300 w-8 h-8 justify-center flex items-center shadow-md cursor-pointer ${totalPages >= 3 ? "" : "opacity-50 cursor-not-allowed"}`}
          onClick={() => totalPages >= 3 ? handleChangePage("3") : null}
        >
          3
        </span>
        <span
          className={`rounded-sm outline outline-1 text-zinc-300 opacity-70 transition duration-300 w-12 h-8 justify-center flex items-center shadow-md`}
        >
          {currentPage}...
        </span>
        <span
          className={`rounded-sm outline outline-1 text-zinc-300 hover:bg-zinc-800 transition duration-300 w-8 h-8 justify-center flex items-center shadow-md cursor-pointer`}
          onClick={() => handleChangePage("last")}
        >
          {totalPages}
        </span>
      </div>
      <button
        onClick={() => handleChangePage("+1")}
        disabled={totalPages <= 1 || currentPage == totalPages}
        className={`text-zinc-300 text-2xl w-8 h-8 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Pagination
