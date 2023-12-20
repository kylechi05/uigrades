import React, { useEffect, useState, useContext } from "react";
import Papa from "papaparse";
import SearchBar from "../components/SearchBar";
import CourseListItem from "../components/CourseListItem";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import CourseListNavbar from "../components/CourseListNavbar.jsx";
import Loading from "../components/Loading.jsx";
import Footer from "../components/Footer.jsx";
import { useTheme } from "../context/ThemeContext.js";

import "../App.css";

const CourseList = () => {
  const [loading, setLoading] = useState(true); // Added loading state
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currSearchQuery, setCurrSearchQuery] = useState("");

  const pageSize = 9;
  const SERVER = "http://localhost:8080/api"; // idc about leaking this, this is all temp anyways

  const { isDarkMode, toggleTheme } = useTheme();

  // useEffect(() => {
  //   // get the query from the url if it exists
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const query = urlParams.get("query");
  //   if (query) {
  //     handleSearch(query);
  //     setCurrSearchQuery(query); // Update the search query state
  //   } else {
  //     handleSearch("");
  //     setCurrSearchQuery(""); // If there is no query, set the search query state to empty
  //   }
  // }, [data, window.location.search]);

  useEffect(() => {
    const pageParam = new URLSearchParams(window.location.search).get("page");
    const queryParam = new URLSearchParams(window.location.search).get("q");
    const page = pageParam ? parseInt(pageParam) : 1;
    const query = queryParam ? queryParam : "";
    getCourses(page, query);
    setCurrentPage(page);
    setCurrSearchQuery(query);
  }, []);

  useEffect(() => {
    const url = `/courses?page=${currentPage}${
      currSearchQuery ? "&q=" + currSearchQuery : ""
    }`;
    window.history.pushState({}, "", url);

    // getCourses(currentPage, currSearchQuery);
  }, [currentPage, currSearchQuery]);

  const getCourses = async (page, q) => {
    try {
      setCurrSearchQuery(q);
      const res = await fetch(`${SERVER}/courses?page=${page}&q=${q}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const { data, totalItems } = await res.json();
      setData(data);
      setTotalPages(Math.ceil(totalItems / pageSize));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setCurrentPage(1);
      console.log(err.message);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const navigate = useNavigate();

  const handleCourseClick = async (id) => {
    navigate(`/course?id=${id}`);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col relative min-h-screen">
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-list-dark" : "bg-list"
        } bg-cover bg-center bg-cover lg:bg-fixed`}
        style={{ zIndex: -1 }}
      ></div>
      <CourseListNavbar />
      <SearchBar
        handleSearch={getCourses}
        setSearchQuery={setCurrSearchQuery}
        query={currSearchQuery}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center p-10 w-full min-h-full mt-32">
          <div className="flex justify-center items-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-2 w-full h-full">
              {data.map((course, index) => (
                <div
                  key={index}
                  onClick={() => handleCourseClick(course[0])}
                  className={`${
                    isDarkMode
                      ? "bg-zinc-600 hover:bg-zinc-500 text-stone-50"
                      : "hover:bg-white bg-stone-200"
                  } flex h-full w-full justify-between items-center rounded-md cursor-pointer rounded-xl transition duration-300 p-4`}
                >
                  <CourseListItem course={course} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Pagination
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      {data.length === 0 && !loading ? (
        <div
          className={`text-lg ${
            isDarkMode ? "text-zinc-300" : "text-zinc-700"
          } flex items-center justify-center flex-col text-center p-10`}
        >
          <p className="">No courses found 😥</p>
          <p className="">Did you spell it right?</p>
        </div>
      ) : (
        ""
      )}

      {!loading ? <Footer /> : null}
    </div>
  );
};

export default CourseList;
