import React from 'react'
import Navbar from '../components/Navbar.tsx'
import Footer from '../components/Footer.tsx'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.js'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PageNotFound: React.FC = () => {

  const { isDarkMode } = useTheme()

  return (
    <div className="w-full flex justify-center items-center flex-col relative min-h-screen">
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-graph-dark" : "bg-graph"
        } bg-center bg-cover lg:bg-fixed`}
        style={{ zIndex: -1 }}
      ></div>
      <Navbar />
      <div className="flex flex-col text-center items-center justify-center h-full gap-5">
        <h1
          className={`text-3xl ${
            isDarkMode ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          Oops, looks like that page doesn't exist 🤷🏻
        </h1>
        <Link
          to="/"
          className="text-zinc-700 hover:text-zinc-800 bg-yellow-500 hover:bg-yellow-400 transition duration-200 p-2 rounded-md"
        >
          <FontAwesomeIcon icon={faDoorOpen} className="mr-2" />
          Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default PageNotFound