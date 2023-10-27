import { useEffect, useState } from 'react';
import BarGraph from './BarGraph';

const AverageGraph = ({ totalCourses }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalDistribution, setTotalDistribution] = useState({});

  useEffect(() => {
    calculateTotals();
  }, [totalCourses]);

  const calculateTotals = () => {
    let tempTotalStudents = 0;
    let tempTotalDistribution = {
      'A+': 0,
      'A': 0,
      'A-': 0,
      'B+': 0,
      'B': 0,
      'B-': 0,
      'C+': 0,
      'C': 0,
      'C-': 0,
      'D+': 0,
      'D': 0,
      'D-': 0,
      'F': 0,
      'W': 0
    };

    totalCourses.forEach((course) => {
      const total = parseInt(course['A+'] || 0) + parseInt(course['A'] || 0) + parseInt(course['A-'] || 0) +
        parseInt(course['B+'] || 0) + parseInt(course['B'] || 0) + parseInt(course['B-'] || 0) +
        parseInt(course['C+'] || 0) + parseInt(course['C'] || 0) + parseInt(course['C-'] || 0) +
        parseInt(course['D+'] || 0) + parseInt(course['D'] || 0) + parseInt(course['D-'] || 0) +
        parseInt(course['F'] || 0) + parseInt(course['W'] || 0);
      tempTotalStudents += total;

      const distribution = {
        'A+': parseInt(course['A+'] || 0) / total * 100,
        'A': parseInt(course['A'] || 0) / total * 100,
        'A-': parseInt(course['A-'] || 0) / total * 100,
        'B+': parseInt(course['B+'] || 0) / total * 100,
        'B': parseInt(course['B'] || 0) / total * 100,
        'B-': parseInt(course['B-'] || 0) / total * 100,
        'C+': parseInt(course['C+'] || 0) / total * 100,
        'C': parseInt(course['C'] || 0) / total * 100,
        'C-': parseInt(course['C-'] || 0) / total * 100,
        'D+': parseInt(course['D+'] || 0) / total * 100,
        'D': parseInt(course['D'] || 0) / total * 100,
        'D-': parseInt(course['D-'] || 0) / total * 100,
        'F': parseInt(course['F'] || 0) / total * 100,
        'W': parseInt(course['W'] || 0) / total * 100
      };

      for (const [key, value] of Object.entries(distribution)) {
        tempTotalDistribution[key] += value;
      }
    });

    setTotalStudents(tempTotalStudents);
    setTotalDistribution(tempTotalDistribution);
  };

  // create a bar graph with the total distribution of all courses


  return (
    <div>
      <BarGraph course={totalDistribution} />
    </div>
  );
};

export default AverageGraph;
