"use client";

import React, { useEffect, useRef, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useTheme } from "next-themes";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartData {
  login: string;
  totalCommits: number;
  totalIssuesCreated: number;
  totalPRsMerged: number;
  forks: number;
}

interface RadarChartProps {
  data1: RadarChartData;
  data2: RadarChartData;
}

const RadarChart: React.FC<RadarChartProps> = ({ data1, data2 }) => {
  const { theme, systemTheme } = useTheme();
  // const isDarkMode = theme === "dark";
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chartDimensions, setChartDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 600,
    height: 600,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const width = chartRef.current.offsetWidth;
        const height = chartRef.current.offsetHeight;
        setChartDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chartRef]);

  useEffect(() => {
    if (theme === "system") {
      setIsDarkMode(systemTheme === "dark");
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, [theme, systemTheme]);

  const data = {
    labels: ["Commits", "Issues", "Pull Requests", "Forks"],
    datasets: [
      {
        label: data1.login,
        data: [
          data1.totalCommits,
          data1.totalIssuesCreated,
          data1.totalPRsMerged,
          data1.forks,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
      },
      {
        label: data2.login,
        data: [
          data2.totalCommits,
          data2.totalIssuesCreated,
          data2.totalPRsMerged,
          data2.forks,
        ],
        backgroundColor: "rgba(220, 252, 231, 0.2)",
        borderColor: "rgba(52, 211, 153, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"radar"> = {
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: isDarkMode ? "rgb(0, 128, 128)" : "rgb(128, 128, 128)",
        },
        grid: {
          color: isDarkMode ? "rgb(0, 128, 128)" : "rgb(128, 128, 128)",
        },
        suggestedMin: 0,
        suggestedMax: Math.max(data1.totalCommits, data2.totalCommits),
        ticks: {
          stepSize: Math.ceil(
            Math.max(data1.totalCommits, data2.totalCommits) / 5
          ),
          color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          backdropColor: isDarkMode
            ? "rgba(0, 0, 0, 1)"
            : "rgba(255, 255, 255, 1)",
        },
        pointLabels: {
          font: {
            size: 12,
          },
          color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  };

  return (
    <div
      className="w-full md:w-3/4 lg:w-3/4 xl:w-3/4 p-4 mx-auto"
      ref={chartRef}
    >
      <div
        className={`relative h-96 lg:h-[36rem] xl:h-[42rem] ${
          isDarkMode ? "dark-bg" : "bg"
        }`}
      >
        <Radar
          data={data}
          options={options}
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      </div>
    </div>
  );
};

export default RadarChart;
