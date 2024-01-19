// components/LanguageChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";

const LanguageChart = ({
  languageData,
}: {
  languageData: Record<string, number>;
}) => {
  const chartData = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: "Programming Languages",
        data: Object.values(languageData),
        backgroundColor: ["red", "blue", "green", "yellow", "purple", "orange"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default LanguageChart;
