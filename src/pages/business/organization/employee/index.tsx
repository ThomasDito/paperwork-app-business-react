import DivisionSkeleton from "@/pages/business/organization/setting/division/components/skeleton";
import { useLazyBusinessDivisionGetQuery } from "@/redux/api/business/division-api";
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

export default function EmployeeIndex() {
  // Hooks
  const location = useLocation();

  // RTK Query
  const [
    getDivisions,
    { data: divisions = [], isError, isFetching, isLoading, isUninitialized },
  ] = useLazyBusinessDivisionGetQuery();

  const tableIsLoading = isError || isFetching || isLoading || isUninitialized;

  useEffect(() => {
    getDivisions();
  }, []);

  return (
    <div className="bg-card border rounded-md">
      <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Anggota
        </h3>
        <div className="flex items-center space-x-4">
          <Link to={"/business/organization/employee/form"}>
            <Button>
              <LucidePlus className="w-5 h-5 mr-2" /> Tambah Anggota
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-t rounded-b-md bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5">Nama Anggota</TableHead>
                <TableHead className="py-4 px-5">Email</TableHead>
                <TableHead className="py-4 px-5">Tanggal Masuk</TableHead>
                <TableHead className="py-4 px-5">
                  Tanggal Akhir Kontrak
                </TableHead>
                <TableHead className="py-4 px-5">Divisi</TableHead>
                <TableHead className="py-4 px-5">Jabatan</TableHead>
                <TableHead className="py-4 px-5">Level</TableHead>
                <TableHead className="py-4 px-5">Status Kepegawaian</TableHead>
                <TableHead className="py-4 px-5 text-center">Status</TableHead>
                <TableHead className="py-4 px-5 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableIsLoading && <DivisionSkeleton />}

              {!tableIsLoading && !divisions?.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={3}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}

              {divisions.map((division) => {
                return (
                  <TableRow key={division.id}>
                    <TableCell className="py-2 px-5">
                      {division.division_name}
                    </TableCell>
                    <TableCell className="py-2 px-5">
                      {division.division_name}
                    </TableCell>
                    <TableCell className="py-2 px-5">
                      {division.division_name}
                    </TableCell>
                    <TableCell className="py-2 px-5">
                      {division.division_name}
                    </TableCell>
                    <TableCell className="py-2 px-5">
                      {division.division_name}
                    </TableCell>
                    <TableCell className="py-2 px-5">
                      {division.division_name}
                    </TableCell>
                    <TableCell className="py-2 px-5">
                      {division.division_name}
                    </TableCell>
                    <TableCell className="py-2 px-5">
                      {division.division_name}
                    </TableCell>
                    <TableCell className="py-2 px-5 text-center">
                      <Switch checked={division.division_status === "active"} />
                    </TableCell>
                    <TableCell className="py-2 px-5 text-center">
                      <div className="flex justify-center space-x-2">
                        <Link
                          to={`/modal/division/form/${division.id}`}
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
                          to={`/modal/division/delete/${division.id}`}
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