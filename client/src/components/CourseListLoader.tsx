import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "../App.css";

const CourseListLoader: React.FC = () => {

  const pageRef = useRef(null);

  return (
    <div ref={pageRef} className="w-full flex justify-start items-center flex-col relative min-h-screen bg-dark">
          <div className="flex flex-col justify-start items-start p-10 mb-5 mt-5 w-full min-h-[32rem]">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-2 w-full h-full">
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className="outline outline-1 text-zinc-700 flex h-full w-full justify-between items-center cursor-pointer rounded-md transition duration-300 p-4 bg-zinc-800 bg-opacity-70 hover:bg-opacity-100"
                  style={{
                    background: "linear-gradient(to right, #232326, #4b5563)",
                    backgroundSize: "200% 100%",
                    animation: "slideRight .75s infinite",
                }}
                >
                    <div className='flex justify-between items-center w-full text-zinc-300 opacity-30'>
                        <div className={`flex justify-center items-start flex-col`}>
                        <h1 className="font-bold text-primary">...</h1>
                            <h2 className="font-bold w-[200px] sm:w-full md:w-[150px] lg:w-[225px] xl:w-[350px] truncate overflow-hidden whitespace-nowrap overflow-ellipsis">
                                ...
                            </h2>
                        <p className="max-w-[250px] truncate overflow-hidden whitespace-nowrap overflow-ellipsis">...</p>
                        <p className="">
                            ... ...
                        </p>
                        </div>
                        <p className="items-center flex gap-1">
                        <FontAwesomeIcon icon={faUser} className="text-yellow-400 text-xl" />{" "}
                        <span className="text-xl">...</span>
                        </p>
                    </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  );
};

export default CourseListLoader;
