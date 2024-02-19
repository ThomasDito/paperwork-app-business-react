import TableSkeleton from "@/components/ui/skeleton";
import useRole from "@/hooks/useRole";
import { useLazyBusinessMemberGetQuery } from "@/redux/api/business/business/member-api";
import { user } from "@/types/schema";
import { debounce } from "lodash";
import {
  LucideChevronDown,
  LucideCrown,
  LucideMail,
  LucideMailWarning,
  LucideMoreHorizontal,
  LucidePlus,
  LucideSearch,
  LucideTrash,
} from "lucide-react";
import moment from "moment";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  PaginationButton,
  PaginationLimit,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from "paperwork-ui";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function MemberIndex() {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Permissions
  const canWrite = useRole("member", "write");

  // RTK Query
  const [
    getMembers,
    { data: members, isError, isFetching, isLoading, isUninitialized },
  ] = useLazyBusinessMemberGetQuery();

  const tableIsLoading = isError || isFetching || isLoading || isUninitialized;

  // States
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
      getMembers(initialParams);
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
          Anggota
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
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="flex flex-1 space-x-2">
                    <span className="w-full">{t("add_member")}</span>
                    <LucideChevronDown className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{t("add_member")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link
                    to={"/modal/member/create"}
                    state={{ previousLocation: location }}
                  >
                    <DropdownMenuItem>
                      <LucidePlus className="w-4 h-4 mr-3" /> Buat Anggota Baru
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    to={"/modal/member/invite"}
                    state={{ previousLocation: location }}
                  >
                    <DropdownMenuItem>
                      <LucideMail className="w-4 h-4 mr-3" />
                      Undang Melalui Email
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
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
                <TableHead className="p-5">Tanggal Bergabung</TableHead>
                <TableHead className="p-5 text-center">Status</TableHead>
                {canWrite && (
                  <TableHead className="py-4 px-5 text-center">Aksi</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableIsLoading && <TableSkeleton columns={9} />}

              {!tableIsLoading && !members?.data.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={9}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}

              {!tableIsLoading &&
                members &&
                members.data.map((member) => {
                  return (
                    <TableRow key={member.id}>
                      <TableCell className="px-5">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={member.user_avatar || ""}
                              alt={member.user_fullname}
                            />
                            <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                              {member.user_fullname.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col flex-1 space-y-1">
                            <div className="flex items-center text-sm font-medium">
                              {member.user_fullname}
                              {member.user_organizations[0]
                                ?.user_organization_type == "founder" && (
                                <span className="ml-3 inline-flex items-center rounded-full bg-amber-500 text-white px-2 py-0.5 text-xs">
                                  <LucideCrown className="w-3 h-3 mr-2" />{" "}
                                  Pendiri
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {member.user_email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-5">
                        {moment(member.created_at).format("DD MMMM YYYY")}
                      </TableCell>
                      <TableCell className="px-5 text-center">
                        <div
                          className={cn(
                            "inline-flex px-3 py-1.5 rounded-full text-center border text-xs",
                            member.user_organizations[0]
                              ?.user_organization_status === "accepted"
                              ? "border-success text-success"
                              : "border-muted-foreground text-muted-foreground"
                          )}
                        >
                          {member.user_organizations[0]
                            ?.user_organization_status === "accepted"
                            ? "Dikonfirmasi"
                            : "Menunggu"}
                        </div>
                      </TableCell>
                      {canWrite && (
                        <TableCell className="px-5 text-center">
                          <div className="flex justify-center space-x-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Button variant="ghost" size="icon">
                                  <LucideMoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {member.user_organizations[0]
                                  ?.user_organization_status !== "accepted" && (
                                  <DropdownMenuItem
                                    onClick={() => {
                                      navigate(
                                        `/modal/member/resend/${member.id}`,
                                        {
                                          state: { previousLocation: location },
                                        }
                                      );
                                    }}
                                  >
                                    <LucideMailWarning className="w-4 h-4 mr-3" />{" "}
                                    Kirim Undangan Baru
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuItem
                                  disabled={
                                    member.user_organizations[0]
                                      ?.user_organization_type === "founder"
                                  }
                                  onClick={() => {
                                    navigate(
                                      `/modal/member/delete/${member.id}`,
                                      {
                                        state: { previousLocation: location },
                                      }
                                    );
                                  }}
                                  className="text-destructive hover:!text-destructive"
                                >
                                  <LucideTrash className="w-4 h-4 mr-3" />
                                  Hapus Anggota
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        {(members?.data.length || 0) > 0 && (
          <div className="flex flex-col items-center justify-between px-5 py-3 space-y-4 border-t md:flex-row md:space-y-0">
            <PaginationLimit
              limit={limit}
              handleChange={setLimit}
              pagination={members?.pagination}
            />
            {members?.pagination && (
              <PaginationButton
                pageLimit={6}
                pagination={members.pagination}
                handleChange={(page) => setPage(page)}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
