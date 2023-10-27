import {useEffect} from 'react';
import '../App.css';

const Loading = ({justifyCenter, small}) => {

  //scroll to top of page useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div
      className={`h-full flex flex-col items-center ${
        justifyCenter ? "justify-center" : ""
      } text-center mt-50`}
    >
      <div
        className={small ? "small-loading-spinner" : "loading-spinner"}
      ></div>
    </div>
  );
};

export default Loading;
