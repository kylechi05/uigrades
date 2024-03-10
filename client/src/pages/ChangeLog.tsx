import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { useTheme } from "../context/ThemeContext.js";
import changelogs from "../modules/changelogs.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../App.css"

interface ChangeLog {
  version: string;
  type: string[];
  date: string;
  features: string[];
  description: string;
  author: string;
  showDescription: boolean;
}

const ChangeLog:React.FC = () => {
  const { isDarkMode } = useTheme();
  const [logs, setLogs] = useState<ChangeLog[]>(changelogs);
  const pageRef = useRef(null)

  useEffect(() => {
    if (pageRef.current !== null) {
      // @ts-ignore
      pageRef.current.scrollIntoView()
    }
    document.title = "UIGrades | Changelog";
    // initialize the showDescription property to false for each log
    let newLogs = [...logs];
    newLogs.forEach((log: ChangeLog) => {
      log.showDescription = false;
    });
    setLogs(newLogs);
  }, []);

  const toggleDescription = (idx:number) => {
    let newLogs = [...logs];
    newLogs[idx].showDescription = !newLogs[idx].showDescription;
    setLogs(newLogs);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col relative bg-dark min-h-screen" ref={pageRef}>
      <Navbar />
      <div
        className={`w-4/5 flex justify-start mt-20 items-center flex-col gap-5 mb-10`}
      >
        <div
          className={`flex justify-center items-center flex-col ${
            isDarkMode ? "text-zinc-200" : "text-zinc-700"
          }`}
        >
          <h1 className="font-bold text-3xl md:text-5xl">Changelog</h1>
        </div>
        <div className="flex justify-center items-center flex-col gap-16 w-full">
          {logs.map((changelog, idx) => {
            return (
              <div
                className={`flex justify-start items-start flex-col w-full px-10 gap-2 ${
                  isDarkMode ? "text-zinc-200" : "text-zinc-700"
                }`}
                key={idx}
              >
                <div className="flex justify-start items-center gap-2">
                  <h1 className="font-bold text-xl md:text-2xl">
                    {changelog.version}
                  </h1>
                  <h1 className="text-lg md:text-xl">{changelog.date}</h1>
                </div>
                <ul className="flex justify-start items-center gap-2">
                  {changelog.type.map((type, idx) => (
                    <li
                      className={`flex justify-center items-center rounded-md p-1 ${
                        type === "Update"
                          ? "bg-green-500"
                          : type === "Feature"
                          ? "bg-yellow-500"
                          : type === "Bug Fix"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                      key={idx}
                    >
                      <p className="text-xs md:text-xs">{type}</p>
                    </li>
                  ))}
                </ul>
                <ul className="flex justify-start items-start flex-col gap-2">
                  {changelog.features.map((feature, idx) => (
                    <div
                      className="flex justify-start items-center gap-2"
                      key={idx}
                    >
                      <div className="flex justify-center items-center">
                        <p className="text-md md:text-md">- {feature}</p>
                      </div>
                    </div>
                  ))}
                </ul>
                {changelog.description && (
                  <>
                    <p
                      className="text-sm cursor-pointer mt-2 flex justify-center items-center gap-1"
                      onClick={() => toggleDescription(idx)}
                    >
                      <div className="flex justify-center items-center gap-1">
                        <FontAwesomeIcon
                          icon={
                            changelog.showDescription ? faCaretDown : faCaretUp
                          }
                          className="text-xs md:text-md"
                        />
                        <p>{changelog.showDescription ? "Hide" : "Show"}</p>
                      </div>
                      Description
                    </p>
                    {changelog.showDescription && (
                      <p className="text-sm md:text-md">
                        {changelog.description && (
                          <p className="text-sm md:text-md">
                            {changelog.description
                              .split(/(https?:\/\/\S+)/)
                              .map((part, index) => {
                                if (part.match(/^https?:\/\/\S+$/)) {
                                  return (
                                    <a
                                      href={part}
                                      key={index}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-yellow-400"
                                    >
                                      {part}
                                    </a>
                                  );
                                } else {
                                  return part;
                                }
                              })}
                          </p>
                        )}
                      </p>
                    )}
                  </>
                )}
                <p className="text-xs">
                  <span className="font-bold">Author:</span> {changelog.author}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChangeLog;
