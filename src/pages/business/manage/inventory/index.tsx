import TableSkeleton from "@/components/ui/skeleton";
import { useLazyBusinessInventoryGetQuery } from "@/redux/api/business/inventory-api";
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

export default function InventoryIndex() {
  // Hooks
  const location = useLocation();

  // RTK Query
  const [
    getInventory,
    {
      data: inventories = [],
      isLoading: getInventoryIsLoading,
      isError: getInventoryIsError,
      isFetching: getInventoryIsFetching,
    },
  ] = useLazyBusinessInventoryGetQuery();

  const tableIsLoading =
    getInventoryIsLoading || getInventoryIsError || getInventoryIsFetching;

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div className="bg-card border rounded-md">
      <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Inventaris
        </h3>
        <div className="flex items-center space-x-4">
          <Link to={"/business/manage/inventory/form"}>
            <Button>
              <LucidePlus className="w-5 h-5 mr-2" /> Tambah Inventaris
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-t rounded-b-md bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5">Nomor Inventaris</TableHead>
                <TableHead className="py-4 px-5">Nama Inventaris</TableHead>
                <TableHead className="py-4 px-5">Tanggal Pembelian</TableHead>
                <TableHead className="py-4 px-5">Penanggung Jawab</TableHead>
                <TableHead className="py-4 px-5 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableIsLoading && <TableSkeleton columns={5} />}

              {!tableIsLoading && !inventories.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={4}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}

              {!tableIsLoading &&
                inventories.map((inventory) => {
                  return (
                    <TableRow key={inventory.id}>
                      <TableCell className="py-2 px-5">
                        {inventory.inventory_number}
                      </TableCell>
                      <TableCell className="py-2 px-5">
                        {inventory.inventory_name}
                      </TableCell>
                      <TableCell className="py-2 px-5">
                        {moment(inventory.inventory_buy_date).format(
                          "DD MMMM YYYY"
                        )}
                      </TableCell>
                      <TableCell className="py-2 px-5">
                        {inventory.employee?.employee_name ?? "-"}
                      </TableCell>
                      <TableCell className="py-2 px-5 text-center">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/business/manage/inventory/form/${inventory.id}`}
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
                            to={`/modal/inventory/delete/${inventory.id}`}
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
