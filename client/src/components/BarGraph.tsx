import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

interface BarGraphProps {
  course: number[];
}

const BarGraph: React.FC<BarGraphProps> = ({course}) => {
    ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
            display: false,
            },
            title: {
            display: true,
            },
        },
        scales: {
            y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1,
            },
            },
        },
    };

    const labels = String(course[5]) == "-" || course.length == 5 ? ['A', 'B', 'C', 'D+F', 'W'] : ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+','D','D-', 'F', 'W'];

    const data = String(course[5]) == "-" || course.length == 5 ? {
      labels: labels,
      datasets: [
        {
          label: ` Hawkeyes`,
          data: [
            course[0],
            course[1],
            course[2],
            course[3],
            course[4],
          ],
          backgroundColor: [
            "rgba(255, 25, 25, 0.5)",
            "rgba(255, 50, 50, 0.5)",
            "rgba(255, 65, 65, 0.5)",
            "rgba(255, 120, 0, 0.5)",
            "rgba(255, 150, 0, 0.5)",
          ],
          borderColor: [
            "rgb(255, 0, 0)",
            "rgb(255, 50, 50)",
            "rgb(255, 65, 65)",
            "rgb(255, 120, 0)",
            "rgb(255, 150, 0)",
            ],
            borderWidth: 2,
            },
          ]
    } : {
      labels: labels,
      datasets: [
        {
          label: ` Hawkeyes`,
          data: [
            course[0],
            course[1],
            course[2],
            course[3],
            course[4],
            course[5],
            course[6],
            course[7],
            course[8],
            course[9],
            course[10],
            course[11],
            course[12],
            course[13],
          ],
          backgroundColor: [
            "rgba(255, 25, 25, 0.5)",
            "rgba(255, 50, 50, 0.5)",
            "rgba(255, 65, 65, 0.5)",
            "rgba(255, 120, 0, 0.5)",
            "rgba(255, 150, 0, 0.5)",
            "rgba(255, 170, 0, 0.5)",
            "rgba(255, 210, 0, 0.5)",
            "rgba(255, 235, 0, 0.5)",
            "rgba(255, 255, 0, 0.5)",
            "rgba(50, 255, 0, 0.5)",
            "rgba(80, 255, 0, 0.5)",
            "rgba(110, 255, 0, 0.5)",
            "rgba(26, 0, 255, 0.5)",
            "rgba(177, 52, 194, 0.5)",
          ],
          borderColor: [
            "rgb(255, 0, 0)",
            "rgb(255, 50, 50)",
            "rgb(255, 65, 65)",
            "rgb(255, 120, 0)",
            "rgb(255, 150, 0)",
            "rgb(255, 170, 0)",
            "rgb(255, 210, 0)",
            "rgb(255, 235, 0)",
            "rgb(255, 255, 0)",
            "rgb(50, 255, 0)",
            "rgb(80, 255, 0)",
            "rgb(110, 255, 0)",
            "rgb(26, 0, 255)",
            "rgb(177, 52, 194)",
          ],
          borderWidth: 2,
        },
      ],
    };

    return (
        <Bar data={data} options={options} />
    )
}

export default BarGraph