import {useTheme} from '../context/ThemeContext'
import React from 'react';

interface MessagePopupProps {
    message: String;
}

const MessagePopup: React.FC<MessagePopupProps> = ({message}) => {
    const {isDarkMode} = useTheme()
    return (
      <div
        className={`flex justify-center items-center top-16 z-50 text-md fixed ${
          isDarkMode ? "bg-zinc-700 text-zinc-300" : "bg-zinc-300 text-zinc-700"
        } p-4 rounded-2xl`}
      >
        <h1>{message}</h1>
      </div>
    );
}

export default MessagePopup