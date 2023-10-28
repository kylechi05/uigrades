import React from 'react'

function MessagePopup({message}) {
  return (
    <div className='flex justify-center items-center absolute top-16 text-md bg-zinc-700 text-zinc-300 p-4 rounded-2xl'>
        <h1>{message}</h1>
    </div>
  )
}

export default MessagePopup