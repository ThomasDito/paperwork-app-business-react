import { useBusinessBranchGetQuery } from "@/redux/api/business/branch-api";
import { useBusinessDivisionGetQuery } from "@/redux/api/business/division-api";
import { useBusinessEmployeeGetQuery } from "@/redux/api/business/employee-api";
import {
  LucideContact2,
  LucideCrown,
  LucideNetwork,
  LucideWarehouse,
} from "lucide-react";
import UserLineChartWidget from "@/pages/business/dashboard/components/widgets/user-line-chart";
import DivisionChartWidget from "@/pages/business/dashboard/components/widgets/division-chart";
import EmployeeStatusChartWidget from "@/pages/business/dashboard/components/widgets/employee-status-chart";
import GenderChartWidget from "@/pages/business/dashboard/components/widgets/gender-chart";
import EmployeeContractLeftWidget from "@/pages/business/dashboard/components/widgets/employee-contract-left";
import { useMemo } from "react";

export default function DashboardIndex() {
  // RTK Query
  const { data: employees = [] } = useBusinessEmployeeGetQuery();
  const { data: branches = [] } = useBusinessBranchGetQuery();
  const { data: divisions = [] } = useBusinessDivisionGetQuery();

  const totalEmployee = useMemo(() => employees.length, [employees]);

  const totalBranch = useMemo(
    () => branches.filter((branch) => branch.branch_status === "active").length,
    [branches]
  );

  const totalDivision = useMemo(
    () =>
      divisions.filter((division) => division.division_status === "active")
        .length,
    [divisions]
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Karyawan Aktif</div>
            <div className="font-bold text-3xl">{totalEmployee}</div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideContact2 className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Cabang</div>
            <div className="font-bold text-3xl">{totalBranch}</div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideWarehouse className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Divisi</div>
            <div className="font-bold text-3xl">{totalDivision}</div>
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
