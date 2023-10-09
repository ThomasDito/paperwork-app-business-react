import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        padding: 15,
      },
    },
  },
};

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [23, 45, 25, 76, 56, 57, 67, 45, 67, 55, 66, 98],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [23, 45, 25, 76, 56, 57, 67, 45, 67, 55, 66, 98],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function UserLineChartWidget() {
  return (
    <div className="bg-card shadow-sm rounded-md">
      <div className="p-5 border-b">
        <h3 className="text-2xl font-semibold tracking-tight">
          Grafik Pengguna
        </h3>
      </div>
      <div className="p-5">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
