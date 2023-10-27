import '../App.css';
import { useTheme } from "../context/ThemeContext.js";

const Footer = () => {
  
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`flex items-center justify-center flex-col text-center p-4 text-xs absolute bottom-0 ${
        isDarkMode ? "text-stone-50" : ""
      }`}
    >
      <p className="description">
        Made by the 2023-2024{" "}
        <a
          className="text-yellow-400"
          href="https://acm.org.uiowa.edu/"
          target="_blank"
        >
          ACM
        </a>{" "}
        and{" "}
        <a
          className="text-yellow-400"
          href="https://usg.uiowa.edu/"
          target="_blank"
        >
          USG
        </a>{" "}
        at UIowa
      </p>
      {/* <p className="description">All the source code and data for this site can be found <a className="text-yellow-400" href="#" target="_blank">here</a></p> */}
    </div>
  );
}

export default Footer