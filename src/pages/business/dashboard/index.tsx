import {
  LucideContact2,
  LucideCrown,
  LucideNetwork,
  LucideWarehouse,
} from "lucide-react";

export default function DashboardIndex() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Karyawan Aktif</div>
            <div className="font-bold text-3xl">0</div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideContact2 className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Cabang</div>
            <div className="font-bold text-3xl">0</div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideWarehouse className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Divisi</div>
            <div className="font-bold text-3xl">0</div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideNetwork className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center border-0 shadow-sm rounded-md p-5 bg-card space-x-5">
          <div className="space-y-3 w-full">
            <div className="">Paket</div>
            <div className="font-bold text-2xl">Premium</div>
          </div>
          <div className="p-3 rounded-full bg-muted text-primary">
            <LucideCrown className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
