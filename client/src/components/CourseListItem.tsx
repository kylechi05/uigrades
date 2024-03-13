import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import React from 'react';

interface Course {
  id: number;
  SUBJECT_COURSE_SECTION: string;
  COURSE_TITLE: string;
  PRIMARY_INSTRUCTOR_NAME: string;
  A_PLUS: string;
  A: string;
  A_MINUS: string;
  B_PLUS: string;
  B: string;
  B_MINUS: string;
  C_PLUS: string;
  C: string;
  C_MINUS: string;
  D_PLUS: string;
  D: string;
  D_MINUS: string;
  F: string;
  WITHDRAWN: string;
  SEMESTER: string;
  YEAR: string;
  IS_NEW: number;
}

interface CourseListItemProps {
  course: Course
}

const CourseListItem: React.FC<CourseListItemProps> = ({course}) => {
  const [classTotal, setClassTotal] = useState(0);

    useEffect(() => {
      // index 5 - 18 are the grades
      if (course) {
        let total = 0;
        for (let i = 5; i < 19; i++) {
          total += parseInt(course[i]) || 0;
        }
        setClassTotal(total);
      }
    }, [course]);

    return (
      <div className='flex justify-between items-center w-full text-zinc-300'>
        <div className={`flex justify-center items-start flex-col`}>
          <h1 className="font-bold text-primary">{course[1]} </h1>
            <h2 className="font-bold w-[200px] sm:w-full md:w-[150px] lg:w-[225px] xl:w-[350px] truncate overflow-hidden whitespace-nowrap overflow-ellipsis">
              {course[2]}
            </h2>
          <p className="max-w-[250px] truncate overflow-hidden whitespace-nowrap overflow-ellipsis">{course[3].split("-")[0]}</p>
          <p className="">
            {course[19]} {course[20]}
          </p>
        </div>
        <p className="items-center flex gap-1">
          <FontAwesomeIcon icon={faUser} className="text-yellow-400 text-xl" />{" "}
          <span className="text-xl">{classTotal}</span>
        </p>
      </div>
    );
}

export default CourseListItem