import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useTheme } from "../context/ThemeContext.js";
import changelogs from "../changelogs/changelogs.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Changelog() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [logs, setLogs] = useState(changelogs);

  useEffect(() => {
    document.title = "UIGrades | Changelog";
    // initialize the showDescription property to false for each log
    let newLogs = [...logs];
    newLogs.forEach((log) => {
      log.showDescription = false;
    });
    setLogs(newLogs);
  }, []);

  const toggleDescription = (idx) => {
    let newLogs = [...logs];
    newLogs[idx].showDescription = !newLogs[idx].showDescription;
    setLogs(newLogs);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col relative pb-24">
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-darkTheme" : "bg-graph"
        } bg-cover bg-center bg-cover lg:bg-fixed`}
        style={{ zIndex: -1 }}
      ></div>
      <Navbar />
      <div
        className={`w-full flex justify-start mt-20 items-center flex-col gap-5`}
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
                          : type === "Release"
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

export default Changelog;
