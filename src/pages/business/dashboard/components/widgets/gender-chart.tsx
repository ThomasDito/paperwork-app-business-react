import { useBusinessEmployeeGetQuery } from "@/redux/api/business/employee-api";
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
      position: "right" as const,
    },
    colors: {
      enabled: true,
    },
  },
};

export default function GenderChartWidget() {
  const { data: employees } = useBusinessEmployeeGetQuery();

  const men = useMemo(() => {
    return employees?.data.filter(
      (employee) => employee.employee_gender === "male"
    ).length;
  }, [employees]);

  const women = useMemo(() => {
    return employees?.data.filter(
      (employee) => employee.employee_gender === "female"
    ).length;
  }, [employees]);

  const data = {
    labels: ["Laki-laki", "Perempuan"],
    datasets: [
      {
        label: "Karyawan",
        data: [men, women],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-card shadow-sm rounded-md">
      <div className="p-5 border-b">
        <h3 className="text-2xl font-semibold tracking-tight">
          Gender Karyawan
        </h3>
      </div>
      <div className="p-5">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
}
