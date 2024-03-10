import '../App.css';
import { Link } from 'react-router-dom';
import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LandingNavbar = ({showHome=false}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="flex justify-between items-center w-full py-10 sticky top-0 left-0 blurred-container z-[50] h-20">
      { showHome ? 
      <div className='flex items-center gap-4 justify-center'>
        <Link to="/" className='text-zinc-200 text-[1.5rem] cursor-pointer font-bold'><span className='text-primary'>UI</span>Grades</Link>
      </div> :
      <span
          onClick={goBack}
          className={`text-xl text-zinc-400 hover:text-zinc-300 transition duration-200 ease-in-out cursor-pointer`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
    }
      
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
