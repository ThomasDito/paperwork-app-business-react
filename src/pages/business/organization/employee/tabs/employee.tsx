import { Tabs } from "@/pages/business/organization/employee/form";
import { useLazyBusinessBranchGetQuery } from "@/redux/api/business/branch-api";
import { useLazyBusinessDivisionGetQuery } from "@/redux/api/business/division-api";
import { useLazyBusinessEmployeeStatusGetQuery } from "@/redux/api/business/employee-status-api";
import { useLazyBusinessLevelGetQuery } from "@/redux/api/business/level-api";
import { useLazyBusinessPositionGetQuery } from "@/redux/api/business/position-api";
import { useFormikContext } from "formik";
import { LucideArrowLeft, LucideLoader2, LucideSave } from "lucide-react";
import {
  Button,
  FormikComboBox,
  FormikDatePicker,
  FormikInput,
} from "paperwork-ui";
import { useEffect } from "react";

export default function EmployeeEmployeeTab({
  setTab,
}: {
  setTab: (tab: Tabs) => void;
}) {
  const formik = useFormikContext();

  // RTK Query
  const [
    getEmployeeStatuses,
    {
      data: employeeStatuses = [],
      isLoading: getEmployeeStatusesIsLoading,
      isFetching: getEmployeeStatusesIsFetching,
      isError: getEmployeeStatusesIsError,
    },
  ] = useLazyBusinessEmployeeStatusGetQuery();

  const [
    getBranches,
    {
      data: branches = [],
      isLoading: getBranchesIsLoading,
      isFetching: getBranchesIsFetching,
      isError: getBranchesIsError,
    },
  ] = useLazyBusinessBranchGetQuery();

  const [
    getDivisions,
    {
      data: divisions = [],
      isLoading: getDivisionsIsLoading,
      isFetching: getDivisionsIsFetching,
      isError: getDivisionsIsError,
    },
  ] = useLazyBusinessDivisionGetQuery();

  const [
    getPositions,
    {
      data: positions = [],
      isLoading: getPositionsIsLoading,
      isFetching: getPositionsIsFetching,
      isError: getPositionsIsError,
    },
  ] = useLazyBusinessPositionGetQuery();

  const [
    getLevels,
    {
      data: levels = [],
      isLoading: getLevelsIsLoading,
      isFetching: getLevelsIsFetching,
      isError: getLevelsIsError,
    },
  ] = useLazyBusinessLevelGetQuery();

  // React Hooks
  useEffect(() => {
    getEmployeeStatuses();
    getBranches();
    getDivisions();
    getPositions();
    getLevels();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border rounded-md">
        <div className="p-5 border-b flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
          <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
            Data Kepegawaian
          </h3>
        </div>
        <div className="p-5 pb-7 space-y-8">
          <FormikInput
            label="ID Karyawan"
            placeholder="ID Karyawan"
            name="employee_id"
            id="employee_id"
            required
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <div>
              <FormikComboBox
                label="Status Kepegawaian"
                name="employee_status_id"
                className="w-full"
                placeholder="Pilih Status Kepegawaian"
                placeholderNotFound="Status kepegawaian tidak ditemukan"
                placeholderSearch="Cari Status Kepegawaian..."
                required
                values={employeeStatuses.map((employeeStatus) => {
                  return {
                    value: employeeStatus.id,
                    label: employeeStatus.employee_status_name,
                  };
                })}
              />
              {(getEmployeeStatusesIsFetching ||
                getEmployeeStatusesIsLoading) && (
                <div className="flex item-center text-xs text-muted-foreground">
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memuat data status kepegawaian...
                </div>
              )}
              {getEmployeeStatusesIsError && (
                <span className="mt-2 text-xs text-destructive">
                  Gagal memuat data.{" "}
                  <span
                    onClick={() => getEmployeeStatuses()}
                    className="font-bold hover:underline cursor-pointer"
                  >
                    Ulangi
                  </span>
                </span>
              )}
            </div>
            <FormikDatePicker
              className="!w-full !mt-4"
              label="Tanggal Masuk Bekerja"
              placeholder="Tanggal Masuk Bekerja"
              name="employee_join_date"
              id="employee_join_date"
              required
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <FormikDatePicker
              className="!w-full"
              label="Tanggal Awal Kontrak"
              placeholder="Tanggal Awal Kontrak"
              name="employee_contract_start_date"
              id="employee_contract_start_date"
              required
            />
            <FormikDatePicker
              className="!w-full"
              label="Tanggal Berakhir Kontrak"
              placeholder="Tanggal Berakhir Kontrak"
              name="employee_contract_end_date"
              id="employee_contract_end_date"
              required
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <FormikComboBox
              label="Cabang"
              name="branch_id"
              className="w-full"
              placeholder="Pilih Cabang"
              placeholderNotFound="Cabang tidak ditemukan"
              placeholderSearch="Cari Cabang..."
              required
              values={branches.map((branch) => {
                return {
                  value: branch.id,
                  label: branch.branch_name,
                };
              })}
            />
            {(getBranchesIsFetching || getBranchesIsLoading) && (
              <div className="flex item-center text-xs text-muted-foreground">
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Memuat data cabang...
              </div>
            )}
            {getBranchesIsError && (
              <span className="mt-2 text-xs text-destructive">
                Gagal memuat data.{" "}
                <span
                  onClick={() => getBranches()}
                  className="font-bold hover:underline cursor-pointer"
                >
                  Ulangi
                </span>
              </span>
            )}
            <FormikComboBox
              label="Divisi"
              name="division_id"
              className="w-full"
              placeholder="Pilih Divisi"
              placeholderNotFound="Divisi tidak ditemukan"
              placeholderSearch="Cari Divisi..."
              required
              values={divisions.map((division) => {
                return {
                  value: division.id,
                  label: division.division_name,
                };
              })}
            />
            {(getDivisionsIsFetching || getDivisionsIsLoading) && (
              <div className="flex item-center text-xs text-muted-foreground">
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Memuat data divisi...
              </div>
            )}
            {getDivisionsIsError && (
              <span className="mt-2 text-xs text-destructive">
                Gagal memuat data.{" "}
                <span
                  onClick={() => getDivisions()}
                  className="font-bold hover:underline cursor-pointer"
                >
                  Ulangi
                </span>
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <FormikComboBox
              label="Jabatan"
              name="position_id"
              className="w-full"
              placeholder="Pilih Jabatan"
              placeholderNotFound="Jabatan tidak ditemukan"
              placeholderSearch="Cari Jabatan..."
              required
              values={positions.map((position) => {
                return {
                  value: position.id,
                  label: position.position_name,
                };
              })}
            />
            {(getPositionsIsFetching || getPositionsIsLoading) && (
              <div className="flex item-center text-xs text-muted-foreground">
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Memuat data jabatan...
              </div>
            )}
            {getPositionsIsError && (
              <span className="mt-2 text-xs text-destructive">
                Gagal memuat data.{" "}
                <span
                  onClick={() => getPositions()}
                  className="font-bold hover:underline cursor-pointer"
                >
                  Ulangi
                </span>
              </span>
            )}
            <FormikComboBox
              label="Level"
              name="level_id"
              className="w-full"
              placeholder="Pilih Level"
              placeholderNotFound="Level tidak ditemukan"
              placeholderSearch="Cari Level..."
              required
              values={levels.map((level) => {
                return {
                  value: level.id,
                  label: level.level_name,
                };
              })}
            />
            {(getLevelsIsFetching || getLevelsIsLoading) && (
              <div className="flex item-center text-xs text-muted-foreground">
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Memuat data level...
              </div>
            )}
            {getLevelsIsError && (
              <span className="mt-2 text-xs text-destructive">
                Gagal memuat data.{" "}
                <span
                  onClick={() => getLevels()}
                  className="font-bold hover:underline cursor-pointer"
                >
                  Ulangi
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between p-5 border-t">
          <Button variant="outline" onClick={() => setTab("previous_job")}>
            <LucideArrowLeft className="w-5 h-5 mr-2" /> Sebelumnya
          </Button>
          <Button type="submit">
            <LucideSave className="w-5 h-5 mr-2" />
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
