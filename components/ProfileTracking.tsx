"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type Props = {
  username: string;
};

interface Event {
  created_at: string;
}

interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    fill: boolean;
  }[];
}

interface PieChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export default function ProfileTracking({ username }: Props) {
  const [events, setEvents] = useState();
  const [LineChartData, setLineChartData] = useState<LineChartData | null>(
    null
  );
  const [PieChartData, setPieChartData] = useState<PieChartData | null>(null);

  const getLineChartData = (eventData: any) => {
    const hours: Record<string, number> = {};
    eventData.forEach((event: { created_at: string | number | Date }) => {
      const date = new Date(event.created_at);
      const hour = date.getHours().toString().padStart(2, "0");
      hours[hour] = (hours[hour] || 0) + 1;
    });

    const labels = Array.from({ length: 24 }, (_, i) =>
      i.toString().padStart(2, "0")
    );
    const data = labels.map((hour) => hours[hour] || 0);

    setLineChartData({
      labels,
      datasets: [
        {
          label: "Hourly Activity",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: true,
        },
      ],
    });
  };

  const getPieChartData = (eventData: any) => {
    const eventTypes: Record<string, number> = {};
    eventData.forEach((event: any) => {
      eventTypes[event.type] = (eventTypes[event.type] || 0) + 1;
    });

    const labels = Object.keys(eventTypes);
    const data = labels.map((type) => eventTypes[type]);
    const colors = labels.map(
      (_, i) => `hsl(${(i * 360) / labels.length}, 70%, 50%)`
    );

    setPieChartData({
      labels,
      datasets: [
        {
          label: "Event Types",
          data,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("50%", "40%")),
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    const getData = async () => {
      const eventData = await fetch(
        `https://api.github.com/users/${username}/events`
      ).then((res) => res.json());

      setEvents(eventData);

      getLineChartData(eventData);
      getPieChartData(eventData);
    };
    getData();
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.add("no-scroll");

    return () => {
      body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex gap-2" variant={"outline"}>
          <IconTrendingUp stroke={2} />
          Profile Tracking
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden w-full h-[750px]">
        <DialogHeader className="overflow-hidden">
          <DialogTitle className="flex gap-2 items-center justify-start">
            Profile Tracking
            <IconTrendingUp stroke={3} className="w-5 h-5" />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex w-full p-2 overflow-auto flex-col gap-2">
          <div className="flex w-full flex-col gap-4">
            <div className="w-full">
              {PieChartData && (
                <>
                  <h1 className="font-medium text-base py-2 text-gray-200">
                    Types of Events
                  </h1>
                  <Doughnut data={PieChartData} />
                </>
              )}
            </div>
            <div className="">
              {LineChartData && (
                <>
                  <h1 className="font-medium text-base py-2 text-gray-200">
                    Events over time
                  </h1>
                  <Line
                    data={LineChartData}
                    options={{
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "Hours of the Day",
                          },
                          ticks: {
                            autoSkip: false,
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: "Number of Events",
                          },
                          beginAtZero: true,
                        },
                      },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const label = context.dataset.label || "";
                              const value = context.raw as number;
                              return `${label}: ${value}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
