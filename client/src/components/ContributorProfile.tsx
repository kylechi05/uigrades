import React from 'react'

interface ContributorProfileProps {
  img: string;
  username?: string;
  github?: string;
  social?: string;
}

const ContributorProfile: React.FC<ContributorProfileProps> = ({ img, username, github, social }) => {
  return (
    <>
      {github ? (
        <a target='_blank' href={github}>
          <img
            src={img}
            alt={`${username}'s profile picture`}
            className="rounded-md min-w-20 h-20 md:w-24 md:h-24 cursor-pointer opacity-80 hover:opacity-100 transition duration-300 hover:shadow-xl"
          />
        </a>
      ) : (
        <a target='_blank' href={social}>
          <img
            src={img}
            alt={`${img}'s profile picture`}
            className="rounded-md min-w-20 h-20 md:w-24 md:h-24 cursor-pointer opacity-80 hover:opacity-100 transition duration-300 hover:shadow-xl"
          />
        </a>
      )}
    </>
  );
}

export default ContributorProfile