import Dexie from 'dexie';

// Create database
export const db = new Dexie('CourseData');
db.version(5).stores({
  courses: '++id, SUBJECT_COURSE_SECTION, YEAR, SEMESTER, Aplus, A, Aminus, Bplus, B, Bminus, Cplus, C, Cminus, Dplus, D, Dminus, F, W',
});