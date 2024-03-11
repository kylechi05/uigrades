import React from 'react'

interface ContributorProfileProps {
    img: string;
    username: string;
    github: string;
}

const ContributorProfile: React.FC<ContributorProfileProps> = ({ img, username, github }) => {
  return (
    <a target='_blank' href={github}>
      <img
        src={img}
        alt={`${username}'s profile picture`}
        className="rounded-md w-24 h-24 cursor-pointer opacity-80 hover:opacity-100 transition duration-300 hover:shadow-xl"
      />
    </a>
  );
}

export default ContributorProfile