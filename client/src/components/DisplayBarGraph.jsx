import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DisplayBarGraph = () => {
  const initialData = {
    labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Hawkeyes",
        data: [3, 2, 6, 5, 4, 2, 1, 2, 3, 0, 3, 0, 2, 0, 1, 0],
        backgroundColor: ["rgb(255,205,0)"],
        borderWidth: 1,
      },
    ],
  };

  const [data, setData] = React.useState(initialData);

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
        display: false,
        max: 10, // Set a constant maximum value for the y-axis
      },
      x: {
        display: false,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        // Get the clicked element
        const clickedIndex = elements[0].index;

        // Generate a random integer between 0 and 10 that is different from the current value
        const currentDataValue = data.datasets[0].data[clickedIndex];
        let randomValue;

        do {
          randomValue = Math.floor(Math.random() * 11);
        } while (randomValue === currentDataValue);

        // Update the data
        const newData = {
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              data: data.datasets[0].data.map((value, index) =>
                index === clickedIndex ? randomValue : value
              ),
            },
          ],
        };

        // Update the state with the new data
        setData(newData);
      }
    },
  };

  return <Bar options={options} data={data} />;
};

export default DisplayBarGraph;
