import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import React from 'react';

interface CourseListItemProps {
  course: Array<string>
}

const CourseListItem: React.FC<CourseListItemProps> = ({course}) => {

    useEffect(() => {
        document.title = 'UIGrades | Course List';
    }, []);

    // index 4 - 17 contain all grades, we can sum these up to get the total number of students
    let classTotal = 0;
    for (let i = 4; i < 18; i++) {
        classTotal += parseInt(course[i]);
    }

    return (
      <div className='flex justify-between items-center w-full'>
        <div className={`flex justify-center items-start flex-col`}>
          <h1 className="font-bold">{course[1]} </h1>
            <h2 className="w-[200px] sm:w-full md:w-[150px] lg:w-[225px] xl:w-[350px] truncate overflow-hidden whitespace-nowrap overflow-ellipsis">
              {course[2]}
            </h2>
          <p className="">{course[3]}</p>
          <p className="">
            {course[18]} {course[19]}
          </p>
        </div>
        <p className="items-center flex pl-2 gap-1">
          <FontAwesomeIcon icon={faUser} className="text-yellow-400 text-xl" />{" "}
          <span className="text-xl">{classTotal}</span>
        </p>
      </div>
    );
}

export default CourseListItem