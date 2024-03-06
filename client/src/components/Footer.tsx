import '../App.css';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  const [currentYear, setCurrentYear] = useState<number>(0)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <div className='flex justify-center items-center w-full h-full flex-col static'>
      <div className='flex justify-center items-center gap-4'></div>
      <div className='flex justify-between items-center gap-4 border-t-2 border-white border-opacity-20 w-11/12 text-zinc-400 opacity-60 py-7 text-sm tracking-widest flex-col md:flex-row'>
          <h1>© {currentYear} UIGrades Built With Excellence 💛 </h1>
          <div className='flex justify-center items-center gap-10 text-zinc-200'>
          <Link
            to="https://acm.org.uiowa.edu/"
            target='_blank'
            className="hover:text-white opacity-100 transition duration-200 ease-in-out"
          >
            ACM
          </Link>
          <Link to="https://usg.uiowa.edu/" target='_blank' className='hover:text-white opacity-100 transition duration-200 ease-in-out'>
            USG
          </Link>
          <Link
            to="/"
            className="hover:text-white opacity-100 transition duration-200 ease-in-out"
          >
            User Guide
          </Link>
          </div>
      </div>
    </div>
  );
}

export default Footer
