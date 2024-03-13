import Footer from '../components/Footer.tsx'
import LandingNavbar from '../components/LandingNavbar.tsx'
import Carousel from '../components/Carousel.tsx'
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
      <LandingNavbar showHome/>
      <div className='flex flex-col justify-start items-center gap-10 mt-20'>
        <h1 className='text-7xl text-zinc-200 font-bold'><span className='text-primary'>UI</span>Grades</h1>
        <p className='text-zinc-200 text-center font-bold'><span className='glowing-head'>Explore Courses Taken by Fellow </span> <span className='glowing-head-primary'>Hawkeyes</span></p>
      </div>
      <div className='flex flex-col justify-start items-center gap-56 relative min-h-screen w-full'>
        <div className="h-full flex justify-center items-center mt-20 mb-0 lg:mb-20">
            <a href="/courses" className='main-button-n'>
              <div className="main-button-inner">
                <div className='main-button-text'>
                Start Browsing
                </div>
              </div>
            </a>
          </div>
        <div className='flex flex-col justify-center items-center gap-10 relative w-7/12 h-full mb-20'>
          <Carousel />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
