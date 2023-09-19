import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Button,
} from "paperwork-ui";
import { LucideEye, LucideSearch } from "lucide-react";
import {
  useChangeStatusUserMutation,
  useLazyGetUsersQuery,
} from "@/redux/api/superadmin/manage-user/user-api";
import moment from "moment";
import { Switch } from "paperwork-ui";
import { debounce } from "lodash";
import PaginationLimit from "@/components/partials/pagination/limit";
import PaginationButton from "@/components/partials/pagination/button";
import { Link, useNavigate } from "react-router-dom";
import UserIndexSkeleton from "@/pages/user/components/skeleton/index-skeleton";
import { toastError, toastSuccess } from "@/components/ui/toast";
import { USER_LEVEL_LABEL } from "@/consts/global";

export default function UserIndex() {
  // Hooks
  const navigate = useNavigate();

  // RTK Query
  const [
    getUsers,
    {
      data: users,
      isLoading: getUsersIsLoading,
      isFetching: getUsersIsFetching,
      isError: getUsersIsError,
    },
  ] = useLazyGetUsersQuery();

  const [changeStatusUser] = useChangeStatusUserMutation();

  // States
  const tableIsLoading =
    getUsersIsLoading || getUsersIsFetching || getUsersIsError;

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [initialParams, setInitialParams] = useState<PaginationParams<user>>({
    order_by: "user_fullname",
    page,
    limit,
  });

  // React Hooks
  useEffect(() => {
    if (initialParams) {
      getUsers(initialParams);
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

  // Actions
  const doChangeStatus = async (id: string) => {
    await changeStatusUser(id)
      .unwrap()
      .then(
        (response) => {
          toastSuccess(response?.message || "Perubahan berhasil disimpan");
        },
        (rejected: { data: ApiResponse<unknown> }) => {
          toastError(
            rejected?.data?.message ||
              "Terjadi kesalahan teknis. Silahkan coba kembali"
          );
        }
      );

    getUsers(initialParams);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between pb-5 space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Daftar Pengguna
        </h3>
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
      </div>
      <div className="border rounded-md shadow-sm bg-card">
        <Table className="whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead className="h-auto p-5">Nama Pengguna</TableHead>
              <TableHead className="h-auto p-5">Email</TableHead>
              <TableHead className="h-auto p-5">No. Telepon</TableHead>
              <TableHead className="h-auto p-5 text-center">
                Jumlah Organisasi
              </TableHead>
              <TableHead className="h-auto p-5">Aktif</TableHead>
              <TableHead className="h-auto p-5 whitespace-nowrap">
                Tanggal Bergabung
              </TableHead>
              <TableHead className="h-auto p-5 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm">
            {!tableIsLoading &&
              users &&
              users.data.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="p-5">
                      <div className="flex items-center space-x-4">
                        <Link to={`/user/${user.id}`}>
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={user.user_avatar || ""}
                              alt={user.user_fullname}
                            />
                            <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                              {user.user_fullname.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex flex-col flex-1 space-y-1">
                          <Link
                            to={`/user/${user.id}`}
                            className="text-base font-medium hover:underline"
                          >
                            {user.user_fullname}
                          </Link>
                          <div className="text-sm text-muted-foreground">
                            {USER_LEVEL_LABEL[user.user_level]}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-5">{user.user_email}</TableCell>
                    <TableCell className="p-5">
                      {user.user_phone ?? "-"}
                    </TableCell>
                    <TableCell className="p-5 text-center">
                      {user._count.user_organizations || 0}
                    </TableCell>
                    <TableCell className="p-5">
                      <Switch
                        defaultChecked={user.user_status === "active"}
                        onCheckedChange={() => doChangeStatus(user.id)}
                      />
                    </TableCell>
                    <TableCell className="p-5">
                      {moment(user.created_at).format("DD MMMM YYYY")}
                    </TableCell>
                    <TableCell className="p-5 text-center">
                      <Button
                        variant="ghost"
                        className="relative"
                        onClick={() => navigate(`/user/${user.id}`)}
                      >
                        <LucideEye className="w-4 h-4" />
                        <span className="sr-only">Detail</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

            {tableIsLoading && <UserIndexSkeleton />}

            {!tableIsLoading && !users?.data.length && (
              <TableRow>
                <TableCell className="p-5 text-center" colSpan={7}>
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-col items-center justify-between px-5 py-3 space-y-4 border-t md:flex-row md:space-y-0">
          <PaginationLimit
            limit={limit}
            handleChange={(value) => setLimit(value)}
            pagination={users?.pagination}
          />
          {users?.pagination && (
            <PaginationButton
              pagination={users.pagination}
              handleChange={(page) => setPage(page)}
            />
          )}
        </div>
      </div>
    </>
  );
}
