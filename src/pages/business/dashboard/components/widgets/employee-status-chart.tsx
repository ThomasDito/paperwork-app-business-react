import { useBusinessEmployeeStatusGetQuery } from "@/redux/api/business/employee-status-api";
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

export default function EmployeeStatusChartWidget() {
  const { data: employeeStatuses = [] } = useBusinessEmployeeStatusGetQuery();

  const labels = useMemo(() => {
    return employeeStatuses
      .filter(
        (employeeStatus) => employeeStatus.employee_status_status === "active"
      )
      .map((employeeStatus) => employeeStatus.employee_status_name);
  }, [employeeStatuses]);

  const employees = useMemo(() => {
    return employeeStatuses
      .filter(
        (employeeStatus) => employeeStatus.employee_status_status === "active"
      )
      .map((employeeStatus) => employeeStatus._count.employees);
  }, [employeeStatuses]);

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
        <h3 className="text-2xl font-semibold tracking-tight">
          Status Kepegawaian
        </h3>
      </div>
      <div className="p-5">
        {employeeStatuses.length > 0 && (
          <Doughnut options={options} data={data} />
        )}
      </div>
    </div>
  );
}
