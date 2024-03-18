import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import React from 'react'

interface CreditProfileProps {
  img: string;
  name: string;
  title: string;
  org: string;
  linkedin: string;
  github?: string;
}

const CreditProfile: React.FC<CreditProfileProps> = ({img, name, title, org, linkedin, github}) => {

  return (
    <div className=" flex flex-row justify-start items-start gap-5 opacity-80 hover:opacity-100 transition duration-300">
      <img
        src={img}
        alt={`${name}'s profile picture`}
        className="w-32 h-32 md:w-44 md:h-44 rounded-tl-[2rem] rounded-br-[2rem] object-cover"
      />
      <div className="flex flex-col justify-between h-full items-start gap-3 md:gap-2">
        <h1 className="text-lg md:text-3xl lg:text-4xl font-bold ">{name}</h1>
        <h2 className="text-xs md:text-sm text-zinc-500">{org}</h2>
        <h3 className="text-xs md:text-sm text-zinc-500">{title}</h3>
        <div className="flex justify-center items-center gap-3">
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className={`text-xs flex justify-center items-center gap-1 hover:text-zinc-300 transition duration-200 text-zinc-400`}
          >
            <FontAwesomeIcon icon={faLinkedin} />
            Linkedin
          </a>
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className={`text-xs flex justify-center items-center gap-1 hover:text-zinc-300 transition duration-200 cursor-pointer text-zinc-400`}
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