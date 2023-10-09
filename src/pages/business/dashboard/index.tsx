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
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import UserLineChartWidget from "@/pages/business/dashboard/components/widgets/user-line-chart";
import DivisionChartWidget from "@/pages/business/dashboard/components/widgets/division-chart";
import EmployeeStatusChartWidget from "@/pages/business/dashboard/components/widgets/employee-status-chart";
import GenderChartWidget from "@/pages/business/dashboard/components/widgets/gender-chart";
import EmployeeContractLeftWidget from "@/pages/business/dashboard/components/widgets/employee-contract-left";

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

export const options = {
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

const data2 = {
  labels: [
    "Red hwgfhjsd fhsjdgf hjsdgfhsdj fgshdjfgdshjfgsdhjf",
    "Blue",
    "Yellow",
    "Green",
    "Purple",
    "Orange",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
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
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-4 flex flex-col space-y-8">
          <UserLineChartWidget />
          <EmployeeContractLeftWidget />
        </div>
        <div className="col-span-2 flex flex-col space-y-8">
          <DivisionChartWidget />
          <EmployeeStatusChartWidget />
          <GenderChartWidget />
        </div>
      </div>
    </div>
  );
}
