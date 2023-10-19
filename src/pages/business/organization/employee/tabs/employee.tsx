import {
  FormikComboBox,
  FormikDatePicker,
  FormikInput,
} from "@/components/formik";
import {
  EmployeeFormSchema,
  Tabs,
} from "@/pages/business/organization/employee/form";
import { useLazyBusinessBranchGetQuery } from "@/redux/api/business/branch-api";
import { useLazyBusinessDivisionGetQuery } from "@/redux/api/business/division-api";
import { useLazyBusinessEmployeeStatusGetQuery } from "@/redux/api/business/employee-status-api";
import { useLazyBusinessLevelGetQuery } from "@/redux/api/business/level-api";
import { useLazyBusinessPositionGetQuery } from "@/redux/api/business/position-api";
import { useFormikContext } from "formik";
import { LucideArrowLeft, LucideLoader2, LucideSave } from "lucide-react";
import { Button } from "paperwork-ui";
import { useEffect } from "react";

export default function EmployeeEmployeeTab({
  setTab,
  isLoading,
}: {
  setTab: (tab: Tabs) => void;
  isLoading: boolean;
}) {
  // Hooks
  const formik = useFormikContext<EmployeeFormSchema>();

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const validate = () => {
    if (
      formik.errors.employee_id ||
      formik.errors.employee_status_id ||
      formik.errors.employee_contract_start_date ||
      formik.errors.employee_contract_end_date ||
      formik.errors.employee_join_date ||
      formik.errors.branch_id ||
      formik.errors.division_id ||
      formik.errors.position_id ||
      formik.errors.level_id ||
      formik.errors.employee_bpjs_kesehatan_number ||
      formik.errors.employee_bpjs_ketenagakerjaan_number
    ) {
      return false;
    } else {
      return true;
    }
  };

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
            <div className="space-y-2">
              <FormikComboBox
                label="Status Kepegawaian"
                name="employee_status_id"
                className="w-full"
                placeholder="Pilih Status Kepegawaian"
                placeholderNotFound="Status kepegawaian tidak ditemukan"
                placeholderSearch="Cari Status Kepegawaian..."
                required
                values={employeeStatuses
                  .filter(
                    (employeeStatus) =>
                      employeeStatus.employee_status_status === "active" ||
                      employeeStatus.id === formik.values.employee_status_id
                  )
                  .map((employeeStatus) => {
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
              className="!w-full !mt-2"
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
            <div className="space-y-2">
              <FormikComboBox
                label="Cabang"
                name="branch_id"
                className="w-full"
                placeholder="Pilih Cabang"
                placeholderNotFound="Cabang tidak ditemukan"
                placeholderSearch="Cari Cabang..."
                required
                values={branches
                  .filter(
                    (branch) =>
                      branch.branch_status === "active" ||
                      branch.id === formik.values.branch_id
                  )
                  .map((branch) => {
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
            </div>

            <div className="space-y-2">
              <FormikComboBox
                label="Divisi"
                name="division_id"
                className="w-full"
                placeholder="Pilih Divisi"
                placeholderNotFound="Divisi tidak ditemukan"
                placeholderSearch="Cari Divisi..."
                required
                values={divisions
                  .filter(
                    (division) =>
                      division.division_status === "active" ||
                      division.id === formik.values.division_id
                  )
                  .map((division) => {
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
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <div className="space-y-2">
              <FormikComboBox
                label="Jabatan"
                name="position_id"
                className="w-full"
                placeholder="Pilih Jabatan"
                placeholderNotFound="Jabatan tidak ditemukan"
                placeholderSearch="Cari Jabatan..."
                required
                values={positions
                  .filter(
                    (position) =>
                      position.position_status === "active" ||
                      position.id === formik.values.position_id
                  )
                  .map((position) => {
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
            </div>
            <div className="space-y-2">
              <FormikComboBox
                label="Level"
                name="level_id"
                className="w-full"
                placeholder="Pilih Level"
                placeholderNotFound="Level tidak ditemukan"
                placeholderSearch="Cari Level..."
                required
                values={levels
                  .filter(
                    (level) =>
                      level.level_status === "active" ||
                      level.id === formik.values.level_id
                  )
                  .map((level) => {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <FormikInput
              label="Nomor BPJS Ketenagakerjaan"
              placeholder="Nomor BPJS Ketenagakerjaan"
              name="employee_bpjs_kesehatan_number"
              id="employee_bpjs_kesehatan_number"
            />
            <FormikInput
              label="Nomor BPJS Kesehatan"
              placeholder="Nomor BPJS Kesehatan"
              name="employee_bpjs_ketenagakerjaan_number"
              id="employee_bpjs_ketenagakerjaan_number"
            />
          </div>
        </div>
        <div className="flex justify-between p-5 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => setTab("history")}
          >
            <LucideArrowLeft className="w-5 h-5 mr-2" /> Sebelumnya
          </Button>
          <Button
            disabled={isLoading || !validate()}
            type="submit"
            className="flex items-center"
          >
            {isLoading ? (
              <>
                <LucideLoader2 className="w-5 h-5 mr-2 animate-spin" />
                Mohon Tunggu
              </>
            ) : (
              <>
                <LucideSave className="w-5 h-5 mr-2" />
                Simpan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
