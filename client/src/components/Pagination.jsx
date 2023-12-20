import "../App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faAngleRight} from "@fortawesome/free-solid-svg-icons"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"


const Pagination = ({handlePrevPage, handleNextPage, currentPage, totalPages}) => {
  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className="flex justify-center items-center mb-20 gap-10 mt-auto">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`bg-yellow-400 rounded-full w-8 h-8 black br-black ${
          currentPage === 1
            ? "bg-yellow-600 cursor-not-allowed"
            : "hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className="flex justify-center items-center">
        <span className="rounded-full bg-stone-50 shadow-sm text-black w-10 h-10 transition-opacity duration-300 justify-center flex items-center">
          {currentPage == 1 ? "-" : currentPage - 1}
        </span>
        <span className="rounded-full bg-white text-black w-14 h-14 justify-center flex items-center shadow-xl">
          {currentPage}
        </span>
        <span className="rounded-full bg-stone-50 shadow-sm text-black w-10 h-10 justify-center flex items-center">
          {currentPage == totalPages ? "-" : currentPage + 1}
        </span>
      </div>
      <button
        onClick={handleNextPage}
        disabled={totalPages <= 1 || currentPage == totalPages}
        className={`bg-yellow-400 rounded-full w-8 h-8 black br-black ${
          totalPages <= 1 || currentPage == totalPages
            ? "bg-yellow-600 cursor-not-allowed"
            : "hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}

export default Pagination