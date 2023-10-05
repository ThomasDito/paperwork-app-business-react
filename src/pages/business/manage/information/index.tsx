import TableSkeleton from "@/components/ui/skeleton";
import { useLazyBusinessInformationGetQuery } from "@/redux/api/business/information-api";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import moment from "moment";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "paperwork-ui";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function InformationIndex() {
  // Hooks
  const location = useLocation();

  // RTK Query
  const [
    getInformation,
    {
      data: informations = [],
      isLoading: getInformationIsLoading,
      isError: getInformationIsError,
      isFetching: getInformationIsFetching,
    },
  ] = useLazyBusinessInformationGetQuery();

  const tableIsLoading =
    getInformationIsLoading ||
    getInformationIsError ||
    getInformationIsFetching;

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <div className="bg-card border rounded-md">
      <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Pengumuman
        </h3>
        <div className="flex items-center space-x-4">
          <Link to={"/business/manage/information/form"}>
            <Button>
              <LucidePlus className="w-5 h-5 mr-2" /> Tambah Pengumuman
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-t rounded-b-md bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5">Judul Pengumuman</TableHead>
                <TableHead className="py-4 px-5">Tanggal Tayang</TableHead>
                <TableHead className="py-4 px-5">Tanggal Berakhir</TableHead>
                <TableHead className="py-4 px-5 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableIsLoading && <TableSkeleton columns={4} />}

              {!tableIsLoading && !informations.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={4}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}

              {!tableIsLoading &&
                informations.map((information) => {
                  return (
                    <TableRow key={information.id}>
                      <TableCell className="py-2 px-5">
                        {information.information_title}
                      </TableCell>
                      <TableCell className="py-2 px-5">
                        {moment(information.information_start_date).format(
                          "DD MMMM YYYY"
                        )}
                      </TableCell>
                      <TableCell className="py-2 px-5">
                        {moment(information.information_end_date).format(
                          "DD MMMM YYYY"
                        )}
                      </TableCell>
                      <TableCell className="py-2 px-5 text-center">
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
      </div>
    </div>
  );
}
