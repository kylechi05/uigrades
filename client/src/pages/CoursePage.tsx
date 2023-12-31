import React, { useEffect, useState } from 'react';
import BarGraph from '../components/BarGraph.tsx';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Loading from "../components/Loading.tsx"
import MessagePopup from "../components/MessagePopup.tsx"
import { useTheme } from '../context/ThemeContext.js';
import config from '../config.js';

import '../App.css';

// this is necessary for correct rerender of similar courses do not delete pwetty pwease - liao
export const dynamic = "force-dynamic";

interface Course {
  id: number;
  SUBJECT_COURSE_SECTION: string;
  COURSE_TITLE: string;
  PRIMARY_INSTRUCTOR_NAME: string;
  A_PLUS: string;
  A: string;
  A_MINUS: string;
  B_PLUS: string;
  B: string;
  B_MINUS: string;
  C_PLUS: string;
  C: string;
  C_MINUS: string;
  D_PLUS: string;
  D: string;
  D_MINUS: string;
  F: string;
  WITHDRAWN: string;
  SEMESTER: string;
  YEAR: string;
}

const CoursePage:React.FC = () => {
  const [course, setCourse] = useState<Course>({  id: 0,
    SUBJECT_COURSE_SECTION: '',
    COURSE_TITLE: '',
    PRIMARY_INSTRUCTOR_NAME: '',
    A_PLUS: '',
    A: '',
    A_MINUS: '',
    B_PLUS: '',
    B: '',
    B_MINUS: '',
    C_PLUS: '',
    C: '',
    C_MINUS: '',
    D_PLUS: '',
    D: '',
    D_MINUS: '',
    F: '',
    WITHDRAWN: '',
    SEMESTER: '',
    YEAR: '',
  });
  const [courseGrades, setCourseGrades] = useState<number[]>([])
  const [originalCourseGrades, setOriginalCourseGrades] = useState<number[]>([]) // used to reset the courseGrades state
  const [showingAggregatedGrades, setShowingAggregatedGrades] = useState<boolean>(false) // used to determine if the courseGrades state is showing the aggregated grades or not
  const [classTotal, setClassTotal] = useState<number>(0);
  const [similarCourses, setSimilarCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [aggregatedGrades, setAggregatedGrades] = useState<number[]>([]);
  const [totalAggregatedStudents, setTotalAggregatedStudents] = useState<number>(0); // total number of students in all sections of the course
  const id:number = Number(new URLSearchParams(window.location.search).get("id"));

  // @ts-ignore
  const SERVER:string = config[process.env.NODE_ENV]["SERVER"]; // grab the correct server url based on the environment

  const { isDarkMode } = useTheme();

  const navigate = useNavigate();

  
  const getCourse = async () => {
    if (isNaN(id)) {
        console.log("Invalid 'id' value");
        return;
    }

    setCourse({  
      id: 0,
      SUBJECT_COURSE_SECTION: '',
      COURSE_TITLE: '',
      PRIMARY_INSTRUCTOR_NAME: '',
      A_PLUS: '',
      A: '',
      A_MINUS: '',
      B_PLUS: '',
      B: '',
      B_MINUS: '',
      C_PLUS: '',
      C: '',
      C_MINUS: '',
      D_PLUS: '',
      D: '',
      D_MINUS: '',
      F: '',
      WITHDRAWN: '',
      SEMESTER: '',
      YEAR: '',
    });
    setCourseGrades([]);
    setOriginalCourseGrades([]);
    setAggregatedGrades([]);
    setClassTotal(0);
    setTotalAggregatedStudents(0);
    setIsLoading(true);

    try {
        const res = await fetch(`${SERVER}/courses/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch course data');
        }
        const fetchedCourse = await res.json();
        
        const courseGrades: number[] = [fetchedCourse[4], fetchedCourse[5], fetchedCourse[6], fetchedCourse[7], fetchedCourse[8], fetchedCourse[9], fetchedCourse[10], fetchedCourse[11], fetchedCourse[12], fetchedCourse[13], fetchedCourse[14], fetchedCourse[15], fetchedCourse[16], fetchedCourse[17]];
        setCourseGrades(courseGrades);
        setOriginalCourseGrades(courseGrades);
        setCourse(fetchedCourse);

        let total = 0;
        for (let i = 4; i < 18; i++) {
            total += parseFloat(fetchedCourse[i]);
        }
        setClassTotal(total);

        const topOfPagePlaceholder = document.getElementById("top-of-page-placeholder");
        if (topOfPagePlaceholder) {
            topOfPagePlaceholder.scrollIntoView({ behavior: "smooth" });
        }
    } catch (error) {
        console.error('Error fetching course data:', error);
    } finally {
        setIsLoading(false);
    }
};



  useEffect(() => {
    setShowingAggregatedGrades(false);
    getCourse();
  }, []);

  useEffect(() => {
    document.title = `UIGrades | ${course[1]}: ${course[18]} ${course[19]}`;
    getSimilarCourses();
    getAggregatedCourseGrades();
  }, [course]);

  // handles back button click
  useEffect(() => {
    getCourse();
    setShowingAggregatedGrades(false);
  }, [window.location.search]);

  const getSimilarCourses = async () => {
    const res = await fetch(`${SERVER}/similar-courses/${id}`);
    const data = await res.json();
    setSimilarCourses(data);
  };

  const getAggregatedCourseGrades = async () => {
    const res = await fetch(`${SERVER}/aggregated-courses/${id}`);
    const data = await res.json();
    setAggregatedGrades(data.aggregatedGrades); // array of grades
    setTotalAggregatedStudents(data.totalStudents); // total number of students in all sections of the course
  }
  
  const toggleShowAggregatedGrades = () => {
    if (showingAggregatedGrades) {
      setCourseGrades(originalCourseGrades);
      setShowingAggregatedGrades(false);
    } else {
      setCourseGrades(aggregatedGrades);
      setShowingAggregatedGrades(true);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        await getCourse();
        await getSimilarCourses();
        await getAggregatedCourseGrades();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  
      setIsLoading(false);
    };
  
    fetchData();
  }, []);

  async function handleRowClick(similarCourseId) {
    navigate(`/course?id=${similarCourseId}`);
  }

  // index 4 - 17 contain all grades, we can sum these up to get the total number of students
  const getTotalForSimilarCourse = (similarCourse): number => {
    return similarCourse
      .slice(4, 18)
      .reduce((acc: number, val: string) => acc + parseInt(val), 0);
  };


  return (
    <div className="w-full flex justify-center items-center flex-col relative">
      {shared && <MessagePopup message="Link copied to clipboard!" />}
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-graph-dark" : "bg-graph"
        } bg-cover bg-center lg:bg-fixed`}
        style={{ zIndex: -1 }}
      ></div>
      
      <Navbar />


      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      )}
    
    {courseGrades.length > 0 && (

      <div className={`flex flex-col items-center my-20 w-full`}>
        <div className=" flex flex-col items-center justify-center w-full">

        {courseGrades.length > 0 && (

          <div
            className={`flex items-center flex-col gap-4 w-full ${
              isDarkMode ? "text-zinc-400" : "text-zinc-700"
            }`}
          >
            
            <h1 className={`font-bold text-4xl md:text-6xl`}>
              {aggregatedGrades && showingAggregatedGrades ? `${course[1].split(":")[0]}:${course[1].split(":")[1]}` : course[1]}{" "}
            </h1>
            <h2 className="font-bold text-xl md:text-3xl text-center">
              {course[2]}{" "}
            </h2>
            <div className="flex items-center justify-start gap-1 text-md md:text-xl">
              <p className="gray">{aggregatedGrades && showingAggregatedGrades ? "Primary Instructor" : course[3]}</p> -
              <i>
                {course[18]} {course[19]}
              </i>
            </div>
            <p className="">
              <FontAwesomeIcon icon={faUser} className="text-yellow-400" />{" "}
              {aggregatedGrades && showingAggregatedGrades
                ? totalAggregatedStudents
                : classTotal}{" "}
              Hawkeyes
            </p>
          </div>)}

          {/* Graph container */}
          <div
            className={`${"w-full px-2 md:w-3/5"} ${
              isDarkMode ? "text-stone-50" : ""
            } my-10 flex flex-col justify-center items-center`}
          >
            <p
              className={`${
                isDarkMode ? "text-zinc-400" : "text-zinc-600"
              } flex justify-center items-center text-lg font-bold`}
            >
              {!showingAggregatedGrades
                ? `${course[1]} ${course[18]} ${course[19]}`
                : `All ${course[1] && course[1].split(":")[0]}:${
                    course[1] && course[1].split(":")[1]
                  } ${course[18]} ${course[19]} Sections`}
            </p>
            <BarGraph course={courseGrades} />
            <div className="flex justify-center items-center gap-2 m-5">
              {aggregatedGrades && (
                <p
                  onClick={() => toggleShowAggregatedGrades()}
                  className={`${
                    isDarkMode
                      ? "text-zinc-400 hover:text-zinc-300"
                      : "text-zinc-600 hover:text-zinc-500"
                  } flex justify-center items-center transition duration-200 cursor-pointer underline`}
                >
                  Show{" "}
                  {showingAggregatedGrades
                    ? course[1] + " " + course[18] + " " + course[19]
                    : `All ${
                        course[18] && course[18] + " " + course[19]
                      } Sections`}{" "}
                </p>
              )}
              <div
                onClick={() => {
                  setShared(true);
                  var currentURL = window.location.href;
                  navigator.clipboard.writeText(currentURL);
                  setTimeout(() => {
                    setShared(false);
                  }, 2000);
                }}
                className="flex gap-2 justify-center items-center transition duration-200 cursor-pointer text-yellow-400 hover:text-yellow-500"
              >
                Share
                <FontAwesomeIcon icon={faShareNodes} />
              </div>
            </div>
          </div>
        </div>
        <div className="justify-center flex flex-col items-center gap-5 w-full">
          {similarCourses.length !== 0 && (
            <h2
              className={`font-bold text-2xl w-full pl-5 text-center ${
                isDarkMode ? "text-zinc-500" : ""
              }`}
            >
              Similar Courses
            </h2>
          )}
          <div className="gap-5 flex justify-start items-center overflow-auto w-full h-full px-5">
            {similarCourses.map((similarCourse, index) => (
              <div
                onClick={() => {
                  handleRowClick(similarCourse[0]);
                }}
                key={index}
                className={`${
                  isDarkMode
                    ? "bg-zinc-600 hover:bg-zinc-500 text-stone-50"
                    : "hover:bg-white bg-stone-50"
                } rounded-xl my-5 cursor-pointer hover:bg-white transition duration-300 min-w-[60%] md:min-w-[33%] lg:min-w-[33%] p-5 shadow-lg flex justify-between items-center`}
              >
                <div>
                  <h3 className="font-bold">{similarCourse[1]}</h3>
                  <p className="description">{similarCourse[3]}</p>
                  <p className="description">
                    {similarCourse[18]} {similarCourse[19]}
                  </p>
                </div>
                <div className="ml-5">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-yellow-400 text-xl"
                  />{" "}
                  <span className="text-xl">
                    {getTotalForSimilarCourse(similarCourse)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* add button to filter only by course subject */}

      </div>)}
      {courseGrades.length > 0 && (
      <Footer />)}
    </div>
  );
};

export default CoursePage;
