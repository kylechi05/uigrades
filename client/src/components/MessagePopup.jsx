import {useTheme} from '../context/ThemeContext'

function MessagePopup({message}) {
    const {isDarkMode} = useTheme()
    return (
        <div className={`flex justify-center items-center absolute top-16 text-md ${isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-300 text-zinc-700'} p-4 rounded-2xl`}>
            <h1>{message}</h1>
        </div>
    )
}

export default MessagePopup