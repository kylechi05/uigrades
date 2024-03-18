import React from 'react';

interface MessagePopupProps {
    message: String;
}

const MessagePopup: React.FC<MessagePopupProps> = ({message}) => {
    return (
      <div
        className={`flex justify-center items-center top-16 z-[60] text-md fixed bg-zinc-800 outline-1 outline outline-zinc-700 p-4 rounded-xl text-zinc-300`}
      >
        <h1>{message}</h1>
      </div>
    );
}

export default MessagePopup