import TableSkeleton from "@/components/ui/skeleton";
import { useLazyBusinessEmployeeGetQuery } from "@/redux/api/business/employee-api";
import moment from "moment";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "paperwork-ui";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function EmployeeContractLeftWidget() {
  // Hooks
  const location = useLocation();

  // RTK Query
  const [
    getEmployees,
    { data: employees, isError, isFetching, isLoading, isUninitialized },
  ] = useLazyBusinessEmployeeGetQuery();

  const tableIsLoading = isError || isFetching || isLoading || isUninitialized;

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="bg-card border rounded-md">
      <div className="p-5">
        <h3 className="text-2xl font-semibold tracking-tight">
          Kontrak Yang Akan Berakhir
        </h3>
      </div>
      <div className="border-t rounded-b-md bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5">Nama Karyawan</TableHead>
                <TableHead className="py-4 px-5">Status Kepegawaian</TableHead>
                <TableHead className="py-4 px-5">
                  Tanggal Mulai Kontrak
                </TableHead>
                <TableHead className="py-4 px-5">
                  Tanggal Akhir Kontrak
                </TableHead>
                <TableHead className="py-4 px-5">Divisi</TableHead>
                <TableHead className="py-4 px-5">Jabatan</TableHead>
                <TableHead className="py-4 px-5">Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableIsLoading && <TableSkeleton columns={9} />}

              {!tableIsLoading && !employees?.data.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={9}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}

              {!tableIsLoading &&
                employees &&
                employees.data.map((employee) => {
                  return (
                    <TableRow key={employee.id}>
                      <TableCell className="py-4 px-5">
                        <div className="flex items-center space-x-4">
                          <Link
                            to={`/business/organization/employee/form/${employee.id}`}
                          >
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={employee.employee_profile_picture || ""}
                                alt={employee.employee_name}
                              />
                              <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                                {employee.employee_name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="flex flex-col flex-1 space-y-1">
                            <Link
                              to={`/business/organization/employee/form/${employee.id}`}
                              className="text-sm font-medium hover:underline"
                            >
                              {employee.employee_name}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              {employee.employee_id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-5">
                        {employee.employee_status.employee_status_name}
                      </TableCell>
                      <TableCell className="py-4 px-5">
                        {moment(employee.employee_contract_start_date).format(
                          "DD MMMM YYYY"
                        )}
                      </TableCell>
                      <TableCell className="py-4 px-5">
                        {moment(employee.employee_contract_end_date).format(
                          "DD MMMM YYYY"
                        )}
                      </TableCell>
                      <TableCell className="py-4 px-5">
                        {employee.division.division_name}
                      </TableCell>
                      <TableCell className="py-4 px-5">
                        {employee.position.position_name}
                      </TableCell>
                      <TableCell className="py-4 px-5">
                        {employee.level.level_name}
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
