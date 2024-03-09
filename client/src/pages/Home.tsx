import Footer from '../components/Footer.tsx'
import LandingNavbar from '../components/LandingNavbar.tsx'
import "../App.css";
import React, { useRef, useEffect } from 'react';

const Home: React.FC = () => {

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    pageRef.current.scrollIntoView();
    document.title = `UIGrades`;
  }, []);

  return (
    <div ref={pageRef} className="min-h-full flex flex-col z-10 relative justify-center items-center bg-dark">
      <LandingNavbar />
      <div className='flex flex-col justify-start items-center gap-10 my-20'>
        <h1 className='text-7xl text-zinc-200 font-bold'><span className='text-primary'>UI</span>Grades</h1>
        <p className='text-zinc-200 text-center font-bold'><span className='glowing-head'>Explore Courses Taken by Fellow </span> <span className='glowing-head-primary'>Hawkeyes</span></p>
      </div>
      <div className='flex flex-col justify-center items-center gap-10 relative h-screen w-full'>
        <div className='flex flex-col justify-center items-center gap-10 relative w-full h-full'>
          <img src="/static/images/uigrades1.png" alt="UIGrades" className="w-1/2 md:w-2/5 absolute top-0 animated-outline-counter" />
          <img src="/static/images/uigrades0.png" alt="UIGrades" className="w-2/3 md:w-1/2 absolute top-20 animated-outline" />
        </div>
        <div className="mb-52 md:mb-40 lg:mb-0 h-full flex justify-center items-center">
          <a href="/courses" className='main-button-n'>
            <div className="main-button-inner">
              <div className='main-button-text'>
              Start Browsing
              </div>
            </div>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
