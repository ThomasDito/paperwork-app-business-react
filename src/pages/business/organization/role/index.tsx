import TableSkeleton from "@/components/ui/skeleton";
import useRole from "@/hooks/useRole";
import { useLazyBusinessRoleGetQuery } from "@/redux/api/business/business/role-api";
import { role } from "@/types/schema";
import { debounce } from "lodash";
import {
  LucideEdit,
  LucidePlus,
  LucideSearch,
  LucideTrash,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  PaginationButton,
  PaginationLimit,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "paperwork-ui";
import { useCallback, useEffect, useState } from "react";
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
      data: roles,
      isLoading: getRolesIsLoading,
      isError: getRolesIsError,
      isFetching: getRolesIsFetching,
    },
  ] = useLazyBusinessRoleGetQuery();

  const tableIsLoading =
    getRolesIsLoading || getRolesIsError || getRolesIsFetching;

  // States
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [initialParams, setInitialParams] = useState<PaginationParams<role>>({
    page,
    limit,
  });

  // React Hooks
  useEffect(() => {
    if (initialParams) {
      getRoles(initialParams);
    }
  }, [initialParams]);

  useEffect(() => {
    setInitialParams({
      ...initialParams,
      page,
      limit,
    });
  }, [page, limit]);

  const doSearch = useCallback(
    debounce((value) => {
      setInitialParams({
        ...initialParams,
        search: value,
      });
    }, 750),
    [initialParams]
  );

  useEffect(() => {
    if (typeof search !== "undefined") doSearch(search);
  }, [search]);

  return (
    <>
      <div className="flex flex-col items-center justify-between pb-5 space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Hak Akses
        </h3>
        <div className="flex items-center space-x-5">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
              <LucideSearch size={18} className="text-muted-foreground" />
            </div>
            <Input
              className="w-full pl-10 min-w-[300px]"
              type="search"
              placeholder="Pencarian..."
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
      </div>
      <div className="rounded-md shadow-sm bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="p-5">Nama Anggota</TableHead>
                <TableHead className="p-5 text-center">Jumlah Modul</TableHead>
                {canWrite && (
                  <TableHead className="p-5 text-center">Aksi</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableIsLoading && <TableSkeleton columns={4} />}

              {!tableIsLoading && !roles?.data.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={4}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}

              {!tableIsLoading &&
                roles &&
                roles.data.map((role) => {
                  return (
                    <TableRow key={role.id}>
                      <TableCell className="px-5">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={role.user.user_avatar || ""}
                              alt={role.user.user_fullname}
                            />
                            <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                              {role.user.user_fullname.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col flex-1 space-y-1">
                            <div className="text-sm font-medium">
                              {role.user.user_fullname}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {role.user.user_email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 text-center">
                        {
                          role.role_items.filter(
                            (item) => item.role_item_type !== "no_access"
                          ).length
                        }
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
        {(roles?.data.length || 0) > 0 && (
          <div className="flex flex-col items-center justify-between px-5 py-3 space-y-4 border-t md:flex-row md:space-y-0">
            <PaginationLimit
              limit={limit}
              handleChange={setLimit}
              pagination={roles?.pagination}
            />
            {roles?.pagination && (
              <PaginationButton
                pageLimit={6}
                pagination={roles.pagination}
                handleChange={(page) => setPage(page)}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
