import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CourseListItem from "../components/CourseListItem";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import CourseListNavbar from "../components/CourseListNavbar.jsx";
import Loading from "../components/Loading.jsx";
import Footer from "../components/Footer.jsx";
import { useTheme } from "../context/ThemeContext.js";
import config from "../config";

import "../App.css";

const CourseList = () => {
  const [loading, setLoading] = useState(true); // Added loading state
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currSearchQuery, setCurrSearchQuery] = useState("");

  const pageSize = 9;
  const SERVER = config[process.env.NODE_ENV]["SERVER"]; // grab the correct server url based on the environment

  const { isDarkMode, toggleTheme } = useTheme();

  // checks the url for a page query, if it exists, set the current page to that page
  useEffect(() => {
    const pageParam = new URLSearchParams(window.location.search).get("page");
    const queryParam = new URLSearchParams(window.location.search).get("q");
    const page = pageParam ? parseInt(pageParam) : 1;
    const query = queryParam ? queryParam.toLowerCase() : "";
    setCurrentPage(page);
    setCurrSearchQuery(query);

    getCourses(page, query);
  }, []);

  // should trigger this useeffect when the current page or search query changes
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

      // invalid page, default to page 1
      if (!res.ok) {
        throw new Error("Invalid Request");
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

  // page can either be '+1' or '-1' or '1' or 'last'
  const handleChangePage = (page) => {
    if (page === "+1") {
      setCurrentPage((prevPage) => prevPage + 1);
      getCourses(currentPage + 1, currSearchQuery);
    } else if (page === "-1") {
      setCurrentPage((prevPage) => prevPage - 1);
      getCourses(currentPage - 1, currSearchQuery);
    } else if (page === "1") {
      setCurrentPage(1);
      getCourses(1, currSearchQuery);
    } else if (page === "last") {
      setCurrentPage(totalPages);
      getCourses(totalPages, currSearchQuery);
    }
  }

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
        setCurrentPage={setCurrentPage}
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
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
      {data.length === 0 && !loading ? (
        <div
          className={`text-lg ${
            isDarkMode ? "text-zinc-300" : "text-zinc-700"
          } flex items-center justify-center flex-col text-center px-10`}
        >
          <p className="text-2xl">Uh, this is weird: 404 error 😨</p>
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
