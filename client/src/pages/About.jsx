import React from 'react'
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import CreditProfile from '../components/CreditProfile.jsx'
import { Link } from 'react-router-dom'
import {useTheme} from "../context/ThemeContext.js"
function About() {

  const { isDarkMode, toggleTheme } = useTheme();

	useEffect(() => {
		document.title = "UIGrades | About"
	},[])

  return (
    <div className="w-full flex justify-center items-center flex-col relative min-h-screen text-zinc-700">
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-graph-dark" : "bg-graph"
        } bg-cover bg-center bg-cover lg:bg-fixed`}
        style={{ zIndex: -1 }}
      ></div>
      <Navbar />
      <div
        className={`md:grid md:my-20 mb-20 mt-28 grid-cols-2 w-full px-10 md:px-20 gap-10 flex flex-col ${
          isDarkMode ? "text-zinc-300" : ""
        }`}
      >
        <div className="w-full flex justify-start items-center flex-col gap-5 flex-grow">
          <h1 className="font-bold text-4xl lg:text-6xl text-left w-full">
            About{" "}
            <span className="text-yellow-400 hover:text-yellow-500 transition duration-300 text-left">
              UI
            </span>
            Grades
          </h1>
          <p className="text-lg text-left">
            <span className="hover:text-yellow-400 transition duration-200">
              U
            </span>
            <span className="hover:text-yellow-400 transition duration-200">
              I
            </span>
            <span className="hover:text-yellow-400 transition duration-200">
              G
            </span>
            <span className="hover:text-yellow-400 transition duration-200">
              r
            </span>
            <span className="hover:text-yellow-400 transition duration-200">
              a
            </span>
            <span className="hover:text-yellow-400 transition duration-200">
              d
            </span>
            <span className="hover:text-yellow-400 transition duration-200">
              e
            </span>
            <span className="hover:text-yellow-400 transition duration-200">
              s
            </span>{" "}
            is a website made by <strong>students</strong> that allows other{" "}
            <span className="text-yellow-400 transition duration-200">
              University of Iowa
            </span>{" "}
            students to view grades from previous semesters. <br />
            The data is provided by the University's{" "}
            <a
              href="https://transparency.uiowa.edu/"
              className="text-yellow-400 hover:text-yellow-500 transition duration-200"
            >
              Office of Transparency
            </a>{" "}
            and consists of previous semester grades. <br />
            <br />
            To begin using the website, simply click on the "Browse Courses"
            button on the{" "}
            <Link
              to="/"
              className="text-yellow-400 hover:text-yellow-500 transition duration-200"
            >
              home
            </Link>{" "}
            page and search for a course. <br />
            If you have any questions or concerns, please contact us using the{" "}
            <Link
              to="/contact"
              className="text-yellow-400 hover:text-yellow-500 transition duration-200"
            >
              Contact
            </Link>{" "}
            page.
          </p>
          <div className="flex flex-col justify-start w-full items-center gap-5">
            <h1 className="font-bold text-lg lg:text-2xl w-full text-left">
              Organizations
            </h1>
            <div className="flex justify-start w-full items-center gap-5">
              <a href="https://usg.uiowa.edu/" target="_blank" className="">
                <img
                  src="/static/images/usg.jpeg"
                  alt="USG logo"
                  className="cursor-pointer rounded-full w-16 md:w-16 md:h-16 lg:w-24 lg:h-24 h-16 md:w-16 md:h-16 lg:w-24 lg:h-24 hover:shadow-xl transition duration-200 border-4 border-zinc-700"
                />
              </a>
              <a href="https://acm.org.uiowa.edu/" target="_blank" className="">
                <img
                  src="/static/images/acm.png"
                  alt="ACM logo"
                  className="cursor-pointer w-16 md:w-16 md:h-16 lg:w-24 lg:h-24 h-16 md:w-16 md:h-16 lg:w-24 lg:h-24 hover:shadow-xl transition duration-200 border-4 border-zinc-700 rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center gap-8 w-full flex-grow">
          <h1 className="font-bold text-4xl lg:text-6xl w-full text-left">
            Contributors
          </h1>
          <div className="flex flex-col justify-center w-full items-start gap-5 md:gap-8">
            <CreditProfile
              name="Quinn Eldridge"
              img="/static/images/quinn.jpeg"
              org="Undergraduate Student Government"
              linkedin="https://www.linkedin.com/in/quinn-eldridge-606137242"
            />
            <CreditProfile
              name="Liao Zhu"
              img="/static/images/liao.jpeg"
              org="Association for Computing Machinery"
              linkedin="https://www.linkedin.com/in/liao-zhu/"
              github="https://github.com/liaozhuzhu"
            />
            <CreditProfile
              name="Amol Bhagavathi"
              img="/static/images/amol.jpeg"
              org="Association for Computing Machinery"
              linkedin="https://www.linkedin.com/in/ambha21/"
              github="https://github.com/AmBha21"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About
