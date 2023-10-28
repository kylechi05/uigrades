import React, { useEffect, useState } from 'react';
import { db } from '../db/db.js';
import BarGraph from '../components/BarGraph.jsx';
import PieGraph from '../components/PieGraph.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { csvFiles } from "../data/CSVFiles.js"
import Footer from '../components/Footer.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';
import Loading from "../components/Loading.jsx"
import MessagePopup from "../components/MessagePopup.jsx"
import { useTheme } from '../context/ThemeContext.js';

import '../App.css';

const CoursePage = () => {
  const [course, setCourse] = useState({});
  const [classTotal, setClassTotal] = useState(0);
  const [typeGraph, setTypeGraph] = useState('bar');
  // const id = window.location.search.split('=')[2];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shared, setShared] = useState(false);
  // const [totalCourses, setTotalCourses] = useState([]);

  const { isDarkMode, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const getCourse = async () => {
    // const fetchedCourse = await db.courses.get(parseInt(id));

    /**
     * temporary solution to allow url to be shared
     * get the course from the url and linearly search for it in the csv files
     */

    const url = window.location.search;
    const params = new URLSearchParams(url);
    const section = params.get("result");
    const semester = params.get("semester");
    const year = params.get("year");

    let fetchedCourse = {};
    //set the loading state to true
    setIsLoading(true);

    for (const file of csvFiles) {
      const response = await fetch(file);
      const text = await response.text();
      const result = await parseCSV(text);
      // iterate each row in result.data and add a course : section to the csv data
      // this is used to filter by semester and year later
      for (const row of result.data) {
        // find the row that matches the section, semester, and year
        if (row['SUBJECT_COURSE_SECTION'] === section && row['SEMESTER'] === semester && row['YEAR'] === year) {
          fetchedCourse = row;
        }
      }
    }

    // if the course is not found, redirect to the PageNotFound page
    if (!fetchedCourse) {
      navigate("/404");
      return;
    }
    setCourse(fetchedCourse);
    let allLetterGrades = ["A_PLUS", "A", "A_MINUS", "B_PLUS", "B", "B_MINUS", "C_PLUS", "C", "C_MINUS", "D_PLUS", "D", "D_MINUS", "F", "WITHDRAWN"];
    let total = 0;
    for (let i = 0; i < allLetterGrades.length; i++) {
      total += (parseFloat(fetchedCourse[allLetterGrades[i]]));
    }
    setClassTotal(total);
    const topOfPagePlaceholder = document.getElementById(
      "top-of-page-placeholder"
    );

    if (topOfPagePlaceholder) {
      topOfPagePlaceholder.scrollIntoView({ behavior: "smooth" });
    } 
  };

  useEffect(() => {
    getCourse();
  }, []);

  useEffect(() => {
    document.title = `UIGrades | ${course['SUBJECT_COURSE_SECTION']}: ${course['SEMESTER']} ${course['YEAR']}`;
    getSimilarCourses();
  }, [course]);

  // handles back button click
  useEffect(() => {
    getCourse()
  }, [window.location.search]);

  let allCourses = [];
  const handleGraphClick = (typeGraph) => {
    allCourses.push(course);
    data.map((similarCourse) => {
        allCourses.push(similarCourse);
      });
      // setTotalCourses(allCourses);

    if (typeGraph === 'bar') {
      setTypeGraph('bar');
    } else if (typeGraph === 'pie') {
      setTypeGraph('pie');
    }
  };

  const getSimilarCourses = async () => {
    const parsedData = []; 
    //set the loading state to true
    setIsLoading(true);

    for (const file of csvFiles) {
      const response = await fetch(file);
      const text = await response.text();
      const result = await parseCSV(text);
      // iterate each row in result.data and add a course : section to the csv data
      // this is used to filter by semester and year later
      if (course && course['SUBJECT_COURSE_SECTION']) {
        const courseSubject = course['SUBJECT_COURSE_SECTION'].slice(0, -5);
        const courseSection = course['SUBJECT_COURSE_SECTION'].slice(-4);
        for (const row of result.data) {
          let potentialCourse = row['SUBJECT_COURSE_SECTION'].slice(0, -5);
          let potentialSubject = row['SUBJECT_COURSE_SECTION'].slice(-4);
          if (potentialCourse === courseSubject) {
            if (
              (row["SEMESTER"] != course["SEMESTER"] &&
                row["YEAR"] != course["YEAR"]) ||
              potentialSubject != courseSection
            ) {
              parsedData.push(row);
            }
          }
        }
      }
    }
    setData(parsedData);
    //set the loading state to false
    setIsLoading(false);
  };

  async function handleRowClick(similarCourse) {
    let id;
  const modifiedRow = {
    ...similarCourse,
    Aplus: similarCourse['A_PLUS'],
    Aminus: similarCourse['A_MINUS'],
    Bplus: similarCourse['B_PLUS'],
    Bminus: similarCourse['B_MINUS'],
    Cplus: similarCourse['C_PLUS'],
    Cminus: similarCourse['C_MINUS'],
    Dplus: similarCourse['D_PLUS'],
    Dminus: similarCourse['D_MINUS'],
    };   

    // =======> This has been scrapped for now <=======
     // add the course to the database if it doesn't exist 
    // const courseExists = await db.courses.get({ SUBJECT_COURSE_SECTION: modifiedRow['SUBJECT_COURSE_SECTION'], YEAR: modifiedRow['YEAR'], SEMESETER: modifiedRow['SEMESTER'] });
    // if (!courseExists) {
    //   id = await db.courses.add(modifiedRow);
    // }
    // navigate(`/search/selected?result=${modifiedRow['SUBJECT_COURSE_SECTION']}&id=${id}`);
    navigate(
      `/search/selected?result=${modifiedRow["SUBJECT_COURSE_SECTION"]}&semester=${modifiedRow["SEMESTER"]}&year=${modifiedRow["YEAR"]}`
    );
    getCourse();
    // window.location.reload()
    // setCourse(modifiedRow);
  };

  // help function to parse the csv text
  const parseCSV = (text) => {
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: resolve,
        error: reject,
      });
    });
  };

  return (
    <div className="w-full flex justify-center items-center flex-col relative min-h-screen">
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-graph-dark" : "bg-graph"
        } bg-cover bg-center lg:bg-fixed`}
        style={{ zIndex: -1 }}
      ></div>
      {shared && <MessagePopup message="Link copied to clipboard!" />}
      <Navbar />
      <div id="top-of-page-placeholder"></div>
      <div className={`flex flex-col items-center my-20 w-full`}>
        <div className=" flex flex-col items-center justify-center w-full">
          <div
            className={`flex items-center flex-col gap-4 w-full ${
              isDarkMode ? "text-zinc-400" : "text-zinc-700"
            }`}
          >
            <h1 className={`font-bold text-4xl md:text-6xl`}>
              {course["SUBJECT_COURSE_SECTION"]}{" "}
            </h1>
            <h2 className="font-bold text-xl md:text-3xl text-center">
              {course["COURSE_TITLE"]}{" "}
            </h2>
            <div className="flex items-center justify-start gap-1 text-md md:text-xl">
              <p className="gray">{course["PRIMARY_INSTRUCTOR_NAME"]}</p> -
              <i>
                {course["SEMESTER"]} {course["YEAR"]}
              </i>
            </div>
            <p className="">
              <FontAwesomeIcon icon={faUser} className="text-yellow-400" />{" "}
              {classTotal} Hawkeyes
            </p>
          </div>

          {/* Graph container */}
          <div
            className={`${
              typeGraph === "bar"
                ? "w-full px-2 md:w-3/5"
                : "md:w-2/5 w-full px-2"
            } ${
              isDarkMode ? "text-stone-50" : ""
            } my-10 flex flex-col justify-center items-center`}
          >
            <div
              className="flex gap-4 justify-center items-center"
              id="btn-group"
            >
              <button
                className={`bg-black transition duration-200 rounded-md p-2 ${
                  typeGraph === "bar"
                    ? "bg-yellow-400 text-black"
                    : "text-white hover:bg-zinc-700"
                }`}
                onClick={handleGraphClick.bind(this, "bar")}
              >
                Bar Graph
              </button>
              <button
                className={`bg-black transition duration-200 rounded-md p-2 ${
                  typeGraph === "pie"
                    ? "bg-yellow-400 text-black"
                    : "text-white hover:bg-zinc-700"
                }`}
                onClick={handleGraphClick.bind(this, "pie")}
              >
                Pie Chart
              </button>
              <div className="flex justify-center items-center transition duration-200 cursor-pointer text-yellow-400 hover:text-yellow-500">
                <FontAwesomeIcon
                  icon={faShareNodes}
                  onClick={() => {
                    setShared(true);
                    var currentURL = window.location.href;
                    navigator.clipboard.writeText(
                      currentURL
                    );
                    setTimeout(() => {
                      setShared(false);
                    }, 2000);
                  }}
                />
              </div>
            </div>
            {typeGraph === "bar" ? (
              <BarGraph course={course} />
            ) : (
              <PieGraph course={course} />
            )}
          </div>
        </div>
        <div className="justify-center flex flex-col items-center gap-5 w-full">
          {isLoading && <Loading />}
          {data.length !== 0 && (
            <h2
              className={`font-bold text-2xl w-full pl-5 ${
                isDarkMode ? "text-zinc-500" : ""
              }`}
            >
              Similar Courses
            </h2>
          )}
          <div className="gap-5 flex justify-start items-center overflow-scroll scrollbar w-full h-full px-5">
            {data.map((similarCourse, index) => (
              <div
                onClick={() => {
                  handleRowClick(similarCourse);
                }}
                key={index}
                className={`${
                  isDarkMode
                    ? "bg-zinc-600 hover:bg-zinc-500 text-stone-50"
                    : "hover:bg-white bg-stone-50"
                } rounded-xl my-5 cursor-pointer hover:bg-white transition duration-300 min-w-[50%] md:min-w-[33%] lg:min-w-[33%] p-5 shadow-lg`}
              >
                <h3 className="font-bold">
                  {similarCourse["SUBJECT_COURSE_SECTION"]}
                </h3>
                <p className="description">
                  {similarCourse["PRIMARY_INSTRUCTOR_NAME"]}
                </p>
                <p className="description">
                  {similarCourse["SEMESTER"]} {similarCourse["YEAR"]}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* add button to filter only by course subject */}
      </div>
      <Footer />
    </div>
  );
};

export default CoursePage;
