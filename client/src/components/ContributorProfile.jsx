import React from 'react'

function ContributorProfile({ img, username, github }) {
  return (
    <a target='_blank' href={github}>
      <img
        src={img}
        alt={`${username}'s profile picture`}
        className="rounded-full w-12 h-12 border-2 cursor-pointer border-yellow-400"
      />
    </a>
  );
}

export default ContributorProfile