import { LucidePlus } from "lucide-react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "paperwork-ui";
import { Link, useLocation } from "react-router-dom";

export default function RoleIndex() {
  // Hooks
  const location = useLocation();

  return (
    <div className="bg-card border rounded-md">
      <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Hak Akses
        </h3>
        <div className="hidden items-center space-x-4">
          <Link
            to={"/modal/division/form"}
            state={{ previousLocation: location }}
          >
            <Button>
              <LucidePlus className="w-5 h-5 mr-2" /> Tambah Hak Akses
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-t rounded-b-md bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5">Nama Jabatan</TableHead>
                <TableHead className="py-4 px-5">Jumlah Modul</TableHead>
                <TableHead className="py-4 px-5 text-center">Aktif</TableHead>
                <TableHead className="py-4 px-5 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="p-5 text-center" colSpan={4}>
                  Tidak ada data
                </TableCell>
              </TableRow>

              {/* {tableIsLoading && <DivisionSkeleton />}

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
              })} */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
