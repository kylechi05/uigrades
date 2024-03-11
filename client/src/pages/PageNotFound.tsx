import React, { useEffect, useRef } from 'react'
import LandingNavbar from '../components/LandingNavbar.tsx'
import Footer from '../components/Footer.tsx'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.js'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PageNotFound: React.FC = () => {

  const { isDarkMode } = useTheme()
  
  const pageRef = useRef(null)

  useEffect(() => {
    //@ts-ignore
      pageRef.current.scrollIntoView()
  }, [])

  return (
    <div ref={pageRef} className="w-full flex justify-center items-center flex-col relative min-h-screen bg-dark">
      <LandingNavbar />
      <div className="flex flex-col text-center items-center justify-start mt-20 gap-5 text-zinc-300">
        <FontAwesomeIcon icon={faBan} className="text-6xl text-red-500" />
        <h1
          className={`text-4xl font-bold`}
        >
          Page Not Found
        </h1>
        <p className='text-xl max-w-80'>We could not find the page you were looking for. Please try searching for another page or return home.</p>
        <Link
          to="/"
          className="outline outline-1 outline-zinc-300 text-zinc-300 opacity-70 transition duration-300 hover:opacity-100 p-4 py-3 rounded-md"
        >
          Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default PageNotFound