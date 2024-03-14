import '../App.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LandingNavbar = ({showHome=false}) => {
  const navigate = useNavigate();
  const [expandMenu, setExpandMenu] = useState(false)
  const [strokeDashOffset, setStrokeDashOffset] = useState(0)

  const goBack = () => {
    navigate(-1);
  }

  const handleMenuClick = () => {
    setExpandMenu(true)
    setStrokeDashOffset((strokeDashOffset) => strokeDashOffset === -138 ? 0 : -138)
  }

  return (
    <div className="flex justify-between items-center w-full sticky top-0 left-0 blurred-container z-[50] h-20">
      <div className='flex items-center gap-4 justify-start w-full'>
        { showHome ? 
        <Link to="/" className='text-zinc-200 text-[1.5rem] cursor-pointer font-bold'><span className='text-primary'>UI</span>Grades</Link>
        :
        <span
          onClick={goBack}
          className={`text-xl text-zinc-400 hover:text-zinc-300 transition duration-200 ease-in-out cursor-pointer`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        }
      </div> 

      { !showHome &&
      <div className='w-full flex justify-center items-center'>
        <Link to="/" className='text-zinc-200 text-3xl cursor-pointer font-bold text-center'><span className='text-primary'>UI</span>Grades</Link>
        </div>
      }
      <div className='flex w-full h-full'>

        {/*  hide/show expanded navigation based on nav layout */}
        <ul className={`${
          showHome
            ? 'sm:flex'
            : 'lg:flex'
        } hidden justify-end items-center gap-12 w-full pl-8`}>
          <Link
            to="/courses"
            className={`text-zinc-400 glow`}
          >
            Courses
          </Link>
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
        </ul>
        
        {/*  hide/show navigation menu icon based on nav layout */}
        <div className={`${
          showHome
            ? 'sm:hidden'
            : 'lg:hidden'
        } relative flex justify-end w-full h-full`}>
          <svg
            className='nav-menu'
            style={{strokeDashoffset: strokeDashOffset}}
            onClick={handleMenuClick}
            viewBox='0 0 100 100'>
            <path
                className='menu-ends'
                d='m0,27 h70 c15,0,15,46,0,46 h-12 l-46,-46'
              />
              <path
                className='menu-middle'      
                d='m20,50 h15
                   m35,0 h-35'
              />
              <path
                className='menu-ends'
                d='m0,73 h70 c15,0,15,-46,0,-46 h-12 l-46,46'
              /> 
          </svg>
        </div>
      </div>
    </div>
  );
}

export default LandingNavbar;
