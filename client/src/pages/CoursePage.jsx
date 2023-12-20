import React, { useEffect, useState } from 'react';
import BarGraph from '../components/BarGraph.jsx';
import PieGraph from '../components/PieGraph.jsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
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
  const [typeGraph, setTypeGraph] = useState("bar");
  const [similarCourses, setSimilarCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shared, setShared] = useState(false);
  const id = Number(new URLSearchParams(window.location.search).get("id"));

  const SERVER = "http://localhost:8080/api"; // idc about leaking this, this is all temp anyways

  const { isDarkMode, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const getCourse = async () => {
    if (isNaN(id)) {
      console.log("Invalid 'id' value");
      return;
    }

    //set the loading state to true
    setIsLoading(true);

    const res = await fetch(`${SERVER}/courses/${id}`);
    const fetchedCourse = await res.json();
    setCourse(fetchedCourse);

    let total = 0;
    for (let i = 4; i < 18; i++) {
      total += parseFloat(fetchedCourse[i]);
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
    document.title = `UIGrades | ${course[1]}: ${course[18]} ${course[19]}`;
    getSimilarCourses();
  }, [course]);

  // handles back button click
  useEffect(() => {
    getCourse();
  }, [window.location.search]);

  const handleGraphClick = (typeGraph) => {

    if (typeGraph === "bar") {
      setTypeGraph("bar");
    } else if (typeGraph === "pie") {
      setTypeGraph("pie");
    }
  };

  const getSimilarCourses = async () => {
    setIsLoading(true);
    const res = await fetch(`${SERVER}/similar-courses/${id}`);
    const data = await res.json();
    setSimilarCourses(data);
    setIsLoading(false)
  }

  async function handleRowClick(similarCourseId) {
    navigate(`/course?id=${similarCourseId}`);
    getCourse();
  }

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
            <h1 className={`font-bold text-4xl md:text-6xl`}>{course[1]} </h1>
            <h2 className="font-bold text-xl md:text-3xl text-center">
              {course[2]}{" "}
            </h2>
            <div className="flex items-center justify-start gap-1 text-md md:text-xl">
              <p className="gray">{course[3]}</p> -
              <i>
                {course[18]} {course[19]}
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
                    navigator.clipboard.writeText(currentURL);
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
          {similarCourses.length !== 0 && (
            <h2
              className={`font-bold text-2xl w-full pl-5 ${
                isDarkMode ? "text-zinc-500" : ""
              }`}
            >
              Similar Courses
            </h2>
          )}
          <div className="gap-5 flex justify-start items-center overflow-scroll scrollbar w-full h-full px-5">
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
                } rounded-xl my-5 cursor-pointer hover:bg-white transition duration-300 min-w-[50%] md:min-w-[33%] lg:min-w-[33%] p-5 shadow-lg`}
              >
                <h3 className="font-bold">
                  {similarCourse[1]}
                </h3>
                <p className="description">
                  {similarCourse[3]}
                </p>
                <p className="description">
                  {similarCourse[18]} {similarCourse[19]}
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
