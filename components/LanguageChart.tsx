import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageChart = ({ languageData }: { languageData: any }) => {
  const chartData = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: "Programming Languages",
        data: Object.values(languageData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#C9CBCF",
          // Add more colors as needed
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#C9CBCF",
          // Add more hover colors as needed
        ],
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default LanguageChart;
