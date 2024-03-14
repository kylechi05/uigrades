import LandingNavbar from "../components/LandingNavbar.tsx"
import Footer from "../components/Footer.tsx"
import CreditProfile from '../components/CreditProfile.tsx'
import { Link } from 'react-router-dom'
import { useTheme } from "../context/ThemeContext.js"
import React, { useEffect, useState, useRef } from 'react'
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

  const pageRef = useRef(null)

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
    //@ts-ignore
    pageRef.current.scrollIntoView()
		document.title = "UIGrades | About"
    getContributors();
	},[])

  return (
    <div ref={pageRef} className="w-full flex justify-center items-center flex-col relative min-h-screen text-zinc-700 bg-dark">
      <LandingNavbar />
      <div
        className={`my-5 gap-10 flex flex-col text-zinc-300 w-3/4`}
      >
        <div className="w-full flex justify-start items-center flex-col gap-5 flex-grow">
          <h1 className="font-bold text-4xl lg:text-6xl text-left w-full">
            About{" "}
            <span className="text-yellow-400 hover:text-yellow-500 transition duration-300 text-left">
              UI
            </span>
            Grades
          </h1>
          <p className="text-lg text-left w-full">
            UIGrades is a website made by <strong>students</strong> that allows other{" "}
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
          <div className="w-full flex justify-start items-center gap-4">
            <Link to='/usage-guide' className="flex justify-center items-center text-xs w-1/2 h-12 md:w-auto md:h-auto text-center md:text-base opacity-70 hover:opacity-100 text-zinc-300 rounded-md transition duration-300 p-4 py-3 outline outline-1 outline-zinc-300">Usage Guide</Link>
            <Link to='/data-transparency' className="flex justify-center items-center text-xs w-1/2 h-12 md:w-auto md:h-auto text-center md:text-base opacity-70 hover:opacity-100 text-zinc-300 rounded-md transition duration-300 p-4 py-3 outline outline-1 outline-zinc-300">Data Transparency</Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center w-full flex-grow gap-20">
          <div className="flex flex-col justify-start items-center gap-8 w-full flex-grow">
            <h1 className="font-bold text-4xl lg:text-6xl w-full text-left">
              Organizers
            </h1>
            <div className="flex flex-col justify-center w-full items-start gap-5 md:gap-10">
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
          <div className="flex flex-col justify-start items-start gap-4 w-full ">
            <h1 className="font-bold text-4xl lg:text-6xl w-full text-left">
              Contributors
            </h1>
            <div className="flex justify-start items-center overflow-auto h-full w-full overflow-x-scroll no-scrollbar gap-3">
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
          <div className="flex flex-col justify-start w-full items-center gap-5">
            <h1 className="font-bold text-4xl lg:text-6xl w-full text-left">
              Organizations
            </h1>
            <div className="flex justify-start w-full items-center gap-3">
              <a href="https://usg.uiowa.edu/" target="_blank" className="">
                <img
                  src="/static/images/usg.jpeg"
                  alt="USG logo"
                  className="rounded-md w-20 h-20 md:w-24 md:h-24 cursor-pointer opacity-80 hover:opacity-100 transition duration-300 hover:shadow-xl"
                />
              </a>
              <a href="https://acm.org.uiowa.edu/" target="_blank" className="">
                <img
                  src="/static/images/acm.png"
                  alt="ACM logo"
                  className="rounded-md w-20 h-20 md:w-24 md:h-24 cursor-pointer opacity-80 hover:opacity-100 transition duration-300 hover:shadow-xl"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About
