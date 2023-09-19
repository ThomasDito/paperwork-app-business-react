import { Tabs } from "@/pages/onboarding";
import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideEdit,
  LucidePlus,
  LucideTrash,
} from "lucide-react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "paperwork-ui";

type Props = {
  setTabs: (tab: Tabs) => void;
};

export default function OnboardingPositionIndex({ setTabs }: Props) {
  return (
    <div className="">
      <div className="mb-10">
        <Button className="">
          <LucidePlus className="w-5 h-5 mr-2" /> Tambah Jabatan
        </Button>
      </div>

      <div className="border rounded-md shadow-sm bg-card">
        <Table className="whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead className="p-5 text-center w-[10px]">No</TableHead>
              <TableHead className="p-5">Nama Divisi</TableHead>
              <TableHead className="p-5">Status</TableHead>
              <TableHead className="p-5 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="text-center w-[10px]">
                    {i + 1}
                  </TableCell>
                  <TableCell>Divisi IT</TableCell>
                  <TableCell>sdsd</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="icon" className="relative">
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

      <div className="mt-14 flex items-center justify-end space-x-5">
        <Button variant="outline" onClick={() => setTabs("division")}>
          <LucideArrowLeft className="w-4 h-4 mr-2" /> Sebelumnya
        </Button>
        <Button onClick={() => setTabs("level")}>
          Selanjutnya <LucideArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
