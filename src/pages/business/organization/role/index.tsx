import TableSkeleton from "@/components/ui/skeleton";
import useRole from "@/hooks/useRole";
import { useLazyBusinessRoleGetQuery } from "@/redux/api/business/role-api";
import { role_item } from "@/types/schema";
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
import { useCallback, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export default function RoleIndex() {
  // Hooks
  const location = useLocation();

  // Permissions
  const canWrite = useRole("role", "write");

  // RTK Query
  const [
    getRoles,
    {
      data: roles = [],
      isLoading: getRolesIsLoading,
      isError: getRolesIsError,
      isFetching: getRolesIsFetching,
    },
  ] = useLazyBusinessRoleGetQuery();

  const tableIsLoading =
    getRolesIsLoading || getRolesIsError || getRolesIsFetching;

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="bg-card border rounded-md">
      <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Hak Akses
        </h3>
        {canWrite && (
          <div className="flex items-center space-x-4">
            <Link to={"/business/organization/role/form"}>
              <Button>
                <LucidePlus className="w-5 h-5 mr-2" /> Tambah Hak Akses
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="border-t rounded-b-md bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5">Nama Jabatan</TableHead>
                <TableHead className="py-4 px-5 text-center">
                  Jumlah Modul
                </TableHead>
                <TableHead className="py-4 px-5 text-center">Aktif</TableHead>
                {canWrite && (
                  <TableHead className="py-4 px-5 text-center">Aksi</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableIsLoading && <TableSkeleton columns={4} />}

              {!tableIsLoading && !roles.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={4}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}

              {!tableIsLoading &&
                roles.map((role) => {
                  return (
                    <TableRow key={role.id}>
                      <TableCell className="px-5">
                        {role.position.position_name}
                      </TableCell>
                      <TableCell className="px-5 text-center">
                        {
                          role.role_items.filter(
                            (item) => item.role_item_type !== "no_access"
                          ).length
                        }
                      </TableCell>
                      <TableCell className="px-5 text-center">
                        <Switch
                          disabled={!canWrite}
                          checked={role.role_status === "active"}
                        />
                      </TableCell>
                      {canWrite && (
                        <TableCell className="px-5 text-center">
                          <div className="flex justify-center space-x-2">
                            <Link
                              to={`/business/organization/role/form/${role.id}`}
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
                              to={`/modal/role/delete/${role.id}`}
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
                      )}
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
