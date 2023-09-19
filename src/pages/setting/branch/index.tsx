import { useLazyBusinessBranchGetBranchesQuery } from "@/redux/api/business/branch-api";
import {
  LucideEdit,
  LucidePlus,
  LucideSearch,
  LucideTrash,
} from "lucide-react";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "paperwork-ui";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function BranchIndex() {
  // Hooks
  const location = useLocation();

  // RTK Query
  const [
    getBranches,
    { data: branches = [], isSuccess: getBranchesIsSuccess },
  ] = useLazyBusinessBranchGetBranchesQuery();

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <div className="bg-card border rounded-md shadow">
      <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Cabang
        </h3>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
              <LucideSearch size={18} className="text-muted-foreground" />
            </div>
            <Input
              className="w-full pl-10 min-w-[300px]"
              type="search"
              placeholder="Pencarian..."
            />
          </div>
          <Link
            to={"/setting/branch/form"}
            state={{ previousLocation: location }}
          >
            <Button>
              <LucidePlus className="w-5 h-5 mr-2" /> Tambah Cabang
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-t rounded-b-md bg-card">
        <div>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5">Nama Cabang</TableHead>
                <TableHead className="py-4 px-5">Status</TableHead>
                <TableHead className="py-4 px-5 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => {
                return (
                  <TableRow key={branch.id}>
                    <TableCell className="py-2 px-5">
                      {branch.branch_name}
                    </TableCell>
                    <TableCell className="py-2 px-5">
                      {branch.branch_status}
                    </TableCell>
                    <TableCell className="py-2 px-5 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="relative"
                        >
                          <LucideEdit className="w-4 h-4" />
                          <span className="sr-only">Ubah</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="relative text-destructive hover:text-destructive"
                        >
                          <LucideTrash className="w-4 h-4" />
                          <span className="sr-only">Hapus</span>
                        </Button>
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
