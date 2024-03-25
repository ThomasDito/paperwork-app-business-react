import TableSkeleton from "@/components/ui/skeleton";
import useRole from "@/hooks/useRole";
import { useLazyBusinessInformationGetQuery } from "@/redux/api/business/business/information-api";
import { information } from "@/types/schema";
import { debounce } from "lodash";
import {
  LucideEdit,
  LucidePlus,
  LucideSearch,
  LucideTrash,
} from "lucide-react";
import moment from "moment-timezone";
import {
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

export default function InformationIndex() {
  // Hooks
  const location = useLocation();

  // Permissions
  const canWrite = useRole("information", "write");

  // RTK Query
  const [
    getInformation,
    {
      data: informations,
      isLoading: getInformationIsLoading,
      isError: getInformationIsError,
      isFetching: getInformationIsFetching,
    },
  ] = useLazyBusinessInformationGetQuery();

  const tableIsLoading =
    getInformationIsLoading ||
    getInformationIsError ||
    getInformationIsFetching;

  // States
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [initialParams, setInitialParams] = useState<
    PaginationParams<information>
  >({
    page,
    limit,
  });

  // React Hooks
  useEffect(() => {
    if (initialParams) {
      getInformation(initialParams);
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
          Pengumuman
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
              <Link to={"/business/manage/information/form"}>
                <Button>
                  <LucidePlus className="w-5 h-5 mr-2" /> Tambah Pengumuman
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
                <TableHead className="p-5">Judul Pengumuman</TableHead>
                <TableHead className="p-5">Tanggal Tayang</TableHead>
                <TableHead className="p-5">Tanggal Berakhir</TableHead>
                <TableHead className="p-5 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableIsLoading && <TableSkeleton columns={4} />}

              {!tableIsLoading && !informations?.data.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={4}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}

              {!tableIsLoading &&
                informations?.data &&
                informations.data.map((information) => {
                  return (
                    <TableRow key={information.id}>
                      <TableCell className="px-5">
                        {information.information_title}
                      </TableCell>
                      <TableCell className="px-5">
                        {moment(information.information_start_date).format(
                          "DD MMMM YYYY"
                        )}
                      </TableCell>
                      <TableCell className="px-5">
                        {moment(information.information_end_date).format(
                          "DD MMMM YYYY"
                        )}
                      </TableCell>
                      <TableCell className="px-5 text-center">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/business/manage/information/form/${information.id}`}
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
                            to={`/modal/information/delete/${information.id}`}
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
        <div className="flex flex-col items-center justify-between px-5 py-3 space-y-4 border-t md:flex-row md:space-y-0">
          <PaginationLimit
            limit={limit}
            handleChange={setLimit}
            pagination={informations?.pagination}
          />
          {informations?.pagination && (
            <PaginationButton
              pageLimit={6}
              pagination={informations.pagination}
              handleChange={(page) => setPage(page)}
            />
          )}
        </div>
      </div>
    </>
  );
}
