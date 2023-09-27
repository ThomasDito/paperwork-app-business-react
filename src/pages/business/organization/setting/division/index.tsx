import { toastError, toastSuccess } from "@/components/ui/toast";
import DivisionSkeleton from "@/pages/business/organization/setting/division/components/skeleton";
import {
  useBusinessDivisionChangeStatusMutation,
  useLazyBusinessDivisionGetQuery,
} from "@/redux/api/business/division-api";
import { division_status } from "@/types/schema";
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

export default function DivisionIndex() {
  // Hooks
  const location = useLocation();

  // RTK Query
  const [
    getDivisions,
    { data: divisions = [], isError, isFetching, isLoading, isUninitialized },
  ] = useLazyBusinessDivisionGetQuery();

  const [changeStatus] = useBusinessDivisionChangeStatusMutation();

  const tableIsLoading = isError || isFetching || isLoading || isUninitialized;

  useEffect(() => {
    getDivisions();
  }, []);

  const doChangeStatus = async (
    id: string,
    division_status: division_status
  ) => {
    await changeStatus({ id, payload: { division_status } })
      .unwrap()
      .then((response) => {
        toastSuccess(response?.message || "Divisi berhasil diubah");
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika menyimpan data"
        );
      });
  };

  return (
    <div className="bg-card border rounded-md">
      <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Divisi
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
            to={"/modal/division/form"}
            state={{ previousLocation: location }}
          >
            <Button>
              <LucidePlus className="w-5 h-5 mr-2" /> Tambah Divisi
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-t rounded-b-md bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5">Nama Divisi</TableHead>
                <TableHead className="py-4 px-5 text-center">Aktif</TableHead>
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

              {!tableIsLoading &&
                divisions.map((division) => {
                  return (
                    <TableRow key={division.id}>
                      <TableCell className="py-2 px-5">
                        {division.division_name}
                      </TableCell>
                      <TableCell className="py-2 px-5 text-center">
                        <Switch
                          checked={division.division_status === "active"}
                          onCheckedChange={(checked) =>
                            doChangeStatus(
                              division.id,
                              checked ? "active" : "inactive"
                            )
                          }
                        />
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
