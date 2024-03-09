import '../App.css';
import { Link } from 'react-router-dom';
import React from 'react';
import '../App.css';

const LandingNavbar = () => {

    return (
      <div className="flex justify-between items-baseline w-full py-10 sticky top-0 left-0 blurred-container z-[50]">
        <div className='flex items-center gap-4 justify-center'>
          <Link to="/" className='text-zinc-200 text-[1.5rem] cursor-pointer font-bold glow'><span className='text-primary'>UI</span>Grades</Link>
        </div>
        <ul className="flex justify-end items-center gap-5 sm:gap-12 w-full pl-8">
          <Link
            to="/contact"
            className={`text-zinc-400 glow`}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className={`text-zinc-400 glow`}
          >
            About
          </Link>
          <Link
            to="/usage-guide"
            className={`text-zinc-400 glow`}
          >
            Usage Guide
          </Link>
        </ul>
      </div>
    );
}

export default LandingNavbar;
