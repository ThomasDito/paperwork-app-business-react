import { useCallback, useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { LucideBot, LucideEye, LucideHelpCircle, LucideLayoutGrid, LucideMonitor, LucideSearch, LucideSmartphone, LucideTrash } from "lucide-react";
import { useDeleteSessionMutation, useLazyGetUserSessionsQuery } from "@/redux/api/superadmin/manage-user/session-api";
import { debounce } from "lodash";
import PaginationLimit from "@/components/partials/pagination/limit";
import PaginationButton from "@/components/partials/pagination/button";
import { useParams } from "react-router-dom";
import SessionSkeleton from "@/pages/user/components/skeleton/session-skeleton";
import moment from "moment";
import SessionModalShow from "@/pages/user/tabs/session/show";
import { toastError, toastSuccess } from "@/components/ui/toast";
import ModalConfirmation from "@/components/ui/modal-confirmation";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "paperwork-ui";

export default function SessionTabIndex() {
  // Hooks
  const { id } = useParams();

  // RTK Query
  const [getSessions, { data: sessions, isLoading: getSessionsIsLoading, isFetching: getSessionsIsFetching, isError: getSessionsIsError }] =
    useLazyGetUserSessionsQuery();

  const [deleteSession] = useDeleteSessionMutation();

  // States
  const tableIsLoading = getSessionsIsLoading || getSessionsIsFetching || getSessionsIsError;

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [modalDetailIsOpen, setModalDetailIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<user_session | null>(null);

  const [initialParams, setInitialParams] = useState<PaginationParams<user_session>>({
    order_by: "created_at",
    order_sort: "desc",
    page,
    limit,
  });

  // React Hooks
  useEffect(() => {
    if (initialParams && id) {
      getSessions({ user_id: id, params: initialParams });
    }
  }, [initialParams, id]);

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
  const showDetail = (session: user_session) => {
    setSelectedSession(session);
    setModalDetailIsOpen(true);
  };

  const doDelete = async (session_id: string) => {
    setDeleteModalIsOpen(false);

    await deleteSession({
      user_id: id!,
      session_id,
    })
      .unwrap()
      .then(
        (response) => {
          toastSuccess(response?.message || "Sesi berhasil dihapus");
          getSessions({ user_id: id!, params: initialParams });
        },
        (rejected: { data: ApiResponse<unknown> }) => {
          toastError(rejected?.data?.message || "Terjadi kesalahan teknis. Silahkan coba kembali");
        }
      );
  };

  return (
    <>
      {modalDetailIsOpen && selectedSession && <SessionModalShow session={selectedSession} isOpen={modalDetailIsOpen} setIsOpen={setModalDetailIsOpen} />}
      {deleteModalIsOpen && selectedSession && (
        <ModalConfirmation
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          title="Hapus Sesi"
          description="Apakah anda yakin untuk menghapus sesi ini ?"
          actionText="Hapus"
          action={() => doDelete(selectedSession.id)}
        />
      )}
      <div className="py-2">
        <div className="border rounded-md shadow bg-card">
          <div className="flex flex-col items-start justify-between px-4 py-6 space-y-2 border-0 border-b md:items-center md:space-y-0 md:flex-row">
            <div className="flex items-center font-semibold">
              <LucideLayoutGrid className="w-4 h-4 mr-2" /> Daftar Sesi
            </div>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                <LucideSearch size={18} className="text-muted-foreground" />
              </div>
              <Input className="w-full pl-10" type="search" placeholder="Pencarian..." value={search || ""} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="border-b">
            <Table className="whitespace-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-5 py-4">Alamat IP</TableHead>
                  <TableHead className="px-5 py-4">Perangkat</TableHead>
                  <TableHead className="px-5 py-4">Browser</TableHead>
                  <TableHead className="px-5 py-4">OS</TableHead>
                  <TableHead className="px-5 py-4">Platform</TableHead>
                  <TableHead className="px-5 py-4">Aktivitas Terakhir</TableHead>
                  <TableHead className="px-5 py-4 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm">
                {!tableIsLoading &&
                  sessions &&
                  sessions.data.map((session) => {
                    return (
                      <TableRow key={session.id}>
                        <TableCell className="p-5">
                          <div className="flex items-center space-x-4">
                            <div onClick={() => showDetail(session)} className="p-2.5 rounded-full bg-muted/70 cursor-pointer">
                              {session.user_session_device == "desktop" && <LucideMonitor className="w-7 h-7" />}
                              {session.user_session_device == "mobile" && <LucideSmartphone className="w-7 h-7" />}
                              {session.user_session_device == "bot" && <LucideBot className="w-7 h-7" />}
                              {session.user_session_device == "unknown" && <LucideHelpCircle className="w-7 h-7" />}
                            </div>
                            <div className="flex flex-col flex-1 space-y-1">
                              <div onClick={() => showDetail(session)} className="text-base font-medium cursor-pointer hover:underline">
                                {session.user_session_ip_address}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="p-5 first-letter:uppercase">{session.user_session_device}</TableCell>
                        <TableCell className="p-5">{session.user_session_browser}</TableCell>
                        <TableCell className="p-5">{session.user_session_os}</TableCell>
                        <TableCell className="p-5">{session.user_session_platform}</TableCell>
                        <TableCell className="p-5">{moment(session.updated_at).format("DD MMMM YYYY HH:mm")}</TableCell>
                        <TableCell className="p-5 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="w-8 h-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  showDetail(session);
                                }}
                              >
                                <LucideEye className="w-4 h-4 mr-3" /> Detail
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive hover:!text-destructive"
                                onClick={() => {
                                  setSelectedSession(session);
                                  setDeleteModalIsOpen(true);
                                }}
                              >
                                <LucideTrash className="w-4 h-4 mr-3" /> Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {tableIsLoading && <SessionSkeleton />}

                {!tableIsLoading && !sessions?.data.length && (
                  <TableRow>
                    <TableCell className="p-5 text-center" colSpan={6}>
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between p-5">
            <PaginationLimit limit={limit} handleChange={(value) => setLimit(value)} pagination={sessions?.pagination} />
            {sessions?.pagination && <PaginationButton pagination={sessions.pagination} handleChange={(page) => setPage(page)} />}
          </div>
        </div>
      </div>
    </>
  );
}
