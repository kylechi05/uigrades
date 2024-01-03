import Navbar from "../components/Navbar.tsx"
import Footer from "../components/Footer.tsx"
import CreditProfile from '../components/CreditProfile.tsx'
import { Link } from 'react-router-dom'
import {useTheme} from "../context/ThemeContext.js"
import React, {useEffect, useState} from 'react'
import contributors from "../modules/contributors.js"
import ContributorProfile from "../components/ContributorProfile.tsx"

interface ContributorInterface {
  username: string;
  img: string;
  github: string;
}

const About: React.FC = () => {

  const { isDarkMode } = useTheme();

  const [allContributors, setAllContributors] = useState<any[]>([]);

  // uses github's api to fetch each contributor's github data
  const getContributors = async () => {
    for (const contributor of contributors) {
        try {
          const response = await fetch(`https://api.github.com/users/${contributor}`);
          if (response.ok) {
            const data = await response.json();
            setAllContributors((prev) => [...prev, {
              username: data.login,
              img: data.avatar_url,
              github: data.html_url
            }]);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    }
  }

	useEffect(() => {
		document.title = "UIGrades | About"
    getContributors();
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
            <a
              href="https://uiowa.edu/"
              target="_blank"
              className="text-yellow-400 hover:text-yellow-500 transition duration-200"
            >
              University of Iowa
            </a>{" "}
            students to view grades from previous semesters. <br />
            The data is provided by the University's{" "}
            <a
              href="https://transparency.uiowa.edu/"
              target="_blank"
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
        <div className="flex flex-col justify-start items-center w-full flex-grow gap-4">
          <div className="flex flex-col justify-start items-center gap-8 w-full flex-grow">
            <h1 className="font-bold text-4xl lg:text-6xl w-full text-left">
              Organizers
            </h1>
            <div className="flex flex-col justify-center w-full items-start gap-5 md:gap-8">
              <CreditProfile
                name="Quinn Eldridge"
                img="/static/images/quinn.jpeg"
                title="Project Coordinator"
                org="Undergraduate Student Government"
                linkedin="https://www.linkedin.com/in/quinn-eldridge-606137242"
              />
              <CreditProfile
                name="Liao Zhu"
                img="/static/images/liao.jpeg"
                title="Lead Developer"
                org="Association for Computing Machinery"
                linkedin="https://www.linkedin.com/in/liao-zhu/"
                github="https://github.com/liaozhuzhu"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center gap-4 w-full flex-grow">
            <h1 className="font-bold text-2xl lg:text-4xl w-full text-left">
              Contributors
            </h1>
            <div className="flex flex justify-start w-full items-center gap-2">
              {allContributors.map((contributor: ContributorInterface, idx: number) => (
                <ContributorProfile
                  key={idx}
                  username={contributor.username}
                  img={contributor.img}
                  github={contributor.github}
                />
              ))}  
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About
