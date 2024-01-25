import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartEvent,
  TooltipItem,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const LanguageChart = ({
  languageData,
  username,
}: {
  languageData: Record<string, number>;
  username: string;
}) => {
  const sortedLanguages = Object.entries(languageData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const labels = sortedLanguages.map((lang) => lang[0]);
  const data = sortedLanguages.map((lang) => lang[1]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Programming Languages",
        data: data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#fff",
        anchor: "end" as const,
        align: "start" as const,
        offset: 30,
        font: {
          weight: "semi-bold",
        },
        formatter: (_: any, context: TooltipItem<"doughnut">) => {
          return labels[context.dataIndex];
        },
      },
      legend: {
        display: false,
      },
    },
    onClick: (event: ChartEvent, elements: Array<{ index: number }>) => {
      if (elements.length === 0) return;
      const index = elements[0].index;
      const language = labels[index];
      window.location.href = `https://github.com/${username}?tab=repositories&language=${language}`;
    },
  };

  return (
    <div
      className="box border p-4 rounded-lg shadow-md flex flex-col items-center justify-center"
      style={{ height: "400px" }}
    >
      <h2 className="text-lg font-bold mb-4">Top 5 Languages</h2>
      <div style={{ width: "300px", height: "300px" }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LanguageChart;
