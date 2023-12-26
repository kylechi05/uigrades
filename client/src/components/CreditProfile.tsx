import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import React from 'react'
import { useTheme } from '../context/ThemeContext';

interface CreditProfileProps {
  img: string;
  name: string;
  title: string;
  org: string;
  linkedin: string;
  github: string;
}

const CreditProfile: React.FC<CreditProfileProps> = ({img, name, title, org, linkedin, github}) => {

  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-row justify-center items-center gap-5">
      <img
        src={img}
        alt={`${name}'s profile picture`}
        className="rounded-full w-32 h-32 border-4 border-yellow-400"
      />
      <div className="flex flex-col justify-center items-start gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{name}</h1>
        <h2 className="text-sm text-zinc-500">{org}</h2>
        <h3 className="text-sm text-zinc-500">{title}</h3>
        <div className="flex justify-center items-center gap-3">
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className={`text-xs flex justify-center items-center gap-1 hover:text-yellow-400 transition duration-200 ${
              isDarkMode ? "text-zinc-400" : "text-zinc-700"
            }`}
          >
            <FontAwesomeIcon icon={faLinkedin} />
            Linkedin
          </a>
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className={`text-xs flex justify-center items-center gap-1 hover:text-yellow-400 transition duration-200 cursor-pointer ${
                isDarkMode ? "text-zinc-400" : "text-zinc-700"
              }`}
            >
              <FontAwesomeIcon icon={faGithub} />
              Github
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CreditProfile