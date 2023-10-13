import { useBusinessDivisionGetQuery } from "@/redux/api/business/division-api";
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
  Colors,
} from "chart.js";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const options = {
  plugins: {
    legend: {
      display: true,
      position: "right" as const,
    },
    colors: {
      enabled: true,
    },
  },
};

export default function DivisionChartWidget() {
  const { data: divisions = [] } = useBusinessDivisionGetQuery();

  const labels = useMemo(() => {
    return divisions
      .filter((division) => division.division_status === "active")
      .map((division) => division.division_name);
  }, [divisions]);

  const employees = useMemo(() => {
    return divisions
      .filter((division) => division.division_status === "active")
      .map((division) => division._count.employees);
  }, [divisions]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Karyawan",
        data: employees,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-card shadow-sm rounded-md">
      <div className="p-5 border-b">
        <h3 className="text-2xl font-semibold tracking-tight">Divisi</h3>
      </div>
      <div className="p-5">
        {divisions.length > 0 && <Doughnut options={options} data={data} />}
      </div>
    </div>
  );
}
