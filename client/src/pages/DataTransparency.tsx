import Footer from '../components/Footer.tsx'
import Navbar from '../components/Navbar.tsx'
import "../App.css";
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataTransparency: React.FC = () => {

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    pageRef.current.scrollIntoView();
    document.title = `UIGrades | Data Transparency`;
  }, []);

  return (
    <div ref={pageRef} className="min-h-full flex flex-col z-10 relative justify-center items-center bg-dark">
      <Navbar/>
      <div className='flex flex-col items-center justify-start mt-16 pb-8 gap-32 min-h-screen w-3/4 md:text-justify text-zinc-300 leading-relaxed'>
                <div className='flex flex-col items-start justify-start gap-5'>
                <h1 className='md:text-5xl text-3xl text-primary font-bold underline-offset-[10px]'>Data Transparency</h1>
                <p className='text-lg md:text-2xl font-extralight'>
                    The course data that is used by UIGrades has been rightfully obtained from the University of Iowa. This page will hopefully help resolve any questions or concerns about the data that is being used by UIGrades.
                    <br/>
                    <br/>
                    Due to the various forms of data the University has provided, thorough preprocessing of the data had to be done in order to ensure uniformity across semesters for users to understand. <strong className='text-red-500'>None</strong> of the data values have been tampered with by UIGrades.
                    <br/>
                    <br/>
                    The script ran in order to preprocess the files can be found <a href="https://github.com/acm-uiowa/uigrades/blob/main/db/clean_data.py" target='_blank' className='text-primary'>here</a>. It is a simple script that utilizes Python and a library associated with the language called Pandas. 
                    The preprocessing involves changing specific column names and merges several rows of data that have both a Primary Instructor and Course Supervisor in order to make the data more uniform especially across semesters after Spring 2023.
                    <br/>
                    <br/>
                    More logic is being done in the <a href="https://github.com/acm-uiowa/uigrades/blob/main/db/controllers/apiController.js" target='_blank' className='text-primary'>API Controller</a>, however it is simply aggregating the various courses within a semester and summing their students as well as respective grades together. All data files can be found <a href="https://github.com/acm-uiowa/uigrades/tree/main/db/data" target='_blank' className='text-primary'>here</a> and reflect the various changes mentioned on this page.
                    <br/>
                    <br/>
                    For further questions or concerns on technical details, please contact <a href="mailto:liaozhu@uiowa.edu" target="_blank" className='text-primary'>Liao Zhu</a> or <a href="/contact" className='text-primary'>contact us</a>.
                </p>
                <Link to='https://github.com/acm-uiowa/uigrades' className='flex justify-center items-center text-xs w-auto h-auto text-center md:text-base opacity-70 hover:opacity-100 text-zinc-300 rounded-md transition duration-300 p-4 py-3 outline outline-1 outline-zinc-300'>All Code</Link>
                </div>
      </div>
      <Footer />
    </div>
  );
}

export default DataTransparency;
