import '../App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "../context/ThemeContext.js";

const LandingNavbar = () => {

    const { isDarkMode, toggleTheme } = useTheme();

    return (
      <div className="flex justify-between items-center w-full p-4 h-14 absolute top-0 left-0">
        <ul className="flex justify-start items-center gap-8 ml-5 w-1/2">
          <Link
            to="/contact"
            className={`text-zinc-400 ${isDarkMode ? 'hover:text-zinc-200' : 'hover:text-black'} transition duration-200 ease-in-out`}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className={`text-zinc-400 ${isDarkMode ? 'hover:text-zinc-200' : 'hover:text-black'} transition duration-200 ease-in-out`}
          >
            About
          </Link>
        </ul>
        <div className="flex justify-end items-center gap-8 mr-5 w-1/2">
          <Link
            to="/courses"
            className="text-gray-200 bg-zinc-900 rounded-full hover:bg-black hover:text-white transition duration-200 ease-in-out p-2 px-4 text-center text-md hidden md:block"
          >
            Get Started
          </Link>
          <div className="cursor-pointer flex justify-center items-center w-5">
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className="text-xl"
              onClick={toggleTheme}
            />
          </div>
        </div>
      </div>
    );
}

export default LandingNavbar;
