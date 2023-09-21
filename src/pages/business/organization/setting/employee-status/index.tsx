import EmployeeStatusSkeleton from "@/pages/business/organization/setting/employee-status/components/skeleton";
import { useLazyBusinessEmployeeStatusGetEmployeeStatusesQuery } from "@/redux/api/business/employee-status-api";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import {
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "paperwork-ui";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function EmployeeStatusIndex() {
  // Hooks
  const location = useLocation();

  // RTK Query
  const [
    getEmployeeStatuses,
    {
      data: employeeStatuses = [],
      isError,
      isFetching,
      isLoading,
      isUninitialized,
    },
  ] = useLazyBusinessEmployeeStatusGetEmployeeStatusesQuery();

  const tableIsLoading = isError || isFetching || isLoading || isUninitialized;

  useEffect(() => {
    getEmployeeStatuses();
  }, []);

  return (
    <div className="bg-card border rounded-md">
      <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Status Kepegawaian
        </h3>
        <div className="flex items-center space-x-4">
          {/* <div className="relative flex items-center">
            <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
              <LucideSearch
                size={18}
                className="text-muted-foreground opacity-50"
              />
            </div>
            <Input
              className="w-full pl-10 min-w-[300px]"
              type="search"
              placeholder="Pencarian..."
            />
          </div> */}
          <Link
            to={"/modal/employee-status/form"}
            state={{ previousLocation: location }}
          >
            <Button>
              <LucidePlus className="w-5 h-5 mr-2" /> Tambah Status
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-t rounded-b-md bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5">Status Kepegawaian</TableHead>
                <TableHead className="py-4 px-5 text-center">Aktif</TableHead>
                <TableHead className="py-4 px-5 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableIsLoading && <EmployeeStatusSkeleton />}

              {!tableIsLoading && !employeeStatuses?.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={3}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}

              {employeeStatuses.map((employeeStatus) => {
                return (
                  <TableRow key={employeeStatus.id}>
                    <TableCell className="py-2 px-5">
                      {employeeStatus.employee_status_name}
                    </TableCell>
                    <TableCell className="py-2 px-5 text-center">
                      <Switch
                        checked={
                          employeeStatus.employee_status_status === "active"
                        }
                      />
                    </TableCell>
                    <TableCell className="py-2 px-5 text-center">
                      <div className="flex justify-center space-x-2">
                        <Link
                          to={`/modal/employee-status/form/${employeeStatus.id}`}
                          state={{ previousLocation: location }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                          >
                            <LucideEdit className="w-4 h-4" />
                            <span className="sr-only">Ubah</span>
                          </Button>
                        </Link>
                        <Link
                          to={`/modal/employee-status/delete/${employeeStatus.id}`}
                          state={{ previousLocation: location }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-destructive hover:text-destructive"
                          >
                            <LucideTrash className="w-4 h-4" />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
