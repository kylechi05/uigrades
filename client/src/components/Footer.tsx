import '../App.css';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  const [currentYear, setCurrentYear] = useState<number>(0)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <div className='flex justify-center items-center w-full h-full flex-col static mt-auto'>
      <div className='flex justify-center items-center gap-4'></div>
      <div className='flex justify-between items-center gap-4 border-t-2 border-white border-opacity-20 w-3/4 text-zinc-400 opacity-60 py-7 text-sm tracking-widest flex-col md:flex-row'>
          <h1 className='text-center'>© {currentYear} UIGrades Built With Excellence 💛 </h1>
          <div className='flex justify-center items-center gap-10 text-zinc-200'>
          <Link
            to="/changelog"
            className={`hover:text-white opacity-100 transition duration-200 ease-in-out`}
          >
            Changelog
          </Link>
          <Link
            to="/usage-guide"
            className="hover:text-white opacity-100 transition duration-200 ease-in-out"
          >
            Usage Guide
          </Link>
          </div>
      </div>
    </div>
  );
}

export default Footer
