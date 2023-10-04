import { useBusinessBranchGetQuery } from "@/redux/api/business/branch-api";
import { useBusinessDivisionGetQuery } from "@/redux/api/business/division-api";
import { useBusinessEmployeeGetQuery } from "@/redux/api/business/employee-api";
import {
  LucideContact2,
  LucideCrown,
  LucideNetwork,
  LucideWarehouse,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
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

export default function DashboardIndex() {
  // RTK Query
  const { data: employees = [] } = useBusinessEmployeeGetQuery();
  const { data: branches = [] } = useBusinessBranchGetQuery();
  const { data: divisions = [] } = useBusinessDivisionGetQuery();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Karyawan Aktif</div>
            <div className="font-bold text-3xl">{employees.length}</div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideContact2 className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Cabang</div>
            <div className="font-bold text-3xl">
              {
                branches.filter((branch) => branch.branch_status === "active")
                  .length
              }
            </div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideWarehouse className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Divisi</div>
            <div className="font-bold text-3xl">
              {
                divisions.filter(
                  (division) => division.division_status === "active"
                ).length
              }
            </div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideNetwork className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Paket</div>
            <div className="font-bold text-2xl">Premium</div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideCrown className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="bg-card p-5 shadow-sm rounded-md">
        <Line options={options} data={data} />;
      </div>
    </div>
  );
}
